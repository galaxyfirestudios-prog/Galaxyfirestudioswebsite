const { createClient } = require('@supabase/supabase-js');
const { DEFAULT_SOURCES, CULTURE_TERMS, BLOCKED_TERMS } = require('./editorial-config');
const { parseFeed, relevanceScore, slugify, fingerprint, extractOutputText } = require('./editorial-utils');

function json(res, status, body) { return res.status(status).json(body); }
function isAuthorized(req) {
  const secret = process.env.EDITORIAL_CRON_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.authorization || '';
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : (req.query?.secret || '');
  return provided === secret;
}

async function openAiDraft(item) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured.');
  const model = process.env.EDITORIAL_MODEL || 'gpt-5-mini';
  const prompt = `You are the launch editorial desk for FOR THE CULTURE, a Nigerian/African music, culture and entertainment platform owned by Galaxy Fire Studios. Create a concise, original news brief from ONLY the supplied feed metadata. Do not reproduce sentences from the source, do not invent facts, quotes, dates or details, and do not imply FOR THE CULTURE witnessed events. Preserve proper names exactly as supplied. The output must be JSON with keys: headline, dek, body, category, tags. Body should be 2-4 short paragraphs, roughly 120-220 words. Make the angle useful to readers interested in African music, culture and creative life. Mention the source publication naturally in the body or dek when appropriate and never hide the source link.

SOURCE: ${item.source_name}
TITLE: ${item.title}
EXCERPT: ${item.excerpt}
PUBLISHED: ${item.published_at}
SOURCE URL: ${item.url}`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model, input: prompt, text: { format: { type: 'json_object' } } }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || `OpenAI request failed (${response.status}).`);
  const raw = extractOutputText(data);
  const parsed = JSON.parse(raw);
  if (!parsed.headline || !parsed.body) throw new Error('OpenAI returned an incomplete editorial draft.');
  return parsed;
}

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'POST') return json(res, 405, { ok: false, message: 'Method not allowed.' });
  if (!isAuthorized(req)) return json(res, 401, { ok: false, message: 'Unauthorized editorial scan.' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return json(res, 500, { ok: false, message: 'Supabase server credentials are missing.' });

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const started = Date.now();
  const results = { sources: 0, fetched: 0, relevant: 0, published: 0, skipped: 0, errors: [] };

  try {
    let { data: dbSources, error: sourceError } = await supabase.from('editorial_sources').select('*').eq('enabled', true);
    if (sourceError) throw sourceError;
    const sources = dbSources?.length ? dbSources : DEFAULT_SOURCES;
    results.sources = sources.length;

    for (const source of sources) {
      try {
        const response = await fetch(source.feed_url, { headers: { 'User-Agent': 'FOR-THE-CULTURE-Editorial-Radar/1.0' } });
        if (!response.ok) throw new Error(`Feed returned ${response.status}`);
        const xml = await response.text();
        const items = parseFeed(xml, source);
        results.fetched += items.length;

        for (const item of items.slice(0, 12)) {
          const score = relevanceScore(item, CULTURE_TERMS, BLOCKED_TERMS);
          if (score < Number(process.env.EDITORIAL_MIN_SCORE || 16)) { results.skipped++; continue; }
          results.relevant++;
          const sourceFingerprint = fingerprint(item);

          const { data: existing } = await supabase.from('editorial_stories').select('id,status').eq('source_fingerprint', sourceFingerprint).maybeSingle();
          if (existing) { results.skipped++; continue; }

          let draft;
          try {
            draft = await openAiDraft(item);
          } catch (error) {
            results.errors.push(`${source.name}: ${error.message}`);
            continue;
          }

          const record = {
            source_name: item.source_name,
            source_url: item.source_url,
            original_url: item.url,
            original_title: item.title,
            original_excerpt: item.excerpt,
            original_published_at: item.published_at,
            source_fingerprint: sourceFingerprint,
            relevance_score: score,
            headline: String(draft.headline).slice(0, 180),
            dek: String(draft.dek || '').slice(0, 420),
            body: String(draft.body).slice(0, 12000),
            category: String(draft.category || item.source_category || 'Culture').slice(0, 80),
            tags: Array.isArray(draft.tags) ? draft.tags.slice(0, 10).map(String) : [],
            slug: `${slugify(draft.headline)}-${sourceFingerprint.slice(0, 8)}`,
            status: 'published',
            auto_published: true,
            published_at: new Date().toISOString(),
          };
          const { error: insertError } = await supabase.from('editorial_stories').insert(record);
          if (insertError) { results.errors.push(`${source.name}: ${insertError.message}`); continue; }
          results.published += 1;
          if (results.published >= Number(process.env.EDITORIAL_MAX_PER_RUN || 5)) break;
        }
        if (results.published >= Number(process.env.EDITORIAL_MAX_PER_RUN || 5)) break;
      } catch (error) {
        results.errors.push(`${source.name}: ${error.message}`);
      }
    }

    return json(res, 200, { ok: true, duration_ms: Date.now() - started, ...results, auto_publish: true });
  } catch (error) {
    console.error('Editorial scan error:', error);
    return json(res, 500, { ok: false, message: error.message, ...results });
  }
};
