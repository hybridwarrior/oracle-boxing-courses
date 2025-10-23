'use client'

import { track } from '@vercel/analytics'
import * as gtag from '@/lib/gtag'

interface CheckoutEventData {
  value: number
  currency: string
  item_name: string
  button_text: string
  button_location: 'header' | 'hero' | 'proof' | 'course' | 'coaching' | 'community' | 'offer' | 'refund' | 'consequence' | 'story'
}

interface PurchaseEventData {
  value: number
  currency: string
  transaction_id: string
  item_name: string
}

interface StoryClickData {
  link_location: string
  destination_page: string
}

interface FAQEventData {
  question_text: string
  question_index: number
}

export const useAnalytics = () => {
  const trackInitiateCheckout = (data: CheckoutEventData) => {
    // Track in Vercel Analytics
    track('initiate_checkout', { ...data })
    
    // Track in Google Analytics 4
    gtag.initiateCheckout(data)
  }

  const trackPurchase = (data: PurchaseEventData) => {
    console.log('useAnalytics trackPurchase called with data:', data);
    
    try {
      // Track in Vercel Analytics
      console.log('Sending to Vercel Analytics...');
      track('purchase', { ...data });
      console.log('Vercel Analytics purchase event sent');
    } catch (error) {
      console.error('Failed to send Vercel Analytics purchase event:', error);
    }
    
    try {
      // Track in Google Analytics 4
      console.log('Sending to Google Analytics 4...');
      gtag.purchase(data);
      console.log('GA4 purchase event sent');
    } catch (error) {
      console.error('Failed to send GA4 purchase event:', error);
    }
  }

  const trackStoryClick = (data: StoryClickData) => {
    // Track in Vercel Analytics
    track('story_click', { ...data })
    
    // Track in Google Analytics 4
    gtag.storyClick(data)
  }

  const trackFAQExpand = (data: FAQEventData) => {
    // Track in Vercel Analytics
    track('faq_expand', { ...data })
    
    // Track in Google Analytics 4
    gtag.faqExpand(data)
  }

  const trackPageView = (page: string) => {
    // Track in Vercel Analytics
    track('page_view', { page })
    
    // Track in Google Analytics 4
    gtag.pageview(page)
  }

  return {
    trackInitiateCheckout,
    trackPurchase,
    trackStoryClick,
    trackFAQExpand,
    trackPageView,
  }
}