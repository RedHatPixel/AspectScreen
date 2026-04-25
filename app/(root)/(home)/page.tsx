import { searchMovies, HOME_SECTIONS } from '@/services/movieService'
import MoviesGrid from '@/components/MoviesGrid'
import MovieSection from '@/components/MovieSection'
import FavoritesSection from '@/components/FavoritesSection'
import SearchBar from '@/components/SearchBar'

type HomeProps = {
  searchParams: Promise<{ q?: string }>
}

const Home = async ({ searchParams }: HomeProps) => {
  const { q } = await searchParams
  const isSearching = Boolean(q?.trim())

  const [searchResults, ...sectionResults] = await Promise.all([
    isSearching ? searchMovies(q!.trim()) : Promise.resolve([]),
    ...HOME_SECTIONS.map((s) => (isSearching ? Promise.resolve([]) : searchMovies(s.query))),
  ])

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
        Aspect<span className="text-purple-500">Screen</span>
      </h1>

      <SearchBar defaultValue={q ?? ''} />

      {isSearching ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Results for &ldquo;{q}&rdquo;
          </h2>
          <MoviesGrid
            movies={searchResults}
            emptyMessage="No movies found. Try a different search."
          />
        </>
      ) : (
        <>
          {/* Client-rendered favorites from localStorage */}
          <FavoritesSection />

          {/* Server-rendered curated sections */}
          {HOME_SECTIONS.map((section, i) => (
            <MovieSection
              key={section.key}
              label={section.label}
              movies={sectionResults[i] ?? []}
            />
          ))}
        </>
      )}
    </main>
  )
}

export default Home