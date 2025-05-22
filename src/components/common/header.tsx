'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              width={120}
              height={20}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 transition">
            Login
          </Link>
          <Link href="/auth/signup" className="text-gray-600 hover:text-blue-600 transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
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
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 transition" onClick={toggleMenu}>
              Login
            </Link>
            <Link href="/auth/signup" className="text-gray-600 hover:text-blue-600 transition" onClick={toggleMenu}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}