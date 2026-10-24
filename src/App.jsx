import { useEffect, useRef, useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import BottomSheet from './components/BottomSheet.jsx'
import LoadingSkeleton from './components/LoadingSkeleton.jsx'
import TransactionHistory from './screens/TransactionHistory.jsx'
import TransactionDetails from './screens/TransactionDetails.jsx'
import ResolutionTracker from './screens/ResolutionTracker.jsx'
import DisputeRaised from './screens/DisputeRaised.jsx'
import { getTransaction, getScenario, getPanels } from './data/transactions.js'

// Simple in-memory navigation — no router, so GitHub Pages never 404s on
// refresh and the prototype stays self-contained. Each history row opens its
// own transaction, whose status drives the whole resolution experience.
export default function App() {
  const [activeId, setActiveId] = useState(null)
  const [screen, setScreen] = useState('history')
  const [trackerLoading, setTrackerLoading] = useState(false)
  const [panel, setPanel] = useState(null) // 'bank' | 'help' | 'dispute'
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const txn = activeId ? getTransaction(activeId) : null
  const scenario = txn ? getScenario(txn) : null
  const panels = txn ? getPanels(txn) : null

  function openTxn(id) {
    setActiveId(id)
    setScreen('details')
  }

  function goTracker() {
    setScreen('tracker')
    setTrackerLoading(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setTrackerLoading(false), 900)
  }

  function handlePanelPrimary(key) {
    if (key === 'dispute') {
      setPanel(null)
      setScreen('dispute')
    }
  }

  function goHome() {
    setPanel(null)
    clearTimeout(timer.current)
    setTrackerLoading(false)
    setScreen('history')
  }

  return (
    <div className="h-[100dvh] bg-canvas">
      <PhoneFrame
        scrollKey={`${screen}-${activeId}-${trackerLoading}`}
        overlay={
          <BottomSheet
            panelKey={panel}
            panels={panels}
            onClose={() => setPanel(null)}
            onPrimary={handlePanelPrimary}
          />
        }
      >
        {screen === 'history' && <TransactionHistory onOpen={openTxn} />}

        {screen === 'details' && txn && (
          <TransactionDetails
            txn={txn}
            scenario={scenario}
            onTrack={goTracker}
            onBack={goHome}
          />
        )}

        {screen === 'tracker' &&
          txn &&
          (trackerLoading ? (
            <LoadingSkeleton />
          ) : (
            <ResolutionTracker
              txn={txn}
              scenario={scenario}
              onBack={() => setScreen('details')}
              onAction={(id) => setPanel(id)}
            />
          ))}

        {screen === 'dispute' && txn && (
          <DisputeRaised txn={txn} onBackToStatus={() => setScreen('tracker')} onDone={goHome} />
        )}
      </PhoneFrame>
    </div>
  )
}
