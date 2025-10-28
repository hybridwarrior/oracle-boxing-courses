interface LearningCard {
  emoji: string
  text: string
  imageUrl?: string
}

interface CourseCurriculumProps {
  title?: string
  learningCards: LearningCard[]
  showButton?: boolean
  buttonText?: string
  onButtonClick?: (e: React.MouseEvent) => void
}

export function CourseCurriculum({
  title = "This Course Will Teach You...",
  learningCards,
  showButton = false,
  buttonText = "JOIN NOW",
  onButtonClick
}: CourseCurriculumProps) {
  const isVideo = (url?: string) => {
    if (!url) return false
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')
  }

  return (
    <section className="py-8 sm:py-16 bg-white overflow-visible">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-16 w-full mx-auto overflow-visible">
          {learningCards.map((card, index) => (
            <div key={index} className="mt-12 sm:mt-20 overflow-visible">
              <div className="bg-white border-2 border-gray-200 rounded-lg overflow-visible p-6 sm:p-10 pt-20 sm:pt-36 text-center">
                {/* Image or Video - spills over top */}
                <div className="-mt-32 sm:-mt-52 mb-4 sm:mb-8 mx-auto w-40 h-32 sm:w-64 sm:h-44 rounded-lg overflow-hidden">
                  {isVideo(card.imageUrl) ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={card.imageUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={card.imageUrl || 'https://placehold.co/400x300/e5e5e5/666666?text=Boxing'}
                      alt="Course visual"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Text content */}
                <p className="font-bold text-gray-900 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional CTA Button */}
        {showButton && (
          <div className="text-center mt-6 sm:mt-12">
            <a
              href="#pricing"
              onClick={onButtonClick}
              className="inline-block py-4 sm:py-5 lg:py-6 px-10 sm:px-12 lg:px-14 bg-yellow-200 text-black border-4 border-black font-black text-lg sm:text-xl lg:text-2xl rounded-lg uppercase tracking-wide cursor-pointer animate-bounce-subtle hover:bg-black hover:text-white transition-colors duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
