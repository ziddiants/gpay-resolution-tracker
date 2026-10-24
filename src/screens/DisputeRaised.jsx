import AppBar from '../components/AppBar.jsx'
import SampleDataNote from '../components/SampleDataNote.jsx'
import ActionButton from '../components/ActionButton.jsx'
import { CheckCircleIcon } from '../components/Icons.jsx'

// Confirmation after a dispute is submitted (sample flow).
export default function DisputeRaised({ txn, onBackToStatus, onDone }) {
  const disputeRef = `GPX-DSP-${txn.utr.slice(-4)}`
  return (
    <div className="animate-screen-in flex min-h-full flex-col">
      <AppBar title="Dispute raised" onBack={onBackToStatus} />

      <div className="flex flex-1 flex-col items-center px-6 pt-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ok-soft text-ok">
          <CheckCircleIcon width={34} height={34} strokeWidth={2.2} />
        </span>
        <h2 className="mt-4 text-[22px] font-bold text-ink">Dispute raised</h2>
        <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-ink-soft">
          We've asked your bank to investigate the ₹{txn.amount.toLocaleString('en-IN')} paid
          to {txn.party}. You'll get updates here and by notification.
        </p>

        <dl className="mt-6 w-full divide-y divide-line rounded-2xl border border-line text-left">
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-[13px] text-ink-faint">Dispute reference</dt>
            <dd className="text-[14px] font-medium text-ink">{disputeRef}</dd>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-[13px] text-ink-faint">Expected first update</dt>
            <dd className="text-[14px] font-medium text-ink">Within 3 working days</dd>
          </div>
        </dl>

        <p className="mt-4 text-[12px] leading-snug text-ink-faint">
          Sample timeline — a real dispute follows RBI/NPCI grievance timelines. Verify before launch.
        </p>
      </div>

      <div className="space-y-2.5 px-5 pb-4 pt-2">
        <ActionButton label="Back to payment status" primary onClick={onBackToStatus} />
        <ActionButton label="Done" onClick={onDone} />
      </div>

      <SampleDataNote className="px-4 pb-5" />
    </div>
  )
}
