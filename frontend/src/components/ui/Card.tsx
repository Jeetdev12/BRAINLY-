
import { useState } from "react"
import {
Linkedin,Instagram,FileText,NotebookPen,Briefcase,Quote,Link2,Bookmark, BookmarkCheck,Copy,Trash2,Sparkles,ExternalLink,Check,ChevronDown,ChevronUp,Loader2,
Youtube,
} from "lucide-react"
import axios from "axios"

export interface CardProps {
  contentId: string
  title: string
  link?: string
  content?: string
  type: string
  createdAt: string
  tags?: string[]
  onDelete?: (id: string) => void
}


function getYoutubeId(url: string) {
  const match = url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function getDomain(url: string) {
  try { return new URL(url).hostname.replace("www.", "") } catch { return url }
}


const TYPE_CONFIG: Record<string, {
  icon: React.ReactNode
  label: string
  accent: string
  bg: string
}> = {
  youtube: { icon: <Youtube className="h-3 w-3" />, label: "YouTube", accent: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  linkedin: { icon: <Linkedin className="h-3 w-3" />, label: "LinkedIn", accent: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  instagram: { icon: <Instagram className="h-3 w-3" />, label: "Instagram", accent: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  job: { icon: <Briefcase className="h-3 w-3" />, label: "Job", accent: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  document: { icon: <FileText className="h-3 w-3" />, label: "PDF / Doc", accent: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  notes: { icon: <NotebookPen className="h-3 w-3" />, label: "Note", accent: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  quote: { icon: <Quote className="h-3 w-3" />, label: "Quote", accent: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
}


function CardPreview({ type, link, content }: { type: string; link?: string; content?: string }) {
  const [imgError, setImgError] = useState(false)

  if (type === "youtube" && link) {
    const id = getYoutubeId(link)
    if (id && !imgError) {
      return (
        <div className="relative w-full overflow-hidden rounded-lg aspect-video bg-gray-900">
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt="thumbnail"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
              <Youtube className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </div>
      )
    }
  }

  if ((type === "notes" || type === "quote") && content) {
    return (
      <div className={`rounded-lg p-3 border ${type === "quote" ? "border-orange-500/15 bg-orange-500/5" : "border-green-500/15 bg-green-500/5"}`}>
        {type === "quote" && <Quote className="h-3 w-3 text-orange-400/50 mb-1" />}
        <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{content}</p>
      </div>
    )
  }

  if (type === "document" && link) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-indigo-500/15 bg-indigo-500/5 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15">
          <FileText className="h-4 w-4 text-indigo-400" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-white/70 truncate">{getDomain(link)}</p>
          <p className="text-[10px] text-white/30">Document</p>
        </div>
      </div>
    )
  }

  if (link) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <img
          src={`https://www.google.com/s2/favicons?sz=16&domain=${getDomain(link)}`}
          className="h-3.5 w-3.5 rounded-sm"
          alt=""
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
        />
        <span className="text-[11px] text-white/30 truncate">{getDomain(link)}</span>
        <Link2 className="ml-auto h-3 w-3 shrink-0 text-white/20" />
      </div>
    )
  }

  return null
}


export default function Card({
  contentId,
  title,
  link,
  content,
  type,
  createdAt,
  tags = [],
  onDelete,
}: CardProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)

  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG["notes"]

  async function handleCopy() {
    const text = link || content || title
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDelete() {
    if (!deleteConfirm) { setDeleteConfirm(true); setTimeout(() => setDeleteConfirm(false), 3000); return }
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content/${contentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      onDelete?.(contentId)
    } catch (err) { console.error(err) }
  }

  async function handleSummarize() {
    if (summary) { setSummaryOpen((p) => !p); return }
    setSummaryLoading(true)
    setSummaryOpen(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/summarize`,
        { contentId, link, content, type },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSummary(response.data?.summary || "Could not generate summary.")
    } catch {
      setSummary("Summary unavailable right now.")
    } finally {
      setSummaryLoading(false)
    }
  }

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-gray-950 hover:border-white/[0.10] transition-all duration-200 overflow-hidden">

      {/* Type accent line */}
      <div className={`h-px w-full ${type === "youtube" ? "bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0" :
        type === "linkedin" ? "bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" :
          type === "instagram" ? "bg-gradient-to-r from-pink-500/0 via-pink-500/50 to-pink-500/0" :
            type === "job" ? "bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0" :
              type === "document" ? "bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" :
                type === "quote" ? "bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0" :
                  "bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0"
        }`} />

      <div className="flex flex-col gap-3 p-4">

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Type badge */}
            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium shrink-0 ${config.bg} ${config.accent}`}>
              {config.icon}
              {config.label}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Bookmark */}
            <button
              onClick={() => setBookmarked((p) => !p)}
              className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all ${bookmarked ? "text-blue-400" : "text-white/20 hover:text-white/50"}`}
              title={bookmarked ? "Saved for later" : "Save for later"}
            >
              {bookmarked ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all ${copied ? "text-green-400" : "text-white/20 hover:text-white/50"}`}
              title="Copy link"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all ${deleteConfirm ? "text-red-400 bg-red-500/10" : "text-white/20 hover:text-red-400"}`}
              title={deleteConfirm ? "Click again to confirm" : "Delete"}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">{title}</h3>

        {/* Preview */}
        <CardPreview type={type} link={link} content={content} />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] text-white/30">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* AI Summary */}
        <div className="border-t border-white/[0.05] pt-2">
          <button
            onClick={handleSummarize}
            className="flex w-full items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
          >
            <Sparkles className="h-3 w-3 text-blue-400/60" />
            <span>{summary ? (summaryOpen ? "Hide summary" : "Show summary") : "AI Summary"}</span>
            {summary && (summaryOpen ? <ChevronUp className="ml-auto h-3 w-3" /> : <ChevronDown className="ml-auto h-3 w-3" />)}
          </button>

          {summaryOpen && (
            <div className="mt-2 rounded-lg border border-blue-500/15 bg-blue-500/5 px-3 py-2.5">
              {summaryLoading ? (
                <div className="flex items-center gap-2 text-[11px] text-white/30">
                  <Loader2 className="h-3 w-3 animate-spin" /> Summarizing...
                </div>
              ) : (
                <p className="text-[11px] text-white/50 leading-relaxed">{summary}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/20">{timeAgo(createdAt)}</span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-white/20 hover:text-white/50 transition-colors"
            >
              Open <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
