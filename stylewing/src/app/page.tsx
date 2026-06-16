import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 gap-10">
      {/* Logo */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xl">
            ✦
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">StyleWing</span>
        </div>
        <p className="text-zinc-400 text-sm max-w-xs">
          Find any outfit. Get the perfect opener. AI-powered, instant.
        </p>
      </div>

      {/* Mode cards */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/outfit" className="group block">
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-purple-700 transition-all duration-200 hover:bg-zinc-800/80">
            <div className="absolute top-4 right-4 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
              👕
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-lg mb-4">
              🔍
            </div>
            <h2 className="text-white font-semibold text-lg">Outfit Finder</h2>
            <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
              Snap any fit — get every piece identified with links to buy it immediately.
            </p>
            <div className="mt-4 flex items-center gap-1 text-purple-400 text-sm font-medium">
              Try it <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </div>
          </div>
        </Link>

        <Link href="/wingman" className="group block">
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-blue-700 transition-all duration-200 hover:bg-zinc-800/80">
            <div className="absolute top-4 right-4 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
              💬
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-lg mb-4">
              🎯
            </div>
            <h2 className="text-white font-semibold text-lg">Wingman</h2>
            <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
              Describe the situation or snap a photo — get 5 natural openers read into your AirPods.
            </p>
            <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium">
              Try it <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </div>
          </div>
        </Link>
      </div>

      <p className="text-zinc-600 text-xs text-center max-w-xs">
        Context-based only. No face identification. No personal data stored.
      </p>
    </main>
  )
}
