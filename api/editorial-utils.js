const crypto = require('crypto');

function stripHtml(value = '') {
  return String(value)
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeXml(value = '') {
  return stripHtml(value)
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function getTag(block, tag) {
  const cdata = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]]>\\s*<\\/${tag}>`, 'i').exec(block);
  if (cdata) return cdata[1];
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i').exec(block);
  return plain ? plain[1] : '';
}

function parseFeed(xml, source) {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return blocks.slice(0, 20).map((block) => {
    const title = decodeXml(getTag(block, 'title'));
    const description = decodeXml(getTag(block, 'description') || getTag(block, 'summary') || getTag(block, 'content'));
    const linkTag = getTag(block, 'link');
    const linkAttr = /<link[^>]+href=["']([^"']+)["']/i.exec(block);
    const link = decodeXml(linkAttr ? linkAttr[1] : linkTag);
    const guid = decodeXml(getTag(block, 'guid') || getTag(block, 'id')) || link;
    const pubDate = decodeXml(getTag(block, 'pubDate') || getTag(block, 'published') || getTag(block, 'updated'));
    const imageMatch = /<media:content[^>]+url=["']([^"']+)["']/i.exec(block) || /<enclosure[^>]+url=["']([^"']+)["']/i.exec(block);
    return {
      source_name: source.name,
      source_url: source.site_url,
      source_category: source.category,
      title,
      excerpt: description.slice(0, 1200),
      url: link || source.site_url,
      guid,
      published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      image_url: imageMatch ? imageMatch[1] : null,
    };
  }).filter((item) => item.title && item.url);
}

function relevanceScore(item, terms, blocked) {
  const text = `${item.title} ${item.excerpt}`.toLowerCase();
  if (blocked.some((term) => text.includes(term))) return 0;
  let score = 0;
  for (const term of terms) if (text.includes(term)) score += term.length > 7 ? 3 : 2;
  if (/\b(nigeria|nigerian|ghana|ghanaian|africa|african|lagos|abuja)\b/i.test(text)) score += 4;
  if (/\b(music|artist|album|single|culture|fashion|film|art|creative|festival|concert)\b/i.test(text)) score += 4;
  return Math.min(100, score * 4);
}

function slugify(value) {
  return String(value).toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 90);
}

function fingerprint(item) {
  return crypto.createHash('sha256').update(`${item.url}|${item.title}`).digest('hex');
}

function extractOutputText(data) {
  if (typeof data.output_text === 'string') return data.output_text;
  const parts = [];
  for (const output of data.output || []) {
    for (const content of output.content || []) if (content.type === 'output_text' && content.text) parts.push(content.text);
  }
  return parts.join('\n').trim();
}

module.exports = { parseFeed, relevanceScore, slugify, fingerprint, extractOutputText, stripHtml };
