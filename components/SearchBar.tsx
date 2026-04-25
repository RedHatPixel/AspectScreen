'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SearchBar = ({ defaultValue = '' }: { defaultValue?: string }) => {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg transition"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar