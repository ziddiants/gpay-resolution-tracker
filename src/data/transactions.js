// ---------------------------------------------------------------------------
// Fictional sample data for the Payment Resolution Tracker prototype.
//
// EVERYTHING here is made up and illustrative. No real people, banks,
// accounts, UPI IDs, reference numbers or timelines. The RBI / NPCI timing
// copy reflects publicly-known turnaround rules AS A PLACEHOLDER; the (i) info
// hints explain the basis to users, and a real product must still confirm the
// rules against current RBI/NPCI guidance before launch.
//
// The transactions are outgoing person-to-person UPI transfers from the same
// user account — one successful, the rest each in a different resolution state.
// Keeping them P2P is deliberate: the refund wording below is P2P-specific
// (merchant payments have a longer window and need their own copy).
// ---------------------------------------------------------------------------

export const SAMPLE_NOTE = 'Illustrative sample data — not a real transaction.'

// The user's own account that money is paid from / refunded to.
export const USER_BANK = 'Sample Bank'
export const USER_MASK = '4821'
const bankLine = `${USER_BANK} ••${USER_MASK}`

// Status pill definitions (tone drives colour; icon + label mean colour is
// never the only signal).
export const STATUS_PILL = {
  completed: { tone: 'ok', icon: 'check', label: 'Completed' },
  processing: { tone: 'wait', icon: 'clock', label: 'Processing' },
  failed: { tone: 'wait', icon: 'clock', label: 'Refund pending' },
  overdue: { tone: 'bad', icon: 'alert', label: 'Needs attention' },
  refunded: { tone: 'ok', icon: 'check', label: 'Refunded' },
}

// The transactions shown in history. One ordinary successful payment, plus one
// per resolution state. Ordered most-recent first.
export const transactions = [
  {
    id: 'txn-sana',
    status: 'completed',
    party: 'Sana Kapoor',
    initials: 'SK',
    upiId: 'sana.kapoor@examplebank',
    amount: 1250,
    dateLabel: 'Fri, 23 Oct',
    timeLabel: '2:05 PM',
    utr: 'GPX2314K5567',
    paidLabel: 'Fri, 23 Oct · 2:05 PM',
  },
  {
    id: 'txn-ananya',
    status: 'processing',
    party: 'Ananya Rao',
    initials: 'AR',
    upiId: 'ananya.rao@examplebank',
    amount: 2450,
    dateLabel: 'Thu, 22 Oct',
    timeLabel: '7:42 PM',
    utr: 'GPX2290T4821',
    expectLabel: 'Fri, 23 Oct',
  },
  {
    id: 'txn-rohan',
    status: 'failed',
    party: 'Rohan Verma',
    initials: 'RV',
    upiId: 'rohan.verma@examplebank',
    amount: 1800,
    dateLabel: 'Thu, 22 Oct',
    timeLabel: '6:15 PM',
    utr: 'GPX2214V7735',
    failTime: 'Thu, 22 Oct · 6:16 PM',
    expectLabel: 'Fri, 23 Oct',
  },
  {
    id: 'txn-karan',
    status: 'refunded',
    party: 'Karan Shah',
    initials: 'KS',
    upiId: 'karan.shah@examplebank',
    amount: 900,
    dateLabel: 'Wed, 21 Oct',
    timeLabel: '8:30 PM',
    utr: 'GPX2130S9014',
    failTime: 'Wed, 21 Oct · 8:31 PM',
    refundInitLabel: 'Thu, 22 Oct · 9:10 AM',
    refundDate: 'Thu, 22 Oct',
    refundLabel: 'Thu, 22 Oct · 11:28 AM',
    refundRef: 'GPX-RF-4821-0900',
  },
  {
    id: 'txn-priya',
    status: 'overdue',
    party: 'Priya Nair',
    initials: 'PN',
    upiId: 'priya.nair@examplebank',
    amount: 5000,
    dateLabel: 'Mon, 19 Oct',
    timeLabel: '1:20 PM',
    utr: 'GPX1915N2208',
    failTime: 'Mon, 19 Oct · 1:21 PM',
    expectLabel: 'Tue, 20 Oct',
  },
]

export function getTransaction(id) {
  return transactions.find((t) => t.id === id) || transactions[0]
}

// Softened, user-friendly explanations shown behind an (i) info button.
const RBI_INFO =
  "These timelines follow RBI's turnaround rules for failed UPI transfers. Actual timing can vary slightly by bank."

