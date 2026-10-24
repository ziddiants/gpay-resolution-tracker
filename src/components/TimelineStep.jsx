import { CheckIcon, ClockIcon, CloseIcon } from './Icons.jsx'

// One row in the "What's happened so far" timeline.
// kind: 'done' | 'current' | 'pending' | 'failed' | 'refunded'
//
// The node shape + icon carry the meaning alongside colour:
//   done     dark filled, check
//   refunded green filled, check
//   current  amber filled, clock
//   failed   red filled, cross
//   pending  hollow outline, no icon
const NODE = {
  done: { cls: 'bg-ink text-white border-ink', icon: CheckIcon },
  refunded: { cls: 'bg-ok text-white border-ok', icon: CheckIcon },
  success: { cls: 'bg-ok text-white border-ok', icon: CheckIcon },
  current: { cls: 'bg-wait text-white border-wait', icon: ClockIcon },
  failed: { cls: 'bg-bad text-white border-bad', icon: CloseIcon },
  pending: { cls: 'bg-surface text-transparent border-line', icon: null },
}

export default function TimelineStep({ kind = 'pending', title, time, isLast }) {
  const node = NODE[kind] || NODE.pending
  const NodeIcon = node.icon
  const muted = kind === 'pending'
  const isCurrent = kind === 'current'

  return (
    <li className="flex gap-3">
      {/* node + connector rail */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${node.cls} ${
            isCurrent ? 'ring-4 ring-wait-soft' : ''
          }`}
        >
          {NodeIcon && <NodeIcon width={13} height={13} strokeWidth={3} />}
        </span>
        {!isLast && <span className="my-0.5 w-0.5 grow rounded bg-line" />}
      </div>

      {/* text */}
      <div className={`pb-5 ${isLast ? 'pb-0' : ''}`}>
        <p
          className={`text-[15px] leading-snug ${
            muted ? 'text-ink-faint' : 'text-ink font-medium'
          }`}
        >
          {title}
        </p>
        {time && <p className="mt-0.5 text-[13px] text-ink-faint">{time}</p>}
      </div>
    </li>
  )
}
