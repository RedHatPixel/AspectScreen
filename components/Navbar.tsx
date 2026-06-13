import React, { Suspense } from 'react'
import SearchBar from './SearchBar'
import { images } from '@/constants/images'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">

      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start sm:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold sm:text-xl">
          <Image src={images.logo} alt="AspectScreen logo" width={32} height={32} />
          <span>AspectScreen</span>
        </Link>

        <div className="flex items-center gap-4 sm:hidden">
          <Link href="/home" className="text-sm font-medium hover:text-purple-400 transition-colors">
            Home
          </Link>
        </div>
      </div>

      <div className="w-full sm:w-1/3 sm:mx-auto">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </div>

      <div className="hidden sm:flex items-center gap-4">
        <Link href="/home" className="text-sm font-medium hover:text-purple-400 transition-colors">
          Home
        </Link>
      </div>

    </nav>
  )
}

export default Navbar