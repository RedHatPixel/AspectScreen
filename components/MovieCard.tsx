import Link from 'next/link'
import Image from 'next/image'
import { JustWatchMovie } from '@/types/movie'
import { getPosterUrl } from '@/utils/movie'
import FavoriteButton from './FavoriteButton'

type MovieCardProps = {
  movie: JustWatchMovie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const poster = movie.photo_url ? getPosterUrl(movie.photo_url[0]) : null;
  const score = movie.jwRating;

  return (
    <div className="relative group">
      <Link href={`/watch/${movie.title}/${movie.imdbId}`} className="block cursor-pointer">
        <div className="bg-gray-800 rounded-lg overflow-hidden aspect-2/3 relative group-hover:ring-2 group-hover:ring-purple-500 transition">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center px-2">No Poster</span>
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            <p className="text-sm font-semibold leading-tight line-clamp-2">{movie.title}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400">{movie.year}</span>
              {score && <span className="text-xs text-yellow-400">⭐ {score.toFixed(1)}</span>}
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute top-2 right-2 z-20">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  )
}

export default MovieCard