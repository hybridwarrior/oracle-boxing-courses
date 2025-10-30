// Testimonials optimized for 5th grade reading level

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

// BFFP (Boxing Masterclass) Testimonials
export const bffpTestimonials: Testimonial[] = [
  {
    name: "Marcus Chen",
    role: "BFFP Student",
    content: "This course taught me the right way to throw a punch. My power improved so much! Now I understand how my whole body works together.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "BFFP Student",
    content: "I learned more in 5 lessons than I did in 2 years at my gym. The videos are clear and easy to follow. My footwork got so much better!",
    rating: 5
  },
  {
    name: "James Rodriguez",
    role: "BFFP Student",
    content: "The breathing lessons changed everything for me. I used to get tired in round 2. Now I can go for 6 rounds without getting winded!",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "BFFP Student",
    content: "Finally understand why my punches weren't landing right. The weight transfer lesson was a game changer. My jab is twice as fast now!",
    rating: 5
  },
  {
    name: "David Park",
    role: "BFFP Student",
    content: "Best boxing course I've ever taken. Everything is broken down step by step. Even my coach noticed my punches got cleaner!",
    rating: 5
  },
  {
    name: "Rachel Green",
    role: "BFFP Student",
    content: "Used to get frustrated because I couldn't box like the pros. This course showed me exactly what I was doing wrong. Now boxing feels natural!",
    rating: 5
  }
]

// Roadmap Testimonials
export const roadmapTestimonials: Testimonial[] = [
  {
    name: "Alex Martinez",
    role: "Roadmap Student",
    content: "This roadmap gave me a clear plan to follow. No more guessing what to practice. I know exactly what to work on each week!",
    rating: 5
  },
  {
    name: "Jordan Lee",
    role: "Roadmap Student",
    content: "I was so lost before finding this. Now I have a path from beginner to advanced. The step-by-step drills are perfect!",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Roadmap Student",
    content: "The progression makes sense. Each drill builds on the last one. I can see myself getting better every single week!",
    rating: 5
  },
  {
    name: "Michael Brown",
    role: "Roadmap Student",
    content: "Finally have a training plan that works. The videos show me exactly what good form looks like. No more bad habits!",
    rating: 5
  },
  {
    name: "Sophie Anderson",
    role: "Roadmap Student",
    content: "Best part is I can train at my own pace. The roadmap keeps me on track but I can go back and practice when I need to.",
    rating: 5
  },
  {
    name: "Chris Taylor",
    role: "Roadmap Student",
    content: "Used to waste time practicing the wrong stuff. This roadmap shows me the most important skills to focus on. My progress is faster now!",
    rating: 5
  }
]

// Bundle Testimonials
export const bundleTestimonials: Testimonial[] = [
  {
    name: "Tyler Johnson",
    role: "Bundle Student",
    content: "Getting all the courses together was the smartest choice. The masterclass teaches technique, the roadmap gives me the plan. Perfect combo!",
    rating: 5
  },
  {
    name: "Nina Patel",
    role: "Bundle Student",
    content: "This bundle has everything I need. The courses work great together. I'm learning faster than I ever thought possible!",
    rating: 5
  },
  {
    name: "Kevin Wright",
    role: "Bundle Student",
    content: "Worth every penny. Instead of buying one course, I got all of them. Now I have the full system to become a real boxer!",
    rating: 5
  },
  {
    name: "Amanda Foster",
    role: "Bundle Student",
    content: "The vault recordings are gold. When I miss something in the masterclass, I find the answer in a coaching call recording. Everything connects!",
    rating: 5
  },
  {
    name: "Ryan Mitchell",
    role: "Bundle Student",
    content: "Best investment in my boxing journey. All the courses plus the recordings give me answers to every question I have!",
    rating: 5
  },
  {
    name: "Jessica Kim",
    role: "Bundle Student",
    content: "Tried buying courses one at a time before. This bundle saves money and gives me the complete picture. Wish I found this sooner!",
    rating: 5
  }
]

// Global/General Testimonials (optimized for 5th grade reading)
export const globalTestimonials: Testimonial[] = [
  {
    name: "Rod Keher",
    role: "Community Member",
    content: "Did pad work yesterday and my coach kept asking what I've been doing. My balance and power got way better - all from what I learned here!",
    rating: 5
  },
  {
    name: "Bev M",
    role: "Community Member",
    content: "The training here is great! I didn't expect such detailed, personal help from the coaches. Small changes made big results!",
    rating: 5
  },
  {
    name: "Myles Suehiro",
    role: "Community Member",
    content: "Being part of this community changed my life. Joining the live calls helped me box better and feel more confident. The help here made all the difference!",
    rating: 5
  },
  {
    name: "Charlie Snider",
    role: "Community Member",
    content: "Find something you really love and set goals for it. For me it was boxing. Work hard for those goals and get obsessed with hitting them.",
    rating: 5
  },
  {
    name: "Balid Hanif",
    role: "Community Member",
    content: "Just finished my session with Toni. The way he breaks things down was amazing. I've been boxing for over 50 years and never had this experience.",
    rating: 5
  },
  {
    name: "Sam Oliver",
    role: "Community Member",
    content: "Great stuff! I'm changing how I think about boxing and this really helps. It confirms I made the right choice to join.",
    rating: 5
  },
  {
    name: "Niclas Laux",
    role: "Community Member",
    content: "I think you saved my life! My mind changed for the better! I was sure I'd learn to box here, and I was right!",
    rating: 5
  },
  {
    name: "Bernardo D",
    role: "Community Member",
    content: "The Nervous System lesson was great. Control your breathing to control your body. Being relaxed helps you box better!",
    rating: 5
  }
]

// Helper to get a random subset of testimonials
export function getRandomTestimonials(count: number = 6): Testimonial[] {
  const shuffled = [...globalTestimonials].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Helper to get BFFP testimonials
export function getBffpTestimonials(count: number = 6): Testimonial[] {
  return bffpTestimonials.slice(0, count)
}

// Helper to get Roadmap testimonials
export function getRoadmapTestimonials(count: number = 6): Testimonial[] {
  return roadmapTestimonials.slice(0, count)
}

// Helper to get Bundle testimonials
export function getBundleTestimonials(count: number = 6): Testimonial[] {
  return bundleTestimonials.slice(0, count)
}

// Helper to get all testimonials
export function getAllTestimonials(): Testimonial[] {
  return globalTestimonials
}
