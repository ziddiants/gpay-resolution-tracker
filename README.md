# Payment Resolution Tracker — prototype

A mobile-first, clickable prototype that reduces a user's **uncertainty** when a
UPI payment is stuck after money has been debited. It answers three questions in
order, within ~10 seconds:

1. **What is happening to my money?** — a plain-language status headline
2. **When should I expect an update or refund?** — an expected-update/refund card
3. **What do I do if it doesn't happen?** — a timeline of events + next-step actions

Built for a **product case study**. This is a design prototype, not a real
product, and is **not affiliated with, endorsed by, or connected to Google**.

> ⚠️ **All data is fictional and illustrative.** No real transactions, banks,
> accounts, people or reference numbers. The app never reads live bank status
> and never asks for a UPI PIN, OTP, password or any sensitive credential.
> RBI/NPCI timing copy is a placeholder marked "verify before launch" — a real
> product must confirm it against current RBI/NPCI guidance.

## The journey

`Transaction history → tap a payment → transaction details → resolution tracker`

The history screen lists five outgoing UPI transfers — one ordinary success plus
one per resolution state. Tapping any row opens that payment's own details and
live tracker — no mode switches or prototype chrome.

| Transaction | State | What it shows |
| --- | --- | --- |
| Sana Kapoor · ₹1,250 | **Completed** | Successful payment; green confirmation, no action needed |
| Ananya Rao · ₹2,450 | **Processing** | Bank still processing; expect update by T+1; don't retry |
| Rohan Verma · ₹1,800 | **Failed · refund pending** | Payment failed; automatic refund on the way |
| Karan Shah · ₹900 | **Refunded** | Confirmation + sample refund reference |
| Priya Nair · ₹5,000 | **Overdue** | Expected window passed; **Raise a dispute** is the primary action |

All four are person-to-person transfers on purpose: the verified refund wording
(next-working-day reversal, ₹100/day, RBI Ombudsman) is P2P-specific — merchant
payments have a longer window and would need their own copy.

Supporting states: a short loading skeleton, three bottom-sheet actions
(*Check bank statement*, *Get help*, *Raise a dispute*), and a dispute-raised
confirmation screen.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (CSS-first config in `src/index.css`)
- No router — in-memory screen state (keeps the prototype self-contained and
  safe for static hosting)

## Run it locally

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server
```

Then open the URL it prints — **http://localhost:5173/gpay-resolution-tracker/**
(the path matches the GitHub Pages base; don't drop the trailing segment).

Other commands:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally to sanity-check it
```

## Publish to GitHub Pages

Deployment runs under **your** GitHub account — you run these steps.

1. **Create the repo** (name it `gpay-resolution-tracker` so the base path in
   `vite.config.js` matches):
   ```bash
   git init && git add -A && git commit -m "Payment Resolution Tracker prototype"
   git branch -M main
   gh repo create gpay-resolution-tracker --public --source=. --remote=origin --push
   ```
   (Or create the repo on github.com and `git remote add origin … && git push -u origin main`.)

2. **Turn on Pages via Actions:** repo **Settings → Pages → Build and
   deployment → Source: GitHub Actions**.

3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on
   every push to `main`. Watch it finish under the repo's **Actions** tab.

4. Once the run succeeds, your site is live at:
   **`https://<your-username>.github.io/gpay-resolution-tracker/`**

> If you use a different repo name, update `base` in `vite.config.js` to
> `'/<your-repo-name>/'`. For a user/org root site or a custom domain, set it to `'/'`.

## Project structure

```
src/
  App.jsx                 navigation state, scenario switch, loading, overlays
  data/transactions.js    single source of truth for all sample data + copy
  components/             PhoneFrame, StatusPill, TimelineStep, ExpectUpdateCard,
                          ActionButton, BottomSheet, LoadingSkeleton, AppBar,
                          Avatar, SampleDataNote, Icons
  screens/                TransactionHistory, TransactionDetails,
                          ResolutionTracker, DisputeRaised
```

## Design notes

- Visual direction follows Google Pay India's *language* (clean white surfaces,
  rounded cards, line icons, muted dividers) in an **original style** — no Google
  logos or brand marks are used.
- Status is **never conveyed by colour alone**: every status pill and timeline
  node pairs colour with an icon and a text label.
- Green = success/refunded · amber = pending/processing · red = failure/overdue.
- Hierarchy on every screen: **status → amount → timeline → next action**.
