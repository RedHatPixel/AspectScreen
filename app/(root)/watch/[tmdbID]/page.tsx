import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SimilarMovies from "@/components/SimilarMovies";
import { tmdb, getTmdbImageUrl } from "@/lib/tmdb";
import { TmdbMovieDetails } from "@/types/tmdb";
import WatchClient from "./WatchClient";

type Props = { params: Promise<{ tmdbID: string }> };

const Watch = async ({ params }: Props) => {
    const { tmdbID } = await params;

    let movie: TmdbMovieDetails;
    try {
        movie = await tmdb.getMovieDetails(tmdbID);
    } catch {
        return notFound();
    }

    if (!movie) return notFound();

    const genreIds = movie.genres.map((g) => g.id);

    const similarRaw = await tmdb
        .get<{ results: any[] }>(`movie/${tmdbID}/similar`, { page: 1 })
        .catch(() => null);

    const similarMovies = (similarRaw?.results ?? []).slice(0, 12).map((m) => ({
        ...m,
        posterUrl: m.poster_path ? getTmdbImageUrl(m.poster_path, "w342") : undefined,
    }));

    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />

            <WatchClient tmdbID={tmdbID} movie={movie} similarMovies={similarMovies} />

            <div className="mx-4 border-t border-white/5 lg:mx-12" />

            <SimilarMovies movieId={tmdbID} genreIds={genreIds} />
        </main>
    );
};

export default Watch;