'use client'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Header = () => {
  const [showImage, setShowImage] = useState(true) // Default value

  useEffect(() => {
    // Check if we are in the browser before using localStorage
    if (typeof window !== 'undefined') {
      const savedFavicon = localStorage.getItem('favicon')
      const initialShowImage = savedFavicon === 'true'
      setShowImage(initialShowImage)
    }
  }, [])

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image
                src="/favicon.webp"
                alt="logo"
                className="block dark:hidden"
                width={40}
                height={40}
              />

              <Image
                src="/favico2.webp"
                alt="logo"
                className="dark:block hidden"
                width={40}
                height={40}
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="link link-underline dark:bg-gradient-to-r from-cyan-300 to-cyan-300 hidden sm:block font-medium text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
