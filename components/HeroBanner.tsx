"use client"

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { TmdbMovieResult } from "@/types/tmdb";
import { getTmdbImageUrl } from "@/lib/tmdb";

const AUTO_ADVANCE_MS = 9000;

const HeroBanner = ({ movies }: { movies: TmdbMovieResult[] }) => {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [displayIndex, setDisplayIndex] = useState(0);

    const movie = movies[displayIndex];

    const goTo = useCallback((next: number) => {
        if (next === index) return;
        setAnimating(true);
        setProgress(0);

        setTimeout(() => {
            setDisplayIndex(next);
            setIndex(next);
            setAnimating(false);
        }, 400);
    }, [index]);

    useEffect(() => {
        const tick = 100;
        const step = 100 / (AUTO_ADVANCE_MS / tick);

        const interval = window.setInterval(() => {
            setProgress((prev) => {
                if (prev + step >= 100) {
                    const next = (index + 1) % movies.length;
                    goTo(next);
                    return 0;
                }
                return prev + step;
            });
        }, tick);

        return () => window.clearInterval(interval);
    }, [index, movies.length, goTo]);

    return (
        <section
            className="
                relative w-full overflow-hidden rounded-lg
                h-[60vh]
                sm:h-[70vh]
                md:h-[80vh]
                lg:h-[85vh]
                min-h-80
                sm:min-h-100
                lg:min-h-140
            "
        >
            <div
                key={displayIndex}
                className={`absolute inset-0 transition-opacity duration-500 ${animating ? "opacity-0" : "opacity-100"}`}
            >
                {movie?.poster_path ?? movie?.backdrop_path ? (
                    <Image
                        src={movie.backdrop_path ? getTmdbImageUrl(movie.backdrop_path, 'w780') : getTmdbImageUrl(movie.poster_path, 'w342')}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                        className="object-cover object-center"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-background" />
                )}
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent z-10 hidden sm:block" />

            <Link href={`/details/${movie.id}`} className="absolute inset-0 z-15" aria-label={movie.title} />

            <div
                className={`
                    absolute z-20 transition-all duration-400
                    left-4 right-4 bottom-14
                    sm:left-6 sm:right-auto sm:bottom-12
                    md:left-8 md:bottom-14
                    lg:left-10 lg:bottom-16
                    ${animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}
                `}
            >
                <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl space-y-3 sm:space-y-4 md:space-y-6">
                    <h2
                        className="
                            font-semibold tracking-tight text-white
                            text-2xl
                            sm:text-3xl
                            md:text-4xl
                            lg:text-5xl
                            xl:text-6xl
                            line-clamp-2
                        "
                    >
                        {movie?.title}
                    </h2>

                    <p
                        className="
                            leading-6 text-white/70
                            text-xs line-clamp-2
                            sm:text-sm sm:leading-6 sm:line-clamp-3
                            md:leading-7 md:line-clamp-4
                            max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl
                        "
                    >
                        {movie?.overview ?? "No description available."}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <Link
                            href={`/watch/${movie.id}`}
                            className="
                                relative z-20 rounded-full bg-purple-600 font-semibold text-white
                                transition hover:bg-purple-500 hover:scale-105 active:scale-95
                                px-4 py-2 text-xs
                                sm:px-6 sm:py-3 sm:text-sm
                            "
                        >
                            Watch Movie
                        </Link>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                            {movie?.release_date?.slice(0, 4) ?? "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="
                    absolute z-20 flex items-center
                    right-3 bottom-4
                    sm:right-6 sm:bottom-8
                "
            >
                <div className="flex gap-2 sm:flex-col sm:gap-3">
                    {movies.map((m, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            title={m.title}
                            className="
                                relative rounded-full overflow-hidden
                                bg-white/20 hover:bg-white/30
                                transition-colors duration-300
                                cursor-pointer active:scale-90
                                h-1
                            "
                            style={{
                                width: i === index ? "2.5rem" : "1.5rem",
                            }}
                            aria-label={`Go to ${m.title}`}
                        >
                            {i === index && (
                                <span
                                    className="absolute inset-y-0 left-0 bg-purple-500 rounded-full transition-none"
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;