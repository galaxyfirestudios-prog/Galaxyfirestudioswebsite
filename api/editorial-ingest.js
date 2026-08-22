import { createClient } from '@supabase/supabase-js';
import { EDITORIAL_SOURCES, scoreStory } from '../lib/editorial-sources.js';

function clean(value = '') {
  return value.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}

function parseItems(xml) {
  const rssItems = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map(m => m[0]);
  const atomEntries = [...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)].map(m => m[0]);
  const blocks = rssItems.length ? rssItems : atomEntries;
  return blocks.map(block => {
    const pick = tag => {
      const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i');
      return clean(block.match(re)?.[1] || '');
    };
    const linkMatch = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i) || block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    return {
      title: pick('title'),
      description: pick('description') || pick('summary') || pick('content:encoded'),
      url: clean(linkMatch?.[1] || ''),
      publishedAt: pick('pubDate') || pick('published') || pick('updated') || null,
    };
  }).filter(item => item.title && item.url);
}

function db() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed' });
  const providedSecret = req.headers['x-editorial-secret'] || String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (process.env.EDITORIAL_CRON_SECRET && providedSecret !== process.env.EDITORIAL_CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const database = db();
  if (!database) return res.status(503).json({ configured: false, error: 'Supabase server credentials are missing.' });

  const results = [];
  for (const source of EDITORIAL_SOURCES.filter(s => s.enabled)) {
    try {
      const response = await fetch(source.feedUrl, { headers: { 'user-agent': 'FOR-THE-CULTURE-Editorial-Radar/1.0' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const xml = await response.text();
      const items = parseItems(xml).slice(0, 20);
      const rows = items.map(item => ({
        source_key: source.key,
        source_name: source.name,
        source_url: item.url,
        original_headline: item.title,
        source_excerpt: item.description.slice(0, 1200),
        source_published_at: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
        relevance_score: scoreStory(item.title, item.description),
        status: 'discovered',
      })).filter(row => row.relevance_score >= 24);

      if (rows.length) {
        const { error } = await database.from('editorial_stories').upsert(rows, { onConflict: 'source_url', ignoreDuplicates: true });
        if (error) throw error;
      }
      results.push({ source: source.name, found: items.length, relevant: rows.length, ok: true });
    } catch (error) {
      results.push({ source: source.name, ok: false, error: error.message });
    }
  }

  return res.status(200).json({ configured: true, results });
}
