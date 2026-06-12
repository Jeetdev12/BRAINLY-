import { LayoutGrid, Youtube, Linkedin, Instagram, Briefcase, FileText, NotebookPen, Quote, Bookmark, SortDesc, SortAsc, Clock, PlusIcon } from "lucide-react"

export const FILTERS = [
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

export const SORT_OPTIONS = [
  { key: "newest",    label: "Newest first",     Icon: SortDesc },
  { key: "oldest",    label: "Oldest first",     Icon: SortAsc  },
  { key: "readlater", label: "Read later first", Icon: Clock    },
]

export function EmptyState({ filter, onAdd }: { filter: string; onAdd: () => void }) {
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


export function InputField({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  right,
}: {
  label: string
  icon: React.ReactNode
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-medium uppercase tracking-widest text-white/30">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border bg-white/[0.03] pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all
          ${
            error
              ? "border-red-500/40 focus:border-red-500/60"
              : "border-white/[0.07] focus:border-blue-500/40 focus:bg-white/[0.05]"
          }`}
        />

        {right && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {right}
          </span>
        )}
      </div>

      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  )
}

