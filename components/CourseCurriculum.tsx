interface LearningCard {
  emoji: string
  text: string
  imageUrl?: string
}

interface CourseCurriculumProps {
  title?: string
  learningCards: LearningCard[]
}

export function CourseCurriculum({
  title = "This Course Will Teach You...",
  learningCards
}: CourseCurriculumProps) {
  return (
    <section className="py-12 sm:py-16 bg-gray-50 overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-12 sm:gap-16 max-w-4xl mx-auto overflow-visible">
          {learningCards.map((card, index) => (
            <div key={index} className="mt-16 sm:mt-20 overflow-visible">
              <div className="bg-white border-2 border-gray-200 rounded-lg overflow-visible p-8 sm:p-10 pt-28 sm:pt-36 text-center">
                {/* Image - spills over top */}
                <div className="-mt-44 sm:-mt-52 mb-6 sm:mb-8 mx-auto w-48 h-36 sm:w-64 sm:h-44 rounded-lg overflow-hidden">
                  <img
                    src={card.imageUrl || 'https://placehold.co/400x300/e5e5e5/666666?text=Boxing'}
                    alt="Course visual"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text content */}
                <p className="font-bold text-gray-900 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
