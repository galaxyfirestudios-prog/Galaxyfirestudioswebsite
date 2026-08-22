import fs from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { draftStoriesWithGemini, draftStoryWithGemini, DEFAULT_MODEL } = require('../lib/gemini-editorial.cjs')

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
  'music','artist','singer','rapper','producer','dj','album','single','ep','mixtape','afrobeats','afrobeat','alte','hip-hop','hip hop','amapiano','fuji','highlife','nigeria','nigerian','africa','african','lagos','abuja','accra','ghana','culture','fashion','film','nollywood','photography','art','creative','creator','festival','concert','showcase','event','nightlife','radio','podcast','community','dance','entertainment','visual','design','media','label','recording','streaming','streetwear','gallery','documentary','fashion week','premiere','tour','release','record label','gaming','gaming industry','creative economy'
]

const CATEGORY_RULES = [
  ['MUSIC', /(album|single|ep|singer|rapper|producer|dj|music|afrobeats|afrobeat|alte|amapiano|fuji|highlife|record label|release|tour)/i],
  ['STYLE', /(fashion|style|streetwear|designer|design|fashion week)/i],
  ['FILM', /(film|nollywood|cinema|movie|documentary|premiere|actor|actress)/i],
  ['ART', /(art|photograph|visual|gallery|creative|creator|gaming)/i],
  ['EVENTS', /(concert|festival|showcase|event|nightlife|tour)/i],
]

const MAX_SOURCE_ITEMS = Number(process.env.EDITORIAL_SOURCE_ITEMS || 18)
const MAX_STORIES = Number(process.env.EDITORIAL_MAX_STORIES_PER_SCAN || 5)
const MAX_AGE_HOURS = Number(process.env.EDITORIAL_MAX_AGE_HOURS || 96)
const FETCH_TIMEOUT_MS = Number(process.env.EDITORIAL_FETCH_TIMEOUT_MS || 6500)
const GEMINI_TIMEOUT_MS = Number(process.env.EDITORIAL_GEMINI_TIMEOUT_MS || 30000)

