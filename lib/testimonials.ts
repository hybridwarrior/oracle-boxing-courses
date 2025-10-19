// Global testimonials from community reviews

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

export const globalTestimonials: Testimonial[] = [
  {
    name: "Rod Keher",
    role: "Community Member",
    content: "Doing pad work yesterday and multiple times the coach asked me what I've been doing as my balance and therefore power was noticeably improved - 100% down to applying all the learning here! Thank you!",
    rating: 5
  },
  {
    name: "Bev M",
    role: "Community Member",
    content: "The training here is excellent! I wasn't expecting so much high-level of observation and precise, personal guidance from the coaches. I'm already noticing how making a few subtle changes can produce big results in energy conservation and effectiveness. It's pretty cool!",
    rating: 5
  },
  {
    name: "Myles Suehiro",
    role: "Community Member",
    content: "Being part of this community has been an incredibly transformative experience for me. Joining the live Zoom calls almost every day has not only helped me tweak and improve my technique, but it has also significantly boosted my confidence. The guidance, encouragement, and camaraderie I've experienced here has made all the difference in my development as a boxer.",
    rating: 5
  },
  {
    name: "Charlie Snider",
    role: "Community Member",
    content: "You need to find a passion that you truly love and that you can truly set and reach goals for. For me it was boxing. Work tirelessly for those goals and become obsessed with hitting them.",
    rating: 5
  },
  {
    name: "Balid Hanif",
    role: "Community Member",
    content: "Just finished 2nd kinetic chain with Toni. The analysis, insight and explanation was amazing. I've been around boxing for over 50 years and have never had this experience. This has worldwide implications for basic physical education for children.",
    rating: 5
  },
  {
    name: "Sam Oliver",
    role: "Community Member",
    content: "A great presentation, well presented - nice work! I'm in the process of shifting my current paradigm and this really helps by adding an additional layer of confluence for me that the shift is happening. It also further confirms my decision to join as it's exactly the path I've been on.",
    rating: 5
  },
  {
    name: "Balid Hanif",
    role: "Community Member",
    content: "I truly believe the knowledge and wisdom you share here alone is worth lot more than you charge for access. This part put all the puzzles into right places.",
    rating: 5
  },
  {
    name: "Niclas Laux",
    role: "Community Member",
    content: "I think you saved my life! I am not sure right now how many things will change, but my mind completely changed for better! Again I was sure that I will learn here how to box, thats for sure!",
    rating: 5
  },
  {
    name: "Bernardo D",
    role: "Community Member",
    content: "The Nervous System module was excellent. Control your breathing to control your central nervous system. Being relaxed allows you to perform better since relaxation removes tension. Practice how you want to perform - practicing slow ingrains your CNS to perform slowly. Your CNS has around 30-60 minutes in the tank to perform best.",
    rating: 5
  }
]

// Helper to get a random subset of testimonials
export function getRandomTestimonials(count: number = 6): Testimonial[] {
  const shuffled = [...globalTestimonials].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Helper to get all testimonials
export function getAllTestimonials(): Testimonial[] {
  return globalTestimonials
}
