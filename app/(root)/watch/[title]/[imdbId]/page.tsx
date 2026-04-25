import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getMovieById, getMovieTrailer, searchMovies } from '@/services/movieService'
import VidSrcPlayer from '@/components/VidSrcPlayer'
import MovieSection from '@/components/MovieSection'
import FavoriteButton from '@/components/FavoriteButton'
import { getPosterUrl } from '@/utils/movie'

type WatchPageProps = {
  params: { title: string, imdb_id: string }
}

const WatchPage = async ({ params }: WatchPageProps) => {
  const { title, imdb_id } = await params

  const [movie, recommended] = await Promise.all([
    getMovieById(title, imdb_id),
    searchMovies('popular movies'),
  ])

  if (movie === null) {
    return (
      <div className='w-full min-h-screen bg-red-900 text-amber-50 flex-center flex-col'>
        <p>{title || ('Title is missing')}</p>
        <p>{imdb_id || ('Id is missing')}</p>
        <p>{recommended[0].id || ('Recommended is missing')}</p>
      </div>
    );
  }

  const trailer = movie.id ? await getMovieTrailer(movie.id) : null
  const poster = movie.photo_url ? getPosterUrl(movie.photo_url[0]) : null;
  const backdrop = movie.backdrops?.[0]
  const score = movie.jwRating;

  const filteredRecommended = recommended.filter((m) => m.imdbId !== imdb_id).slice(0, 10)

  return (
    <main className="min-h-screen bg-black text-white">
      {backdrop && (
        <div className="relative w-full h-48 sm:h-64 overflow-hidden">
          <Image src={backdrop} alt={movie.title} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black" />
        </div>
      )}

      <div className="p-6">
        <Link
          href="/"
          className="text-sm text-purple-400 hover:text-purple-300 mb-6 inline-block transition"
        >
          ← Back
        </Link>

        {/* Player */}
        <VidSrcPlayer imdbId={movie.imdbId} tmdbId={movie.tmdbId} />

        {/* Movie Info */}
        <div className="mt-6 flex gap-5">
          {poster && (
            <img
              src={poster}
              alt={movie.title}
              className="w-28 rounded-lg object-cover shrink-0 hidden sm:block"
            />
          )}

          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold">{movie.title}</h1>
              <FavoriteButton movie={movie} />
            </div>

            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
              {movie.year && <span>{movie.year}</span>}
              {movie.runtime && <span>{movie.runtime} min</span>}
              {score && <span className="text-yellow-400">⭐ {score.toFixed(1)}</span>}
            </div>

            {/* IDs for reference */}
            <div className="flex gap-3 mt-3 text-xs text-gray-600">
              {movie.imdbId && <span>IMDb: {movie.imdbId}</span>}
              {movie.tmdbId && <span>TMDB: {movie.tmdbId}</span>}
            </div>
          </div>
        </div>

        {/* Trailer */}
        {trailer && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-200 mb-3">Trailer</h2>
            <div className="relative w-full aspect-video max-w-2xl rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.youtube_video_id}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                title={`${movie.title} Trailer`}
              />
            </div>
          </div>
        )}

        {/* Recommended */}
        {filteredRecommended.length > 0 && (
          <div className="mt-10">
            <MovieSection label="You Might Also Like" movies={filteredRecommended} />
          </div>
        )}
      </div>
    </main>
  )
}

export default WatchPage