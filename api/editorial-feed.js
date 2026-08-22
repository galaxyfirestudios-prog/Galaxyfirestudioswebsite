const { createClient } = require('@supabase/supabase-js');
module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ stories: [] });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(200).json({ stories: [], configured: false });
  try {
    const limit = Math.min(Math.max(Number(req.query?.limit || 6), 1), 12);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase.from('editorial_stories').select('id,headline,dek,body,category,tags,source_name,original_url,published_at,auto_published').eq('status', 'published').order('published_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return res.status(200).json({ stories: data || [], configured: true });
  } catch (error) {
    console.error('Editorial feed error:', error);
    return res.status(200).json({ stories: [], configured: true });
  }
};
