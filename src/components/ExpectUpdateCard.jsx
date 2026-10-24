import { toneClasses } from './tones.js'
import InfoHint from './InfoHint.jsx'

// The "when should I expect an update/refund" card — the answer to question 2.
// Big date first, then the plain-language reason. An optional (i) info button
// reveals the regulatory basis on tap, instead of always-on fine print.
export default function ExpectUpdateCard({ tone = 'wait', label, big, small, body, info, infoLabel, infoTitle }) {
  const t = toneClasses[tone] || toneClasses.wait
  return (
    <section
      className={`relative overflow-hidden rounded-2xl p-4 ${t.card}`}
      aria-label={`${label} ${big}`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${t.accentBar}`} aria-hidden="true" />
      <div className={`flex items-center justify-between gap-2 ${t.text}`}>
        <p className="text-[11px] font-semibold uppercase tracking-wide">{label}</p>
        {info && <InfoHint text={info} label={infoLabel} title={infoTitle} />}
      </div>
      <p className="mt-1 text-2xl font-bold text-ink">{big}</p>
      {small && <p className={`mt-0.5 text-[13px] font-medium ${t.text}`}>{small}</p>}
      {body && <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">{body}</p>}
    </section>
  )
}
