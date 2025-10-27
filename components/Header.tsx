'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Instagram, Youtube } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true)
      } else if (currentScrollY === 0) {
        // At the very top - show header
        setIsVisible(true)
      }

      // Set scrolled state for background
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const isActive = (path: string) => {
    if (path === '/courses') return pathname === '/' || pathname === '/courses' || pathname.startsWith('/courses/')
    return pathname === path
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <header
        className={`shadow-lg z-50 transition-all duration-300 ${
          isHomePage ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isHomePage && !isScrolled && !isHovered
            ? 'bg-transparent'
            : 'bg-black'
        }`}
        onMouseEnter={() => isHomePage && setIsHovered(true)}
        onMouseLeave={() => isHomePage && setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Hamburger */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white p-2 rounded-md hover:bg-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Centered Logo - fades when sidebar opens */}
            <Link
              href="/"
              className={`absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                sidebarOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <img
                src="https://media.oracleboxing.com/Website/optimized/logos/long_white-large.webp"
                alt="Oracle Boxing"
                className="h-3 sm:h-5 w-auto"
              />
            </Link>

            {/* Right 6WC Button - hidden when sidebar opens, hidden on mobile, and hidden on /6wc page */}
            {pathname !== '/6wc' && (
              <Link
                href="/6wc"
                className={`hidden sm:block px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-white text-white text-xs sm:text-base font-black rounded-lg uppercase tracking-wide hover:bg-white hover:text-black transition-opacity duration-300 ${
                  sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                6-WEEK CHALLENGE
              </Link>
            )}
          </div>
        </div>

      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-start p-6 border-b border-gray-800">
            <button
              onClick={closeSidebar}
              className="text-white p-2 rounded-md hover:bg-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Content */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col space-y-6">
              {/* Courses Section - Always Expanded */}
              <div>
                <h3 className="text-gray-400 text-xl font-bold mb-4 px-4">COURSES</h3>
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/courses/bundle"
                    onClick={closeSidebar}
                    className={`text-lg py-3 px-4 rounded-md transition-all duration-200 ${
                      pathname === '/courses/bundle'
                        ? 'text-white font-bold'
                        : 'text-white font-semibold hover:text-black hover:bg-white'
                    }`}
                  >
                    The Oracle Boxing Method
                  </Link>
                  <Link
                    href="/courses/bffp"
                    onClick={closeSidebar}
                    className={`text-lg font-semibold py-3 px-4 rounded-md transition-all duration-200 ${
                      pathname === '/courses/bffp'
                        ? 'text-black bg-white'
                        : 'text-white hover:text-black hover:bg-white'
                    }`}
                  >
                    Boxing from First Principles
                  </Link>
                  <Link
                    href="/courses/roadmap"
                    onClick={closeSidebar}
                    className={`text-lg font-semibold py-3 px-4 rounded-md transition-all duration-200 ${
                      pathname === '/courses/roadmap'
                        ? 'text-black bg-white'
                        : 'text-white hover:text-black hover:bg-white'
                    }`}
                  >
                    Boxing Roadmap
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700"></div>

              {/* Membership */}
              <Link
                href="/membership"
                onClick={closeSidebar}
                className={`text-xl font-bold py-3 px-4 rounded-md transition-all duration-200 ${
                  isActive('/membership')
                    ? 'text-black bg-white'
                    : 'text-white hover:text-black hover:bg-white'
                }`}
              >
                MEMBERSHIP
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-700"></div>

              {/* 6-Week Challenge */}
              <Link
                href="/6wc"
                onClick={closeSidebar}
                className="px-4 py-3 border-2 border-white text-white text-lg font-black rounded-lg uppercase tracking-wide hover:bg-white hover:text-black transition-colors text-center"
              >
                6-WEEK CHALLENGE
              </Link>

              {/* Newsletter */}
              <Link
                href="/#newsletter"
                onClick={closeSidebar}
                className="text-base font-semibold py-2 px-4 rounded-md transition-all duration-200 text-gray-400 hover:text-white text-center"
              >
                NEWSLETTER
              </Link>

              {/* Contact */}
              <a
                href="mailto:team@oracleboxing.com"
                className="text-base font-semibold py-2 px-4 rounded-md transition-all duration-200 text-gray-400 hover:text-white text-center"
              >
                CONTACT
              </a>
            </div>
          </nav>

          {/* Social Media Icons */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.instagram.com/oracle.boxing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-8 h-8" />
              </a>
              <a
                href="https://www.youtube.com/@oracle_boxing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
