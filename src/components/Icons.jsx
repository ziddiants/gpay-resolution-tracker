// Hand-rolled inline line icons. Original shapes — no Google brand marks.
// Each takes standard SVG props (className, etc.) and inherits currentColor.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  width: 20,
  height: 20,
}

export function ClockIcon(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function CheckIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function CheckCircleIcon(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5 11 15l4.5-5" />
    </svg>
  )
}

export function AlertIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17.5v.01" />
    </svg>
  )
}

export function ChevronRightIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowLeftIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

export function SearchIcon(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  )
}

export function InfoIcon(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8v.01" />
    </svg>
  )
}

export function BankIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v8M19 10v8M9.5 10v8M14.5 10v8" />
      <path d="M3 21h18" />
    </svg>
  )
}

export function HelpIcon(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.4 9.5a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1 .8-1 1.6" />
      <path d="M12 17v.01" />
    </svg>
  )
}

export function FlagIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-1.5 3.5L16 11H5" />
    </svg>
  )
}

export function CopyIcon(p) {
  return (
    <svg {...base} {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </svg>
  )
}

export function CloseIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  )
}

export function RefreshIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 4v5h-5" />
    </svg>
  )
}

export function ChatIcon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5h16v11H9l-5 4V5Z" />
    </svg>
  )
}

// Lookup used by data-driven components.
export const ICONS = {
  clock: ClockIcon,
  check: CheckIcon,
  checkCircle: CheckCircleIcon,
  alert: AlertIcon,
  info: InfoIcon,
  bank: BankIcon,
  help: HelpIcon,
  flag: FlagIcon,
  chat: ChatIcon,
}

export function Icon({ name, ...rest }) {
  const Cmp = ICONS[name] || InfoIcon
  return <Cmp {...rest} />
}
