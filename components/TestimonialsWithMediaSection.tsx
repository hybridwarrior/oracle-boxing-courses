"use client";

import { EpicCTAButton } from '@/components/EpicCTAButton';

interface TestimonialsWithMediaSectionProps {
  onCTAClick?: () => void;
}

export default function TestimonialsWithMediaSection({ onCTAClick }: TestimonialsWithMediaSectionProps) {
  return (
    <section className="w-full py-24 sm:py-28 lg:py-36 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            <span className="underline decoration-red-600 decoration-4 underline-offset-4">Learn the right way</span>
          </h2>
        </div>

        {/* Niclas Testimonial - Course */}
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 mb-24">
          <div className="flex gap-8 flex-col">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="text-orange-400 text-6xl font-serif absolute -left-4 -top-2">"</div>
                  <blockquote className="text-lg text-gray-700 leading-relaxed px-8">
                    This is THE source of our kinetic energy potential. Can't thank you enough for the changes I've made thanks to your dedication with First Principles! It was the best choice of my martial arts life - the aha-moments are incredible!
                  </blockquote>
                  <div className="text-orange-400 text-6xl font-serif absolute -right-4 -bottom-8">"</div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <img
                    src="https://media.oracleboxing.com/webp/Website/niclas.webp"
                    alt="Niclas Laux"
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30"
                  />
                  <div>
                    <h4 className="text-gray-900 font-semibold text-base">Niclas Laux</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Founder of Samurai Movement Academy, BJJ Purple Belt, Self-Defense Instructor
                    </p>
                    <p className="text-gray-500 text-xs mt-1 italic">
                      Boxing from First Principles Course
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img
              src="https://media.oracleboxing.com/webp/Website/laptop_mockup.webp"
              alt="Boxing from First Principles Course"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Torey Testimonial - Live Coaching */}
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 mb-24">
          <div className="relative aspect-video rounded-xl overflow-hidden order-2 lg:order-1">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://media.oracleboxing.com/webm/Website/obcoachingcall.webm" type="video/webm" />
            </video>
          </div>
          <div className="flex gap-8 flex-col order-1 lg:order-2">
            <div className="lg:pl-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="text-orange-400 text-6xl font-serif absolute -left-4 -top-2">"</div>
                    <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed px-8">
                      I decided to recommit to this community and I already feel like I made breakthroughs on Toni and Ollie's zoom calls. I've gotta tip my hat to how effective you guys are at coaching in this format. I feel like I gain a significantly better understanding of technique every time I make a call.
                    </blockquote>
                    <div className="text-orange-400 text-6xl font-serif absolute -right-4 -bottom-8">"</div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <img
                      src="https://media.oracleboxing.com/webp/Website/torey.webp"
                      alt="Torey Goodall"
                      className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30"
                    />
                    <div>
                      <h4 className="text-gray-900 font-semibold text-base">Torey Goodall</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Community Member & Boxing Enthusiast
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balal Testimonial - Community */}
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 mb-12">
          <div className="flex gap-8 flex-col">
            <div className="lg:pl-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="text-orange-400 text-6xl font-serif absolute -left-4 -top-2">"</div>
                    <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed px-8">
                      Being part of this community has been an incredibly transformative experience. Joining the live Zoom calls almost every day has helped me lose weight, improve my technique, and significantly boost my confidence. The guidance, encouragement, and camaraderie have made a real difference in my development as a boxer.
                    </blockquote>
                    <div className="text-orange-400 text-6xl font-serif absolute -right-4 -bottom-8">"</div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <img
                      src="https://media.oracleboxing.com/webp/Website/balal.webp"
                      alt="Balal Hanif"
                      className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30"
                    />
                    <div>
                      <h4 className="text-gray-900 font-semibold text-base">Balal Hanif</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Community Member & Boxing Enthusiast
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://media.oracleboxing.com/webm/Website/online_rating.webm" type="video/webm" />
            </video>
          </div>
        </div>

        {/* Final CTA Button */}
        <div className="text-center mt-12">
          <EpicCTAButton
            size="lg"
            className="min-h-[72px]"
            onClick={onCTAClick}
            trackingName="testimonials"
          >
            <span className="text-lg sm:text-xl font-bold">Start the 6-Week Challenge →</span>
          </EpicCTAButton>
        </div>
      </div>
    </section>
  );
}
