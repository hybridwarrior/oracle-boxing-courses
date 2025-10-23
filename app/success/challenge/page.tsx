'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Confetti } from '@/components/Confetti';
import { CheckCircle, Mail, Users } from 'lucide-react';

export default function ChallengeSuccessPage() {
  useEffect(() => {
    // Trigger confetti on page load
    const timer = setTimeout(() => {
      // Confetti will auto-play
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
              🎉 Congratulations!
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                You're in the Challenge!
              </span>
            </motion.h1>

            {/* Important Notice Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-red-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">Check Your Email!</h2>
              </div>

              <p className="text-lg text-gray-300 mb-6">
                We'll email you some extra details, but the <span className="text-red-500 font-semibold">most important thing</span> for you is to get inside of the Oracle Boxing Skool community.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <p className="text-white font-semibold text-lg mb-2">
                  ⏱️ In the next 2-3 minutes, you'll receive an invitation that looks like this:
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

            {/* Action Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-green-400 mr-2" />
                  <h3 className="text-xl font-bold text-green-400">Next Steps:</h3>
                </div>
                <ol className="text-left text-gray-300 space-y-2 max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="text-green-400 font-bold mr-2">1.</span>
                    <span>Check your email inbox (and spam folder)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 font-bold mr-2">2.</span>
                    <span>Click "Accept Invite" in the Skool invitation email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 font-bold mr-2">3.</span>
                    <span>Create your account and go through the onboarding course</span>
                  </li>
                </ol>
              </div>

              {/* Support Contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-center"
              >
                <p className="text-gray-400 mb-2">Having trouble getting into Skool?</p>
                <p className="text-lg">
                  <span className="text-gray-300">Email us at </span>
                  <a
                    href="mailto:team@oracleboxing.com"
                    className="text-red-500 hover:text-red-400 font-semibold transition-colors"
                  >
                    team@oracleboxing.com
                  </a>
                </p>
              </motion.div>

              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-12 pt-8 border-t border-gray-700"
              >
                <p className="text-2xl font-bold text-white mb-2">
                  Welcome to Oracle Boxing!
                </p>
                <p className="text-gray-400">
                  Your transformation journey starts now.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
