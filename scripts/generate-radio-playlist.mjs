#!/usr/bin/env node
/**
 * FOR THE CULTURE RADIO playlist builder
 *
 * Scans public/radio/*.mp3 and regenerates public/radio-playlist.json.
 * Existing playlist metadata is preserved for known files; new files use ID3
 * metadata where available and fall back to a safe filename parser.
 *
 * No audio is transcoded during Vercel builds. This keeps deployments fast and
 * avoids silently degrading music. The script validates the library and fails
 * clearly when an unsafe/invalid track is found.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const RADIO_DIR = path.join(ROOT, 'public', 'radio')
const ART_DIR = path.join(RADIO_DIR, 'art')
const PLAYLIST_FILE = path.join(ROOT, 'public', 'radio-playlist.json')
const STATION_ART = 'radio/art/station-art.webp'
const MAX_FILENAME_LENGTH = 180

function clean(value = '') {
  return String(value)
    .replace(/\0/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function publicPath(filePath) {
  return path.relative(path.join(ROOT, 'public'), filePath).split(path.sep).join('/')
}

function decodeText(buffer) {
  if (!buffer?.length) return ''
  const encoding = buffer[0]
  const body = buffer.subarray(1)
  try {
    if (encoding === 0) return clean(body.toString('latin1').replace(/\0/g, ''))
    if (encoding === 1) return clean(body.toString('utf16le').replace(/\0/g, ''))
    if (encoding === 2) return clean(body.toString('utf16le').replace(/\0/g, ''))
    if (encoding === 3) return clean(body.toString('utf8').replace(/\0/g, ''))
  } catch {}
  return ''
}

function syncSafeInt(b) {
  return ((b[0] & 0x7f) << 21) | ((b[1] & 0x7f) << 14) | ((b[2] & 0x7f) << 7) | (b[3] & 0x7f)
}

function parseId3(filePath) {
  const result = {}
  const fd = fs.openSync(filePath, 'r')
  try {
    const header = Buffer.alloc(10)
    fs.readSync(fd, header, 0, 10, 0)
    if (header.toString('ascii', 0, 3) !== 'ID3') return result

    const version = header[3]
    const tagSize = syncSafeInt(header.subarray(6, 10))
    const maxRead = Math.min(tagSize, 512 * 1024)
    const tag = Buffer.alloc(maxRead)
    fs.readSync(fd, tag, 0, maxRead, 10)

    let offset = 0
    while (offset + 10 <= tag.length) {
      const frameId = tag.toString('ascii', offset, offset + 4)
      if (!/^[A-Z0-9]{4}$/.test(frameId) || frameId === '\0\0\0\0') break

      let frameSize
      if (version === 4) frameSize = syncSafeInt(tag.subarray(offset + 4, offset + 8))
      else frameSize = tag.readUInt32BE(offset + 4)

      if (!frameSize || offset + 10 + frameSize > tag.length) break
      const frame = tag.subarray(offset + 10, offset + 10 + frameSize)

      const map = {
        TIT2: 'title',
        TT2: 'title',
        TPE1: 'artist',
        TP1: 'artist',
        TALB: 'album',
        TAL: 'album',
        TCON: 'genre',
        TDRC: 'year',
        TYER: 'year',
      }
      const key = map[frameId]
      if (key && !result[key]) {
        const value = decodeText(frame)
        if (value) result[key] = value
      }
      offset += 10 + frameSize
    }
  } catch {
    return {}
  } finally {
    fs.closeSync(fd)
  }
  return result
}

function titleCase(value) {
  return clean(value)
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
}

function filenameMetadata(fileName) {
  const stem = path.basename(fileName, path.extname(fileName))
  const normalized = titleCase(stem)
  const parts = normalized.split(/\s+-\s+|-/).map(clean).filter(Boolean)

  if (parts.length >= 2) {
    return { artist: parts[0], title: parts.slice(1).join(' - '), metadataConfidence: 'low' }
  }
  return { artist: 'FOR THE CULTURE RADIO', title: normalized, metadataConfidence: 'low' }
}

function findArtwork(stem) {
  if (!fs.existsSync(ART_DIR)) return STATION_ART
  const files = fs.readdirSync(ART_DIR)
  const normalizedStem = stem.toLowerCase()
  const match = files.find(file => {
    const ext = path.extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return false
    return path.basename(file, ext).toLowerCase() === normalizedStem
  })
  return match ? publicPath(path.join(ART_DIR, match)) : STATION_ART
}

function sourceKey(src) {
  return clean(src).toLowerCase().replace(/\\/g, '/')
}

if (!fs.existsSync(RADIO_DIR)) {
  throw new Error('Radio directory not found: public/radio')
}

const existing = fs.existsSync(PLAYLIST_FILE)
  ? JSON.parse(fs.readFileSync(PLAYLIST_FILE, 'utf8'))
  : { stationName: 'FOR THE CULTURE RADIO', host: 'DJ NEBULAE', mode: 'browser-playlist', description: '', rotation: 'FOR THE CULTURE ROTATION', tracks: [] }

const existingBySource = new Map(
  (Array.isArray(existing.tracks) ? existing.tracks : [])
    .filter(track => track?.src)
    .map(track => [sourceKey(track.src), track])
)

const files = fs.readdirSync(RADIO_DIR)
  .filter(file => path.extname(file).toLowerCase() === '.mp3')
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

if (!files.length) throw new Error('No MP3 files found in public/radio')

const errors = []
const currentKeys = new Set()
const newTracks = []

for (const file of files) {
  if (file.length > MAX_FILENAME_LENGTH) {
    errors.push(`${file}: filename is ${file.length} characters; maximum is ${MAX_FILENAME_LENGTH}`)
    continue
  }

  const fullPath = path.join(RADIO_DIR, file)
  const stat = fs.statSync(fullPath)
  if (stat.size < 1024) {
    errors.push(`${file}: file is only ${stat.size} bytes and is probably not a valid MP3`)
    continue
  }

  const src = publicPath(fullPath)
  const key = sourceKey(src)
  if (currentKeys.has(key)) continue
  currentKeys.add(key)

  const old = existingBySource.get(key)
  if (old) {
    newTracks.push({
      ...old,
      src,
      poster: old.poster && fs.existsSync(path.join(ROOT, 'public', old.poster)) ? old.poster : findArtwork(path.basename(file, path.extname(file))),
    })
    continue
  }

  const tags = parseId3(fullPath)
  const fallback = filenameMetadata(file)
  const artist = clean(tags.artist) || fallback.artist
  const title = clean(tags.title) || fallback.title
  const album = clean(tags.album) || null
  const genre = clean(tags.genre) || null
  const year = tags.year && /^\d{4}/.test(tags.year) ? Number(tags.year.slice(0, 4)) : null
  const metadataConfidence = tags.artist || tags.title ? 'high' : fallback.metadataConfidence

  newTracks.push({
    artist,
    title,
    album,
    genre,
    year,
    show: 'FOR THE CULTURE ROTATION',
    host: 'DJ NEBULAE',
    src,
    poster: findArtwork(path.basename(file, path.extname(file))),
    metadataConfidence,
    category: 'FOR THE CULTURE ROTATION',
  })
}

if (errors.length) {
  console.error('\nRADIO LIBRARY VALIDATION FAILED:\n- ' + errors.join('\n- ') + '\n')
  process.exit(1)
}

const oldOrder = new Set(
  (Array.isArray(existing.tracks) ? existing.tracks : []).map(track => sourceKey(track?.src || ''))
)

const appended = newTracks
  .filter(track => !oldOrder.has(sourceKey(track.src)))
  .sort((a, b) => `${a.artist} ${a.title}`.localeCompare(`${b.artist} ${b.title}`, undefined, { sensitivity: 'base' }))

const preserved = newTracks.filter(track => oldOrder.has(sourceKey(track.src)))
const tracks = [...preserved, ...appended]

const playlist = {
  stationName: existing.stationName || 'FOR THE CULTURE RADIO',
  host: existing.host || 'DJ NEBULAE',
  mode: 'browser-playlist',
  description: existing.description || 'FOR THE CULTURE RADIO rotation',
  rotation: existing.rotation || 'FOR THE CULTURE ROTATION',
  tracks,
}

fs.writeFileSync(PLAYLIST_FILE, `${JSON.stringify(playlist, null, 2)}\n`)
console.log(`FOR THE CULTURE RADIO playlist generated: ${tracks.length} tracks (${appended.length} new, ${Math.max(0, (existing.tracks || []).length - preserved.length)} removed).`)
