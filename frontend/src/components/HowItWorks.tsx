import { Inbox, SearchCheck, BellRing } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <Inbox className="h-5 w-5 text-indigo-400" />,
      title: "Save Anything, Instantly",
      desc: "Paste a YouTube link, drop a job posting, share an Instagram reel, upload a PDF, or type a quick note or quote. Your Second Brain captures it in one tap — no folders, no friction, no forgetting.",
      tag: "YouTube · Reels · Jobs · PDFs · Notes · Quotes"
    },
    {
      step: "02",
      icon: <SearchCheck className="h-5 w-5 text-purple-400" />,
      title: "It Organizes & Understands",
      desc: "Your saved content is automatically tagged, grouped, and summarized. AI reads every video, document, and post so you don't have to — and surfaces connections you'd never spot manually.",
      tag: "Auto-tagging · Smart Collections · AI Summaries"
    },
    {
      step: "03",
      icon: <BellRing className="h-5 w-5 text-indigo-400" />,
      title: "Retrieve, Revisit & Act",
      desc: "Search across everything you've ever saved in plain language. Ask 'what jobs did I save last week?' or 'summarize that video about productivity'. Your Second Brain always has the answer.",
      tag: "AI Chat · Search · Read Later · Resurface"
    }
  ]

  return (
    <section id='how-it-works' className="w-full bg-gray-950 py-20 px-6 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl">
        {/* Header Block */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/35 bg-purple-500/10 px-3 py-0.5 text-[11px] font-medium text-purple-300">
            Simple by Design
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-white/40">
            Stop scattering things across tabs, apps, and screenshots. Save once, find anything, forget nothing.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[2.6rem] left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-gradient-to-r from-indigo-500/20 via-purple-500/30 to-indigo-500/20 z-0" />

          {steps.map((item, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 hover:border-indigo-500/20 hover:bg-indigo-500/[0.02] transition-all group"
            >
              {/* Badge Row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] group-hover:bg-indigo-500/10 transition-colors">
                  {item.icon}
                </div>
                <span className="text-xs font-mono font-bold text-white/15 group-hover:text-indigo-400/40 transition-colors">
                  {item.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs leading-relaxed text-white/40 mb-5">{item.desc}</p>

              {/* Tag pill */}
              <div className="mt-auto">
                <p className="text-[10px] font-medium text-indigo-400/50 tracking-wide leading-relaxed">
                  {item.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}