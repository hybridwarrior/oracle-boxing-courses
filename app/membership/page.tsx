'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MembershipTestimonials } from '@/components/MembershipTestimonials'
import { getMemberships } from '@/lib/products'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import { Video, Users, Clock, BookOpen, Award, Target, TrendingUp, Heart, CheckCircle } from 'lucide-react'

export default function MembershipsPage() {
  const router = useRouter()
  const { clearCart, addItem } = useCart()
  const memberships = getMemberships()
  const [selectedPlan, setSelectedPlan] = useState('membership-annual')

  // Membership testimonials with profile pictures
  const testimonials = [
    {
      name: "Rod Keher",
      role: "Community Member",
      content: "Doing pad work yesterday and multiple times the coach asked me what I've been doing as my balance and therefore power was noticeably improved - 100% down to applying all the learning here!",
      image: "https://media.oracleboxing.com/Website/bffp_tn.webp"
    },
    {
      name: "Bev M",
      role: "Community Member",
      content: "The training here is excellent! I wasn't expecting so much high-level of observation and precise, personal guidance from the coaches. I'm already noticing how making a few subtle changes can produce big results.",
      image: "https://media.oracleboxing.com/Website/phase1.webp"
    },
    {
      name: "Myles Suehiro",
      role: "Community Member",
      content: "Being part of this community has been an incredibly transformative experience for me. The guidance, encouragement, and camaraderie I've experienced here has made all the difference in my development as a boxer.",
      image: "https://media.oracleboxing.com/Website/boxing_clinic.webp"
    },
    {
      name: "Charlie Snider",
      role: "Community Member",
      content: "You need to find a passion that you truly love and that you can truly set and reach goals for. For me it was boxing. Work tirelessly for those goals and become obsessed with hitting them.",
      image: "https://media.oracleboxing.com/Website/bffp_tn.webp"
    },
    {
      name: "Balid Hanif",
      role: "Community Member",
      content: "Just finished 2nd kinetic chain with Toni. The analysis, insight and explanation was amazing. I've been around boxing for over 50 years and have never had this experience.",
      image: "https://media.oracleboxing.com/Website/phase1.webp"
    },
    {
      name: "Sam Oliver",
      role: "Community Member",
      content: "A great presentation, well presented - nice work! I'm in the process of shifting my current paradigm and this really helps by adding an additional layer of confluence for me.",
      image: "https://media.oracleboxing.com/Website/boxing_clinic.webp"
    },
    {
      name: "Niclas Laux",
      role: "Community Member",
      content: "I think you saved my life! I am not sure right now how many things will change, but my mind completely changed for better! I was sure that I will learn here how to box, and that's for sure!",
      image: "https://media.oracleboxing.com/Website/bffp_tn.webp"
    },
    {
      name: "Bernardo D",
      role: "Community Member",
      content: "The Nervous System module was excellent. Control your breathing to control your central nervous system. Being relaxed allows you to perform better since relaxation removes tension.",
      image: "https://media.oracleboxing.com/Website/phase1.webp"
    }
  ]

  const handleJoinNow = () => {
    const selected = memberships.find(m => m.id === selectedPlan)
    if (selected) {
      clearCart()
      addItem(selected)
      router.push('/checkout')
    }
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section - Two Column */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text & CTA */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Old School Boxing, New School System
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Master the timeless fundamentals of boxing through modern coaching methods, cutting-edge movement science, and a supportive global community.
              </p>

              {/* Stats Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-600 rounded-full">
                  <Award className="w-5 h-5 text-red-600" />
                  <span className="font-bold text-gray-900">#1 Online Coaching Program</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-gray-300 rounded-full">
                  <Users className="w-5 h-5 text-gray-700" />
                  <span className="font-bold text-gray-900">300+ Members</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#pricing"
                className="inline-block py-4 px-8 bg-red-800 text-white font-black text-lg rounded-lg shadow-lg uppercase tracking-wide transition-none"
              >
                LET'S GET TO WORK
              </a>
            </div>

            {/* Right Column - Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-800">
                <Image
                  src="https://media.oracleboxing.com/Website/bffp_tn.webp"
                  alt="Oracle Boxing App Demo"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Master boxing anytime, anywhere
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Everything you need to transform your boxing, accessible from any device
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6-Week Challenge Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform in 6 Weeks
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Join our intensive 6-week boxing challenge designed to dramatically improve your technique, conditioning, and ring IQ.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                This structured program combines daily coaching, progressive skill development, and community accountability to ensure you make real, measurable progress.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're preparing for your first sparring session or looking to refine advanced techniques, this challenge will push you to new levels of boxing excellence.
              </p>

              <a
                href="#pricing"
                className="inline-block py-4 px-8 bg-red-800 text-white font-black text-lg rounded-lg shadow-lg uppercase tracking-wide transition-none"
              >
                START TODAY
              </a>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full aspect-[16/9] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://media.oracleboxing.com/Website/boxing_clinic.webp"
                  alt="6-Week Challenge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            4 out of 5 members see incredible progress
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Real transformations from members who committed to the process
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="relative aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://media.oracleboxing.com/Website/bffp_tn.webp"
                  alt={`Member transformation ${index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <MembershipTestimonials testimonials={testimonials} />

      {/* Pricing & How It Works Section - Combined */}
      <section id="pricing" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pricing Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Join Oracle Boxing for as little as $2.46 per day!
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Choose the plan that fits your commitment level
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Annual - Left */}
            <div className="relative">
              {/* Best Value Badge - On the border line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-red-800 text-white text-sm font-black uppercase rounded-full z-10 whitespace-nowrap shadow-md">
                Best Value
              </div>

              <div
                onClick={() => setSelectedPlan('membership-annual')}
                className={`cursor-pointer rounded-xl border-2 transition-all ${
                  selectedPlan === 'membership-annual'
                    ? 'border-red-800 shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio Button and Content - Compact */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-annual' ? 'border-red-800 bg-red-800' : 'border-gray-300 bg-white'
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
                    ? 'border-red-800 shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio Button and Content - Compact */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-6month' ? 'border-red-800 bg-red-800' : 'border-gray-300 bg-white'
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
                    ? 'border-red-800 shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio Button and Content - Compact */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-monthly' ? 'border-red-800 bg-red-800' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedPlan === 'membership-monthly' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Mobile: 3 lines total */}
                  <div className="block sm:hidden">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Monthly</h3>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div>
                        <div className="text-4xl font-black text-gray-900">$97</div>
                        <div className="text-sm text-gray-600">Billed every month</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center flex-shrink-0">
                        <div className="text-xl font-bold text-gray-900">$97</div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">per month</div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Same layout */}
                  <div className="hidden sm:block">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">Monthly</h3>
                      <div className="text-4xl font-black text-gray-900">$97</div>
                    </div>
                    <div className="text-gray-600 mb-4">Billed every month</div>
                    <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
                      <div className="text-2xl font-bold text-gray-900">$97</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Now Button */}
          <div className="text-center mb-20">
            <button
              onClick={handleJoinNow}
              className="py-5 px-12 bg-red-800 text-white font-black text-xl rounded-xl shadow-lg uppercase tracking-wide transition-none"
            >
              JOIN NOW
            </button>
          </div>

          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
              How it works
            </h2>

            {/* Desktop: Horizontal with arrows */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 items-start relative">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="https://media.oracleboxing.com/Website/bffp_tn.webp"
                    alt="Choose your subscription"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-lg text-gray-900 font-semibold">
                  Choose your subscription and complete your purchase
                </p>
              </div>

              {/* Arrow 1 */}
              <div className="absolute top-[25%] left-[30%] w-[15%] flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 0 20 Q 50 20 100 20" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="95,15 100,20 95,25" fill="#9CA3AF"/>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="https://media.oracleboxing.com/Website/phase1.webp"
                    alt="Login to portal"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-lg text-gray-900 font-semibold">
                  Login to the portal and download the app
                </p>
              </div>

              {/* Arrow 2 */}
              <div className="absolute top-[25%] left-[63%] w-[15%] flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 0 20 Q 50 20 100 20" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="95,15 100,20 95,25" fill="#9CA3AF"/>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="https://media.oracleboxing.com/Website/boxing_clinic.webp"
                    alt="Start progressing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
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
                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="https://media.oracleboxing.com/Website/bffp_tn.webp"
                    alt="Choose your subscription"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className="text-base text-gray-900 font-semibold">
                  Choose your subscription and complete your purchase
                </p>
              </div>

              {/* Vertical Arrow */}
              <div className="flex justify-center">
                <svg className="w-8 h-12" viewBox="0 0 40 100" preserveAspectRatio="none">
                  <path d="M 20 0 Q 20 50 20 100" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="15,95 20,100 25,95" fill="#9CA3AF"/>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="https://media.oracleboxing.com/Website/phase1.webp"
                    alt="Login to portal"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className="text-base text-gray-900 font-semibold">
                  Login to the portal and download the app
                </p>
              </div>

              {/* Vertical Arrow */}
              <div className="flex justify-center">
                <svg className="w-8 h-12" viewBox="0 0 40 100" preserveAspectRatio="none">
                  <path d="M 20 0 Q 20 50 20 100" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  <polygon points="15,95 20,100 25,95" fill="#9CA3AF"/>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="https://media.oracleboxing.com/Website/boxing_clinic.webp"
                    alt="Start progressing"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className="text-base text-gray-900 font-semibold">
                  Start progressing faster than you could have imagined
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
