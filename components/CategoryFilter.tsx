'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import type { MovieCategory } from '@/constants/categories';

const CategoryFilter = ({ categories = [], active }: { categories?: MovieCategory[]; active?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = active ?? searchParams.get('categories') ?? 'All';

    const handleSelect = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === 'All') {
            params.delete('categories');
        } else {
            params.set('categories', category);
        }

        const query = params.toString();
        router.push(`/${query ? `?${query}` : ''}`);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
                <button
                    key={category.name}
                    onClick={() => handleSelect(category.name)}
                    className={`cursor-pointer hover:bg-primary/10 rounded-md px-3 py-1 text-sm ${currentCategory === category.name ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/80'}`}>
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
