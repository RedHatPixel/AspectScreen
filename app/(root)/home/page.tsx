'use client'

import { Suspense } from "react";
import Image from "next/image";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <section className="relative overflow-visible">
        <Image
          src={images.hero}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background" />

        <div className="relative mx-auto min-h-screen flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
          <Link href="/" className="flex items-center gap-3 text-lg font-medium tracking-tight">
            <Image src={images.logo} alt="AspectScreen logo" width={32} height={32} />
            AspectScreen
          </Link>

          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-wide py-4 text-white sm:text-5xl">
            Explore films, save watchlists, and browse titles.
          </h1>

          <p className="mt-3 mb-1 max-w-xl text-sm text-white/70">
            Discover your next favorite movie by searching our extensive list of movies.
          </p>

          <div className="w-full max-w-2xl flex gap-2 items-center justify-center">
            <Suspense fallback={<div className="w-full h-10 rounded bg-white/10 animate-pulse" />}>  {/* wrap SearchBar */}
              <SearchBar className="w-full" />
            </Suspense>
            <Link href="/" className="w-32 rounded bg-background px-4 py-2 text-sm font-medium text-white hover:bg-background/80">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 p-8 text-sm text-white/60 sm:px-10">
          <p>AspectScreen is a portfolio project built for learning and demonstration only. It uses TMDB data under developer API terms and is not intended for commercial use.</p>
          <p>AspectScreen is build using Next.js framework with Reactjs for front-end development and typescript as its programming language, with Tailwind CSS for inline styling.</p>
          <p>AspectScreen is a simple movie discovery and must watch portfolio experience.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;