import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2025 Oracle Boxing. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/refund"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
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
  )
}
