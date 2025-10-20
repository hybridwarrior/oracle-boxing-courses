interface PersonaCard {
  emoji: string
  title: string
  subtitle: string
}

interface WhoThisIsForProps {
  courseName: string
  personas: PersonaCard[]
}

export function WhoThisIsFor({ courseName, personas }: WhoThisIsForProps) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          <span className="italic">{courseName}</span> is built for
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {persona.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">{persona.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
