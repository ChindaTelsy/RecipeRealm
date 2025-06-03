'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { PlusCircle, CircleUser } from 'lucide-react';

export default function HeaderMin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowMobileSearch(!showMobileSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      router.push(`/Home?query=${encodeURIComponent(trimmed)}`);
      setIsMenuOpen(false);
      setShowMobileSearch(false);
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
              width={100}
              height={30}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/Home"
            className={`px-4 text-lg font-semibold transition ${
              pathname === '/Home' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
            }`}
          >
            Home
          </Link>

          <Link
            href="/Add-Recipe"
            className={`flex items-center gap-1 font-medium text-sm transition ${
              pathname === '/Add-Recipe' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-800'
            }`}
          >
            <PlusCircle className="w-5 h-5" /> Add Recipe
          </Link>

          <Link
            href="/profile"
            className={`hover:text-orange-600 transition ${
              pathname === '/profile' ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            <CircleUser className="w-6 h-6" />
          </Link>

          <Link
            href="/"
            className={`px-4 text-lg font-semibold transition ${
              pathname === '/' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
            }`}
          >
            Logout
          </Link>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm w-52 sm:w-64"
            />
          </form>
        </div>

        {/* Mobile icons */}
        <div className="flex items-center md:hidden space-x-4">
          <button onClick={toggleSearch} aria-label="Toggle search" className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button onClick={toggleMenu} aria-label="Toggle menu" className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile search */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-2">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              onClick={toggleMenu}
              className={`transition text-base font-normal ${
                pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Welcome
            </Link>

            <Link
              href="/Home"
              onClick={toggleMenu}
              className={`transition text-base font-normal ${
                pathname === '/Home' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Home
            </Link>

            <Link
              href="/Add-Recipe"
              onClick={toggleMenu}
              className={`flex items-center gap-1 font-medium text-base transition ${
                pathname === '/Add-Recipe' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-800'
              }`}
            >
              <PlusCircle className="w-5 h-5" /> Add Recipe
            </Link>

            <Link
              href="/profile"
              onClick={toggleMenu}
              className={`flex items-center gap-1 transition text-base ${
                pathname === '/profile' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <CircleUser className="w-5 h-5" /> Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
