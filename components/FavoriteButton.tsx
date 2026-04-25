'use client'

import { JustWatchMovie } from '@/types/movie'
import { useFavorites } from '@/hooks/useFavorites'

type FavoriteButtonProps = {
  movie: JustWatchMovie
}

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(movie.imdbId)

  return (
    <button
      onClick={() => toggleFavorite(movie)}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm backdrop-blur-sm transition
        ${active
          ? 'bg-purple-600 text-white'
          : 'bg-black/50 text-gray-400 hover:text-white hover:bg-black/70'
        }`}
    >
      {active ? '♥' : '♡'}
    </button>
  )
}

export default FavoriteButton;