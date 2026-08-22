import { createClient } from '@supabase/supabase-js';

function db() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function parseJson(text) {
  try { return JSON.parse(text); } catch {}
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('The editorial model did not return valid JSON.');
  return JSON.parse(match[0]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const providedSecret = req.headers['x-editorial-secret'] || String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (process.env.EDITORIAL_CRON_SECRET && providedSecret !== process.env.EDITORIAL_CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ configured: false, error: 'OPENAI_API_KEY is missing.' });

  const database = db();
  if (!database) return res.status(503).json({ configured: false, error: 'Supabase server credentials are missing.' });

  const { id } = req.body || {};
  if (!id) return res.status(400).json({ error: 'Story id is required.' });

  const { data: story, error: storyError } = await database.from('editorial_stories').select('*').eq('id', id).single();
  if (storyError || !story) return res.status(404).json({ error: storyError?.message || 'Story not found.' });

  const model = process.env.EDITORIAL_MODEL || 'gpt-5-mini';
  const prompt = `You are the editorial desk for FOR THE CULTURE, an African music, culture and entertainment platform. Create an original news brief from the supplied source metadata. Do not reproduce the source article, do not invent facts, and do not imply FOR THE CULTURE witnessed events it did not witness. Preserve proper names and only use facts present in the supplied metadata. The result should feel confident, modern, culturally aware and concise. Return JSON only with keys: headline, dek, body, category, tags.\n\nSOURCE: ${story.source_name}\nORIGINAL HEADLINE: ${story.original_headline}\nSOURCE EXCERPT: ${story.source_excerpt}\nSOURCE URL: ${story.source_url}`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model, input: prompt, store: false }),
  });
  const payload = await response.json();
  if (!response.ok) return res.status(response.status).json({ error: payload?.error?.message || 'OpenAI request failed.' });

  const output = payload.output_text || '';
  const draft = parseJson(output);
  const { data, error } = await database.from('editorial_stories').update({
    headline: draft.headline,
    dek: draft.dek,
    body: draft.body,
    category: draft.category,
    tags: Array.isArray(draft.tags) ? draft.tags : [],
    status: 'draft',
    ai_model: model,
  }).eq('id', id).select('*').single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ configured: true, story: data });
}
