const DEFAULT_MODEL = 'gemini-3.7-flash'
const DEFAULT_TIMEOUT_MS = 15000

const STORY_SCHEMA = {
  type: 'object',
  properties: {
    headline: { type: 'string' },
    dek: { type: 'string' },
    body: { type: 'string' },
    category: { type: 'string', enum: ['MUSIC', 'CULTURE', 'STYLE', 'FILM', 'ART', 'EVENTS'] },
  },
  required: ['headline', 'dek', 'body', 'category'],
}

function extractText(data) {
  return data?.candidates?.flatMap(candidate => candidate?.content?.parts || [])
    .map(part => part?.text || '')
    .join('')
    .trim() || ''
}

async function draftStoryWithGemini({ apiKey, model = DEFAULT_MODEL, prompt, timeoutMs = DEFAULT_TIMEOUT_MS }) {
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured.')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 900,
          responseMimeType: 'application/json',
          responseSchema: STORY_SCHEMA,
        },
      }),
      signal: controller.signal,
    })

    const responseText = await response.text()
    if (!response.ok) throw new Error(`Gemini returned ${response.status}: ${responseText}`)

    const data = JSON.parse(responseText)
    const text = extractText(data)
    if (!text) throw new Error('Gemini returned no text output.')

    try {
      return JSON.parse(text)
    } catch {
      throw new Error(`Gemini returned invalid JSON: ${text.slice(0, 500)}`)
    }
  } finally {
    clearTimeout(timer)
  }
}

module.exports = {
  DEFAULT_MODEL,
  STORY_SCHEMA,
  draftStoryWithGemini,
}
