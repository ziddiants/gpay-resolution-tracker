import { Icon } from './Icons.jsx'

// Next-step action. `primary` renders a filled accent button; otherwise a
// calm outlined button. Used for the "what do I do" actions on the tracker.
export default function ActionButton({ label, icon, primary, onClick }) {
  const cls = primary
    ? 'bg-accent text-white hover:brightness-95 active:brightness-90'
    : 'bg-surface text-ink border border-line hover:bg-canvas active:bg-line'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-4 text-[15px] font-semibold transition ${cls}`}
    >
      {icon && <Icon name={icon} width={18} height={18} />}
      {label}
    </button>
  )
}
