export const GA_TRACKING_ID = 'G-L6KY3Q6RDF'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category?: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for your tracking needs
export const initiateCheckout = (data: {
  value: number
  currency: string
  item_name: string
  button_location: string
  button_text: string
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'initiate_checkout', {
      value: data.value,
      currency: data.currency,
      item_name: data.item_name,
      button_location: data.button_location,
      button_text: data.button_text,
      items: [{
        item_name: data.item_name,
        price: data.value,
        quantity: 1
      }]
    })
  }
}

export const purchase = (data: {
  value: number
  currency: string
  transaction_id: string
  item_name: string
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      value: data.value,
      currency: data.currency,
      transaction_id: data.transaction_id,
      items: [{
        item_name: data.item_name,
        price: data.value,
        quantity: 1
      }]
    })
  }
}

export const storyClick = (data: {
  link_location: string
  destination_page: string
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'story_click', {
      link_location: data.link_location,
      destination_page: data.destination_page
    })
  }
}

export const faqExpand = (data: {
  question_text: string
  question_index: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'faq_expand', {
      question_text: data.question_text,
      question_index: data.question_index
    })
  }
}

export const videoComplete = (data: {
  video_title: string
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'video_complete', {
      video_title: data.video_title
    })
  }
}