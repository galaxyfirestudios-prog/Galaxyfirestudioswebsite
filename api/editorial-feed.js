import { createClient } from '@supabase/supabase-js';

function getDb() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const db = getDb();
  if (!db) return res.status(200).json({ configured: false, stories: [], message: 'Editorial database is not configured yet.' });

  const limit = Math.min(Math.max(Number(req.query?.limit || 12), 1), 50);
  const { data, error } = await db
    .from('editorial_stories')
    .select('id,source_name,source_url,headline,dek,body,category,tags,relevance_score,status,published_at,created_at')
    .in('status', ['published', 'approved'])
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ configured: true, stories: data || [] });
}
