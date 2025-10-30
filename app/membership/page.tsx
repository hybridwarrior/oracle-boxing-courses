'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MembershipTestimonials } from '@/components/MembershipTestimonials'
import { MembershipPricingPopup } from '@/components/MembershipPricingPopup'
import { getMemberships } from '@/lib/products'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Video, Users, Clock, BookOpen, Award, Target, TrendingUp, Heart, CheckCircle, CreditCard, Smartphone, TrendingUp as Progress, ChevronDown, Square, Check } from 'lucide-react'
import { AdaptivePrice, AdaptivePricePerMonth } from '@/components/AdaptivePrice'

export const dynamic = 'force-dynamic'

export default function MembershipsPage() {
  const router = useRouter()
  const memberships = getMemberships()
  const [selectedPlan, setSelectedPlan] = useState('membership-annual')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isPricingPopupOpen, setIsPricingPopupOpen] = useState(false)

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
      answer: "We offer three subscription options:\n\n• Quarterly: Billed every 3 months\n• 6-Month: Billed every 6 months (save ~15%)\n• Annual: Billed yearly (save ~25%)\n\nPrices are displayed in your local currency and automatically renew unless cancelled. You can switch to monthly billing after purchase."
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
      answer: "Courses (like BFFP and Oracle Boxing Bundle) teach the system — membership is where you train the system under live guidance and feedback."
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
    <>
      {/* Product Schema for Membership */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Oracle Boxing Membership",
            "description": "Ongoing boxing coaching and community program with daily live coaching calls, complete course access, personalized video feedback, and private community support.",
            "image": "https://media.oracleboxing.com/Website/optimized/products/boxing_clinic-large.webp",
            "brand": {
              "@type": "Brand",
              "name": "Oracle Boxing"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Annual Membership",
                "price": "897",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://oracleboxing.com/membership",
                "priceValidUntil": "2026-12-31"
              },
              {
                "@type": "Offer",
                "name": "Bi-Annual Membership",
                "price": "497",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://oracleboxing.com/membership"
              },
              {
                "@type": "Offer",
                "name": "Quarterly Membership",
                "price": "297",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://oracleboxing.com/membership"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "300"
            }
          })
        }}
      />

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
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-3 sm:mb-4 lg:mb-5 leading-relaxed">
                Master the timeless fundamentals of boxing through modern coaching methods, cutting-edge movement science, and a supportive global community.
              </p>

              {/* Pricing */}
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                Starting from just <AdaptivePricePerMonth usdAmount={897} months={12} metadata="mema" className="inline" />/mo
              </p>

              {/* CTA Button */}
              <button
                onClick={() => setIsPricingPopupOpen(true)}
                className="inline-block py-3 sm:py-4 lg:py-5 px-8 sm:px-10 lg:px-12 bg-yellow-100 text-black border-4 border-black font-black text-base sm:text-lg lg:text-xl rounded-lg uppercase tracking-wide cursor-pointer animate-bounce-subtle hover:bg-black hover:text-white transition-colors duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                ENROLL NOW
              </button>
            </div>

            {/* Right Column - Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-3xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://media.oracleboxing.com/Website/membership-herov4-frame.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="https://media.oracleboxing.com/Website/membership-herov4.webm" type="video/webm" />
                </video>
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
            {[
              { video: 'a_andre.webm', poster: 'a_andre-frame.jpg' },
              { video: 'a_shalyn.webm', poster: 'a_shalyn-frame.jpg' },
              { video: 'a_keli.webm', poster: 'a_keli-frame.jpg' },
              { video: 'a_charlie.webm', poster: 'a_charlie-frame.jpg' }
            ].map((item, index) => (
              <div key={index} className="relative aspect-[9/16] rounded-xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`https://media.oracleboxing.com/Website/${item.poster}`}
                  className="w-full h-full object-cover"
                >
                  <source src={`https://media.oracleboxing.com/Website/${item.video}`} type="video/webm" />
                </video>
              </div>
            ))}
          </div>

          {/* Mobile: Scrollable carousel */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4">
              {[
                { video: 'a_andre.webm', poster: 'a_andre-frame.jpg' },
                { video: 'a_shalyn.webm', poster: 'a_shalyn-frame.jpg' },
                { video: 'a_keli.webm', poster: 'a_keli-frame.jpg' },
                { video: 'a_charlie.webm', poster: 'a_charlie-frame.jpg' }
              ].map((item, index) => (
                <div key={index} className="relative flex-shrink-0 w-[280px] aspect-[9/16] rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={`https://media.oracleboxing.com/Website/${item.poster}`}
                    className="w-full h-full object-cover"
                  >
                    <source src={`https://media.oracleboxing.com/Website/${item.video}`} type="video/webm" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learn the Right Way Section */}
      <section className="w-full pt-12 pb-24 sm:py-28 lg:py-36 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Headline */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              <span className="bg-yellow-200/80 text-black px-2 py-[2px]">Learn the right way</span>
            </h2>
          </div>

          {/* Niclas Testimonial - Course */}
          <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 mb-12 sm:mb-16 lg:mb-12">
            <div className="flex gap-8 flex-col">
              <div className="bg-white rounded-xl p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <img
                      src="https://media.oracleboxing.com/webp/Website/niclas.webp"
                      alt="Niclas Laux"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-gray-900 font-semibold text-sm sm:text-base">Niclas Laux</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Founder of Samurai Movement Academy, BJJ Purple Belt, Self-Defense Instructor
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5 sm:mt-1 italic">
                        Boxing Masterclass Course
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    This is THE source of our kinetic energy potential. Can't thank you enough for the changes I've made thanks to your dedication with First Principles! It was the best choice of my martial arts life - the aha-moments are incredible!
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden lg:max-w-md lg:mx-auto" style={{ aspectRatio: '16/9' }}>
              <img
                src="https://media.oracleboxing.com/webp/Website/laptop_mockup.webp"
                alt="Boxing Masterclass Course"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Torey Testimonial - Live Coaching */}
          <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 mb-12 sm:mb-16 lg:mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden order-2 lg:order-1 lg:max-w-md lg:mx-auto">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="https://media.oracleboxing.com/Website/obcoachingcall-frame.jpg"
              >
                <source src="https://media.oracleboxing.com/Website/optimized/videos/obcoachingcall-optimized.webm" type="video/webm" />
              </video>
            </div>
            <div className="flex gap-8 flex-col order-1 lg:order-2">
              <div className="lg:pl-6">
                <div className="bg-white rounded-xl p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                      <img
                        src="https://media.oracleboxing.com/webp/Website/torey.webp"
                        alt="Torey Goodall"
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-gray-900 font-semibold text-sm sm:text-base">Torey Goodall</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Community Member & Boxing Enthusiast
                        </p>
                      </div>
                    </div>
                    <blockquote className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      I decided to recommit to this community and I already feel like I made breakthroughs on Toni and Ollie's zoom calls. I've gotta tip my hat to how effective you guys are at coaching in this format. I feel like I gain a significantly better understanding of technique every time I make a call.
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Balal Testimonial - Community */}
          <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 mb-12">
            <div className="flex gap-8 flex-col">
              <div className="lg:pl-6">
                <div className="bg-white rounded-xl p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                      <img
                        src="https://media.oracleboxing.com/webp/Website/balal.webp"
                        alt="Balal Hanif"
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-gray-900 font-semibold text-sm sm:text-base">Balal Hanif</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Community Member & Boxing Enthusiast
                        </p>
                      </div>
                    </div>
                    <blockquote className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      Being part of this community has been an incredibly transformative experience. Joining the live Zoom calls almost every day has helped me lose weight, improve my technique, and significantly boost my confidence. The guidance, encouragement, and camaraderie have made a real difference in my development as a boxer.
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden lg:max-w-md lg:mx-auto">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="https://media.oracleboxing.com/Website/online_rating-frame.jpg"
              >
                <source src="https://media.oracleboxing.com/Website/optimized/videos/online_rating-optimized.webm" type="video/webm" />
              </video>
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

      {/* Inline Membership Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
            Join Oracle Boxing for as little as <AdaptivePricePerMonth usdAmount={897} months={12} metadata="mema" className="inline" /> per month!
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            Choose the plan that fits your commitment level
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 sm:mb-8">
            {/* Annual - Left */}
            <div className="relative">
              {/* Best Value Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#000000] text-white text-xs font-black uppercase rounded-full z-10 whitespace-nowrap shadow-md">
                Best Value
              </div>

              <div
                onClick={() => setSelectedPlan('membership-annual')}
                className={`cursor-pointer rounded-xl border-2 transition-all ${
                  selectedPlan === 'membership-annual'
                    ? 'border-[#000000] shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-annual' ? 'border-[#000000] bg-[#000000]' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedPlan === 'membership-annual' && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Annual</h3>
                    <div className="text-3xl sm:text-4xl font-black text-gray-900">
                      <AdaptivePrice usdAmount={897} metadata="mema" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">Billed every year</div>
                  <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">
                        <AdaptivePricePerMonth usdAmount={897} months={12} metadata="mema" />
                      </div>
                      <div className="text-xs text-gray-600">/ month</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 text-center">incl. all taxes</div>
                </div>
              </div>
            </div>

            {/* 6-Month - Middle */}
            <div className="relative">
              <div
                onClick={() => setSelectedPlan('membership-6month')}
                className={`cursor-pointer rounded-xl border-2 transition-all ${
                  selectedPlan === 'membership-6month'
                    ? 'border-[#000000] shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-6month' ? 'border-[#000000] bg-[#000000]' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedPlan === 'membership-6month' && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Bi-Annual</h3>
                    <div className="text-3xl sm:text-4xl font-black text-gray-900">
                      <AdaptivePrice usdAmount={497} metadata="mem6" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">Billed every 6 months</div>
                  <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">
                        <AdaptivePricePerMonth usdAmount={497} months={6} metadata="mem6" />
                      </div>
                      <div className="text-xs text-gray-600">/ month</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 text-center">incl. all taxes</div>
                </div>
              </div>
            </div>

            {/* Quarterly - Right */}
            <div className="relative">
              <div
                onClick={() => setSelectedPlan('membership-monthly')}
                className={`cursor-pointer rounded-xl border-2 transition-all ${
                  selectedPlan === 'membership-monthly'
                    ? 'border-[#000000] shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'membership-monthly' ? 'border-[#000000] bg-[#000000]' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedPlan === 'membership-monthly' && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Quarterly</h3>
                    <div className="text-3xl sm:text-4xl font-black text-gray-900">
                      <AdaptivePrice usdAmount={297} metadata="memq" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">Billed every 3 months</div>
                  <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">
                        <AdaptivePricePerMonth usdAmount={297} months={3} metadata="memq" />
                      </div>
                      <div className="text-xs text-gray-600">/ month</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 text-center">incl. all taxes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Now Button */}
          <div className="text-center mb-3 sm:mb-4">
            <button
              onClick={() => router.push(`/checkout?product=${selectedPlan}&source=membership-page`)}
              className="py-4 sm:py-5 lg:py-6 px-10 sm:px-12 lg:px-14 bg-yellow-100 text-black font-black text-xl sm:text-2xl md:text-3xl rounded-xl uppercase tracking-wide transition-colors cursor-pointer hover:bg-yellow-200 flex items-center justify-center gap-2 mx-auto border-4 border-black shadow-lg"
            >
              CHECKOUT
              <span className="text-2xl sm:text-3xl">→</span>
            </button>
          </div>

          {/* Monthly billing note */}
          <p className="text-center text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
            You can switch to monthly billing at <AdaptivePrice usdAmount={97} metadata="mem_monthly" className="inline" />/month after purchase
          </p>

          {/* Payment Methods */}
          <div className="payment_icons-group mb-6 sm:mb-8">
            <img
              loading="lazy"
              alt=""
              src="https://media.oracleboxing.com/Website/payment1.svg"
              className="image-55"
            />
            <img
              loading="lazy"
              alt=""
              src="https://media.oracleboxing.com/Website/payment2.svg"
              className="image-55 second"
            />
            <img
              loading="lazy"
              alt=""
              src="https://media.oracleboxing.com/Website/paypal2.svg"
              className="image-55 bigger"
            />
            <img
              loading="lazy"
              src="https://media.oracleboxing.com/Website/klarna.svg"
              alt=""
              className="image-55 bigger-mobile"
            />
          </div>

          {/* Benefits List */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Unlimited access</strong> to all Oracle Boxing courses and replays
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Daily live coaching calls</strong> and community training sessions
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Personal feedback</strong> on your training videos from real coaches
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Access to the full Boxing Masterclass and Boxing Roadmap</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Entry to the private Skool coaching community</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Leaderboards, accountability, and live competitions</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Exclusive workshops, mentorship calls, and bonus drops</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-900">
                <strong className="font-bold">Free access</strong> to all future courses and system updates
              </span>
            </div>
          </div>

          {/* How it works */}
          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              How it works
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-8 h-8 text-[#000000]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-gray-900 font-semibold">
                  Choose your subscription and complete your purchase
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-8 h-8 text-[#000000]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-gray-900 font-semibold">
                  Login to the portal and download the app
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Progress className="w-8 h-8 text-[#000000]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-gray-900 font-semibold">
                  Start progressing faster than you could have imagined
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              It doesn't have to be one or the other, but if we're comparing...
            </h2>
          </div>

          {/* Two Paths Comparison */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Commercial Boxing Gyms */}
            <div className="relative">
              <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Commercial Boxing Gyms</h3>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex gap-2 sm:gap-3 items-start">
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700">Drive an hour</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3 items-start">
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700">Drill bad habits</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3 items-start">
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700">Get hit a bit too hard</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3 items-start">
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700">Hear "keep your hands up"</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3 items-start">
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700">Leave with more questions than answers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Coaching */}
            <div className="relative">
              <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Online Coaching</h3>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex gap-2 sm:gap-3 items-start">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-green-600" />
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700">Learn correct technique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="border-t border-gray-200"></div>
          </div>

          {/* Closing Statement */}
          <div className="text-center">
            <p className="text-base sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto text-gray-600 mb-8">
              Less effort. Better results.
            </p>
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

      {/* Pricing Popup */}
      <MembershipPricingPopup
        isOpen={isPricingPopupOpen}
        onClose={() => setIsPricingPopupOpen(false)}
        defaultPlan={selectedPlan}
      />

      <Footer />
    </div>
    </>
  )
}