const firstName = (party) => party.split(' ')[0]
const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

// Builds the resolution content for a transaction based on its status. Every
// scenario answers the three questions in order:
//   1. headline  -> what is happening to my money?
//   2. expect    -> when should I expect an update / refund?
//   3. timeline + actions -> what's happened, and what to do if it doesn't.
export function getScenario(txn) {
  const amt = money(txn.amount)
  const fn = firstName(txn.party)
  const debitTime = `${txn.dateLabel} · ${txn.timeLabel}`
  const started = { kind: 'done', title: 'Payment started', time: debitTime }
  const debited = { kind: 'done', title: `${amt} debited from ${bankLine}`, time: debitTime }
  const failedStep = { kind: 'failed', title: `Payment failed at ${fn}'s bank`, time: txn.failTime }

  switch (txn.status) {
    case 'completed':
      return {
        detail: {
          tone: 'ok',
          title: 'Payment successful',
          body: `${amt} was paid to ${fn}. The money has reached their account.`,
          cta: 'View payment status',
        },
        headline: 'This payment went through',
        expect: {
          tone: 'ok',
          label: 'Paid on',
          big: txn.dateLabel,
          small: 'Completed successfully',
          body: `The ${amt} reached ${fn}'s account. Nothing more to do.`,
        },
        timeline: [
          started,
          debited,
          { kind: 'success', title: `Received in ${fn}'s account`, time: txn.paidLabel },
        ],
        tip: {
          icon: 'info',
          text: 'This payment is complete. You can find the receipt any time in your transaction history.',
        },
        actions: [
          { id: 'bank', label: 'Check bank statement', primary: false },
          { id: 'help', label: 'Get help', primary: false },
        ],
      }

    case 'processing':
      return {
        detail: {
          tone: 'wait',
          title: 'Payment processing',
          body: `${amt} was debited. We're waiting for ${fn}'s bank to confirm.`,
          cta: 'Track status',
        },
        headline: 'Your bank is still processing this payment',
        expect: {
          tone: 'wait',
          label: 'Expect an update by',
          big: txn.expectLabel,
          small: 'End of next working day (T+1)',
          body: "If the payment doesn't go through, the money is returned to your account automatically.",
          info: RBI_INFO,
          infoLabel: 'Why this date?',
        },
        timeline: [
          started,
          debited,
          { kind: 'current', title: `Waiting for ${fn}'s bank to confirm`, time: 'In progress' },
          { kind: 'pending', title: 'Payment confirmed or money returned', time: `Expected by ${txn.expectLabel}` },
        ],
        tip: {
          icon: 'info',
          text: "Please don't send this payment again while it's processing — you could be charged twice.",
        },
        actions: [
          { id: 'bank', label: 'Check bank statement', primary: false },
          { id: 'help', label: 'Get help', primary: false },
        ],
      }

    case 'failed':
      return {
        detail: {
          tone: 'wait',
          title: 'Payment failed — refund on the way',
          body: `${amt} was debited but the payment failed. The money is being returned to your bank.`,
          cta: 'Track refund',
        },
        headline: 'This payment failed — your refund is on the way',
        expect: {
          tone: 'wait',
          label: 'Refund expected by',
          big: txn.expectLabel,
          small: 'End of next working day (T+1)',
          body: "Failed UPI payments are reversed automatically. You don't need to do anything.",
          info: RBI_INFO,
          infoLabel: 'Why this date?',
        },
        timeline: [
          started,
          debited,
          failedStep,
          { kind: 'current', title: `Refund initiated to ${bankLine}`, time: 'In progress' },
          { kind: 'pending', title: `${amt} back in your account`, time: `Expected by ${txn.expectLabel}` },
        ],
        tip: {
          icon: 'info',
          text: 'The refund goes back to the same bank account you paid from. No action needed from you.',
        },
        actions: [
          { id: 'bank', label: 'Check bank statement', primary: false },
          { id: 'help', label: 'Get help', primary: false },
        ],
      }

    case 'overdue':
      return {
        detail: {
          tone: 'bad',
          title: 'This is taking longer than expected',
          body: `${amt} was debited on ${txn.dateLabel} and hasn't been resolved yet. You can raise a dispute.`,
          cta: 'See what to do',
        },
        headline: "This payment is overdue — let's get it sorted",
        expect: {
          tone: 'bad',
          label: 'Was expected by',
          big: txn.expectLabel,
          small: 'Now overdue',
          body:
            'The refund should have arrived by now. You can raise a dispute, and the bank is required to respond. ' +
            'If it still isn’t resolved, a compensation of ₹100 per day of delay may apply.',
          note:
            'Sample timeline — real RBI/NPCI dispute and compensation rules apply. Verify before launch.',
          info: 'If this stays unresolved, you can escalate to the RBI Banking Ombudsman after 30 days.',
          infoLabel: 'What are my options?',
        },
        timeline: [
          started,
          debited,
          failedStep,
          { kind: 'failed', title: 'Refund not received by the expected date', time: txn.expectLabel },
          { kind: 'current', title: 'Needs attention — raise a dispute', time: 'Action needed' },
        ],
        tip: {
          icon: 'info',
          text: 'Raising a dispute asks your bank to investigate. Keep your transaction ID handy — it’s on the details screen.',
        },
        actions: [
          { id: 'dispute', label: 'Raise a dispute', primary: true },
          { id: 'help', label: 'Get help', primary: false },
          { id: 'bank', label: 'Check bank statement', primary: false },
        ],
      }

    case 'refunded':
    default:
      return {
        detail: {
          tone: 'ok',
          title: 'Refunded to your bank',
          body: `${amt} was refunded on ${txn.refundDate}. It can take a short while to appear in your balance.`,
          cta: 'View refund details',
        },
        headline: 'Your money has been refunded',
        expect: {
          tone: 'ok',
          label: 'Refunded on',
          big: txn.refundDate,
          small: `Refund reference ${txn.refundRef}`,
          body: `The ${amt} is back in ${bankLine}. It may take a little time to show in your balance.`,
          info: 'This refund reference is a sample value, shown for illustration only.',
          infoLabel: 'About this reference',
          infoTitle: 'Sample value',
        },
        timeline: [
          started,
          debited,
          failedStep,
          { kind: 'done', title: `Refund initiated to ${bankLine}`, time: txn.refundInitLabel },
          { kind: 'refunded', title: `${amt} refunded to ${bankLine}`, time: txn.refundLabel },
        ],
        tip: {
          icon: 'info',
          text: "If you don't see it after a day, check your bank statement — the refund reference above will match the entry.",
        },
        actions: [
          { id: 'bank', label: 'Check bank statement', primary: false },
          { id: 'help', label: 'Get help', primary: false },
        ],
      }
  }
}

