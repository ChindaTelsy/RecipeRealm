'use client'

import PrivacyPolicyModal from '@/components/common/PrivacyPolicyModal'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const [isModalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation('footer') // 'footer' should match your JSON namespace

  return (
    <footer className="bg-white-100 shadow-md py-4 mt-4">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-gray-700 text-xl leading-relaxed text-center">
          <strong className="text-gray-800 font-semibold">RecipeRealm</strong> {t('footer.description')}
        </p>

        {/* Links and Contact in a row */}
        <div className="flex justify-center space-x-20 mt-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">{t('footer.quickLinks')}</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>
                <Link href="/about" className="hover:underline">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <button onClick={() => setModalOpen(true)} className="hover:underline text-left">
                  {t('footer.privacyPolicy')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">{t('footer.contactUs')}</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>
                {t('footer.email')}: <a href="mailto:support@reciperealm.com" className="hover:underline">support@reciperealm.com</a>
              </li>
              <li>
                {t('footer.phone')}: <a href="tel:+237691753588" className="hover:underline">+237 691753588</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-8 text-center">
          © {new Date().getFullYear()} RecipeRealm. {t('footer.copyright')}
        </p>
      </div>

      <PrivacyPolicyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  )
}
