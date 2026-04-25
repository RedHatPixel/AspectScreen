import { JustWatchMovie, JustWatchResponse, MediaResponse, MediaTrailer } from '@/types/movie'
import { request } from 'undici'

async function fetchIMDb<T>(path: string): Promise<T> {
  const { statusCode, body } = await request(`${process.env.IMDB_URL}${path}`)

  if (statusCode === 400) throw new Error('Invalid parameters')
  if (statusCode === 500) throw new Error('IMDb API internal server error')

  return body.json() as Promise<T>
}

export async function searchMovies(query: string): Promise<JustWatchMovie[]> {
  try {
    const data = await fetchIMDb<JustWatchResponse>(
      `/justwatch?q=${encodeURIComponent(query)}`
    )

    if (!data.ok || !Array.isArray(data.description)) return []

    return data.description
  } catch {
    return []
  }
}

export async function getMovieById(title: string, imdbId: string): Promise<JustWatchMovie | null> {
  try {
    const data = await fetchIMDb<JustWatchResponse>(
      `/justwatch?q=${title}`
    )

    if (!data.ok || !Array.isArray(data.description) || data.description.length === 0) {
      return null
    }

    return data.description.find((m) => m.imdbId === imdbId) ?? data.description[0]
  } catch {
    return null
  }
}

export async function getMovieTrailer(jwId: number): Promise<MediaTrailer | null> {
  try {
    const data = await fetchIMDb<MediaResponse>(`/media/${jwId}`)

    if (!data.ok || !data.description?.trailers?.length) return null

    return (
      data.description.trailers.find((t) => t.type === 'Trailer') ??
      data.description.trailers[0]
    )
  } catch {
    return null
  }
}

export const HOME_SECTIONS = [
  { key: 'popular',  label: 'Popular Right Now',  query: 'popular 2024'        },
  { key: 'action',   label: 'Action & Adventure', query: 'action adventure'    },
  { key: 'drama',    label: 'Top Drama',          query: 'drama award winning' },
  { key: 'scifi',    label: 'Sci-Fi & Thriller',  query: 'sci-fi thriller'     },
]