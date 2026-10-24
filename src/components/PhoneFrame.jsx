import { useEffect, useRef } from 'react'

// Device shell. On phones it fills the screen; on larger viewports it renders
// as a centered ~390px device so the mobile-first design reads correctly on
// desktop too. The relative container is the positioning context for the
// bottom-sheet overlay. `scrollKey` resets the scroll to the top whenever the
// visible screen changes, so each screen opens at "status first".
export default function PhoneFrame({ children, overlay, scrollKey }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [scrollKey])

  return (
    <div className="flex h-full items-center justify-center bg-canvas sm:p-6">
      <div
        className="relative flex h-full w-full flex-col overflow-hidden bg-surface sm:h-[844px] sm:max-h-full sm:w-[390px] sm:rounded-[2.4rem] sm:border-[10px] sm:border-ink sm:shadow-2xl"
      >
        {/* status bar */}
        <div className="flex shrink-0 items-center justify-between px-5 pt-3 pb-1 text-[13px] font-semibold text-ink">
          <span>9:41</span>
          <StatusBarIcons />
        </div>

        {/* screen content */}
        <div ref={scrollRef} className="relative flex-1 overflow-y-auto no-scrollbar">
          {children}
        </div>

        {/* overlays (bottom sheets) pinned to the device viewport, not the
            scroll region, so they stay in view regardless of scroll position */}
        {overlay}
      </div>
    </div>
  )
}

function StatusBarIcons() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {/* signal */}
      <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" />
        <rect x="9" y="3" width="3" height="9" rx="1" />
        <rect x="13.5" y="0.5" width="3" height="11.5" rx="1" />
      </svg>
      {/* wifi */}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M1 3.5a10 10 0 0 1 14 0" />
        <path d="M3.5 6.2a6.3 6.3 0 0 1 9 0" />
        <path d="M6 8.9a2.7 2.7 0 0 1 4 0" />
        <circle cx="8" cy="11" r="0.6" fill="currentColor" stroke="none" />
      </svg>
      {/* battery */}
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" />
        <rect x="22" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </div>
  )
}
