// Brief skeleton shown while the tracker "checks status" (~900ms).
// Copy reassures; shapes mirror the real tracker layout.
export default function LoadingSkeleton() {
  const Bar = ({ w }) => (
    <div className={`h-3 rounded bg-line ${w}`} />
  )
  return (
    <div className="animate-fade-in px-5 py-6" aria-busy="true" aria-live="polite">
      <p className="text-[15px] font-medium text-ink-soft">Checking the latest status…</p>

      <div className="mt-5 space-y-3">
        <Bar w="w-3/4" />
        <Bar w="w-1/2" />
      </div>

      <div className="mt-6 h-28 animate-pulse rounded-2xl bg-line/70" />

      <div className="mt-6 space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-line" />
            <div className="flex-1 space-y-2">
              <Bar w="w-2/3" />
              <Bar w="w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
