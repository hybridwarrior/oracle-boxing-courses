'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Mail } from 'lucide-react'
import Confetti from '@/components/Confetti'

export default function SuccessPage() {
  useEffect(() => {
    // Trigger confetti on page load
    const timer = setTimeout(() => {
      // Confetti will auto-play
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Confetti />

      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  style={{ opacity: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Thank You for Your Purchase!
            </motion.h1>

            {/* Important Notice Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-[#F25C05] mr-3" />
                <h2 className="text-2xl font-bold text-white">Check Your Email!</h2>
              </div>

              <p className="text-lg text-gray-300 mb-6">
                Please look in your email for an invitation to join{' '}
                <span className="text-[#F25C05] font-semibold">Oracle Boxing Courses Free Skool</span>
              </p>

              <div className="bg-[#F25C05]/10 border border-[#F25C05]/30 rounded-xl p-6">
                <p className="text-white font-semibold text-lg mb-2">
                  ⏱️ Your invitation should arrive shortly and will look something like this:
                </p>
              </div>
            </motion.div>

            {/* Skool Invitation Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <div className="max-w-2xl mx-auto">
                <Image
                  src="https://media.oracleboxing.com/webp/Website/skool_invite.webp"
                  alt="Skool Invitation Example"
                  width={800}
                  height={450}
                  className="w-full rounded-xl shadow-2xl border border-gray-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                />
              </div>
            </motion.div>

            {/* Support Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <p className="text-gray-400 mb-2">Having trouble accessing your course?</p>
              <p className="text-lg">
                <span className="text-gray-300">Email us at </span>
                <a
                  href="mailto:team@oracleboxing.com"
                  className="text-[#F25C05] hover:text-[#FF6B1A] font-semibold transition-colors"
                >
                  team@oracleboxing.com
                </a>
              </p>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 pt-8 border-t border-gray-700"
            >
              <p className="text-2xl font-bold text-white mb-2">
                Welcome to Oracle Boxing!
              </p>
              <p className="text-gray-400">
                Your training journey starts now.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
