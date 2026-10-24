import AppBar from '../components/AppBar.jsx'
import ExpectUpdateCard from '../components/ExpectUpdateCard.jsx'
import TimelineStep from '../components/TimelineStep.jsx'
import ActionButton from '../components/ActionButton.jsx'
import SampleDataNote from '../components/SampleDataNote.jsx'
import { Icon } from '../components/Icons.jsx'

const ACTION_ICON = { bank: 'bank', help: 'help', dispute: 'flag' }

// The resolution tracker answers the three questions top to bottom:
//   1. headline      — what's happening to my money?
//   2. ExpectUpdate  — when should I expect an update/refund?
//   3. timeline + actions — what's happened, and what to do next.
export default function ResolutionTracker({ txn, scenario, onBack, onAction }) {
  const s = scenario

  return (
    <div className="animate-screen-in flex min-h-full flex-col">
      <AppBar title="Payment status" onBack={onBack} />

      <div className="px-5 pt-1">
        {/* 1 — what's happening */}
        <h2 className="text-[22px] font-bold leading-tight text-ink">{s.headline}</h2>
        <p className="mt-1.5 text-[13px] text-ink-faint">
          ₹{txn.amount.toLocaleString('en-IN')}.00 to {txn.party} · {txn.dateLabel}
        </p>

        {/* 2 — when to expect an update */}
        <div className="mt-4">
          <ExpectUpdateCard {...s.expect} />
        </div>

        {/* guidance tip */}
        {s.tip && (
          <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-canvas px-3.5 py-3">
            <Icon name={s.tip.icon} width={18} height={18} className="mt-0.5 shrink-0 text-ink-soft" />
            <p className="text-[13px] leading-relaxed text-ink-soft">{s.tip.text}</p>
          </div>
        )}

        {/* 3a — what's happened so far */}
        <h3 className="mt-6 text-[15px] font-semibold text-ink">What's happened so far</h3>
        <ol className="mt-3">
          {s.timeline.map((step, i) => (
            <TimelineStep key={i} {...step} isLast={i === s.timeline.length - 1} />
          ))}
        </ol>

        {/* 3b — what to do next */}
        <div className="mt-5 space-y-2.5">
          {s.actions.map((a) => (
            <ActionButton
              key={a.id}
              label={a.label}
              icon={ACTION_ICON[a.id]}
              primary={a.primary}
              onClick={() => onAction(a.id)}
            />
          ))}
        </div>

        <SampleDataNote className="py-5" />
      </div>
    </div>
  )
}
