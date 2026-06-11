import { BookMarked, BrainCircuit, Layers3, Link2, NotebookPen, Sparkles } from 'lucide-react'

export function FeaturesGrid() {
  const features = [
    {
      icon: <Link2 className="h-4 w-4" />,
      title: "Universal Capture, Any Format",
      desc: "Paste a YouTube link, drop a PDF, save a LinkedIn post, an Instagram reel, a job listing, or a quote — your Second Brain accepts it all without friction. One inbox, every format."
    },
    {
      icon: <BrainCircuit className="h-4 w-4" />,
      title: "AI-Powered Knowledge Chat",
      desc: "Ask questions directly across your saved content. Find connections between a video you saved last month and a note you wrote yesterday — instantly, with full context."
    },
    {
      icon: <BookMarked className="h-4 w-4" />,
      title: "Read & Watch Later Queue",
      desc: "Never lose track of things you meant to revisit. Bookmark jobs, reels, articles, and docs into a smart queue that resurfaces them when you're actually ready."
    },
    {
      icon: <Layers3 className="h-4 w-4" />,
      title: "Automated Smart Collections",
      desc: "Your content self-organizes. The platform groups related saves — a job post, a resume tip video, and a LinkedIn post — into meaningful collections without any manual sorting."
    },
    {
      icon: <NotebookPen className="h-4 w-4" />,
      title: "Quick Notes & Quotes",
      desc: "Capture raw thoughts, fleeting ideas, or powerful quotes in seconds. Link them back to any saved resource so your insights always have context behind them."
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: "Instant AI Summaries",
      desc: "Too much saved, too little time? Get a crisp AI summary of any video, PDF, or article in your library — so you absorb value without sitting through everything."
    }
  ]

  return (
    <section id='features' className="w-full bg-gray-950 py-20 px-6 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl">
        {/* Header Block */}
        <div className="mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/35 bg-purple-500/10 px-3 py-0.5 text-[11px] font-medium text-purple-300">
            Engineered Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you save,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              finally working for you.
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((feat, index) => {
            const isWide = index === 0 || index === 1
            return (
              <div
                key={index}
                className={`rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-6 hover:border-white/10 transition-all ${
                  isWide ? 'lg:col-span-3' : 'lg:col-span-2'
                }`}
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{feat.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/40">{feat.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}