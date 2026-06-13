export type MovieCategory = {
    name: string;
    genreId?: number;
    fallbackQuery?: string;
};

export const categories: MovieCategory[] = [
    { name: 'All' },
    { name: 'Anime', genreId: 16 },
    { name: 'Thriller', genreId: 53 },
    { name: 'Romance', genreId: 10749 },
    { name: 'Horror', genreId: 27 },
    { name: 'Action', genreId: 28 },
    { name: 'Comedy', genreId: 35 },
    { name: 'Drama', genreId: 18 },
    { name: 'Sci-Fi', genreId: 878 },
];