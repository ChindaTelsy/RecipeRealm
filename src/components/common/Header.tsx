'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowMobileSearch(!showMobileSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (term) {
      router.push(`/Welcomepage?query=${encodeURIComponent(term)}`);
      setShowMobileSearch(false);
      setIsMenuOpen(false);
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = mobileSearchTerm.trim();
    if (term) {
      router.push(`/Welcomepage?query=${encodeURIComponent(term)}`);
      setShowMobileSearch(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/RecipeRealm.png"
              alt="RecipeRealm Logo"
              width={110}
              height={20}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 ml-auto mr-8">
          <Link
            href="/"
            className={`px-4 text-lg font-semibold transition ${pathname === '/' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
              }`}
          >
            Welcome
          </Link>

          <Link
            href="/login"
            className={`px-4 text-lg font-semibold transition ${pathname === '/login' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
              }`}
          >
            LogIn
          </Link>

          <Link
            href="/signup"
            className={`px-4 text-lg font-semibold transition ${pathname === '/signup' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
              }`}
          >
            SignUp
          </Link>
        </div>

        {/* Search and Mobile Menu Controls */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm w-52 sm:w-64"
            />
          </form>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-2">
          <form onSubmit={handleMobileSearch}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={mobileSearchTerm}
              onChange={(e) => setMobileSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </form>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className={`text-base font-normal transition ${pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              onClick={toggleMenu}
            >
              Welcome
            </Link>

            <Link
              href="/"
              className={`text-base font-normal transition ${pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              onClick={toggleMenu}
            >
              LogIn
            </Link>

            <Link
              href="/"
              className={`text-base font-normal transition ${pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              onClick={toggleMenu}
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
