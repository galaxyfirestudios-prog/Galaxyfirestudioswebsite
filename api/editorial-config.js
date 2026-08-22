const DEFAULT_SOURCES = [
  {
    name: 'The NATIVE',
    feed_url: 'https://thenativemag.com/feed/',
    site_url: 'https://thenativemag.com/',
    category: 'Music & Culture',
    enabled: true,
  },
  {
    name: 'The NATIVE Music',
    feed_url: 'https://thenativemag.com/category/music/feed/',
    site_url: 'https://thenativemag.com/category/music/',
    category: 'Music',
    enabled: true,
  },
  {
    name: 'PUNCH Entertainment',
    feed_url: 'https://rss.punchng.com/v1/category/entertainment',
    site_url: 'https://punchng.com/topics/entertainment/',
    category: 'Entertainment',
    enabled: true,
  },
  {
    name: 'PUNCH Interviews',
    feed_url: 'https://rss.punchng.com/v1/category/interview',
    site_url: 'https://punchng.com/',
    category: 'Interviews',
    enabled: true,
  },
  {
    name: 'The Guardian Nigeria — Arts',
    feed_url: 'https://guardian.ng/category/art/?format=feed&type=rss',
    site_url: 'https://guardian.ng/category/art/',
    category: 'Art & Culture',
    enabled: true,
  },
  {
    name: 'The Guardian Nigeria — Life',
    feed_url: 'https://guardian.ng/category/life/?format=feed&type=rss',
    site_url: 'https://guardian.ng/category/life/',
    category: 'Culture & Lifestyle',
    enabled: true,
  },
];

const CULTURE_TERMS = [
  'afrobeats', 'afropop', 'afrobeat', 'amapiano', 'hip-hop', 'hip hop', 'rap', 'r&b',
  'music', 'album', 'ep', 'single', 'artist', 'singer', 'rapper', 'producer', 'dj',
  'nigeria', 'nigerian', 'ghana', 'ghanaian', 'africa', 'african', 'lagos', 'abuja',
  'culture', 'creative', 'creatives', 'fashion', 'style', 'art', 'artist', 'film', 'nollywood',
  'dance', 'concert', 'festival', 'showcase', 'nightlife', 'radio', 'podcast', 'visual',
  'photography', 'designer', 'design', 'community', 'streetwear', 'entertainment', 'media',
  'record label', 'streaming', 'tour', 'release', 'premiere', 'performance', 'theatre',
];

const BLOCKED_TERMS = [
  'porn', 'casino', 'betting', 'gambling', 'explicit sex', 'graphic violence',
];

module.exports = { DEFAULT_SOURCES, CULTURE_TERMS, BLOCKED_TERMS };
