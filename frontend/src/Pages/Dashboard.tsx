import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import {
  PlusIcon, ShareIcon, Search, BrainCircuit, Youtube, Linkedin, Instagram,
  FileText, NotebookPen, Briefcase, Quote, LayoutGrid, Bookmark, SortAsc,
  SortDesc, Clock, Check, PanelLeftClose, PanelLeftOpen, LogOut, X,
} from "lucide-react"
import axios from "axios"
import { useContent } from "../utilis/contentContext"
import { FRONTEND_URL } from "@/utilis/config"
import CreateContentModal from "@/components/ui/CreateContentModal"
import Card from "@/components/ui/Card"


const FILTERS = [
  { key: "all",       label: "All Saves",  Icon: LayoutGrid  },
  { key: "youtube",   label: "YouTube",    Icon: Youtube     },
  { key: "linkedin",  label: "LinkedIn",   Icon: Linkedin    },
  { key: "instagram", label: "Instagram",  Icon: Instagram   },
  { key: "job",       label: "Jobs",       Icon: Briefcase   },
  { key: "document",  label: "PDFs",       Icon: FileText    },
  { key: "notes",     label: "Notes",      Icon: NotebookPen },
  { key: "quote",     label: "Quotes",     Icon: Quote       },
  { key: "readlater", label: "Read Later", Icon: Bookmark    },
]

const SORT_OPTIONS = [
  { key: "newest",    label: "Newest first",     Icon: SortDesc },
  { key: "oldest",    label: "Oldest first",     Icon: SortAsc  },
  { key: "readlater", label: "Read later first", Icon: Clock    },
]

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-gray-950 p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded-full bg-white/[0.05]" />
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => <div key={i} className="h-6 w-6 rounded-lg bg-white/[0.04]" />)}
        </div>
      </div>
      <div className="h-4 w-3/4 rounded bg-white/[0.05]" />
      <div className="h-28 w-full rounded-lg bg-white/[0.04]" />
      <div className="flex gap-2">
        <div className="h-4 w-12 rounded bg-white/[0.03]" />
        <div className="h-4 w-16 rounded bg-white/[0.03]" />
      </div>
      <div className="flex justify-between pt-1 border-t border-white/[0.04]">
        <div className="h-3 w-14 rounded bg-white/[0.03]" />
        <div className="h-3 w-10 rounded bg-white/[0.03]" />
      </div>
    </div>
  )
}


function EmptyState({ filter, onAdd }: { filter: string; onAdd: () => void }) {
  const messages: Record<string, { emoji: string; title: string; sub: string }> = {
    all:       { emoji: "🧠", title: "Your Second Brain is empty",    sub: "Start saving links, notes, and ideas." },
    youtube:   { emoji: "📺", title: "No YouTube videos saved",       sub: "Paste a YouTube link to save it here." },
    linkedin:  { emoji: "💼", title: "No LinkedIn posts saved",       sub: "Save posts and articles from LinkedIn." },
    instagram: { emoji: "📸", title: "No Instagram reels saved",      sub: "Drop an Instagram link to save it." },
    job:       { emoji: "🎯", title: "No job listings saved",         sub: "Save job postings you want to revisit." },
    document:  { emoji: "📄", title: "No documents saved",            sub: "Save PDFs or document links here." },
    notes:     { emoji: "📝", title: "No notes yet",                  sub: "Write quick notes or ideas directly." },
    quote:     { emoji: "💬", title: "No quotes saved",               sub: "Save quotes that inspire you." },
    readlater: { emoji: "🔖", title: "Nothing queued for later",      sub: "Bookmark cards to read or watch later." },
  }
  const m = messages[filter] ?? messages.all
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 text-5xl">{m.emoji}</div>
      <h3 className="text-base font-semibold text-white mb-1">{m.title}</h3>
      <p className="text-sm text-white/30 mb-6 max-w-xs">{m.sub}</p>
      {filter !== "readlater" && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-all"
        >
          <PlusIcon className="h-4 w-4" /> Save something
        </button>
      )}
    </div>
  )
}


