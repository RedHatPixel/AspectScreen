export const sources = [
    {
        label: "2embed",
        getUrl: (id: string) => `https://www.2embed.cc/embed/${id}`,
    },
    {
        label: "VidSrc",
        getUrl: (id: string) => `https://vidsrc.to/embed/movie/${id}`,
    },
    {
        label: "VidLink",
        getUrl: (id: string) => `https://vidlink.pro/movie/${id}`,
    },
    {
        label: "VaPlayer",
        getUrl: (id: string) => `https://vaplayer.xyz/embed/movie?tmdb=${id}`,
    },
    {
        label: "AutoEmbed",
        getUrl: (id: string) => `https://player.autoembed.cc/embed/movie/${id}`,
    },
];