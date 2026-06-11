
import { Link } from 'react-router-dom'
import { InteractiveNetwork } from '../InteractiveNetwork'
import { Button } from '@base-ui/react/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {


  return (
    <section className="relative w-full bg-gray-950 overflow-x-hidden">
      {/* Hero Master Frame */}
      <div className="relative flex min-h-[640px] flex-col items-center justify-center px-6 py-20 text-center md:px-8">
        {/* Dynamic network overlay canvas */}
        <InteractiveNetwork />

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/35 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            AI-powered Second brain · 2026
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl/none">
            The <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">content creation</span> <br />
            cheat code.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            Drop TikToks, Reels, YouTube, PDFs. Chat with any of it. Generate carousels, scripts, and posts — in your voice.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button className="flex rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 px-7 py-5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-transform hover:scale-[1.01] gap-3">
              <Link to="/home">Start Your Second Brain   </Link> <ArrowRight />
            </Button>
            {/* <Button  className="rounded-full border-white/15 bg-white/5 px-6 py-5 text-sm text-white/80 hover:bg-white/10 hover:text-white">
              <Play className="mr-1.5 h-3.5 w-3.5 fill-current" /> Watch Demo
            </Button> */}
          </div>

          {/* Stats Segment */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 md:gap-12">
            {[
              { val: "1M+", lbl: "Accounts posting" },
              { val: "90s", lbl: "Carousel to post" },
              { val: "10×", lbl: "Content faster" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl font-bold text-white md:text-2xl">{stat.val}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/40">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}