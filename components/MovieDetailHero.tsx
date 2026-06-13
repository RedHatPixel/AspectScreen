"use client";

import Image from "next/image";
import Link from "next/link";
import type { TmdbMovieDetails } from "@/types/tmdb";
import { getTmdbImageUrl } from "@/lib/tmdb";

type Props = { movie: TmdbMovieDetails };

const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const runtime = (mins: number | null) => {
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const StarRating = ({ score }: { score: number }) => {
    const pct = (score / 10) * 100;
    return (
        <span className="inline-flex items-center gap-1.5">
            <span className="relative inline-block text-xl leading-none">
                <span className="text-white/20">★★★★★</span>
                <span
                    className="absolute inset-0 overflow-hidden text-yellow-400"
                    style={{ width: `${pct}%` }}
                    aria-hidden
                >
                    ★★★★★
                </span>
            </span>
            <span className="text-sm font-medium text-white/70">
                {score.toFixed(1)}
                <span className="text-white/30"> / 10</span>
            </span>
        </span>
    );
};

const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
        {children}
    </span>
);

const MovieDetailHero = ({ movie }: Props) => {
    const backdropUrl = movie.backdrop_path ? getTmdbImageUrl(movie.backdrop_path, "original") : null;
    const posterUrl = movie.poster_path ? getTmdbImageUrl(movie.poster_path, "w500") : null;
    const year = movie.release_date?.slice(0, 4) ?? "—";
    const rt = runtime(movie.runtime);

    return (
        <div className="relative w-full">
            {backdropUrl && (
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                    <Image
                        src={backdropUrl}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover object-top opacity-30"
                        priority
                    />
                    
                    <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/10" />
                    <div className="absolute inset-0 bg-linear-to-r from-background/60 to-transparent" />
                </div>
            )}

            <div className="relative z-10 flex flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:px-12 lg:py-16">
                <div className="mx-auto w-48 shrink-0 sm:w-56 lg:mx-0 lg:w-64">
                    <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                        {posterUrl ? (
                            <Image src={posterUrl} alt={movie.title} fill sizes="256px" className="object-cover" priority />
                        ) : (
                            <div className="absolute inset-0 bg-zinc-800" />
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-5">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {movie.title}
                        </h1>
                        {movie.original_title !== movie.title && (
                            <p className="mt-1 text-sm text-white/40 italic">{movie.original_title}</p>
                        )}
                        {movie.tagline && (
                            <p className="mt-2 text-base text-white/50 italic">&ldquo;{movie.tagline}&rdquo;</p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
                        <span>{year}</span>
                        {rt && <><span className="text-white/20">·</span><span>{rt}</span></>}
                        {movie.original_language && (
                            <><span className="text-white/20">·</span>
                            <span className="uppercase">{movie.original_language}</span></>
                        )}
                        {movie.status && (
                            <><span className="text-white/20">·</span>
                            <span>{movie.status}</span></>
                        )}
                    </div>

                    {movie.vote_average > 0 && (
                        <div className="flex items-center gap-3">
                            <StarRating score={movie.vote_average} />
                            <span className="text-xs text-white/30">
                                {movie.vote_count.toLocaleString()} votes
                            </span>
                        </div>
                    )}

                    {movie.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((g) => (
                                <Chip key={g.id}>{g.name}</Chip>
                            ))}
                        </div>
                    )}

                    {movie.overview && (
                        <p className="max-w-2xl leading-7 text-white/70 text-sm sm:text-base">
                            {movie.overview}
                        </p>
                    )}

                    <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
                        {movie.budget > 0 && (
                            <>
                                <dt className="text-white/30 uppercase tracking-widest text-xs">Budget</dt>
                                <dd className="text-white/80 col-span-1">{fmt(movie.budget)}</dd>
                            </>
                        )}
                        {movie.revenue > 0 && (
                            <>
                                <dt className="text-white/30 uppercase tracking-widest text-xs">Revenue</dt>
                                <dd className="text-white/80 col-span-1">{fmt(movie.revenue)}</dd>
                            </>
                        )}
                        {movie.production_countries.length > 0 && (
                            <>
                                <dt className="text-white/30 uppercase tracking-widest text-xs">Country</dt>
                                <dd className="text-white/80 col-span-1">
                                    {movie.production_countries.map((c) => c.name).join(", ")}
                                </dd>
                            </>
                        )}
                        {movie.spoken_languages.length > 0 && (
                            <>
                                <dt className="text-white/30 uppercase tracking-widest text-xs">Language</dt>
                                <dd className="text-white/80 col-span-1">
                                    {movie.spoken_languages.map((l) => l.english_name).join(", ")}
                                </dd>
                            </>
                        )}
                        {movie.production_companies.length > 0 && (
                            <>
                                <dt className="text-white/30 uppercase tracking-widest text-xs">Studio</dt>
                                <dd className="text-white/80 col-span-1 truncate">
                                    {movie.production_companies.slice(0, 2).map((c) => c.name).join(", ")}
                                </dd>
                            </>
                        )}
                    </dl>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-3 pt-1">
                        <Link
                            href={`/watch/${movie.id}`}
                            className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 hover:scale-105 active:scale-95"
                        >
                            Watch Movie
                        </Link>
                        {movie.homepage && (
                            <a
                                href={movie.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                            >
                                Official Site ↗
                            </a>
                        )}
                        {movie.imdb_id && (
                            <a
                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                            >
                                IMDb ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailHero;