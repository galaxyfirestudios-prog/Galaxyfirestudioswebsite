const { createClient } = require('@supabase/supabase-js')

const SOURCES = [
  { name: 'The NATIVE', url: process.env.EDITORIAL_NATIVE_FEED || 'https://thenativemag.com/feed/' },
  { name: 'PUNCH Entertainment', url: 'https://rss.punchng.com/v1/category/entertainment' },
  { name: 'PUNCH Interviews', url: 'https://rss.punchng.com/v1/category/interview' },
  { name: 'PUNCH Special Features', url: 'https://rss.punchng.com/v1/category/special_feature' },
  { name: 'PUNCH Videos', url: 'https://rss.punchng.com/v1/category/videos' },
  { name: 'The Guardian Nigeria', url: process.env.EDITORIAL_GUARDIAN_FEED || 'https://guardian.ng/feed/' },
]

const RELEVANCE_TERMS = [
  'music','artist','singer','rapper','producer','dj','album','single','ep','mixtape',
  'afrobeats','afrobeat','alte','hip-hop','hip hop','amapiano','fuji','highlife',
  'nigeria','nigerian','africa','african','lagos','abuja','accra','ghana','culture',
  'fashion','film','nollywood','photography','art','creative','creator','festival',
  'concert','showcase','event','nightlife','radio','podcast','community','dance',
  'entertainment','visual','design','media','label','recording','streaming'
]

function decode(value='') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim()
}

function tag(block, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i')
  return block.match(re)?.[1] || ''
}

function imageFrom(block) {
  const media = block.match(/<media:content[^>]+url=["']([^"']+)["']/i)
    || block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i)
    || block.match(/<enclosure[^>]+url=["']([^"']+)["']/i)
    || block.match(/<img[^>]+src=["']([^"']+)["']/i)
  return media?.[1] || ''
}

function parseFeed(xml, sourceName) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || []
  return blocks.slice(0, 12).map(block => {
    const rawTitle = tag(block, 'title')
    const linkMatch = block.match(/<link[^>]+href=["']([^"']+)["']/i)
    const rawLink = tag(block, 'link') || linkMatch?.[1] || ''
    const rawDate = tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated')
    const description = tag(block, 'description') || tag(block, 'summary') || tag(block, 'content')
    return {
      source_name: sourceName,
      title: decode(rawTitle),
      source_url: decode(rawLink),
      excerpt: decode(description).slice(0, 1000),
      published_at: rawDate ? new Date(rawDate).toISOString() : new Date().toISOString(),
      image_url: imageFrom(block),
    }
  }).filter(item => item.title && item.source_url)
}

function relevance(item) {
  const text = `${item.title} ${item.excerpt}`.toLowerCase()
  let score = 0
  for (const term of RELEVANCE_TERMS) if (text.includes(term)) score += term.includes(' ') ? 2 : 1
  if (/(nigeria|nigerian|africa|african|lagos|abuja|accra|ghana)/i.test(text)) score += 4
  return Math.min(100, score * 7)
}

function category(item) {
  const text = `${item.title} ${item.excerpt}`.toLowerCase()
  if (/(album|single|ep|singer|rapper|producer|dj|music|afrobeats|afrobeat|alte|amapiano)/.test(text)) return 'MUSIC'
  if (/(fashion|style|design)/.test(text)) return 'STYLE'
  if (/(film|nollywood|cinema|movie)/.test(text)) return 'FILM'
  if (/(art|photograph|visual|creative)/.test(text)) return 'ART'
  if (/(concert|festival|showcase|event|nightlife)/.test(text)) return 'EVENTS'
  return 'CULTURE'
}

async function draftStory(item) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured')

  const prompt = `You are the editorial desk for FOR THE CULTURE, an African music, culture and entertainment platform by Galaxy Fire Studios.
Create a concise ORIGINAL news brief from the supplied source metadata. Do not copy phrases or reproduce the source article. Do not invent facts.
Return strict JSON with: headline, dek, body, category.
The body should be 2-4 short paragraphs and clearly attribute factual reporting to the named source where appropriate.
Source: ${item.source_name}
Original headline: ${item.title}
Original URL: ${item.source_url}
Source excerpt: ${item.excerpt}
Suggested category: ${category(item)}`

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.EDITORIAL_MODEL || 'gpt-5-mini',
      input: prompt,
      text: { format: { type: 'json_object' } },
      max_output_tokens: 900
    })
  })
  if (!response.ok) throw new Error(`OpenAI returned ${response.status}: ${await response.text()}`)
  const data = await response.json()
  const text = data.output_text || data.output?.flatMap(x => x.content || []).map(x => x.text || '').join('') || ''
  return JSON.parse(text)
}

module.exports = async (req, res) => {
  const expected = process.env.EDITORIAL_CRON_SECRET || process.env.CRON_SECRET
  const auth = req.headers.authorization || ''
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const supplied = req.headers['x-editorial-secret'] || req.query?.secret || bearer
  if (!expected || supplied !== expected) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const results = []

  try {
    for (const source of SOURCES) {
      try {
        const response = await fetch(source.url, { headers: { 'User-Agent': 'FOR-THE-CULTURE-Editorial-Radar/1.0' } })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const xml = await response.text()
        const items = parseFeed(xml, source.name)
        for (const item of items) {
          const score = relevance(item)
          if (score < 28) continue

          const { data: existing } = await supabase.from('editorial_stories').select('id').eq('source_url', item.source_url).maybeSingle()
          if (existing) continue

          const draft = await draftStory(item)
          const row = {
            source_name: item.source_name,
            source_url: item.source_url,
            source_title: item.title,
            source_excerpt: item.excerpt,
            image_url: item.image_url || null,
            source_published_at: item.published_at,
            relevance_score: score,
            headline: draft.headline,
            dek: draft.dek,
            body: draft.body,
            category: draft.category || category(item),
            status: 'published',
            published_at: new Date().toISOString()
          }

          const { error } = await supabase.from('editorial_stories').insert(row)
          if (error) throw error
          results.push({ source: source.name, title: row.headline })
          if (results.length >= 5) break
        }
      } catch (sourceError) {
        results.push({ source: source.name, error: sourceError.message })
      }
      if (results.filter(x => !x.error).length >= 5) break
    }

    return res.status(200).json({ ok: true, published: results.filter(x => !x.error).length, results })
  } catch (error) {
    console.error('editorial-scan:', error)
    return res.status(500).json({ error: error.message })
  }
}
