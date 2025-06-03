'use client'

import PrivacyPolicyModal from '@/components/common/PrivacyPolicyModal'
import { Merriweather } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'

const MerriweatherFont = Merriweather({ subsets: ['latin'], weight: ['400'] })

export default function Footer() {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <footer className="bg-white-100 shadow-md py-4 mt-4">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className={`${MerriweatherFont.className} text-gray-700 text-xl leading-relaxed text-center`}>
          <strong className="text-gray-800 font-semibold">RecipeRealm</strong> is your go-to platform for discovering,
          sharing, and saving delicious recipes from around the world. Whether you're a beginner or a seasoned chef,
          find inspiration for your next meal with our curated collection of recipes.
        </p>

        {/* Links and Contact in a row */}
        <div className="flex justify-center space-x-20 mt-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Quick Links</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                {/* Changed from Link to button to open modal */}
                <button onClick={() => setModalOpen(true)} className="hover:underline text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Contact Us</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>
                Email:{' '}
                <a href="mailto:support@reciperealm.com" className="hover:underline">
                  support@reciperealm.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+237691753588" className="hover:underline">
                  +237 691753588
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-8 text-center">
          © {new Date().getFullYear()} RecipeRealm. All rights reserved.
        </p>
      </div>

      {/* Modal */}
      <PrivacyPolicyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  )
}
