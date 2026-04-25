'use client'

import { useEffect, useState, useCallback } from 'react'
import { FavoriteMovie, JustWatchMovie } from '@/types/movie'
import { getPosterUrl } from '@/utils/movie'

const STORAGE_KEY = 'reelzone_favorites'

function loadFavorites(): FavoriteMovie[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveFavorites(favs: FavoriteMovie[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    setFavorites(loadFavorites())
  }, [])

  const isFavorite = useCallback(
    (imdbId: string) => favorites.some((f) => f.imdbId === imdbId),
    [favorites]
  )

  const toggleFavorite = useCallback((movie: JustWatchMovie) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.imdbId === movie.imdbId)
      const next = exists
        ? prev.filter((f) => f.imdbId !== movie.imdbId)
        : [
            ...prev,
            {
              id: movie.id,
              imdbId: movie.imdbId,
              tmdbId: movie.imdbId,
              title: movie.title,
              year: movie.year,
              poster: movie.photo_url ? getPosterUrl(movie.photo_url[0]) : null,
              imdbScore: movie.jwRating,
              addedAt: Date.now(),
            },
          ]
      saveFavorites(next)
      return next
    })
  }, [])

  return { favorites, isFavorite, toggleFavorite }
}