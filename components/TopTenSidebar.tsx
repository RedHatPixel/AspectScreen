import Image from "next/image";
import Link from "next/link";
import { images } from "@/constants/images";
import { getTmdbImageUrl } from "@/lib/tmdb";
import { TmdbMovieResult } from "@/types/tmdb";

const TopTenSidebar = ({ movies }: { movies: TmdbMovieResult[] }) => {
    return (
        <aside className="hidden w-48 flex-col gap-3 lg:flex">
            <h3 className="mb-2 text-sm font-semibold">Top 10</h3>
            <ol className="flex flex-col gap-3">
                {movies.slice(0, 10).map((m, i) => (
                    <Link
                        key={m.id}
                        href={`/watch/${m.id}`}
                        className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                    >
                        <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded bg-zinc-800">
                            <Image
                                src={
                                    getTmdbImageUrl(m.poster_path) ||
                                    images.fallback
                                }
                                alt={m.title}
                                fill
                                sizes="44px"
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="truncate text-sm font-medium group-hover:text-purple-300 transition-colors">
                                {m.title}
                            </span>
                            <span className="text-xs text-white/40">
                                {m.release_date?.slice(0, 4) ?? ""}
                            </span>
                        </div>
                    </Link>
                ))}
            </ol>
        </aside>
    );
};

export default TopTenSidebar;
