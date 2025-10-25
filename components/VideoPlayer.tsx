'use client'

interface VideoPlayerProps {
  videoUrl?: string
  thumbnail?: string
  title: string
}

export function VideoPlayer({ videoUrl = 'https://media.oracleboxing.com/Website/optimized/videos/VSL2_2.webm', thumbnail, title }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
      <p className="text-gray-400 text-sm">TRAILER VIDEO COMING SOON</p>
    </div>
  )
}
