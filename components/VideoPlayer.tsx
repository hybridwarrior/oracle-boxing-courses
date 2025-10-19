'use client'

interface VideoPlayerProps {
  videoUrl?: string
  thumbnail?: string
  title: string
}

export function VideoPlayer({ videoUrl = 'https://media.oracleboxing.com/Website/VSL2_2.webm', thumbnail, title }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      <video
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
