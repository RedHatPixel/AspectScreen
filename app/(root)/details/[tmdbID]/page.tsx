import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import MovieDetailHero from "@/components/MovieDetailHero";
import SimilarMovies from "@/components/SimilarMovies";
import { tmdb } from "@/lib/tmdb";
import { TmdbMovieDetails } from "@/types/tmdb";

type Props = { params: Promise<{ tmdbID: string }> };

const DetailsPage = async ({ params }: Props) => {
    const resolvedParams = await params;
    console.log("params:", resolvedParams);

     const { tmdbID } = resolvedParams;

    let movie: TmdbMovieDetails;
    try {
        movie = await tmdb.getMovieDetails(tmdbID);
    } catch {
        return notFound();
    }

    if (!movie) return notFound();

    const genreIds = movie.genres.map((g) => g.id);

    return (
        <main className="min-h-screen text-white mb-10">
            <Navbar />

            <MovieDetailHero movie={movie} />

            <div className="mx-4 border-t border-white/5 lg:mx-12" />

            <SimilarMovies movieId={tmdbID} genreIds={genreIds} />
        </main>
    );
};

export default DetailsPage;