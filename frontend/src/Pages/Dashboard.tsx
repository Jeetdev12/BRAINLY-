import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { PlusIcon, ShareIcon, Search,X, Check} from "lucide-react"
import axios from "axios"
import { useContent } from "../utilis/contentContext"
import { FRONTEND_URL } from "@/utilis/config"
import CreateContentModal from "@/components/ui/CreateContentModal"
import Card from "@/components/ui/Card"
import { EmptyState, FILTERS, SORT_OPTIONS } from "@/utilis/Constants"
import { SkeletonCard } from "@/components/SkeletonCard"
import { StatsStrip } from "@/components/StatsStrip"
import { Sidebar } from "@/components/ui/Sidebar"


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
        counts={counts} filters={FILTERS}      />

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