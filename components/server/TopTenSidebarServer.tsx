import { tmdb, getTmdbImageUrl } from '@/lib/tmdb';
import TopTenSidebar from '@/components/TopTenSidebar';

const TopTenSidebarServer = async () => {
    const popular = await tmdb.discoverMovies({ sort_by: 'popularity.desc', page: 1 });
    const topTen = (popular?.results ?? []).slice(0, 10);

    return <TopTenSidebar movies={topTen} />;
};

export default TopTenSidebarServer;