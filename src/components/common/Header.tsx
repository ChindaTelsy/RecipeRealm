'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';



export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
const { i18n, t } = useTranslation('auth');

  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowMobileSearch(!showMobileSearch);
  const toggleLangDropdown = () => setLangDropdownOpen((prev) => !prev);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'en' | 'fr' | null;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'en' | 'fr') => {
    i18n.changeLanguage(lang); // 🔥 this is what was missing
    setLanguage(lang);
    localStorage.setItem('lang', lang);
    setLangDropdownOpen(false);
  };

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
            className={`px-4 text-lg font-semibold transition ${pathname === '/' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
          >
           {t('header.welcome')}
          </Link>

          <Link
            href="/login"
            className={`px-4 text-lg font-semibold transition ${pathname === '/login' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
          >
           {t('header.login')}
          </Link>

          <Link
            href="/signup"
            className={`px-4 text-lg font-semibold transition ${pathname === '/signup' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
          >
           {t('header.signup')}
          </Link>
        </div>

        {/* Language Selector */}

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            aria-label="Select Language"
          >
            <Languages className="w-5 h-5 text-gray-600" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                onClick={() => {
                  handleLanguageChange('en');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'en' ? 'text-orange-600 font-medium' : 'text-gray-700'
                  }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => {
                  handleLanguageChange('fr');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'fr' ? 'text-orange-600 font-medium' : 'text-gray-700'
                  }`}
              >
                🇫🇷 Français
              </button>
            </div>
          )}
        </div>


        {/* Search and Mobile Menu Controls */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              aria-label={t('header.selectLanguage')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm w-52 sm:w-64"
            />
          </form>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleSearch}
          aria-label={t('header.toggleSearch')}
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
            aria-label={t('header.toggleMenu')}
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
              placeholder={t('header.searchPlaceholder')}
              aria-label={t('header.searchPlaceholder')}
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
              className={`text-base font-normal transition ${pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
              onClick={toggleMenu}
            >
             {t('header.welcome')}
            </Link>
            <Link
              href="/login"
              className={`text-base font-normal transition ${pathname === '/login' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
              onClick={toggleMenu}
            >
              {t('header.login')}
            </Link>
            <Link
              href="/signup"
              className={`text-base font-normal transition ${pathname === '/signup' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
              onClick={toggleMenu}
            >
              {t('header.signup')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
