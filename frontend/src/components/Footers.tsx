import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from 'lucide-react'
import { Logo } from '@/icons/Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-950 px-6 py-12 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl">
        {/* Top Grid Panel */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 pb-12">
          {/* Brand Vector Block */}
          <div className="md:col-span-1 space-y-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500 text-base text-white">
           <Logo/>
          </div>
            <p className="text-[11px] leading-relaxed text-white/40">
              Transforming your passive digital consumption into high-performing content assets instantly.
            </p>
          </div>

          {/* Directory Links Column 1 */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50">Product</h4>
            <ul className="space-y-1.5">
              {["Features", "Pricing", "Demo", "Changelog"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-xs text-white/40 transition-colors hover:text-indigo-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Links Column 2 */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50">Resources</h4>
            <ul className="space-y-1.5">
              {["Documentation", "Guides", "API Status", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-white/40 transition-colors hover:text-indigo-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Input Box Column */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50">Stay Updated</h4>
            <p className="text-[11px] text-white/40">Get product feature drops and content creation blueprints.</p>
            <div className="flex max-w-sm items-center gap-1.5 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-xs text-white placeholder-white/20 outline-none focus:border-indigo-500/50"
              />
              <Button size="sm" className="bg-white px-3 text-xs font-semibold text-gray-950 hover:bg-white/90">
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Utility Meta Bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/[0.04] pt-6 md:flex-row">
          <p className="text-[11px] text-white/30">
            &copy; {currentYear} Second Brain Inc. All rights reserved.
          </p>

          {/* Social Handle Triggers */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Twitter className="h-3.5 w-3.5" />, link: "#" },
              { icon: <Github className="h-3.5 w-3.5" />, link: "#" },
              { icon: <Linkedin className="h-3.5 w-3.5" />, link: "#" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                className="text-white/30 transition-colors hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}