import AppBar from '../components/AppBar.jsx'
import Avatar from '../components/Avatar.jsx'
import StatusPill from '../components/StatusPill.jsx'
import SampleDataNote from '../components/SampleDataNote.jsx'
import { ChevronRightIcon } from '../components/Icons.jsx'
import { transactions, STATUS_PILL } from '../data/transactions.js'

function Row({ txn, onClick }) {
  const pill = STATUS_PILL[txn.status]
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-canvas active:bg-line"
    >
      <Avatar initials={txn.initials} seed={txn.party} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-medium text-ink">{txn.party}</p>
        <p className="mt-0.5 text-[13px] text-ink-faint">{txn.dateLabel} · Paid</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[15px] font-semibold text-ink">
          ₹{txn.amount.toLocaleString('en-IN')}
        </span>
        <StatusPill tone={pill.tone} icon={pill.icon} label={pill.label} size="sm" />
      </div>
      <ChevronRightIcon width={18} height={18} className="shrink-0 text-ink-faint" />
    </button>
  )
}

// Entry point. Every row is a stuck payment in a different resolution state;
// tapping one opens its details and tracker.
export default function TransactionHistory({ onOpen }) {
  return (
    <div className="animate-screen-in flex min-h-full flex-col">
      <AppBar title="Transaction history" showSearch />

      <div className="flex-1">
        {transactions.map((txn, i) => (
          <div key={txn.id}>
            <Row txn={txn} onClick={() => onOpen(txn.id)} />
            {i < transactions.length - 1 && <div className="mx-4 border-t border-line" />}
          </div>
        ))}
      </div>

      <SampleDataNote className="px-4 py-5" />
    </div>
  )
}
