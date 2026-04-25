import { NextRequest } from 'next/server'
import { getMovieById, getMovieTrailer } from '@/services/movieService'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ title: string, imdbId: string }> }
) {
  const { title, imdbId } = await params

  if (!imdbId?.startsWith('tt')) {
    return Response.json({ error: 'Valid IMDb ID (e.g. tt1234567) is required' }, { status: 400 })
  }

  const movie = await getMovieById(title, imdbId)

  if (!movie) {
    return Response.json({ error: 'Movie not found' }, { status: 404 })
  }

  const trailer = movie.id ? await getMovieTrailer(movie.id) : null

  return Response.json({ result: movie, trailer })
}