function StatsStrip({ contents }: { contents: any[] }) {
  const stats = useMemo(() => ({
    total:     contents.length,
    youtube:   contents.filter(c => c.type === "youtube").length,
    jobs:      contents.filter(c => c.type === "job").length,
    notes:     contents.filter(c => c.type === "notes").length,
    readlater: contents.filter(c => c.readLater).length,
  }), [contents])

  const items = [
    { label: "Total saved", value: stats.total,     color: "text-white" },
    { label: "YouTube",     value: stats.youtube,   color: "text-red-400" },
    { label: "Jobs",        value: stats.jobs,      color: "text-yellow-400" },
    { label: "Notes",       value: stats.notes,     color: "text-green-400" },
    { label: "Read Later",  value: stats.readlater, color: "text-blue-400" },
  ]

  return (
    <div className="flex items-center gap-6 px-1 py-2 border-b border-white/[0.05] mb-6 overflow-x-auto scrollbar-none">
      {items.map((item, i) => (
        <div key={i} className="flex items-baseline gap-1.5 shrink-0">
          <span className={`text-xl font-bold tabular-nums ${item.color}`}>{item.value}</span>
          <span className="text-[10px] text-white/25 uppercase tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function Sidebar({
  collapsed, setCollapsed, activeFilter, setActiveFilter, counts,
}: {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  activeFilter: string
  setActiveFilter: (v: string) => void
  counts: Record<string, number>
}) {
  const userName = "User" // TODO: replace with auth context

  return (
    <aside className={`fixed top-0 left-0 h-screen flex flex-col bg-gray-950 border-r border-white/[0.05] z-30 transition-all duration-300 ${collapsed ? "w-[60px]" : "w-[220px]"}`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/[0.05]">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500">
                <BrainCircuit className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">Second Brain</span>
            </div>
            <button onClick={() => setCollapsed(true)} className="text-white/25 hover:text-white/60 transition-colors">
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500">
            <BrainCircuit className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} className="mx-auto mt-3 text-white/25 hover:text-white/60 transition-colors">
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.key
          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              title={collapsed ? f.label : undefined}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all ${collapsed ? "justify-center" : ""} ${isActive ? "bg-white/[0.06] text-white" : "text-white/35 hover:text-white/65 hover:bg-white/[0.03]"}`}
            >
              <span className={`shrink-0 ${isActive ? "text-blue-400" : ""}`}>
                <f.Icon className="h-3.5 w-3.5" />
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-xs font-medium truncate text-left">{f.label}</span>
                  {counts[f.key] > 0 && (
                    <span className={`text-[10px] font-mono ${isActive ? "text-blue-400/70" : "text-white/20"}`}>
                      {counts[f.key]}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className={`border-t border-white/[0.05] px-2 py-3 ${collapsed ? "flex flex-col items-center" : ""}`}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-1">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-yellow-500 text-[11px] font-bold text-white">
              {userName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-white/25 truncate">second brain</p>
            </div>
            <button
              onClick={() => { localStorage.removeItem("token"); window.location.href = "/signin" }}
              className="text-white/20 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="h-7 w-7 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-yellow-500 text-[11px] font-bold text-white" title={userName}>
            {userName[0]}
          </div>
        )}
      </div>
    </aside>
  )
}

export const Dashboard = () => {
  const { loading, contents, refresh } = useContent()
  const [isModalOpen, setIsModalOpen]         = useState(false)
  const [activeFilter, setActiveFilter]       = useState("all")
  const [sortBy, setSortBy]                   = useState("newest")
  const [search, setSearch]                   = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [shareCopied, setShareCopied]         = useState(false)
  const [localContents, setLocalContents]     = useState<any[]>([])
  const [sortOpen, setSortOpen]               = useState(false)

  const token = localStorage.getItem("token")

  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      refresh()          
      return
    }
    if (!isModalOpen) refresh()  
  }, [isModalOpen])

  useEffect(() => { setLocalContents(contents) }, [contents])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: localContents.length, readlater: 0 }
    FILTERS.forEach(f => {
      if (f.key !== "all" && f.key !== "readlater")
        c[f.key] = localContents.filter(x => x.type === f.key).length
      if (f.key === "readlater")
        c[f.key] = localContents.filter(x => x.readLater).length
    })
    return c
  }, [localContents])

  // Filter + search + sort — all done client-side, no extra API calls
  const filtered = useMemo(() => {
    let arr = [...localContents]
    if (activeFilter !== "all" && activeFilter !== "readlater")
      arr = arr.filter(c => c.type === activeFilter)
    if (activeFilter === "readlater")
      arr = arr.filter(c => c.readLater)
    if (search.trim()) {
      const q = search.toLowerCase()
      arr = arr.filter(c =>
        c.title?.toLowerCase().includes(q) ||
        c.content?.toLowerCase().includes(q) ||
        c.link?.toLowerCase().includes(q)
      )
    }
    if (sortBy === "newest")    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    if (sortBy === "oldest")    arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    if (sortBy === "readlater") arr.sort((a, b) => (b.readLater ? 1 : 0) - (a.readLater ? 1 : 0))
    return arr
  }, [localContents, activeFilter, search, sortBy])

  // Optimistic delete — no reload needed
  const handleDelete = useCallback((id: string) => {
    setLocalContents(prev => prev.filter(c => c._id !== id))
  }, [])

  async function handleShare() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data?.hash) {
        await navigator.clipboard.writeText(`${FRONTEND_URL}/${response.data.hash}`)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2500)
      }
    } catch (err) { console.error(err) }
  }

  const activeLabel = FILTERS.find(f => f.key === activeFilter)?.label ?? "All Saves"
  const sidebarW    = sidebarCollapsed ? 60 : 220

  return (
    <div className="flex min-h-screen bg-[#080808]">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        counts={counts}
      />

      <main className="flex-1 min-h-screen transition-all duration-300" style={{ marginLeft: sidebarW }}>

        {/* Top Bar */}
        <div className="sticky top-0 z-20 border-b border-white/[0.05] bg-[#080808]/90 backdrop-blur-md px-6 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-white shrink-0">{activeLabel}</h1>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search your brain..."
                className="w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-9 pr-8 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Sort */}
              <div className="relative">
                {(() => {
                  const active = SORT_OPTIONS.find(s => s.key === sortBy)!
                  return (
                    <button
                      onClick={() => setSortOpen(p => !p)}
                      className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-white/60 hover:text-white/80 transition-all"
                    >
                      <active.Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{active.label}</span>
                    </button>
                  )
                })()}
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-white/[0.07] bg-gray-950 shadow-2xl z-50 overflow-hidden">
                    {SORT_OPTIONS.map(({ key, label, Icon }) => (
                      <button
                        key={key}
                        onClick={() => { setSortBy(key); setSortOpen(false) }}
                        className={`flex items-center gap-2 w-full px-3 py-2.5 text-xs transition-colors ${
                          sortBy === key
                            ? "text-blue-400 bg-blue-500/10"
                            : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                        {sortBy === key && <Check className="ml-auto h-3 w-3" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Share */}
              <button
                onClick={handleShare}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${shareCopied ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-white/[0.07] bg-white/[0.03] text-white/50 hover:text-white/80"}`}
              >
                {shareCopied
                  ? <><Check className="h-3.5 w-3.5" /> Copied!</>
                  : <><ShareIcon className="h-3.5 w-3.5" /> Share</>
                }
              </button>

              {/* Add */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 px-3 py-2 text-xs font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
              >
                <PlusIcon className="h-3.5 w-3.5" /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {!loading && localContents.length > 0 && <StatsStrip contents={localContents} />}

          {search && !loading && (
            <p className="text-xs text-white/25 mb-4">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
              <span className="text-white/50">"{search}"</span>
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState filter={activeFilter} onAdd={() => setIsModalOpen(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((content: any, index: number) => (
                <div key={content._id || index} style={{ animationDelay: `${index * 40}ms` }} className="animate-fadeIn">
                  <Card
                    contentId={content._id}
                    title={content.title}
                    link={content.link}
                    content={content.content}
                    type={content.type}
                    createdAt={content.createdAt}
                    tags={content.tags}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <CreateContentModal open={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      {sortOpen && <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />}
    </div>
  )
}