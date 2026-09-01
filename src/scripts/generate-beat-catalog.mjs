import fs from 'node:fs';
import path from 'node:path';
import { metadata } from './beat-catalog-metadata.mjs';

const root = process.cwd();
const beatsDir = path.join(root, 'public', 'beats');
const output = path.join(beatsDir, 'beat-catalog.json');
const files = fs.readdirSync(beatsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.mp3'))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

if (!files.length) throw new Error('No MP3 beats found in public/beats.');

const cleanTitle = (name) => name.replace(/\.mp3$/i, '').replace(/^beat[_-]?\d*[_-]?/i, '').replace(/[_-]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()).trim() || 'Untitled Beat';
const parseBpm = (name) => Number((name.match(/(?:^|[_-])([6-9]\d|1\d\d|2[0-4]\d)(?:$|[_-])/i) || [])[1]) || 100;
const parseMode = (name) => /(?:^|[_-])(major|maj)(?:[_-]|$)/i.test(name) ? 'Major' : /(?:^|[_-])(minor|min)(?:[_-]|$)/i.test(name) ? 'Minor' : 'Minor';
const parseKey = (name, mode) => {
  const match = name.match(/(?:^|[_-])([a-g](?:sharp|flat|s|b)?)(?:[_-])(major|minor)(?:[_-]|$)/i);
  if (!match) return mode;
  const rootName = match[1].replace(/sharp/i, '♯').replace(/flat/i, '♭').replace(/s$/i, '♯').replace(/b$/i, '♭');
  return `${rootName.toUpperCase()} ${mode}`;
};

const usedIds = new Set();
const slugify = (value) => value.toLowerCase().replace(/\.mp3$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 72) || 'untitled';
const beats = files.map((file) => {
  const known = metadata[file];
  const mode = known?.mode || parseMode(file);
  const stem = path.basename(file, '.mp3');
  const baseId = known?.id || `beat-${slugify(file)}`;
  let id = baseId;
  let n = 2;
  while (usedIds.has(id)) id = `${baseId}-${n++}`;
  usedIds.add(id);
  const bpm = known?.bpm || parseBpm(stem);
  return {
    id,
    title: known?.title || cleanTitle(file),
    bpm,
    key: known?.key || parseKey(stem, mode),
    mode,
    mood: known?.mood || 'Original / Unreleased',
    genre: known?.genre || 'Galaxy Fire Original',
    preview: `/beats/${encodeURIComponent(file).replace(/%2F/g, '/')}`,
  };
});

for (const file of files) {
  const stat = fs.statSync(path.join(beatsDir, file));
  if (stat.size < 10_000) throw new Error(`Beat file is suspiciously small: ${file}`);
  if (file.length > 120) throw new Error(`Beat filename is too long; rename before deployment: ${file}`);
}

fs.writeFileSync(output, JSON.stringify({ generatedAt: new Date().toISOString(), beats }, null, 2) + '\n');
console.log(`Generated ${beats.length} beat catalogue entries.`);
