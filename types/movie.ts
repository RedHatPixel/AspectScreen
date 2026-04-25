export type JustWatchMovie = {
  id: number
  type: string
  url: string
  imdbId: string
  tmdbId: string
  title: string
  year: number
  runtime?: number
  photo_url?: string[]
  backdrops?: string[]
  jwRating?: number
  tomatoMeter?: number
  tomatoCertifiedFresh?: string 
  offers?: {
    type: string
    name: string
    url: string
  }[]
}

export type JustWatchResponse = {
  ok: boolean
  description: JustWatchMovie[]
}

export type MediaTrailer = {
  youtube_video_id?: string
  name?: string
  type?: string
}

export type MediaResponse = {
  ok: boolean
  description: {
    trailers?: MediaTrailer[]
    [key: string]: unknown
  }
}

export type FavoriteMovie = {
  id: number
  imdbId: string
  tmdbId: string
  title: string
  year: number
  poster?: string | null
  imdbScore?: number | undefined
  addedAt: number
}