// Bottom-sheet panel content, built for the active transaction. Pure guidance —
// no real links, no credential fields.
export function getPanels(txn) {
  const amt = `${money(txn.amount)}.00`
  return {
    bank: {
      title: 'Check your bank statement',
      icon: 'bank',
      body: [
        'Open your bank app or passbook and look for an entry matching the amount and date below.',
        'A debit with no matching credit usually means the refund is still on its way.',
      ],
      facts: [
        { label: 'Amount', value: amt },
        { label: 'Debited on', value: `${txn.dateLabel} · ${txn.timeLabel}` },
        { label: 'From', value: bankLine },
        { label: 'Reference (UTR)', value: txn.utr },
      ],
      primary: 'Copy reference',
      note: 'This screen never opens your bank or asks for a PIN, OTP or password.',
    },
    help: {
      title: 'Get help with this payment',
      icon: 'help',
      body: [
        'Browse common questions about stuck payments, or start a chat with support.',
        'Support can see this transaction’s status — you won’t need to share any passwords or OTPs.',
      ],
      options: [
        'Why was I debited if the payment failed?',
        'How long does a UPI refund take?',
        'The money hasn’t come back yet',
      ],
      primary: 'Chat with support',
      note: 'Google Pay will never ask for your UPI PIN, OTP or bank password — not here, not on a call.',
    },
    dispute: {
      title: 'Raise a dispute',
      icon: 'flag',
      body: [
        'A dispute asks your bank to investigate this payment. You’ll get updates here and by notification.',
        'This is a sample flow — in the real app you’d confirm a few details and submit.',
      ],
      facts: [
        { label: 'Payment to', value: txn.party },
        { label: 'Amount', value: amt },
        { label: 'Transaction ID', value: txn.utr },
        { label: 'Issue', value: 'Debited, refund not received' },
      ],
      primary: 'Submit dispute',
      note: 'No sensitive details are collected in this prototype.',
    },
  }
}
