'use client'

type VidSrcPlayerProps = {
  imdbId?: string
  tmdbId?: string
}

const VidSrcPlayer = ({ imdbId, tmdbId }: VidSrcPlayerProps) => {
  const embedUrl = imdbId
    ? `https://vidsrc-embed.ru/embed/movie?imdb=${imdbId}`
    : `https://vidsrc-embed.ru/embed/movie?tmdb=${tmdbId}`

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        allow="autoplay; fullscreen"
        referrerPolicy="origin"
        title="Movie Player"
      />
    </div>
  )
}

export default VidSrcPlayer