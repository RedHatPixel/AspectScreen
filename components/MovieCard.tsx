'use client';

import { images } from '@/constants/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { TmdbMovieResult } from '@/types/tmdb';
import { getTmdbImageUrl } from '@/lib/tmdb';

type MovieCardProps = {
    movie: TmdbMovieResult;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    const router = useRouter();

    return (
        <div className="group w-full">
            <button
                onClick={() => router.push(`/details/${movie.id}`)}
                className="block w-full text-left"
            >
                <div className="relative w-full overflow-hidden rounded-lg bg-zinc-800 aspect-2/3">
                    <Image
                        src={getTmdbImageUrl(movie.poster_path) || getTmdbImageUrl(movie.backdrop_path) || images.fallback}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                </div>
                <div className="mt-2">
                    <div className="truncate text-sm font-medium">{movie.title}</div>
                    <div className="text-xs text-white/60">
                        {movie.release_date?.slice(0, 4) ?? ''}
                    </div>
                </div>
            </button>
        </div>
    );
};

export default MovieCard;