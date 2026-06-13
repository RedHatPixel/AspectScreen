import Image from "next/image";
import { images } from "@/constants/images";
import Link from "next/link";

const NotFound = () => {
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

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/30 to-background" />

                <div className="relative mx-auto min-h-screen flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
                    <Link href="/" className="flex items-center gap-3 text-lg font-medium tracking-tight">
                        <Image src={images.logo} alt="AspectScreen logo" width={32} height={32} />
                        AspectScreen
                    </Link>

                    <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-wide py-4 text-white sm:text-5xl">
                        Error 404
                    </h1>

                    <p className="mt-3 mb-8 max-w-md text-sm text-white/60">
                        The page you're looking for has gone missing maybe it was deleted, moved, or never existed. Let's get you back to the screening room.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                        <Link
                            href="/home"
                            className="rounded bg-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                        >
                            Back to home
                        </Link>
                        <Link
                            href="/"
                            className="rounded bg-white/10 px-6 py-2.5 text-sm font-medium text-white/80 hover:bg-white/15 transition-colors"
                        >
                            Browse movies
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

export default NotFound;