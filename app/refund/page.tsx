'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function RefundPage() {
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
        <h1 className="text-4xl font-bold text-white mb-8">Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: January 2025</p>

        {/* Quick Summary Box */}
        <div className="bg-[#F25C05]/10 border-2 border-[#F25C05] rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-[#F25C05] mb-4 flex items-center gap-2">
            <AlertCircle className="w-8 h-8 text-[#F25C05]" />
            Digital Course Refund Policy
          </h2>
          <p className="text-lg text-gray-300">
            All digital course sales are final. We do not offer refunds for course purchases.
          </p>
        </div>

        <div className="prose prose-lg prose-invert max-w-none text-gray-300">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">No Refunds for Digital Courses</h2>
            <p className="mb-4">
              Oracle Boxing does not offer refunds for digital course purchases, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Boxing Coaching Replays</li>
              <li>Boxing Masterclass</li>
              <li>Boxing Roadmap (all phases)</li>
              <li>Individual phase courses</li>
              <li>Any other digital content or course materials</li>
            </ul>
            <p className="mb-4 font-semibold text-white">
              All sales are final. Please review course descriptions carefully before purchasing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Why No Refunds?</h2>
            <p className="mb-4">
              Once you purchase a digital course, you immediately gain access to all course materials.
              Due to the nature of digital products and to prevent abuse, we cannot offer refunds once
              access has been granted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Special Circumstances</h2>
            <p className="mb-4">
              While our general policy is no refunds, we understand that exceptional circumstances may arise.
              If you believe you have a special case, such as:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Technical issues preventing access to content</li>
              <li>Duplicate charges or billing errors</li>
              <li>Other extraordinary circumstances</li>
            </ul>
            <p className="mb-4">
              Please contact our support team with documentation, and we will review on a case-by-case basis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Disputes and Chargebacks</h2>
            <p className="mb-4">
              If you have a concern about a charge, please contact us directly at team@oracleboxing.com
              before initiating a chargeback. We're committed to resolving any billing issues quickly.
            </p>
            <p className="mb-4">
              Initiating a chargeback without first attempting to resolve the issue with us may result in
              permanent suspension of your account and loss of access to all content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="mb-4">
              For questions about our refund policy or assistance with course access:
            </p>
            <p className="mb-4">
              Email: <a href="mailto:team@oracleboxing.com" className="text-[#F25C05] underline">team@oracleboxing.com</a><br />
              Response time: Within 24 hours
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
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
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
