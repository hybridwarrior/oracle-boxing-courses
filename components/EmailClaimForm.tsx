'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function EmailClaimForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch('https://hook.eu2.make.com/hexi6o7yyepx8v99rqd7pfqky7oig922', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Failed to submit email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Submit your email to receive access to a course you have already purchased
            </h2>

            <p className="text-gray-400 text-lg">
              If it's not working, email us at{' '}
              <a
                href="mailto:team@oracleboxing.com"
                className="text-[#F25C05] hover:text-[#FF6B1A] transition-colors"
              >
                team@oracleboxing.com
              </a>
            </p>

            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              You will receive an email invitation to join Oracle Boxing Courses Skool
              (can take up to 10 mins to come through)
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                disabled={isSubmitting}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base bg-[#F25C05] hover:bg-[#FF6B1A] text-white font-semibold"
              >
                {isSubmitting ? 'Submitting...' : 'Claim Access'}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="inline-block"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400 mx-auto"
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

            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Check Your Email!
              </h3>
              <p className="text-gray-400">
                We have sent you the Skool email (if you should have access to a course). It should arrive within 10 minutes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
