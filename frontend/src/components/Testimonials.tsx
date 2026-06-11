import { Star } from 'lucide-react'

export function Testimonials() {
  const reviews = [
    {
      quote: "I used to keep 50 open tabs of YouTube videos and PDFs that I promised myself I'd 'get back to.' Second Brain completely fixed that. I just drop the links in, and when I'm writing, I chat with my repository. It's like having an assistant that remembers everything.",
      author: "Arjun K.",
      role: "Full-Stack Creator & Indie Hacker"
    },
    {
      quote: "The carousel builder is pure wizardry. I uploaded a complex technical documentation PDF, asked the platform to break down the core architecture style, and had a production-ready LinkedIn carousel in less than two minutes. Absolute game-changer.",
      author: "Sarah M.",
      role: "Tech Lead & Content Creator"
    },
    {
      quote: "What sets this apart is the raw context matching. Being able to drop long-form podcasts or short Reels and ask specific, nuanced questions about hooks completely changed how I analyze viral digital trends. It's an execution engine.",
      author: "David L.",
      role: "Digital Marketer"
    }
  ]

  return (
    <section className="w-full bg-gray-950 py-20 px-6 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl">
        {/* Header Block */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by modern <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">builders.</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-white/40">
            See how creators and developers are supercharging their output loops.
          </p>
        </div>

        {/* Testimonials Review Feed */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviews.map((rev, index) => (
            <div key={index} className="flex flex-col justify-between rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 hover:bg-white/[0.02] transition-colors">
              <div>
                {/* Five Star Rendering */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-indigo-400 text-indigo-400" />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-xs italic leading-relaxed text-white/70">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Attribution Meta */}
              <div className="mt-6 border-t border-white/[0.05] pt-4">
                <div className="text-xs font-semibold text-white">{rev.author}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{rev.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}