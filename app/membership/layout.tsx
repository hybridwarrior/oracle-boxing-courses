import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membership | Oracle Boxing',
  description: 'Join 300+ boxers training with daily live coaching calls, complete course access, community support, and personalized video feedback. Starting from just $75/month with annual membership.',
  keywords: 'boxing membership, online boxing coaching, boxing community, live coaching, boxing training membership, oracle boxing membership',
  alternates: {
    canonical: '/membership',
  },
  openGraph: {
    title: 'Membership | Oracle Boxing',
    description: 'Join 300+ boxers training with daily live coaching calls, complete course access, community support, and personalized feedback.',
    url: 'https://oracleboxing.com/membership',
    siteName: 'Oracle Boxing',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://media.oracleboxing.com/Website/optimized/products/boxing_clinic-large.webp',
        width: 1200,
        height: 630,
        alt: 'Oracle Boxing Membership - Old School Boxing, New School System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Membership | Oracle Boxing',
    description: 'Join 300+ boxers training with daily live coaching calls, complete course access, and community support.',
    images: ['https://media.oracleboxing.com/Website/optimized/products/boxing_clinic-large.webp'],
  },
}

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
