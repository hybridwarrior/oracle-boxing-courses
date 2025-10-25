'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EpicCTAButton } from '@/components/EpicCTAButton'

interface TransformationStoryProps {
  onCTAClick?: () => void;
}

interface Testimonial {
  name: string
  image: string
  badge: string
  title: string
  content: string[]
  hashtag?: string
}

export default function TransformationStory({ onCTAClick }: TransformationStoryProps) {
  const fontFamily = 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const testimonials: Testimonial[] = [
    {
      name: "Bruno Martins",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/bruno-256.webp",
      badge: "10h (edited) • 🏆 Win of the Day",
      title: "Week 6! Here you are... and damn that went fast!",
      content: [
        "Even today, while still recovering from a bit of a flu, I somehow found myself waking up at 6:40 AM for a +5km run. (Even writing that makes me laugh… who IS this person? 😄)",
        "I can genuinely SEE and FEEL the shift happening — and it's all been sparked by being part of Oracle Boxing. #SpoonBending",
        "The value that @Oliver Betts @Jordan Lyne, and @Antonio Troni bring is WAY BEYOND what I ever expected when I joined this challenge.",
        "One of the biggest moments was realizing just how deeply these guys care about improving boxing — those 1:1 calls for the top 10 leaderboard are insane!",
        "All I can say is, if you're starting your challenge — I hope you enjoy it even half as much as I am, you'll be hooked!"
      ],
      hashtag: "#FUCKPLANB"
    },
    {
      name: "Daniel Ramirez",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/daniel-256.webp",
      badge: "1d ago • 🏆 WOTD",
      title: "Week 6 🤯 - The final results",
      content: [
        "Hello everyone. This is it. These are the final results that I got from the last 6 weeks of this challenge. It's been a pleasure to join this community, and the journey doesn't end here, cause I really want to continue in OB.",
        "I want to really thank you guys for all of the support throughout this 6 weeks. I mainly joined because I watched Hybrid Warrior Elite videos, then I saw Oracle Boxing and the challenge, and since I was already training for my rookie tournament, I decided to commit.",
        "The material is very rich in content, from videos to coaching calls, even 1-1 calls for the top 10. I had the opportunity to take 3 of them, making significant progress in my technique and my way of seeing boxing.",
        "The boxing from first principles course was a huge rewiring of my thinking and I didn't even start the boxing roadmap yet. You could be training here and learning new things for months, maybe years! 🥶"
      ]
    },
    {
      name: "Illya",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/iilya-256.webp",
      badge: "2d ago",
      title: "JOINING ORACLE BOXING",
      content: [
        "We got to know each other and had a real good talk, and I already made it clear I'm in Oracle Boxing for the long haul. But just now at the end of the day, I had yet another epiphany about just what an amazing decision I made when I first joined up just a few weeks ago.",
        "I am very early in my transformation as a boxer, but because I have such a deep passion for this sport, I am truly humbled by the passion, dedication and depth of analysis exemplified by our coaches here.",
        "@Oliver Betts @Antonio Troni @Charlie Snider and Jordan have organized something very special here for all of us, and the more I explore all the resources on this site available to those of us who want to master the nuances of the sweet science, I'm just knocked out by the wealth of knowledge on offer here.",
        "I want to say to all of you, if you were attracted to this place by the excitement of becoming a real boxer, then dive in DEEP, recommit with absolute intensity to that goal, knowing you have every asset necessary to achieve exactly that and change your life forever."
      ],
      hashtag: "#FUCKPLANB"
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextTestimonial()
    }
    if (isRightSwipe) {
      prevTestimonial()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative bg-white py-24 sm:py-28 lg:py-36 overflow-hidden" style={{ fontFamily }}>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'ClashDisplay, system-ui, sans-serif', fontWeight: '700', color: '#222', letterSpacing: '0.02em', lineHeight: '1.2' }}>
            Old School Boxing, New School System
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Swipe indicator for mobile */}
          <div className="sm:hidden text-center mb-4">
            <p className="text-sm text-gray-500 italic">Swipe for more →</p>
          </div>

          {/* Left Arrow - Hidden on mobile, visible on desktop */}
          <button
            onClick={prevTestimonial}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-8 h-8 text-gray-900" />
          </button>

          {/* Right Arrow - Hidden on mobile, visible on desktop */}
          <button
            onClick={nextTestimonial}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-8 h-8 text-gray-900" />
          </button>

          <div
            className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-[60px] h-[60px] relative overflow-hidden rounded-full">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  width={60}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{currentTestimonial.name}</h3>
                <p className="text-sm text-gray-600">{currentTestimonial.badge}</p>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p className="font-semibold text-xl">{currentTestimonial.title}</p>

              {currentTestimonial.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {currentTestimonial.hashtag && (
                <p className="font-bold text-lg pt-2">
                  {currentTestimonial.hashtag}
                </p>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <EpicCTAButton
              size="lg"
              className="min-h-[72px]"
              onClick={onCTAClick}
              trackingName="transformation-story"
            >
              <span className="text-lg sm:text-xl font-bold">Start the 6-Week Challenge →</span>
            </EpicCTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}