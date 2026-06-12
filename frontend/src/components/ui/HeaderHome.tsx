import { Logo } from "@/icons/Logo"
import { Link } from "react-router-dom"
import { Button } from "./button"

export function HeaderHome() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-black backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 text-base font-semibold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500 text-base text-white">
         <Link to="/"><Logo/></Link>  
          </div>
          Second Brain
        </div>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
            <a
              key={"How it works"}
              href={`#how-it-works`}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              How it works
            </a>
           <a
              key={"Features"}
              href={`#features`}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
             Features
            </a>
             <a
              key={"Demo"}
              href={`/demo`}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              Demo
            </a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Button 
           variant="ghost" className="text-xs text-white/60 hover:bg-white/5 hover:text-white">
           <Link to="/signin">Log in</Link> 
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-yellow-500 text-xs font-medium text-white shadow-md transition-transform hover:scale-[1.02]">
            <Link to="/dasboard">Try it</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}