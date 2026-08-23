const { createClient } = require('@supabase/supabase-js')
const { draftStoryWithGemini, DEFAULT_MODEL } = require('../lib/gemini-editorial.cjs')

const SOURCES = [
  { name: 'The NATIVE', url: process.env.EDITORIAL_NATIVE_FEED || 'https://thenativemag.com/feed/', weight: 12 },
  { name: 'The NATIVE Music', url: process.env.EDITORIAL_NATIVE_MUSIC_FEED || 'https://thenativemag.com/category/music/feed/', weight: 14 },
  { name: 'PUNCH Entertainment', url: 'https://rss.punchng.com/v1/category/entertainment', weight: 8 },
  { name: 'PUNCH Interviews', url: 'https://rss.punchng.com/v1/category/interview', weight: 8 },
  { name: 'PUNCH Special Features', url: 'https://rss.punchng.com/v1/category/special_feature', weight: 7 },
  { name: 'PUNCH Videos', url: 'https://rss.punchng.com/v1/category/videos', weight: 5 },
  { name: 'The Guardian Nigeria', url: process.env.EDITORIAL_GUARDIAN_FEED || 'https://guardian.ng/feed/', weight: 8 },
]

const RELEVANCE_TERMS = [
  'music','artist','singer','rapper','producer','dj','album','single','ep','mixtape',
  'afrobeats','afrobeat','alte','hip-hop','hip hop','amapiano','fuji','highlife',
  'nigeria','nigerian','africa','african','lagos','abuja','accra','ghana','culture',
  'fashion','film','nollywood','photography','art','creative','creator','festival',
  'concert','showcase','event','nightlife','radio','podcast','community','dance',
  'entertainment','visual','design','media','label','recording','streaming','streetwear',
  'gallery','documentary','fashion week','premiere','tour','release','record label'
]

const CATEGORY_RULES = [
  ['MUSIC', /(album|single|ep|singer|rapper|producer|dj|music|afrobeats|afrobeat|alte|amapiano|fuji|highlife|record label|release|tour)/i],
  ['STYLE', /(fashion|style|streetwear|designer|design|fashion week)/i],
  ['FILM', /(film|nollywood|cinema|movie|documentary|premiere|actor|actress)/i],
  ['ART', /(art|photograph|visual|gallery|creative|creator)/i],
  ['EVENTS', /(concert|festival|showcase|event|nightlife|tour)/i],
]

const MAX_SOURCE_ITEMS = Number(process.env.EDITORIAL_SOURCE_ITEMS || 18)
const MAX_STORIES = Number(process.env.EDITORIAL_MAX_STORIES_PER_SCAN || 4)
const MAX_AGE_HOURS = Number(process.env.EDITORIAL_MAX_AGE_HOURS || 96)
const FETCH_TIMEOUT_MS = Number(process.env.EDITORIAL_FETCH_TIMEOUT_MS || 6500)
const GEMINI_TIMEOUT_MS = Number(process.env.EDITORIAL_GEMINI_TIMEOUT_MS || 20000)
const IMAGE_FETCH_TIMEOUT_MS = Number(process.env.EDITORIAL_IMAGE_FETCH_TIMEOUT_MS || 5000)

function decode(value='') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ').trim()
}

function tag(block, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i')
  return block.match(re)?.[1] || ''
}

function imageFrom(block) {
  const media = block.match(/<media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/i)
    || block.match(/<enclosure[^>]+url=["']([^"']+)["']/i)
    || block.match(/<img[^>]+src=["']([^"']+)["']/i)
  return media?.[1] || ''
}

function parseDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

function parseFeed(xml, sourceName, sourceWeight) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || []
  return blocks.slice(0, MAX_SOURCE_ITEMS).map(block => {
    const rawTitle = tag(block, 'title')
    const linkMatch = block.match(/<link[^>]+href=["']([^"']+)["']/i)
    const rawLink = tag(block, 'link') || linkMatch?.[1] || ''
    const rawDate = tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated') || tag(block, 'dc:date')
    const description = tag(block, 'description') || tag(block, 'summary') || tag(block, 'content')
    return {
      source_name: sourceName,
      source_weight: sourceWeight,
      title: decode(rawTitle),
      source_url: decode(rawLink),
      excerpt: decode(description).slice(0, 1400),
      published_at: parseDate(rawDate),
      image_url: imageFrom(block),
    }
  }).filter(item => item.title && item.source_url)
}

