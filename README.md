# Oracle Boxing Shop

E-commerce platform for Oracle Boxing courses and products.

**Domain**: `shop.oracleboxing.com`

## Overview

This Next.js application serves as the storefront for Oracle Boxing digital products, including:
- Individual boxing courses
- Course bundles
- Training roadmaps
- Exclusive products

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the shop.

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable React components
- `/lib` - Utility functions and course data
- `/public` - Static assets (images, fonts)

## Key Features

- Course catalog with detailed modals
- Bundle pricing with discounts
- Stripe payment integration
- Responsive design
- Roadmap visualization

## Development

The shop uses:
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Radix UI** for accessible components

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Configure custom domain: `shop.oracleboxing.com`

## Environment Variables

No environment variables required for basic functionality.

## Related Projects

- **Main Website**: `oracleboxing.com` - Marketing and course access
- **Backend**: Make.com webhooks for course delivery
