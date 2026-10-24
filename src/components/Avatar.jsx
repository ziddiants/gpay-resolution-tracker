// Initials avatar. Colour is derived from the name so rows look distinct,
// but it carries no status meaning.
const PALETTE = [
  'bg-[#e8f0fe] text-[#1a73e8]',
  'bg-[#fce8e6] text-[#c5221f]',
  'bg-[#e6f4ea] text-[#137333]',
  'bg-[#feefc3] text-[#b06000]',
  'bg-[#f3e8fd] text-[#8430ce]',
]

function pick(seed) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % PALETTE.length
  return PALETTE[h]
}

export default function Avatar({ initials, seed, size = 44 }) {
  const cls = pick(seed || initials)
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${cls}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