function relevance(item) {
  const text = `${item.title} ${item.excerpt}`.toLowerCase()
  let score = item.source_weight || 0
  for (const term of RELEVANCE_TERMS) if (text.includes(term)) score += term.includes(' ') ? 3 : 1
  if (/(nigeria|nigerian|africa|african|lagos|abuja|accra|ghana)/i.test(text)) score += 8
  const ageHours = item.published_at ? Math.max(0, (Date.now() - Date.parse(item.published_at)) / 36e5) : 999
  if (ageHours <= 6) score += 16
  else if (ageHours <= 24) score += 12
  else if (ageHours <= 48) score += 8
  else if (ageHours <= 96) score += 4
  return Math.min(100, score)
}

function category(item) {
  const text = `${item.title} ${item.excerpt}`
  for (const [name, rule] of CATEGORY_RULES) if (rule.test(text)) return name
  return 'CULTURE'
}

function fingerprint(item) {
  return `${item.title}`.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, {
      headers: {
        'User-Agent': 'FOR-THE-CULTURE-Editorial-Radar/2.0',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*'
      },
      signal: controller.signal,
      redirect: 'follow'
    })
  } finally {
    clearTimeout(timer)
  }
}

function absoluteUrl(value, baseUrl) {
  if (!value) return ''
  try { return new URL(value, baseUrl).toString() } catch { return '' }
}

