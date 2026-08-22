import fs from 'node:fs/promises'

const endpoint = process.env.RADIO_NOW_PLAYING_URL
const output = 'public/radio-now-playing.json'

function pick(data, keys) {
  for (const key of keys) {
    const parts = key.split('.')
    let value = data
    for (const part of parts) value = value?.[part]
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim()
  }
  return ''
}

async function main() {
  if (!endpoint) {
    console.log('RADIO_NOW_PLAYING_URL is not configured; keeping the existing radio metadata file.')
    return
  }
  const response = await fetch(endpoint, { headers: { Accept: 'application/json, text/plain, */*' }, signal: AbortSignal.timeout(8000) })
  if (!response.ok) throw new Error(`Radio metadata returned HTTP ${response.status}`)
  const text = await response.text()
  let data = {}
  try { data = JSON.parse(text) } catch { data = { raw: text } }

  // Supports common AzuraCast-style, Icecast/Shoutcast-style and simple custom JSON payloads.
  const now = data.now_playing || data.nowPlaying || data.current || data
  const song = now.song || now.track || now.current_song || now
  const artist = pick(song, ['artist', 'artist_name', 'song.artist']) || pick(now, ['artist'])
  const title = pick(song, ['title', 'name', 'song_title']) || pick(now, ['title'])
  const artwork = pick(song, ['art', 'artwork', 'artwork_url', 'cover', 'cover_url', 'image', 'image_url']) || pick(now, ['art', 'artwork', 'artwork_url'])
  const stream = pick(data, ['stream_url', 'stream', 'url']) || process.env.RADIO_STREAM_URL || ''
  const show = pick(now, ['show.name', 'show_name', 'program.name']) || process.env.RADIO_SHOW_NAME || 'FOR THE CULTURE RADIO'
  const dj = pick(now, ['dj', 'dj.name', 'host', 'presenter'])

  const payload = {
    live: Boolean(title || artist),
    artist: artist || 'FOR THE CULTURE RADIO',
    title: title || 'LIVE RADIO',
    artwork_url: artwork || '',
    stream_url: stream,
    show,
    dj,
    updated_at: new Date().toISOString(),
  }
  await fs.writeFile(output, JSON.stringify(payload, null, 2) + '\n')
  console.log(JSON.stringify({ live: payload.live, artist: payload.artist, title: payload.title, hasArtwork: Boolean(payload.artwork_url), hasStream: Boolean(payload.stream_url) }, null, 2))
}

main().catch(error => { console.error(error); process.exit(1) })
