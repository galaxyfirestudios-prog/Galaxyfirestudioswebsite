export const EDITORIAL_SOURCES = [
  { key: 'the-native', name: 'The NATIVE', feedUrl: 'https://thenativemag.com/feed/', siteUrl: 'https://thenativemag.com/', enabled: true },
  { key: 'pulse-nigeria', name: 'Pulse Nigeria', feedUrl: 'https://www.pulse.ng/rss', siteUrl: 'https://www.pulse.ng/', enabled: true },
  { key: 'punch-entertainment', name: 'PUNCH Entertainment', feedUrl: 'https://punchng.com/topics/entertainment/feed/', siteUrl: 'https://punchng.com/', enabled: true },
  { key: 'african-art-times', name: 'African Art Times', feedUrl: 'https://africanarttimes.com/feed/', siteUrl: 'https://africanarttimes.com/', enabled: true },
  { key: 'ghana-news-agency', name: 'Ghana News Agency', feedUrl: 'https://gna.org.gh/category/entertainment/feed/', siteUrl: 'https://gna.org.gh/', enabled: true },
];

export const RELEVANCE_TERMS = [
  'africa', 'african', 'nigeria', 'nigerian', 'abuja', 'lagos', 'ghana', 'accra',
  'music', 'artist', 'album', 'single', 'song', 'producer', 'dj', 'hip-hop', 'afrobeats',
  'amapiano', 'r&b', 'culture', 'fashion', 'film', 'art', 'photography', 'creative',
  'entertainment', 'festival', 'concert', 'event', 'nightlife', 'radio', 'podcast',
  'community', 'design', 'dance', 'theatre', 'media', 'streaming', 'label', 'recording'
];

export function scoreStory(title = '', description = '') {
  const text = `${title} ${description}`.toLowerCase();
  const hits = RELEVANCE_TERMS.filter(term => text.includes(term));
  const uniqueHits = [...new Set(hits)];
  return Math.min(100, uniqueHits.length * 12);
}
