import { tmdb, getTmdbImageUrl } from '@/lib/tmdb';
import HeroBanner from '@/components/HeroBanner';
import { TmdbListResponse, TmdbMovieResult } from '@/types/tmdb';

const HeroBannerServer = async () => {
    const trending: TmdbListResponse<TmdbMovieResult> = await tmdb.getTrending('movie', 'week');
    const results = trending?.results ?? [];

    const heroMovies = [...results]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    return <HeroBanner movies={heroMovies} />;
};

export default HeroBannerServer;