function imageFromHtml(html, pageUrl) {
  const candidates = [
    html.match(/<meta[^>]+property=[\"']og:image(?::secure_url)?[\"'][^>]+content=[\"']([^\"']+)[\"']/i)?.[1],
    html.match(/<meta[^>]+content=[\"']([^\"']+)[\"'][^>]+property=[\"']og:image(?::secure_url)?[\"']/i)?.[1],
    html.match(/<meta[^>]+name=[\"']twitter:image(?::src)?[\"'][^>]+content=[\"']([^\"']+)[\"']/i)?.[1],
    html.match(/<meta[^>]+content=[\"']([^\"']+)[\"'][^>]+name=[\"']twitter:image(?::src)?[\"']/i)?.[1],
  ]
  return candidates.map(value => absoluteUrl(value, pageUrl)).find(Boolean) || ''
}

async function fetchArticleImage(pageUrl) {
  if (!pageUrl) return ''
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(pageUrl, {
      headers: { 'User-Agent': 'FOR-THE-CULTURE-Editorial-Radar/5.0', Accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
      redirect: 'follow'
    })
    if (!response.ok) return ''
    return imageFromHtml((await response.text()).slice(0, 1000000), pageUrl)
  } catch {
    return ''
  } finally {
    clearTimeout(timer)
  }
}

async function enrichImage(item) {
  const feedImage = absoluteUrl(item.image_url, item.source_url)
  if (feedImage) return feedImage
  return fetchArticleImage(item.source_url)
}

async function draftStory(item) {
  const prompt = `You are the editorial desk for FOR THE CULTURE, an African music, culture and entertainment platform by Galaxy Fire Studios.
Create an ORIGINAL editorial news story from the supplied source metadata. Do not copy phrases, sentence structures or distinctive wording from the source. Do not invent facts, quotes, dates or details that are not supported by the supplied metadata. The result should feel like a confident human FOR THE CULTURE newsroom story, not a generic AI summary.
Return strict JSON with: headline, dek, body, category.
The headline should be punchy but factual. The dek should be one sentence. The body should be 4-6 short paragraphs, roughly 300-450 words, with useful context and clear attribution to the named source where appropriate. Keep paragraphs mobile-friendly and culturally aware.
Source: ${item.source_name}
Original headline: ${item.title}
Original URL: ${item.source_url}
Source excerpt: ${item.excerpt}
Suggested category: ${category(item)}`

  let lastError
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await draftStoryWithGemini({
        apiKey: process.env.GEMINI_API_KEY,
        model: process.env.EDITORIAL_MODEL || DEFAULT_MODEL,
        prompt,
        timeoutMs: GEMINI_TIMEOUT_MS,
      })
    } catch (error) {
      lastError = error
      const message = String(error?.message || error)
      const retryable = /Gemini returned (429|500|502|503|504)|timed out|aborted|fetch failed/i.test(message)
      if (!retryable || attempt === 2) break
      await new Promise(resolve => setTimeout(resolve, 1200 * attempt))
    }
  }
  throw lastError
}

async function processCandidate(supabase, item) {
  const { data: existingUrl } = await supabase
    .from('editorial_stories')
    .select('id')
    .eq('source_url', item.source_url)
    .limit(1)
  if (existingUrl?.length) return { skipped: true, reason: 'duplicate' }

  const { data: existingTitle } = await supabase
    .from('editorial_stories')
    .select('id')
    .eq('source_title', item.title)
    .limit(1)
  if (existingTitle?.length) return { skipped: true, reason: 'duplicate' }

  const [draft, enrichedImage] = await Promise.all([draftStory(item), enrichImage(item)])
  const row = {
    source_name: item.source_name,
    source_url: item.source_url,
    source_title: item.title,
    source_excerpt: item.excerpt,
    image_url: enrichedImage || null,
    source_published_at: item.published_at,
    relevance_score: relevance(item),
    headline: draft.headline,
    dek: draft.dek,
    body: draft.body,
    category: draft.category || category(item),
    status: 'published',
    published_at: new Date().toISOString()
  }
  const { error } = await supabase.from('editorial_stories').insert(row)
  if (error) {
    if (String(error.message || '').toLowerCase().includes('duplicate')) return { skipped: true, reason: 'duplicate' }
    throw error
  }
  return { published: true, title: row.headline, source: item.source_name }
}

module.exports = async (req, res) => {
  // Vercel Cron authenticates with CRON_SECRET via Authorization: Bearer <secret>.
  // EDITORIAL_CRON_SECRET remains available for manual/editorial calls.
  const cronSecret = process.env.CRON_SECRET || ''
  const editorialSecret = process.env.EDITORIAL_CRON_SECRET || ''
  const auth = req.headers.authorization || ''
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const supplied = req.headers['x-editorial-secret'] || req.query?.secret || bearer
  const authorized = Boolean(supplied) && [cronSecret, editorialSecret].filter(Boolean).includes(supplied)
  if (!authorized) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: 'Supabase editorial connection is not configured' })
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const results = []
  const errors = []

  try {
    const fetched = await Promise.all(SOURCES.map(async source => {
      try {
        const response = await fetchWithTimeout(source.url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const xml = await response.text()
        return { source, items: parseFeed(xml, source.name, source.weight) }
      } catch (error) {
        errors.push({ source: source.name, error: error.name === 'AbortError' ? 'Source timed out' : error.message })
        return { source, items: [] }
      }
    }))

    const now = Date.now()
    const seen = new Set()
    const candidates = fetched.flatMap(({ items }) => items).filter(item => {
      const ageHours = item.published_at ? (now - Date.parse(item.published_at)) / 36e5 : 0
      if (ageHours > MAX_AGE_HOURS || ageHours < -2) return false
      const key = fingerprint(item)
      if (!key || seen.has(key)) return false
      seen.add(key)
      return relevance(item) >= 10
    }).sort((a, b) => relevance(b) - relevance(a))

    for (const item of candidates) {
      if (results.filter(x => x.published).length >= MAX_STORIES) break
      try {
        const result = await processCandidate(supabase, item)
        if (result.published) results.push(result)
      } catch (error) {
        errors.push({ source: item.source_name, title: item.title, error: error.message })
      }
    }

    return res.status(200).json({
      ok: true,
      published: results.filter(x => x.published).length,
      candidates: candidates.length,
      results,
      errors,
      checkedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('editorial-scan:', error)
    return res.status(500).json({ error: error.message, results, errors })
  }
}
