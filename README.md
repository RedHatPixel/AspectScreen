# AspectScreen

> A movie discovery web app built as a portfolio project. Browse trending films, search by title, filter by genre, and watch via embedded third-party players — all powered by the TMDB API.

<br />

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

---

## Features

- **Browse movies** — discover trending, popular, and genre-filtered titles
- **Search** — live search with dropdown suggestions as you type
- **Movie details** — full info page with overview, genres, rating, runtime, and cast
- **Watch page** — embedded video player with multiple source options (VidSrc, 2embed, VidLink, VaPlayer, AutoEmbed)
- **Similar movies** — recommendations based on genre and TMDB similarity data
- **Pagination** — navigate across result pages
- **Responsive** — works across mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Data | [TMDB API](https://www.themoviedb.org/documentation/api) |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RedHatPixel/AspectScreen.git
   cd AspectScreen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root of the project:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
AspectScreen/
├── app/
│   ├── (root)/
│   │   ├── details/
│   │   │   └──[tmdbID]/
│   │   │      └── page.tsx          # Movie detail page
│   │   ├── home/
│   │   │   └── page.tsx             # Landing / home page
│   │   └── watch/
│   │       └──[tmdbID]/
│   │          ├── page.tsx          # Watch page (server)
│   │          └── WatchClient.tsx   # Video player + source switcher (client)
│   ├── page.tsx                     # Movie search and filtered categories list
│   └── not-found.tsx                # 404 page
├── components/
│   ├── Server/
│   │   ├── HeroBannerServer.tsx
│   │   ├── TopTenSidebarServer.tsx
│   ├── CategoryFilter.tsx
│   ├── HeroBanner.tsx
│   ├── MovieCard.tsx
│   ├── MovieDetailHero.tsx
│   ├── MovieGrid.tsx
│   ├── MovieList.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   ├── SearchBar.tsx
│   ├── SimilarMovies.tsx
│   └── TopTenSidebar.tsx
├── lib/
│   └── tmdb.ts                     # TMDB API client
├── types/
│   └── tmdb.ts                     # TMDB TypeScript types
└── constants/
    ├── categories.ts
    └── images.ts
    └── sources.ts
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `TMDB_API_KEY` | Your TMDB API v3 key |
| `TMDB_API_READ_ACCESS_TOKEN` | Your TMDB API read access token |
| `TMDB_URL` | TMDB API base URL (`https://api.themoviedb.org/3`) |
| `TMDB_IMG` | TMDB image CDN base URL (`https://image.tmdb.org/t/p`) |

Never commit your `.env.local` file. It is already included in `.gitignore`.

---

## Video Sources

The watch page embeds video via third-party players. AspectScreen does not host, store, or distribute any media content.

| Source | Provider |
|---|---|
| VidSrc | vidsrc.to |
| 2embed | 2embed.cc |
| VidLink | vidlink.pro |
| VaPlayer | vaplayer.xyz |
| AutoEmbed | player.autoembed.cc |

Source availability may vary. If one player does not load, try switching to another using the source selector below the video player.

---

## Disclaimer

This project is built for portfolio and learning purposes only and is **not intended for commercial use**.

Movie data is provided by the [TMDB API](https://www.themoviedb.org/) under their [developer terms of use](https://www.themoviedb.org/api-terms-of-use).

<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB Logo" width="120" />

> This product uses the TMDB API but is not endorsed or certified by TMDB.

---

## License

This project is licensed under the [MIT License](./LICENSE).  
The license applies to the source code only — not to any movie data, images, or media content sourced from TMDB or third-party video providers.

---

*Built by [RedHatPixel](https://github.com/RedHatPixel)*