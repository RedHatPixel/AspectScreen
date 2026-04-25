'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useFavorites } from '@/hooks/useFavorites'

const FavoritesSection = () => {
  const { favorites } = useFavorites()

  if (favorites.length === 0) return null

  return (
    <section className="mb-10"> 
      <h2 className="text-lg font-semibold text-gray-200 mb-4">♥ My Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites
          .slice()
          .sort((a, b) => b.addedAt - a.addedAt)
          .map((fav) => (
            <Link key={fav.imdbId} href={`/watch/${fav.imdbId}`} className="group">
              <div className="bg-gray-800 rounded-lg overflow-hidden aspect-2/3 relative group-hover:ring-2 group-hover:ring-purple-500 transition">
                {fav.poster ? (
                  <Image
                    src={fav.poster}
                    alt={fav.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 text-xs px-2 text-center">No Poster</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <p className="text-sm font-semibold line-clamp-2">{fav.title}</p>
                  <span className="text-xs text-gray-400">{fav.year}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  )
}

export default FavoritesSection