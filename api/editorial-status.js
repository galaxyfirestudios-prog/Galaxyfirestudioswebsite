const { createClient } = require('@supabase/supabase-js')

const SOURCES = [
  { name: 'The NATIVE', url: process.env.EDITORIAL_NATIVE_FEED || 'https://thenativemag.com/feed/' },
  { name: 'The NATIVE Music', url: process.env.EDITORIAL_NATIVE_MUSIC_FEED || 'https://thenativemag.com/category/music/feed/' },
  { name: 'PUNCH Entertainment', url: 'https://rss.punchng.com/v1/category/entertainment' },
  { name: 'PUNCH Interviews', url: 'https://rss.punchng.com/v1/category/interview' },
  { name: 'PUNCH Special Features', url: 'https://rss.punchng.com/v1/category/special_feature' },
  { name: 'PUNCH Videos', url: 'https://rss.punchng.com/v1/category/videos' },
  { name: 'The Guardian Nigeria', url: process.env.EDITORIAL_GUARDIAN_FEED || 'https://guardian.ng/feed/' },
]

const TIMEOUT_MS = Number(process.env.EDITORIAL_STATUS_TIMEOUT_MS || 5000)

async function checkSource(source) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'FOR-THE-CULTURE-Editorial-Radar/3.0',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*'
      },
      signal: controller.signal,
      redirect: 'follow'
    })
    const xml = await response.text()
    const items = (xml.match(/<item\b/gi) || []).length + (xml.match(/<entry\b/gi) || []).length
    return { name: source.name, ok: response.ok, status: response.status, items }
  } catch (error) {
    return { name: source.name, ok: false, error: error.name === 'AbortError' ? 'timeout' : error.message }
  } finally {
    clearTimeout(timer)
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const result = {
    ok: true,
    checkedAt: new Date().toISOString(),
    configuration: {
      supabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
      openai: Boolean(process.env.OPENAI_API_KEY),
      cronSecret: Boolean(process.env.CRON_SECRET || process.env.EDITORIAL_CRON_SECRET),
      model: process.env.EDITORIAL_MODEL || 'gpt-5-mini'
    },
    database: { connected: false, tableReady: false, publishedStories: 0 },
    sources: []
  }

  if (result.configuration.supabase) {
    try {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      const { count, error } = await supabase
        .from('editorial_stories')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'published')
      if (!error) {
        result.database.connected = true
        result.database.tableReady = true
        result.database.publishedStories = count || 0
      } else {
        result.database.error = error.message
      }
    } catch (error) {
      result.database.error = error.message
    }
  }

  result.sources = await Promise.all(SOURCES.map(checkSource))
  result.ok = result.configuration.supabase && result.configuration.openai && result.database.tableReady && result.sources.some(source => source.ok)
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json(result)
}