function decode(value = '') {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
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
    return { source_name: sourceName, source_weight: sourceWeight, title: decode(rawTitle), source_url: rawLink, excerpt: decode(description).slice(0, 1800), published_at: parseDate(rawDate), image_url: imageFrom(block) }
  }).filter(item => item.title && item.source_url)
}
async function fetchFeed(source) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(source.url, { headers: { 'User-Agent': 'FOR-THE-CULTURE-Editorial-Radar/4.0 (+https://galaxyfirestudios.com)', Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*' }, signal: controller.signal, redirect: 'follow' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { source, items: parseFeed(await response.text(), source.name, source.weight) }
  } finally { clearTimeout(timer) }
}
function relevance(item) {
  const text = `${item.title} ${item.excerpt}`.toLowerCase(); let score = item.source_weight || 0
  for (const term of RELEVANCE_TERMS) if (text.includes(term)) score += term.includes(' ') ? 3 : 1
  if (/(nigeria|nigerian|africa|african|lagos|abuja|accra|ghana)/i.test(text)) score += 8
  const ageHours = item.published_at ? Math.max(0, (Date.now() - Date.parse(item.published_at)) / 36e5) : 999
  if (ageHours <= 6) score += 16; else if (ageHours <= 24) score += 12; else if (ageHours <= 48) score += 8; else if (ageHours <= MAX_AGE_HOURS) score += 4; else score -= 30
  return Math.max(0, Math.min(100, score))
}
function category(item) {
  const text = `${item.title} ${item.excerpt}`
  for (const [name, rule] of CATEGORY_RULES) if (rule.test(text)) return name
  return 'CULTURE'
}
function normalizeTitle(title) { return title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() }
function titleTokens(title) { return new Set(normalizeTitle(title).split(/\s+/).filter(token => token.length > 2)) }
function similarity(a, b) { const A = titleTokens(a), B = titleTokens(b); if (!A.size || !B.size) return 0; let intersection = 0; for (const token of A) if (B.has(token)) intersection++; return intersection / (A.size + B.size - intersection) }

async function draftStory(item) {
  return draftStoryWithGemini({ apiKey: process.env.GEMINI_API_KEY, model: process.env.EDITORIAL_MODEL || DEFAULT_MODEL, prompt: `You are the editorial desk for FOR THE CULTURE, an African music, culture and entertainment platform by Galaxy Fire Studios. Create an ORIGINAL short news brief from the supplied source metadata. Do not copy phrases or sentence structures. Do not invent facts. Return only JSON with headline, dek, body and category. The body must be 2-4 short paragraphs suitable for mobile reading and must clearly attribute the reporting to the named source where appropriate. Category must be MUSIC, CULTURE, STYLE, FILM, ART or EVENTS. Source: ${item.source_name}\nOriginal headline: ${item.title}\nOriginal URL: ${item.source_url}\nSource excerpt: ${item.excerpt}\nSuggested category: ${category(item)}`, timeoutMs: GEMINI_TIMEOUT_MS })
}

async function draftBatch(items) {
  return draftStoriesWithGemini({
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.EDITORIAL_MODEL || DEFAULT_MODEL,
    items: items.map(item => ({ ...item, category: category(item) })),
    timeoutMs: GEMINI_TIMEOUT_MS,
  })
}

async function main() {
  const fetched = await Promise.allSettled(SOURCES.map(fetchFeed))
  const sourceReport = fetched.map((result, index) => ({ source: SOURCES[index].name, ok: result.status === 'fulfilled', items: result.status === 'fulfilled' ? result.value.items.length : 0, error: result.status === 'rejected' ? String(result.reason?.message || result.reason) : null }))
  const candidates = fetched.filter(r => r.status === 'fulfilled').flatMap(r => r.value.items).map(item => ({ ...item, relevance_score: relevance(item) })).filter(item => item.relevance_score >= 12).sort((a,b) => b.relevance_score - a.relevance_score)
  const uniqueCandidates = []
  for (const item of candidates) { if (uniqueCandidates.some(existing => existing.source_url === item.source_url || similarity(existing.title, item.title) >= 0.72)) continue; uniqueCandidates.push(item) }

  let prior = []
  try { prior = JSON.parse(await fs.readFile('public/editorial-feed.json', 'utf8')).stories || [] } catch {}
  const priorUrls = new Set(prior.map(s => s.source_url).filter(Boolean))
  const priorTitles = new Set(prior.map(s => s.source_title || s.headline).filter(Boolean).map(normalizeTitle))
  const newCandidates = uniqueCandidates.filter(item => !priorUrls.has(item.source_url) && !priorTitles.has(normalizeTitle(item.title)))

  const newStories = []
  const failures = []
  const selectedCandidates = newCandidates.slice(0, Math.max(MAX_STORIES, 5))
  if (selectedCandidates.length) {
    try {
      const drafts = await draftBatch(selectedCandidates)
      const byIndex = new Map(drafts.map(draft => [Number(draft.source_index), draft]))
      selectedCandidates.forEach((item, index) => {
        const draft = byIndex.get(index)
        if (!draft?.headline || !draft?.body) {
          failures.push({ title: item.title, error: 'Gemini did not return a complete story for this source item.' })
          return
        }
        newStories.push({ id: `ftc-${Date.now()}-${newStories.length}`, source_name: item.source_name, source_url: item.source_url, source_title: item.title, source_excerpt: item.excerpt, image_url: item.image_url || null, source_published_at: item.published_at, relevance_score: item.relevance_score, headline: draft.headline, dek: draft.dek, body: draft.body, category: draft.category || category(item), status: 'published', published_at: new Date().toISOString() })
      })
    } catch (batchError) {
      failures.push({ title: 'BATCH', error: String(batchError?.message || batchError) })
      // If a batch request is temporarily rejected, try up to MAX_STORIES individual stories.
      for (const item of selectedCandidates.slice(0, MAX_STORIES)) {
        if (newStories.length >= MAX_STORIES) break
        try {
          const draft = await draftStory(item)
          newStories.push({ id: `ftc-${Date.now()}-${newStories.length}`, source_name: item.source_name, source_url: item.source_url, source_title: item.title, source_excerpt: item.excerpt, image_url: item.image_url || null, source_published_at: item.published_at, relevance_score: item.relevance_score, headline: draft.headline, dek: draft.dek, body: draft.body, category: draft.category || category(item), status: 'published', published_at: new Date().toISOString() })
        } catch (error) { failures.push({ title: item.title, error: String(error?.message || error) }) }
      }
    }
  }

  const stories = [...newStories, ...prior].sort((a,b) => new Date(b.published_at || 0) - new Date(a.published_at || 0)).slice(0, 60)
  await fs.mkdir('public', { recursive: true })
  await fs.writeFile('public/editorial-feed.json', JSON.stringify({ stories, count: stories.length, source: 'FOR THE CULTURE Editorial Engine', generated_at: new Date().toISOString() }, null, 2) + '\n')
  await fs.writeFile('editorial-run-status.json', JSON.stringify({ generated_at: new Date().toISOString(), published_this_run: newStories.length, sources: sourceReport, candidates: candidates.length, new_candidates: newCandidates.length, failures, gemini_configured: Boolean(process.env.GEMINI_API_KEY), supabase_optional: true }, null, 2) + '\n')

  console.log(JSON.stringify({ published: newStories.length, feedStories: stories.length, candidates: candidates.length, newCandidates: newCandidates.length, sources: sourceReport, failures }, null, 2))
  if (!process.env.GEMINI_API_KEY) process.exitCode = 2
}
main().catch(error => { console.error(error); process.exit(1) })
