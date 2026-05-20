/**
 * Shared keyword list used by both the admin UI and automated cron jobs.
 * Single source of truth — update here and all jobs pick it up automatically.
 */
export const SHOE_KEYWORDS = [
  'heels', 'pumps', 'stilettos',
  'sneakers', 'trainers', 'boots',
  'sandals', 'flip flops', 'slides',
  'flats', 'loafers', 'oxfords',
  'formal', 'wedges', 'platforms',
  'espadrilles', 'mules', 'clogs',
  'slippers', 'athletic', 'basketball',
  'suede', 'casual', 'comfort',
  'walking shoes', 'girls', 'kids',
  'boys', 'mens', 'men',
  'women', 'womens', 'woman',
  'leather', 'canvas', 'tennis',
  'dress', 'running',
] as const

export type ShoeKeyword = typeof SHOE_KEYWORDS[number]

/** How many pages to fetch per keyword per sync run.
 *  5 pages × 100 products × 38 keywords = up to 19,000 products per full sweep. */
export const PAGES_PER_KEYWORD = 5

/** Products not seen in this many days get soft-deleted (archived). */
export const ARCHIVE_AFTER_DAYS = 14

/** Products archived for this many days get hard-deleted from the DB. */
export const DELETE_AFTER_DAYS = 30
