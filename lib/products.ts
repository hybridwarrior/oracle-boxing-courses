import { Product, ProductType } from './types'

export const products: Product[] = [
  // COURSES
  {
    id: 'bundle',
    title: 'Ultimate Boxing Bundle',
    price: 397,
    type: 'course',
    stripe_product_id: 'prod_TFmod6ppCFTAeK',
    stripe_price_id: 'price_1SJHEYQNEdHwdojXKabKx7Co',
    image: 'https://media.oracleboxing.com/Website/bundle_tn3.png',
    shortDescription: 'Every Course, Every Call, Every System, All in One Bundle.',
    perfectFor: 'Serious boxers who want to master everything, fast',
    moduleCount: 5,
    lessonCount: 225,
    lessonCountPrefix: '+',
    workoutCount: 100,
    description: `**Get everything. Master boxing from first principles to real application.**

**This bundle includes:**
• Boxing Coaching Replays ($97)
• Boxing from First Principles ($297)
• Boxing Roadmap ($147)

**Total value: $541**
**Bundle price: $397**
**You save: $144**

Complete access to the entire Oracle Boxing system — theory, technique, tactics, and live coaching insights.`
  },
  {
    id: 'bffp',
    title: 'Boxing from First Principles',
    price: 297,
    type: 'course',
    stripe_product_id: 'prod_TFmlgAWSWoZNd1',
    stripe_price_id: 'price_1SJHC1QNEdHwdojX9XpMqAIg',
    image: 'https://media.oracleboxing.com/Website/bffp_tn5.png',
    shortDescription: 'The Science of Boxing, Made Simple.',
    perfectFor: 'Beginners who crave a deep understanding',
    moduleCount: 5,
    lessonCount: 26,
    hours: 13,
    description: `**SENTIENCE — The Mind of the Fighter**
Learn how to think, feel, and perform like a boxer. Shift your paradigm for success, build mental clarity, and access flow on command.

**ANATOMY — The Wiring of Performance**
Understand how your body truly works beneath the surface. Study the nervous system, fascia, and energy transfer through the body.

**FORMIS — The Language of Movement**
Master the mechanics of boxing. Develop shape, stance, striking, defence, distance control, and the flow of movement.

**GAMBIT — The Science of Tactics**
Learn to think like a strategist in the ring. Understand pattern recognition, positioning, deception, and guard manipulation.

**ENGINE — The Physiology of Fighting**
Build the engine that powers it all. Train breathing, conditioning, nervous system strength, and recovery.`
  },
  {
    id: 'roadmap',
    title: 'Boxing Roadmap',
    price: 147,
    type: 'course',
    stripe_product_id: 'prod_TFmmyK5gaHYbao',
    stripe_price_id: 'price_1SJHCjQNEdHwdojX2so8c1bC',
    image: 'https://media.oracleboxing.com/Website/tbrtn5hq.png',
    shortDescription: 'Your Full 5-Month Boxing Curriculum: Technique, Drills, and Workouts.',
    perfectFor: 'Beginners who want structure from first punch to sparring',
    weeks: 20,
    workoutCount: 100,
    description: `Complete 5-phase boxing training system from fundamentals to mastery.

**Phase I** — Fundamentals & Form
**Phase II** — Defence, Range & Sparring Basics
**Phase III** — Dynamic Footwork & Balance
**Phase IV** — Defensive Mastery & Feints
**Phase V** — Precision & Application

Master every aspect of boxing technique through structured progression.`
  },
  {
    id: 'vault',
    title: 'Boxing Clinic',
    price: 97,
    type: 'course',
    stripe_product_id: 'prod_TFmnqbbE3RFuDJ',
    stripe_price_id: 'price_1SJHDaQNEdHwdojXizOuxB5G',
    image: 'https://media.oracleboxing.com/Website/boxing_clinic.png',
    shortDescription: 'Your Full Library of Real Coaching Calls, Uncut and Organized.',
    perfectFor: 'Fighters who learn best by watching real coaching in action',
    lessonCount: 100,
    lessonCountPrefix: '+',
    updatedMonthly: true,
    description: `💬 140+ Replay Sessions

Weekly calls with Oliver & Toni, covering every layer of the Oracle Boxing system — from jab mechanics and flow drills to kinetic linkage, counterpunching, and footwork integration.

Watch how each concept is applied live. Updated monthly.

**Recent topics (Oct 2025):**
• Liver Shot Setups
• Flow of Boxing
• Kinetic Linkage
• Shifting Mechanics
• Defence + Counter Flow

**Includes:** All 2024–2025 replays (Jan → Oct) + archives from the Boxing Clinic category.`
  },

  // MEMBERSHIPS
  {
    id: 'membership-monthly',
    title: 'Oracle Membership (Monthly)',
    price: 97,
    type: 'membership',
    recurring: true,
    interval: 'month',
    stripe_product_id: 'prod_TFmpbnQ0DuiAVx',
    stripe_price_id: 'price_1SJHFWQNEdHwdojX8Krmr96Q',
    image: 'https://media.oracleboxing.com/Website/boxing_clinic.webp',
    description: `**Monthly access to live coaching, community, and all courses**

✓ Weekly live coaching calls with Oliver & Toni
✓ Access to all courses (BFFP, Roadmap, Vault)
✓ Private community with expert feedback
✓ Monthly technique breakdowns and Q&A
✓ Cancel anytime

Transform your boxing with ongoing expert guidance.`
  },
  {
    id: 'membership-6month',
    title: 'Oracle Membership (6-Month)',
    price: 497,
    type: 'membership',
    recurring: true,
    interval: '6 months',
    stripe_product_id: 'prod_TFmqPWjGj2cw8d',
    stripe_price_id: 'price_1SJHGWQNEdHwdojXsbxAgQki',
    image: 'https://media.oracleboxing.com/Website/boxing_clinic.webp',
    description: `**6 months of access — save vs monthly**

✓ Everything in Monthly Membership
✓ Save $85 vs monthly ($497 vs $582)
✓ Commit to mastery with 6 months of expert guidance
✓ Perfect for serious skill development

Best for dedicated students ready to transform their boxing.`
  },
  {
    id: 'membership-annual',
    title: 'Oracle Membership (Annual)',
    price: 897,
    type: 'membership',
    recurring: true,
    interval: 'year',
    stripe_product_id: 'prod_TFmrJdTCobm0Wu',
    stripe_price_id: 'price_1SJHHLQNEdHwdojXiJo58ldM',
    image: 'https://media.oracleboxing.com/Website/boxing_clinic.webp',
    description: `**Annual membership — best value**

✓ Everything in Monthly Membership
✓ Save $267 vs monthly ($897 vs $1,164)
✓ Full year of expert coaching and community
✓ Maximum commitment to mastery

Best value for serious boxers committed to long-term excellence.`
  }
]

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByType(type: ProductType): Product[] {
  return products.filter(p => p.type === type)
}

export function getCourses(): Product[] {
  return products.filter(p => p.type === 'course')
}

export function getMemberships(): Product[] {
  return products.filter(p => p.type === 'membership')
}
