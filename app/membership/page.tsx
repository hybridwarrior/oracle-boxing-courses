'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MembershipTestimonials } from '@/components/MembershipTestimonials'
import { getMemberships } from '@/lib/products'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Video, Users, Clock, BookOpen, Award, Target, TrendingUp, Heart, CheckCircle, CreditCard, Smartphone, TrendingUp as Progress, ChevronDown } from 'lucide-react'

export default function MembershipsPage() {
  const router = useRouter()
  const memberships = getMemberships()
  const [selectedPlan, setSelectedPlan] = useState('membership-annual')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Membership testimonials with profile pictures
  const testimonials = [
    {
      name: "Torey Goodall",
      role: "Community Member",
      content: "Doing pad work yesterday and multiple times the coach asked me what I've been doing as my balance and therefore power was noticeably improved - 100% down to applying all the learning here!",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/torey-256.webp"
    },
    {
      name: "Harvey Swift",
      role: "Community Member",
      content: "The training here is excellent! I wasn't expecting so much high-level of observation and precise, personal guidance from the coaches. I'm already noticing how making a few subtle changes can produce big results.",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/harvey-256.webp"
    },
    {
      name: "Myles Suehiro",
      role: "Community Member",
      content: "Being part of this community has been an incredibly transformative experience for me. The guidance, encouragement, and camaraderie I've experienced here has made all the difference in my development as a boxer.",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/luacs-256.webp"
    },
    {
      name: "Charlie Snider",
      role: "Community Member",
      content: "You need to find a passion that you truly love and that you can truly set and reach goals for. For me it was boxing. Work tirelessly for those goals and become obsessed with hitting them.",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/charlie-256.webp"
    },
    {
      name: "Balal Hanif",
      role: "Community Member",
      content: "Just finished 2nd kinetic chain with Toni. The analysis, insight and explanation was amazing. I've been around boxing for over 50 years and have never had this experience.",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/balal-256.webp"
    },
    {
      name: "Sam Oliver",
      role: "Community Member",
      content: "A great presentation, well presented - nice work! I'm in the process of shifting my current paradigm and this really helps by adding an additional layer of confluence for me.",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/niko-256.webp"
    },
    {
      name: "Niclas Laux",
      role: "Community Member",
      content: "I think you saved my life! I am not sure right now how many things will change, but my mind completely changed for better! I was sure that I will learn here how to box, and that's for sure!",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/niclas-256.webp"
    },
    {
      name: "Bernardo D",
      role: "Community Member",
      content: "The Nervous System module was excellent. Control your breathing to control your central nervous system. Being relaxed allows you to perform better since relaxation removes tension.",
      image: "https://media.oracleboxing.com/Website/optimized/profiles/bernardo-256.webp"
    }
  ]

  const handleJoinNow = () => {
    // Direct URL routing - no cart needed
    router.push(`/checkout?product=${selectedPlan}`)
  }

  const benefits = [
    {
      icon: Video,
      title: 'Daily Coaching Calls',
      description: 'Live sessions with Oliver & Toni to refine your technique and answer questions'
    },
    {
      icon: Users,
      title: '300+ Members',
      description: 'Join a thriving community of dedicated boxers from around the world'
    },
    {
      icon: BookOpen,
      title: 'All Courses Included',
      description: 'Full access to BFFP, Boxing Roadmap, and Coaching Call Replays'
    },
    {
      icon: Clock,
      title: 'Train Anytime',
      description: 'Access all content 24/7 on mobile, tablet, or desktop from anywhere'
    }
  ]

  const steps = [
    'Choose your subscription and complete your purchase',
    'Login to the portal and download the app',
    'Start progressing faster than you could have imagined'
  ]

  const faqs = [
    {
      question: "What is the Full Access Membership?",
      answer: "The Full Access Membership is Oracle Boxing's ongoing coaching and community program. It's where boxers train live with the coaches every week, get feedback on their clips, and continue building their skill after completing any of the courses or the 6-Week Challenge."
    },
    {
      question: "What do I get with my membership?",
      answer: "Live coaching calls twice per week with Oliver, Toni, and the team. Video feedback on your uploaded clips. Access to all call replays through the Recordings Vault. Community support via our private Skool group. Progress tracking and accountability tools."
    },
    {
      question: "How much does it cost?",
      answer: "Quarterly: $297 every 3 months\n6-Month: $497 every 6 months (save ~15%)\nAnnual: $897/year (save ~25%)\n\nAll prices are in USD and automatically renew unless cancelled. You can switch to monthly billing at $97/month after purchase."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. You can cancel your membership anytime from your account settings or by emailing team@oracleboxing.com. Your access will continue until the end of your current billing period."
    },
    {
      question: "What happens if I cancel?",
      answer: "You'll lose access to live calls, feedback, and the private community at the end of your billing cycle. However, any courses you've purchased separately remain in your account permanently."
    },
    {
      question: "Is there a refund policy?",
      answer: "Membership payments are non-refundable since they include live access and coaching time. You can, however, cancel future renewals anytime."
    },
    {
      question: "What's the difference between membership and the 6-Week Challenge?",
      answer: "The 6-Week Challenge is a short-term structured program with a refund guarantee if completed. The Membership is an ongoing coaching ecosystem where you continue to level up, refine your skills, and get direct feedback long-term."
    },
    {
      question: "What's the difference between membership and the courses?",
      answer: "Courses (like BFFP and The Oracle Boxing Method) teach the system — membership is where you train the system under live guidance and feedback."
    },
    {
      question: "What are the membership tiers?",
      answer: "Quarterly: Flexibility and short-term access.\nBi-Annual: Best for consistent improvement; includes discounted pricing.\nAnnual: Best overall value and bonuses like extended vault access."
    },
    {
      question: "What are the optional add-ons?",
      answer: "Lifetime Access (All Courses): $197 keep every course forever.\n1-Month 1-on-1 Coaching: $397 — four weeks of private Zoom coaching and custom training feedback."
    },
    {
      question: "How do I join the calls?",
      answer: "Once subscribed, you'll receive the Zoom links and calendar invites in your member dashboard and email each week. You can join from any device."
    },
    {
      question: "What if I miss a call?",
      answer: "All sessions are recorded and uploaded to the Recordings Vault, which is included in your membership. You can rewatch anytime."
    },
    {
      question: "Who are the coaches?",
      answer: "Your primary coaches are Oliver Betts, Coach Toni, and Coach Charlie."
    },
    {
      question: "How do I get help with billing or access?",
      answer: "Email team@oracleboxing.com for any support requests. Replies usually arrive within 24 hours (Mon–Fri)."
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section - Two Column */}
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Text & CTA */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
                Old School Boxing, New School System
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                Master the timeless fundamentals of boxing through modern coaching methods, cutting-edge movement science, and a supportive global community.
              </p>

              {/* Stats Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 border-2 border-red-600 rounded-full">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  <span className="text-xs sm:text-sm lg:text-base font-bold text-gray-900">#1 Online Coaching Program</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-block py-3 sm:py-4 px-6 sm:px-8 bg-[#26304a] text-white font-black text-base sm:text-lg rounded-lg shadow-lg uppercase tracking-wide transition-none cursor-pointer"
              >
                LET'S GET TO WORK
              </a>
            </div>

            {/* Right Column - Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-3xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://media.oracleboxing.com/Website/membership_hero.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 6-Week Challenge Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
                Try the 6-Week Challenge
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2 sm:mb-3 lg:mb-4">
                Our 6-Week Challenge is designed to transform your boxing fundamentals with daily coaching, structured progression, and a supportive community.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2 sm:mb-3 lg:mb-4">
                We're so confident you'll see results that we offer a money-back guarantee. Complete the requirements and if you're not satisfied, we'll refund your investment—no questions asked.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-5 lg:mb-6">
                Join hundreds of boxers who've already transformed their skills and confidence in just 6 weeks.
              </p>

              <a
                href="/6wc"
                className="inline-block py-3 sm:py-4 px-6 sm:px-8 bg-[#26304a] text-white font-black text-base sm:text-lg rounded-lg shadow-lg uppercase tracking-wide transition-none"
              >
                START TODAY
              </a>
            </div>

            {/* Right Column - Bruno Testimonial */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-gray-50 rounded-xl p-6 w-full max-w-md">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="text-orange-400 text-6xl font-serif absolute -left-4 -top-2">"</div>
                    <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed px-8">
                      I can genuinely SEE and FEEL the shift happening — and it's all been sparked by being part of Oracle Boxing. The value that Oliver, Jordan, and Toni bring is WAY BEYOND what I ever expected when I joined this challenge.
                    </blockquote>
                    <div className="text-orange-400 text-6xl font-serif absolute -right-4 -bottom-8">"</div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <img
                      src="https://media.oracleboxing.com/Website/optimized/profiles/bruno-256.webp"
                      alt="Bruno Martins"
                      className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30"
                    />
                    <div>
                      <h4 className="text-gray-900 font-semibold text-base">Bruno Martins</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        6-Week Challenge Graduate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-center">
            4 out of 5 members see incredible progress
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12">
            Real transformations from members who committed to the process
          </p>

          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {['t_andre.mp4', 'sha-lyn.mp4', 't_keli.mp4', 't_charlie.mp4'].map((video, index) => (
              <div key={index} className="relative aspect-[9/16] rounded-xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={`https://media.oracleboxing.com/Website/${video}`} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>

          {/* Mobile: Scrollable carousel */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4">
              {['t_andre.mp4', 'sha-lyn.mp4', 't_keli.mp4', 't_charlie.mp4'].map((video, index) => (
                <div key={index} className="relative flex-shrink-0 w-[280px] aspect-[9/16] rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={`https://media.oracleboxing.com/Website/${video}`} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineered For Results Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Engineered for results
          </h2>

          {/* Stacked Cards - Always Vertical */}
          <div className="space-y-12 sm:space-y-16">
            {/* Daily Coaching Calls */}
            <div className="mt-16 sm:mt-20 overflow-visible">
              <div className="bg-white border-2 border-gray-200 rounded-lg overflow-visible p-8 sm:p-10 pt-28 sm:pt-36 text-center">
                <div className="-mt-44 sm:-mt-52 mb-6 sm:mb-8 mx-auto w-48 h-36 sm:w-64 sm:h-44 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="https://media.oracleboxing.com/Website/optimized/testimonials/torey_goodall.mp4" type="video/mp4" />
                  </video>
                </div>
                <h3 className="font-bold text-gray-900 text-xl sm:text-2xl mb-4">Daily Coaching Calls</h3>
                <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
                  I decided to recommit to this community and I already feel like I made breakthroughs on Toni and Ollie's zoom calls. I've gotta tip my hat to how effective you guys are at coaching in this format. I feel like I gain a significantly better understanding of technique every time I make a call.
                </p>
                <div className="flex items-center gap-4 justify-center">
                  <img
                    src="https://media.oracleboxing.com/Website/optimized/profiles/torey-256.webp"
                    alt="Torey Goodall"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Torey Goodall</p>
                    <p className="text-sm text-gray-600">Community Member & Boxing Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All Courses Included */}
            <div className="mt-16 sm:mt-20 overflow-visible">
              <div className="bg-white border-2 border-gray-200 rounded-lg overflow-visible p-8 sm:p-10 pt-28 sm:pt-36 text-center">
                <div className="-mt-44 sm:-mt-52 mb-6 sm:mb-8 mx-auto w-48 h-36 sm:w-64 sm:h-44 rounded-lg overflow-hidden">
                  <img
                    src="https://media.oracleboxing.com/Website/optimized/courses/bundle-thumbnail.webp"
                    alt="All Courses"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-gray-900 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                  All courses included: Boxing from First Principles, Boxing Roadmap, and Coaching Call Replays
                </p>
              </div>
            </div>

            {/* Train Anytime */}
            <div className="mt-16 sm:mt-20 overflow-visible">
              <div className="bg-white border-2 border-gray-200 rounded-lg overflow-visible p-8 sm:p-10 pt-28 sm:pt-36 text-center">
                <div className="-mt-44 sm:-mt-52 mb-6 sm:mb-8 mx-auto w-48 h-36 sm:w-64 sm:h-44 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="https://media.oracleboxing.com/Website/optimized/testimonials/balal_hanif.mp4" type="video/mp4" />
                  </video>
                </div>
                <h3 className="font-bold text-gray-900 text-xl sm:text-2xl mb-4">Train Anytime, Anywhere</h3>
                <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
                  Being part of this community has been an incredibly transformative experience. Joining the live Zoom calls almost every day has helped me lose weight, improve my technique, and significantly boost my confidence. The guidance, encouragement, and camaraderie have made a real difference in my development as a boxer.
                </p>
                <div className="flex items-center gap-4 justify-center">
                  <img
                    src="https://media.oracleboxing.com/Website/optimized/profiles/balal-256.webp"
                    alt="Balal Hanif"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Balal Hanif</p>
                    <p className="text-sm text-gray-600">Community Member & Boxing Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See Inside The Platform Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
            See Inside The Platform
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            Everything you need to master boxing, all in one place
          </p>

          {/* Scrollable Carousel */}
          <div className="overflow-x-auto -mx-4 px-4 mb-8 sm:mb-12">
            <div
              className="flex gap-6 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ minWidth: 'max-content' }}
            >
              {[
                {
                  image: 'https://media.oracleboxing.com/Website/optimized/screenshots/inside1.webp',
                  title: 'All Your Courses in One Place',
                  subtitle: 'Access all three courses from a single organized dashboard'
                },
                {
                  image: 'https://media.oracleboxing.com/Website/optimized/screenshots/inside2.webp',
                  title: 'Deep-Dive Video Lessons',
                  subtitle: 'Follow structured modules with detailed video demonstrations and theory'
                },
                {
                  image: 'https://media.oracleboxing.com/Website/optimized/screenshots/inside3.webp',
                  title: 'Follow-Along Workouts',
                  subtitle: 'Train with phase-by-phase drills and structured workout progressions'
                },
                {
                  image: 'https://media.oracleboxing.com/Website/optimized/screenshots/inside4.webp',
                  title: 'Powerful Search Feature',
                  subtitle: 'Find any technique, concept, or drill instantly across all courses'
                },
                {
                  image: 'https://media.oracleboxing.com/Website/optimized/screenshots/phone_mockup1.webp',
                  title: 'Train Anywhere, Anytime',
                  subtitle: 'Full mobile access means you can learn and train from any device'
                }
              ].map((screenshot, index) => (
                <div
                  key={index}
                  className="snap-center w-[85vw] md:w-[500px] lg:w-[600px]"
                >
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                      <Image
                        src={screenshot.image}
                        alt={screenshot.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 360px, (max-width: 1024px) 500px, 600px"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {screenshot.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {screenshot.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-[#26304a] text-white font-black text-base sm:text-lg lg:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none cursor-pointer"
            >
              I WANT ACCESS
            </a>
          </div>
        </div>

        {/* Hide scrollbar */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      {/* Testimonials Section */}
      <MembershipTestimonials testimonials={testimonials} />

      {/* Pricing & How It Works Section - Combined */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pricing Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-center">
            Join Oracle Boxing for as little as $2.46 per day!
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12">
            Choose the plan that fits your commitment level
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Annual - Left */}
            <div className="relative">
              {/* Best Value Badge - On the border line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-[#26304a] text-white text-sm font-black uppercase rounded-full z-10 whitespace-nowrap shadow-md">
                Best Value
              </div>

              <div
                onClick={() => setSelectedPlan('membership-annual')}
                className={`cursor-pointer rounded-xl border-2 transition-all ${
                  selectedPlan === 'membership-annual'
                    ? 'border-[#26304a] shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio Button and Content - Compact */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-annual' ? 'border-[#26304a] bg-[#26304a]' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedPlan === 'membership-annual' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Mobile: 3 lines total */}
                  <div className="block sm:hidden">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Annual</h3>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div>
                        <div className="text-4xl font-black text-gray-900">$897</div>
                        <div className="text-sm text-gray-600">Billed every year</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center flex-shrink-0">
                        <div className="text-xl font-bold text-gray-900">$74.75</div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">per month</div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Same layout */}
                  <div className="hidden sm:block">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">Annual</h3>
                      <div className="text-4xl font-black text-gray-900">$897</div>
                    </div>
                    <div className="text-gray-600 mb-4">Billed every year</div>
                    <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
                      <div className="text-2xl font-bold text-gray-900">$74.75</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6-Month - Middle */}
            <div className="relative">
              <div
                onClick={() => setSelectedPlan('membership-6month')}
                className={`cursor-pointer rounded-xl border-2 transition-all ${
                  selectedPlan === 'membership-6month'
                    ? 'border-[#26304a] shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio Button and Content - Compact */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-6month' ? 'border-[#26304a] bg-[#26304a]' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedPlan === 'membership-6month' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Mobile: 3 lines total */}
                  <div className="block sm:hidden">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Bi-Annual</h3>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div>
                        <div className="text-4xl font-black text-gray-900">$497</div>
                        <div className="text-sm text-gray-600">Billed every 6 months</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center flex-shrink-0">
                        <div className="text-xl font-bold text-gray-900">$82.83</div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">per month</div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Same layout */}
                  <div className="hidden sm:block">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">Bi-Annual</h3>
                      <div className="text-4xl font-black text-gray-900">$497</div>
                    </div>
                    <div className="text-gray-600 mb-4">Billed every 6 months</div>
                    <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
                      <div className="text-2xl font-bold text-gray-900">$82.83</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly - Right */}
            <div className="relative">
              <div
                onClick={() => setSelectedPlan('membership-monthly')}
                className={`cursor-pointer rounded-xl border-2 transition-all ${
                  selectedPlan === 'membership-monthly'
                    ? 'border-[#26304a] shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio Button and Content - Compact */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-monthly' ? 'border-[#26304a] bg-[#26304a]' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedPlan === 'membership-monthly' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Mobile: 3 lines total */}
                  <div className="block sm:hidden">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Quarterly</h3>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div>
                        <div className="text-4xl font-black text-gray-900">$297</div>
                        <div className="text-sm text-gray-600">Billed every 3 months</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center flex-shrink-0">
                        <div className="text-xl font-bold text-gray-900">$99</div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">per month</div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Same layout */}
                  <div className="hidden sm:block">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">Quarterly</h3>
                      <div className="text-4xl font-black text-gray-900">$297</div>
                    </div>
                    <div className="text-gray-600 mb-4">Billed every 3 months</div>
                    <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
                      <div className="text-2xl font-bold text-gray-900">$99</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Now Button */}
          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={handleJoinNow}
              className="py-3 sm:py-4 lg:py-5 px-8 sm:px-10 lg:px-12 bg-[#26304a] text-white font-black text-base sm:text-lg lg:text-xl rounded-xl shadow-lg uppercase tracking-wide transition-none cursor-pointer"
            >
              JOIN NOW
            </button>
          </div>

          {/* Monthly billing note */}
          <p className="text-center text-gray-600 text-xs sm:text-sm mb-12 sm:mb-16 lg:mb-20">
            You can switch to monthly billing at $97/month after purchase
          </p>

          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12 text-center">
              How it works
            </h2>

            {/* Desktop: Horizontal with arrows */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 items-start relative">
              {/* Step 1 */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 bg-[#26304a]/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-16 h-16 text-[#26304a]" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-lg text-gray-900 font-semibold">
                  Choose your subscription and complete your purchase
                </p>
              </div>

              {/* Arrow 1 */}
              <div className="absolute top-[15%] left-[33%] w-[10%] flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 0 20 Q 50 20 100 20" stroke="#000000" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="95,15 100,20 95,25" fill="#000000"/>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 bg-[#26304a]/10 rounded-full flex items-center justify-center">
                    <Smartphone className="w-16 h-16 text-[#26304a]" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-lg text-gray-900 font-semibold">
                  Login to the portal and download the app
                </p>
              </div>

              {/* Arrow 2 */}
              <div className="absolute top-[15%] left-[57%] w-[10%] flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 0 20 Q 50 20 100 20" stroke="#000000" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="95,15 100,20 95,25" fill="#000000"/>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 bg-[#26304a]/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-[#26304a]" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-lg text-gray-900 font-semibold">
                  Start progressing faster than you could have imagined
                </p>
              </div>
            </div>

            {/* Mobile: Vertical with arrows */}
            <div className="md:hidden space-y-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-[#26304a]/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-12 h-12 text-[#26304a]" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-base text-gray-900 font-semibold">
                  Choose your subscription and complete your purchase
                </p>
              </div>

              {/* Vertical Arrow */}
              <div className="flex justify-center">
                <svg className="w-8 h-8" viewBox="0 0 40 100" preserveAspectRatio="none">
                  <path d="M 20 0 Q 20 50 20 100" stroke="#000000" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="15,95 20,100 25,95" fill="#000000"/>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-[#26304a]/10 rounded-full flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-[#26304a]" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-base text-gray-900 font-semibold">
                  Login to the portal and download the app
                </p>
              </div>

              {/* Vertical Arrow */}
              <div className="flex justify-center">
                <svg className="w-8 h-8" viewBox="0 0 40 100" preserveAspectRatio="none">
                  <path d="M 20 0 Q 20 50 20 100" stroke="#000000" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="15,95 20,100 25,95" fill="#000000"/>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-[#26304a]/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-[#26304a]" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-base text-gray-900 font-semibold">
                  Start progressing faster than you could have imagined
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pr-4 sm:pr-6 lg:pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 bg-gray-50">
                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
