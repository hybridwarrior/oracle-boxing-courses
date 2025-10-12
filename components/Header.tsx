import Image from 'next/image'

export function Header() {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <Image
          src="/logo-white.png"
          alt="Oracle Boxing"
          width={180}
          height={60}
          className="h-10 sm:h-12 w-auto"
          priority
        />
      </div>
    </header>
  )
}
