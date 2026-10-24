import { useEffect, useRef, useState } from 'react'
import { InfoIcon } from './Icons.jsx'

// A small (i) button that reveals a short explanation in a popover on tap —
// the familiar "info" affordance. Closes on outside click or Escape.
export default function InfoHint({ text, label = 'Why this date?', title = 'Guidance — not a guarantee' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDocDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        className="flex h-5 w-5 items-center justify-center rounded-full text-current/70 transition hover:bg-black/5 active:bg-black/10"
      >
        <InfoIcon width={15} height={15} />
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute right-0 top-full z-20 mt-2 w-60 rounded-xl bg-ink px-3 py-2.5 text-left shadow-lg animate-fade-in"
        >
          <span
            className="absolute -top-1 right-1.5 h-2.5 w-2.5 rotate-45 bg-ink"
            aria-hidden="true"
          />
          {title && (
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-white/55">
              {title}
            </span>
          )}
          <span className="block text-[12px] font-normal leading-relaxed text-white">{text}</span>
        </span>
      )}
    </span>
  )
}
