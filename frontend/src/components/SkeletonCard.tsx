export function SkeletonCard() {
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