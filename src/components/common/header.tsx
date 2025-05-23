'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowMobileSearch(!showMobileSearch);

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

        {/* Desktop Navigation Links - Centered */}
      <div className="hidden md:flex items-center space-x-6 ml-auto mr-8">
  <Link
    href="/"
    className="text-gray-700 hover:text-orange-600 transition px-4 text-lg font-semibold relative after:absolute after:right-0 after:text-gray-400 after:text-base after:top-1/2 after:-translate-y-1/2"
  >
    Home
  </Link>
  <Link
    href="/login"
    className="text-gray-700 hover:text-orange-600 transition px-4 text-lg font-semibold relative after:absolute after:right-0 after:text-gray-400 after:text-base after:top-1/2 after:-translate-y-1/2"
  >
    Login
  </Link>
  <Link
    href="/signup"
    className="text-gray-700 hover:text-orange-600 transition px-4 text-lg font-semibold"
  >
    Sign Up
  </Link>
</div>
        {/* Search - Desktop: visible, Mobile: icon */}
        <div className="flex items-center space-x-4">
          {/* Search input on medium+ screens */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search recipes..."
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm w-52 sm:w-64"
            />
          </div>

          {/* Search icon on small screens */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Mobile menu button */}
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

      {/* Mobile Search Input */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-2">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-orange-600 transition text-base font-normal"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-orange-600 transition text-base font-normal"
              onClick={toggleMenu}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-gray-600 hover:text-orange-600 transition text-base font-normal"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
