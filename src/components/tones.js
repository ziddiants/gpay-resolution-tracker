// Maps a semantic tone to Tailwind classes built on the @theme colour tokens.
// Keeping this in one place means status colours stay consistent everywhere,
// and each use also pairs with an icon + label so colour is never the only cue.
export const toneClasses = {
  ok: {
    pill: 'bg-ok-soft text-ok',
    card: 'bg-ok-soft',
    accentBar: 'bg-ok',
    text: 'text-ok',
    dot: 'bg-ok text-white',
  },
  wait: {
    pill: 'bg-wait-soft text-wait',
    card: 'bg-wait-soft',
    accentBar: 'bg-wait',
    text: 'text-wait',
    dot: 'bg-wait text-white',
  },
  bad: {
    pill: 'bg-bad-soft text-bad',
    card: 'bg-bad-soft',
    accentBar: 'bg-bad',
    text: 'text-bad',
    dot: 'bg-bad text-white',
  },
  neutral: {
    pill: 'bg-canvas text-ink-soft',
    card: 'bg-canvas',
    accentBar: 'bg-ink-faint',
    text: 'text-ink-soft',
    dot: 'bg-ink-faint text-white',
  },
}
