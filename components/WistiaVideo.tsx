'use client'

import { useEffect } from 'react'
import { videoComplete } from '@/lib/gtag'

export default function WistiaVideo() {
  useEffect(() => {
    // Track when Loom video might be completed (estimated based on time)
    // Loom doesn't have a native API for completion tracking
    const videoDuration = 15 * 60 * 1000; // Estimate 15 minutes
    const timer = setTimeout(() => {
      videoComplete({ video_title: 'VSL_2025_Loom' });
    }, videoDuration);

    return () => clearTimeout(timer);
  }, [])

  return (
    <div className="relative aspect-video max-w-4xl mx-auto rounded-lg sm:rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 shadow-2xl">
      <video
        poster="https://media.oracleboxing.com/Website/vsl2_thumbnail.webp"
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
        title="Oracle Boxing VSL 2025"
      >
        <source src="https://media.oracleboxing.com/Website/VSL2_2.webm" type="video/webm" />
        <source src="https://media.oracleboxing.com/Website/VSL2_2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}