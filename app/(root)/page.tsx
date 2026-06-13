import Navbar from '@/components/Navbar';
import HeroBannerServer from '@/components/server/HeroBannerServer';
import TopTenSidebarServer from '@/components/server/TopTenSidebarServer';
import MovieList from '@/components/MovieList';
import { categories } from '@/constants/categories';

type SearchParams = Promise<{ categories?: string; search?: string; page?: string }>;

const Root = async ({ searchParams }: { searchParams: SearchParams }) => {
    const { categories: categoriesParam, search, page } = await searchParams;

    const category =
        categoriesParam && categories.some((c) => c.name === categoriesParam)
            ? categoriesParam
            : 'All';

    const currentPage = Math.max(1, Number(page ?? 1));
    const searchQuery = search?.trim() || undefined;

    return (
        <main className="min-h-screen text-white mb-10">
            <Navbar />

            <HeroBannerServer />

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-6 px-4 lg:px-12 mt-8">
                <MovieList
                    category={category}
                    searchQuery={searchQuery}
                    currentPage={currentPage}
                />

                <div className="col-span-1">
                    <TopTenSidebarServer />
                </div>
            </section>
        </main>
    );
};

export default Root;