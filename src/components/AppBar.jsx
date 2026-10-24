import { ArrowLeftIcon, SearchIcon } from './Icons.jsx'

// Top app bar: back affordance + title, with an optional search icon.
export default function AppBar({ title, onBack, showSearch = false }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 bg-surface/95 px-4 py-3 backdrop-blur">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="-ml-1.5 rounded-full p-1.5 text-ink hover:bg-canvas active:bg-line"
        >
          <ArrowLeftIcon width={22} height={22} />
        </button>
      )}
      <h1 className="flex-1 truncate text-[18px] font-semibold text-ink">{title}</h1>
      {showSearch && (
        <button
          type="button"
          aria-label="Search transactions"
          className="rounded-full p-1.5 text-ink hover:bg-canvas"
        >
          <SearchIcon width={22} height={22} />
        </button>
      )}
    </header>
  )
}
