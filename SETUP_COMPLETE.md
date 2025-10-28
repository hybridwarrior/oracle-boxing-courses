# Oracle Boxing Courses Store - Setup Complete ✅

Your course store is ready! Here's what's been built:

## 🎯 What's Included

### Pages
- **`/`** - Main page with:
  - Email claim form (webhook to Make.com)
  - CTA to test full program (oracleboxing.com)
  - 3-course store grid

- **`/success`** - Purchase success page with:
  - Confetti animation
  - Skool invitation instructions
  - Support contact info

- **`/refund`** - Refund policy (no refunds for digital courses)
- **`/terms`** - Terms & Conditions

### Courses
1. **Boxing Coaching Replays** - $97
   - Image: `https://media.oracleboxing.com/Website/boxing_clinic.jpeg`
   - 140+ replay sessions description

2. **Boxing Masterclass** - $297
   - Image: `https://media.oracleboxing.com/Website/bffp_tn.jpg`
   - 5 modules (SENTIENCE, ANATOMY, FORMIS, GAMBIT, ENGINE)

3. **Boxing Roadmap** - $147
   - Image: `https://media.oracleboxing.com/Website/phase1.jpeg`
   - All 5 phases with nested modal navigation

### Features
- ✅ Dark theme (#0E0E0E bg, #FFFFFF text, #F25C05 accent)
- ✅ Satoshi font throughout
- ✅ Email webhook integration (Make.com)
- ✅ Course modals with full descriptions
- ✅ Roadmap with nested phase navigation
- ✅ Responsive design (4-col → 3-col → 2-col → 1-col)
- ✅ Skool-style hover effects on cards
- ✅ All images from remote CDN

## 🚀 Next Steps

### 1. Add Stripe Payment Links
Edit `/opt/courses/lib/courses.ts` and add your Stripe payment links:

```typescript
{
  id: 'boxing-coaching-replays',
  // ... other fields
  stripeUrl: 'YOUR_STRIPE_LINK_HERE' // Add this
},
```

### 2. Test Locally
```bash
cd /opt/courses
npm run dev
```

Visit: http://localhost:3000

### 3. Test the Flow
1. **Email Claim**: Submit email → Check Make.com webhook
2. **Course Modal**: Click course → View description → Click "Buy Now"
3. **Roadmap Modal**: Click Boxing Roadmap → View phases → Click phase → View details
4. **Purchase**: Buy Now → Stripe (new tab) → Success page

### 4. Deploy to Vercel
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
cd /opt/courses
vercel

# For production
vercel --prod
```

**Set custom domain**: `courses.oracleboxing.com` in Vercel dashboard

## 📁 Project Structure

```
/opt/courses/
├── app/
│   ├── page.tsx              # Main page
│   ├── success/page.tsx      # Purchase success
│   ├── refund/page.tsx       # Refund policy
│   ├── terms/page.tsx        # Terms & Conditions
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Satoshi fonts + dark theme
├── components/
│   ├── Header.tsx            # Logo header
│   ├── EmailClaimForm.tsx    # Email form with webhook
│   ├── CourseCard.tsx        # Course grid card
│   ├── CourseModal.tsx       # Course details modal
│   ├── RoadmapModal.tsx      # Nested phase navigation
│   ├── Footer.tsx            # Footer with links
│   ├── Confetti.tsx          # Success animation
│   └── ui/                   # Shadcn components
├── lib/
│   ├── courses.ts            # Course data
│   └── utils.ts              # Utilities
└── public/
    ├── logo-white.png        # Oracle Boxing logo
    └── fonts/                # Satoshi fonts
```

## 🔧 Configuration

### Email Webhook
- **URL**: `https://hook.eu2.make.com/hexi6o7yyepx8v99rqd7pfqky7oig922`
- **Method**: POST
- **Payload**: `{ "email": "user@example.com" }`

### Images (Remote CDN)
All images load from: `https://media.oracleboxing.com/Website/`
- boxing_clinic.jpeg
- bffp_tn.jpg
- phase1.jpeg → phase5.jpeg

### Colors
- Background: #0E0E0E
- Text: #FFFFFF
- Accent: #F25C05
- Muted: #3A3A3A

## 🐛 Troubleshooting

### Build Errors
```bash
cd /opt/courses
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### Missing Stripe Links
Course modals will show "Buy Now" as disabled until Stripe URLs are added to `/lib/courses.ts`

### Webhook Not Working
Check Make.com scenario is active and webhook URL is correct in `EmailClaimForm.tsx`

## 📝 To-Do Before Launch

- [ ] Add Stripe payment links to all 3 courses
- [ ] Test email webhook with Make.com
- [ ] Verify Skool invitation process works
- [ ] Test purchase flow end-to-end
- [ ] Deploy to Vercel
- [ ] Set up custom domain (courses.oracleboxing.com)
- [ ] Test on mobile devices

## 🎨 Customization

### Change Course Prices
Edit `/opt/courses/lib/courses.ts`:
```typescript
price: 97  // Change this number
```

### Update Course Descriptions
Edit the `description` field in `/opt/courses/lib/courses.ts`

### Modify Email Form Text
Edit `/opt/courses/components/EmailClaimForm.tsx`

### Change Success Page Message
Edit `/opt/courses/app/success/page.tsx`

---

**Need help?** Contact team@oracleboxing.com
