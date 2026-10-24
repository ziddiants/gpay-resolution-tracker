import { useState } from 'react'
import { Icon, CloseIcon, ChevronRightIcon } from './Icons.jsx'

// Slide-up panel for the three support actions. Content is data-driven from the
// active transaction's `panels`. No panel collects a PIN, OTP, password or any
// sensitive field — each one says so explicitly.
export default function BottomSheet({ panelKey, panels, onClose, onPrimary }) {
  const [copied, setCopied] = useState(false)
  if (!panelKey || !panels) return null
  const panel = panels[panelKey]
  if (!panel) return null

  const primaryLabel =
    panelKey === 'bank' && copied ? 'Reference copied ✓' : panel.primary

  function handlePrimary() {
    if (panelKey === 'bank') {
      setCopied(true)
      return
    }
    onPrimary?.(panelKey)
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      {/* scrim */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 animate-fade-in"
      />

      {/* sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={panel.title}
        className="relative max-h-[88%] overflow-y-auto no-scrollbar rounded-t-3xl bg-surface px-5 pb-6 pt-3 animate-sheet-up"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" aria-hidden="true" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Icon name={panel.icon} width={19} height={19} />
            </span>
            <h2 className="text-[18px] font-bold text-ink">{panel.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="-mr-1 rounded-full p-1.5 text-ink-soft hover:bg-canvas"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <div className="mt-3 space-y-2.5">
          {panel.body.map((line) => (
            <p key={line} className="text-[14px] leading-relaxed text-ink-soft">
              {line}
            </p>
          ))}
        </div>

        {/* fact rows (bank / dispute) */}
        {panel.facts && (
          <dl className="mt-4 divide-y divide-line rounded-2xl border border-line">
            {panel.facts.map((f) => (
              <div key={f.label} className="flex items-center justify-between px-4 py-3">
                <dt className="text-[13px] text-ink-faint">{f.label}</dt>
                <dd className="text-[14px] font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* help options */}
        {panel.options && (
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
            {panel.options.map((o) => (
              <li key={o}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-canvas"
                >
                  <span className="text-[14px] text-ink">{o}</span>
                  <ChevronRightIcon width={18} height={18} className="shrink-0 text-ink-faint" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={handlePrimary}
          className="mt-5 min-h-[48px] w-full rounded-xl bg-accent px-4 text-[15px] font-semibold text-white transition hover:brightness-95 active:brightness-90"
        >
          {primaryLabel}
        </button>

        <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-snug text-ink-faint">
          {panel.note}
        </p>
      </div>
    </div>
  )
}
