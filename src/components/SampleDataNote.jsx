import { InfoIcon } from './Icons.jsx'
import { SAMPLE_NOTE } from '../data/transactions.js'

// Persistent reminder that nothing here is real. Shown on data screens.
export default function SampleDataNote({ className = '' }) {
  return (
    <p
      className={`flex items-center justify-center gap-1.5 text-center text-[12px] text-ink-faint ${className}`}
    >
      <InfoIcon width={14} height={14} className="shrink-0" />
      {SAMPLE_NOTE}
    </p>
  )
}
