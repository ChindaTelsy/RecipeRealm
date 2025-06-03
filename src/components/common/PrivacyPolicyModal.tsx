// components/PrivacyPolicyModal.tsx
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'

export default function PrivacyPolicyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-2xl font-bold text-orange-600">Privacy Policy</Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <X />
            </button>
          </div>
          <div className="text-sm text-gray-700 space-y-4">
            <p>
              We value your privacy. This policy explains how we collect, use, and protect your personal information.
            </p>

            <h2 className="font-semibold text-lg">1. What We Collect</h2>
            <ul className="list-disc pl-6">
              <li>Your name, email (when you sign up)</li>
              <li>Usage data (e.g. views, likes, ratings)</li>
            </ul>

            <h2 className="font-semibold text-lg">2. How We Use Your Data</h2>
            <ul className="list-disc pl-6">
              <li>To improve user experience</li>
              <li>To send service-related communications</li>
            </ul>

            <h2 className="font-semibold text-lg">3. Contact</h2>
            <p>Contact us at <a className="underline text-blue-600" href="mailto:support@reciperealm.com">support@reciperealm.com</a>.</p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
