import { Icon } from './Icons.jsx'
import { toneClasses } from './tones.js'

// A status chip: colour + icon + text label together (never colour alone).
export default function StatusPill({ tone = 'neutral', icon, label, size = 'md' }) {
  const t = toneClasses[tone] || toneClasses.neutral
  const sizing =
    size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-[13px] px-2.5 py-1 gap-1.5'
  const iconSize = size === 'sm' ? 13 : 15
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizing} ${t.pill}`}
    >
      {icon && <Icon name={icon} width={iconSize} height={iconSize} strokeWidth={2.4} />}
      {label}
    </span>
  )
}
