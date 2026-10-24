import AppBar from '../components/AppBar.jsx'
import Avatar from '../components/Avatar.jsx'
import StatusPill from '../components/StatusPill.jsx'
import SampleDataNote from '../components/SampleDataNote.jsx'
import { ChevronRightIcon } from '../components/Icons.jsx'
import { toneClasses } from '../components/tones.js'
import { STATUS_PILL, USER_BANK, USER_MASK } from '../data/transactions.js'

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <dt className="text-[13px] text-ink-faint">{label}</dt>
      <dd className="text-right text-[14px] font-medium text-ink">{value}</dd>
    </div>
  )
}

// Transaction details: who / how much / status, a tappable explainer card that
// leads into the tracker, and the raw details. Hierarchy: status → amount →
// (timeline lives on the tracker) → next action.
export default function TransactionDetails({ txn, scenario, onTrack, onBack }) {
  const pill = STATUS_PILL[txn.status]
  const t = toneClasses[scenario.detail.tone]

  return (
    <div className="animate-screen-in flex min-h-full flex-col">
      <AppBar title="Payment details" onBack={onBack} />

      {/* identity + amount */}
      <div className="flex flex-col items-center px-5 pt-3 pb-5 text-center">
        <Avatar initials={txn.initials} seed={txn.party} size={64} />
        <p className="mt-3 text-[17px] font-semibold text-ink">To {txn.party}</p>
        <p className="mt-0.5 text-[13px] text-ink-faint">{txn.upiId}</p>
        <p className="mt-3 text-[34px] font-bold leading-none text-ink">
          ₹{txn.amount.toLocaleString('en-IN')}.00
        </p>
        <div className="mt-3">
          <StatusPill tone={pill.tone} icon={pill.icon} label={pill.label} />
        </div>
      </div>

      {/* tappable explainer card — the whole card opens the tracker */}
      <div className="px-4">
        <button
          type="button"
          onClick={onTrack}
          className={`relative flex w-full items-center gap-3 overflow-hidden rounded-2xl p-4 text-left transition hover:brightness-[0.98] active:brightness-95 ${t.card}`}
        >
          <span className={`absolute inset-y-0 left-0 w-1 ${t.accentBar}`} aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className={`text-[15px] font-semibold ${t.text}`}>{scenario.detail.title}</p>
            <p className="mt-1 text-[13px] leading-snug text-ink-soft">{scenario.detail.body}</p>
            <p className={`mt-2 text-[14px] font-semibold ${t.text}`}>{scenario.detail.cta}</p>
          </div>
          <ChevronRightIcon width={22} height={22} className={`shrink-0 ${t.text}`} />
        </button>
      </div>

      {/* raw details */}
      <div className="px-4 pt-5">
        <dl className="divide-y divide-line rounded-2xl border border-line">
          <DetailRow label="Status" value={pill.label} />
          <DetailRow label="From" value={`${USER_BANK} ••${USER_MASK}`} />
          <DetailRow label="To" value={txn.upiId} />
          <DetailRow label="Transaction ID" value={txn.utr} />
          <DetailRow label="Date" value={`${txn.dateLabel} · ${txn.timeLabel}`} />
        </dl>
      </div>

      <SampleDataNote className="px-4 py-5" />
    </div>
  )
}
