import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs/promises'

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
const MAX_STORIES = Number(process.env.EDITORIAL_MAX_STORIES_PER_SCAN || 3)
const MAX_AGE_HOURS = Number(process.env.EDITORIAL_MAX_AGE_HOURS || 96)
const FETCH_TIMEOUT_MS = Number(process.env.EDITORIAL_FETCH_TIMEOUT_MS || 6500)
const OPENAI_TIMEOUT_MS = Number(process.env.EDITORIAL_OPENAI_TIMEOUT_MS || 12000)

function decode(value = '') {
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
    const rawLink = decode(tag(block, 'link') || linkMatch?.[1] || '')
    const rawDate = tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated') || tag(block, 'dc:date')
    const description = tag(block, 'description') || tag(block, 'summary') || tag(block, 'content:encoded') || tag(block, 'content')
    return {
      source_name: sourceName,
      source_weight: sourceWeight,
      title: decode(rawTitle),
      source_url: rawLink,
      excerpt: decode(description).slice(0, 1800),
      published_at: parseDate(rawDate),
      image_url: imageFrom(block),
    }
  }).filter(item => item.title && item.source_url)
}

async function fetchFeed(source) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'FOR-THE-CULTURE-Editorial-Radar/3.0 (+https://galaxyfirestudios.com)',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
      },
      signal: controller.signal,
      redirect: 'follow',
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const xml = await response.text()
    return { source, items: parseFeed(xml, source.name, source.weight) }
  } finally {
    clearTimeout(timer)
  }
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
  else if (ageHours <= MAX_AGE_HOURS) score += 4
  else score -= 30
  return Math.max(0, Math.min(100, score))
}

function category(item) {
  const text = `${item.title} ${item.excerpt}`
  for (const [name, rule] of CATEGORY_RULES) if (rule.test(text)) return name
  return 'CULTURE'
}

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function titleTokens(title) {
  return new Set(normalizeTitle(title).split(/\s+/).filter(token => token.length > 2))
}

function similarity(a, b) {
  const A = titleTokens(a), B = titleTokens(b)
  if (!A.size || !B.size) return 0
  let intersection = 0
  for (const token of A) if (B.has(token)) intersection++
  return intersection / (A.size + B.size - intersection)
}

async function draftStory(item) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS)
  try {
    const prompt = `You are the editorial desk for FOR THE CULTURE, an African music, culture and entertainment platform by Galaxy Fire Studios.

Create an ORIGINAL short news brief from the supplied source metadata. Do not copy phrases, sentence structures, or reproduce the source article. Do not invent facts. If the supplied excerpt is too thin to support a claim, keep the wording cautious.

Return only valid JSON with these fields:
headline: string
dek: string
body: string
category: one of MUSIC, CULTURE, STYLE, FILM, ART, EVENTS

The headline should be punchy but factual. The dek is one sentence. The body is 2-4 short paragraphs suitable for mobile reading. Clearly attribute the reporting to the named source where appropriate. Do not add facts that are not supported by the supplied metadata.

Source: ${item.source_name}
Original headline: ${item.title}
Original URL: ${item.source_url}
Source excerpt: ${item.excerpt}
Suggested category: ${category(item)}`

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.EDITORIAL_MODEL || 'gpt-5-mini',
        input: prompt,
        text: {
          format: {
            type: 'json_schema',
            name: 'for_the_culture_editorial_story',
            strict: true,
            schema: {
              type: 'object',
              additionalProperties: false,
              properties: {
                headline: { type: 'string' },
                dek: { type: 'string' },
                body: { type: 'string' },
                category: { type: 'string', enum: ['MUSIC','CULTURE','STYLE','FILM','ART','EVENTS'] },
              },
              required: ['headline','dek','body','category'],
            },
          },
        },
        max_output_tokens: 900,
      }),
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`OpenAI returned ${response.status}: ${await response.text()}`)
    const data = await response.json()
    const text = data.output_text || ''
    if (!text) throw new Error('OpenAI returned no output_text')
    return JSON.parse(text)
  } finally {
    clearTimeout(timer)
  }
}

async function processCandidate(supabase, item) {
  const { data: existingUrl } = await supabase
    .from('editorial_stories')
    .select('id')
    .eq('source_url', item.source_url)
    .limit(1)

  if (existingUrl?.length) return { skipped: true, reason: 'duplicate-url' }

  const { data: existingTitle } = await supabase
    .from('editorial_stories')
    .select('id')
    .eq('source_title', item.title)
    .limit(1)

  if (existingTitle?.length) return { skipped: true, reason: 'duplicate-title' }

  const draft = await draftStory(item)
  const row = {
    source_name: item.source_name,
    source_url: item.source_url,
    source_title: item.title,
    source_excerpt: item.excerpt,
    image_url: item.image_url || null,
    source_published_at: item.published_at,
    relevance_score: relevance(item),
    headline: draft.headline,
    dek: draft.dek,
    body: draft.body,
    category: draft.category || category(item),
    status: 'published',
    published_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('editorial_stories').insert(row)
  if (error) throw error
  return { published: true, story: row }
}

async function main() {
  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'OPENAI_API_KEY']
    .filter(key => !process.env[key])
  if (missing.length) throw new Error(`Missing GitHub Actions secrets: ${missing.join(', ')}`)

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const fetched = await Promise.allSettled(SOURCES.map(fetchFeed))
  const sourceReport = fetched.map((result, index) => ({
    source: SOURCES[index].name,
    ok: result.status === 'fulfilled',
    items: result.status === 'fulfilled' ? result.value.items.length : 0,
    error: result.status === 'rejected' ? String(result.reason?.message || result.reason) : null,
  }))

  const candidates = fetched
    .filter(result => result.status === 'fulfilled')
    .flatMap(result => result.value.items)
    .map(item => ({ ...item, relevance_score: relevance(item) }))
    .filter(item => item.relevance_score >= 12)
    .sort((a, b) => b.relevance_score - a.relevance_score)

  const uniqueCandidates = []
  for (const item of candidates) {
    if (uniqueCandidates.some(existing => similarity(existing.title, item.title) >= 0.72)) continue
    uniqueCandidates.push(item)
  }

  let published = 0
  const failures = []
  for (const item of uniqueCandidates.slice(0, MAX_STORIES * 2)) {
    if (published >= MAX_STORIES) break
    try {
      const result = await processCandidate(supabase, item)
      if (result.published) published++
    } catch (error) {
      failures.push({ title: item.title, error: String(error?.message || error) })
    }
  }

  const { data: stories, error: feedError } = await supabase
    .from('editorial_stories')
    .select('id,headline,dek,body,category,source_name,source_url,image_url,published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(12)

  if (feedError) throw feedError

  await fs.mkdir('public', { recursive: true })
  await fs.writeFile(
    'public/editorial-feed.json',
    JSON.stringify({
      stories: stories || [],
      count: stories?.length || 0,
      source: 'FOR THE CULTURE Editorial Engine',
    }, null, 2) + '\n'
  )

  await fs.writeFile(
    'editorial-run-status.json',
    JSON.stringify({
      generated_at: new Date().toISOString(),
      published_this_run: published,
      sources: sourceReport,
      candidates: candidates.length,
      failures,
    }, null, 2) + '\n'
  )

  console.log(JSON.stringify({
    published,
    candidates: candidates.length,
    sources: sourceReport,
    failures,
    feedStories: stories?.length || 0,
  }, null, 2))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
