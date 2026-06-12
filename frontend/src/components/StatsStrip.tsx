import { useMemo } from "react"

export function StatsStrip({ contents }: { contents: any[] }) {
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