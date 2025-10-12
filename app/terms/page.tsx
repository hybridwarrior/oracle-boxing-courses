'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0E0E0E]">
      {/* Simple header with back button */}
      <header className="sticky top-0 z-50 bg-[#0E0E0E] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo-white.png"
                alt="Oracle Boxing"
                width={150}
                height={50}
                className="h-8 sm:h-10 w-auto"
              />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: January 2025</p>

        <div className="prose prose-lg prose-invert max-w-none text-gray-300">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Oracle Boxing's digital course platform and purchasing any courses,
              you accept and agree to be bound by these Terms of Service. If you do not agree to these terms,
              please do not use our services or purchase our courses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Service Description</h2>
            <p className="mb-4">
              Oracle Boxing provides online boxing training services including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Boxing Coaching Replays - Group coaching call recordings</li>
              <li>Boxing from First Principles - Comprehensive boxing course</li>
              <li>Boxing Roadmap - 5-phase training system</li>
              <li>Access to our private Skool community platform</li>
              <li>Digital course materials and video content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Digital Content License</h2>
            <p className="mb-4">
              Upon purchase, you are granted a non-exclusive, non-transferable license to access and use
              the digital course content for personal use only. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Share, distribute, or resell course materials</li>
              <li>Copy or reproduce content for commercial purposes</li>
              <li>Share your account credentials with others</li>
              <li>Download content for redistribution</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate information during purchase</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Respect other community members and coaches</li>
              <li>Not share or redistribute course materials</li>
              <li>Train safely and within your physical capabilities</li>
              <li>Consult with a healthcare provider before beginning any fitness program</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Health and Safety Disclaimer</h2>
            <p className="mb-4">
              Boxing is a physical activity that carries inherent risks. By participating in our programs, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You are physically capable of participating in boxing training</li>
              <li>You will follow all safety guidelines and recommendations</li>
              <li>Oracle Boxing is not liable for any injuries sustained during training</li>
              <li>You should consult a physician before starting any new exercise program</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              All content provided through Oracle Boxing, including videos, course materials, and training programs,
              is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create
              derivative works without explicit written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Refund Policy</h2>
            <p className="mb-4">
              All digital course purchases are final. We do not offer refunds for course purchases.
              Please review our complete <Link href="/refund" className="text-[#F25C05] underline">Refund Policy</Link> for more details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              Oracle Boxing provides training guidance and education but is not responsible for individual results.
              Our liability is limited to the amount paid for services. We are not liable for indirect, incidental,
              or consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Modifications to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Continued use of our services after changes
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="mb-4">
              Email: <a href="mailto:team@oracleboxing.com" className="text-[#F25C05] underline">team@oracleboxing.com</a><br />
              Website: https://oracleboxing.com
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © 2025 Oracle Boxing. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/refund" className="text-gray-400 hover:text-white transition-colors">
                Refund Policy
              </Link>
              <a
                href="mailto:team@oracleboxing.com"
                className="text-gray-400 hover:text-[#F25C05] transition-colors"
              >
                team@oracleboxing.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
