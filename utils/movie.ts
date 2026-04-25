export function getPosterUrl(poster?: string, size = 'w342'): string | null {
  if (!poster) return null
  if (poster.startsWith('http')) return poster
  return `${process.env.TMDB_IMG}/${size}${poster}`
}
 