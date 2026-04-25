import { NextRequest } from 'next/server'
import { searchMovies } from '@/services/movieService'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')?.trim()

  if (!query) {
    return Response.json({ error: 'Query parameter "q" is required' }, { status: 400 })
  }

  const movies = await searchMovies(query)

  if (movies.length === 0) {
    return Response.json({ error: 'No results found' }, { status: 404 })
  }

  return Response.json({ results: movies })
}