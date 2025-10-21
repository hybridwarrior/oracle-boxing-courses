'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/courses') return pathname === '/' || pathname === '/courses' || pathname.startsWith('/courses/')
    return pathname === path
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://media.oracleboxing.com/webp/Website/logo_site_white.webp"
              alt="Oracle Boxing"
              width={150}
              height={50}
              className="h-8 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive('/courses')
                    ? 'text-white border-b-2 border-[#26304a]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                COURSES
                <ChevronDown className="w-4 h-4" />
              </button>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 z-50">
                  <div className="bg-black border border-gray-800 rounded-lg shadow-xl py-2">
                  <Link
                    href="/courses/bffp"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
                  >
                    <div className="font-semibold">Boxing from First Principles</div>
                  </Link>
                  <Link
                    href="/courses/roadmap"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
                  >
                    <div className="font-semibold">Boxing Roadmap</div>
                  </Link>
                  <Link
                    href="/courses/vault"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
                  >
                    <div className="font-semibold">Boxing Clinic Replays</div>
                  </Link>
                    <Link
                      href="/courses/bundle"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors border-t border-gray-800"
                    >
                      <div className="font-semibold">The Oracle Boxing Method</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/membership"
              className={`text-sm font-semibold transition-colors ${
                isActive('/membership')
                  ? 'text-white border-b-2 border-[#26304a]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              MEMBERSHIP
            </Link>
            <Link
              href="/membership#pricing"
              className="px-4 py-2 border-2 border-red-800 text-white text-sm font-black rounded-lg uppercase tracking-wide hover:bg-red-800 transition-colors"
            >
              6-WEEK CHALLENGE
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-md hover:bg-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3">
              {/* Courses - Expandable */}
              <div>
                <button
                  onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                  className="w-full text-left text-sm font-semibold py-2 px-4 rounded-md transition-colors text-gray-300 hover:text-white hover:bg-gray-900 flex items-center justify-between"
                >
                  COURSES
                  <ChevronDown className={`w-4 h-4 transition-transform ${coursesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {coursesDropdownOpen && (
                  <div className="mt-2 ml-4 flex flex-col space-y-2">
                    <Link
                      href="/courses/bffp"
                      onClick={closeMobileMenu}
                      className={`text-sm font-semibold py-2 px-4 rounded-md transition-colors ${
                        pathname === '/courses/bffp'
                          ? 'text-white bg-[#26304a]'
                          : 'text-gray-300 hover:text-white hover:bg-gray-900'
                      }`}
                    >
                      Boxing from First Principles
                    </Link>
                    <Link
                      href="/courses/roadmap"
                      onClick={closeMobileMenu}
                      className={`text-sm font-semibold py-2 px-4 rounded-md transition-colors ${
                        pathname === '/courses/roadmap'
                          ? 'text-white bg-[#26304a]'
                          : 'text-gray-300 hover:text-white hover:bg-gray-900'
                      }`}
                    >
                      Boxing Roadmap
                    </Link>
                    <Link
                      href="/courses/vault"
                      onClick={closeMobileMenu}
                      className={`text-sm font-semibold py-2 px-4 rounded-md transition-colors ${
                        pathname === '/courses/vault'
                          ? 'text-white bg-[#26304a]'
                          : 'text-gray-300 hover:text-white hover:bg-gray-900'
                      }`}
                    >
                      Boxing Clinic Replays
                    </Link>
                    <Link
                      href="/courses/bundle"
                      onClick={closeMobileMenu}
                      className={`text-sm font-semibold py-2 px-4 rounded-md transition-colors border-t border-gray-800 ${
                        pathname === '/courses/bundle'
                          ? 'text-white bg-[#26304a]'
                          : 'text-gray-300 hover:text-white hover:bg-gray-900'
                      }`}
                    >
                      The Oracle Boxing Method
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/membership"
                onClick={closeMobileMenu}
                className={`text-sm font-semibold py-2 px-4 rounded-md transition-colors ${
                  isActive('/membership')
                    ? 'text-white bg-[#26304a]'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900'
                }`}
              >
                MEMBERSHIP
              </Link>
              <Link
                href="/membership#pricing"
                onClick={closeMobileMenu}
                className="px-4 py-3 border-2 border-red-800 text-white text-sm font-black rounded-lg uppercase tracking-wide hover:bg-red-800 transition-colors text-center"
              >
                6-WEEK CHALLENGE
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
