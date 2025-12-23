import { useState, useEffect, useLayoutEffect, useRef } from 'react'

/**
 * useEffect vs useLayoutEffect
 * Demonstrates timing differences between the two hooks
 */

function UseEffectVsLayoutEffect() {
  const [position, setPosition] = useState(0)
  const [showFlicker, setShowFlicker] = useState(false)
  const [useLayout, setUseLayout] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  // useEffect - runs AFTER browser paints
  useEffect(() => {
    if (!useLayout && showFlicker) {
      console.log('⏰ useEffect running (after paint)')
      // Simulate calculation that changes position
      setPosition(200)
    }
  }, [showFlicker, useLayout])

  // useLayoutEffect - runs BEFORE browser paints
  useLayoutEffect(() => {
    if (useLayout && showFlicker) {
      console.log('⏰ useLayoutEffect running (before paint)')
      // Simulate calculation that changes position
      setPosition(200)
    }
  }, [showFlicker, useLayout])

  const demonstrateEffect = () => {
    setPosition(0)
    setShowFlicker(true)
    setTimeout(() => setShowFlicker(false), 100)
  }

  return (
    <div className="example-container">
      <h2>useEffect vs useLayoutEffect</h2>

      <div className="section">
        <h3>Execution Timeline</h3>
        <div className="timeline">
          <div className="timeline-step">
            <strong>1.</strong> React updates DOM
          </div>
          <div className="timeline-step" style={{ background: useLayout ? '#90EE90' : '#f0f0f0' }}>
            <strong>2.</strong> useLayoutEffect runs (blocks paint)
          </div>
          <div className="timeline-step">
            <strong>3.</strong> Browser paints screen
          </div>
          <div className="timeline-step" style={{ background: !useLayout ? '#90EE90' : '#f0f0f0' }}>
            <strong>4.</strong> useEffect runs (doesn't block)
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Visual Demonstration</h3>
        <div className="controls">
          <label>
            <input
              type="checkbox"
              checked={useLayout}
              onChange={(e) => setUseLayout(e.target.checked)}
            />
            Use useLayoutEffect (no flicker)
          </label>
          <button onClick={demonstrateEffect}>
            Demonstrate {useLayout ? 'useLayoutEffect' : 'useEffect'}
          </button>
        </div>

        <div style={{ position: 'relative', height: '100px', border: '1px solid #ccc', marginTop: '1rem' }}>
          <div
            ref={divRef}
            style={{
              position: 'absolute',
              left: `${position}px`,
              top: '35px',
              width: '50px',
              height: '50px',
              backgroundColor: useLayout ? 'green' : 'blue',
              transition: showFlicker ? 'none' : 'left 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px'
            }}
          >
            {position}
          </div>
        </div>

        <p className="info">
          {useLayout 
            ? '✓ useLayoutEffect: Position updates before paint (no flicker)'
            : '⚠️ useEffect: Position updates after paint (may see flicker from 0 to 200)'}
        </p>
      </div>

      <div className="section">
        <h3>When to use each:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>useEffect (99% of cases)</h4>
            <ul>
              <li>Data fetching</li>
              <li>Subscriptions</li>
              <li>Event listeners</li>
              <li>Logging</li>
              <li>Most side effects</li>
            </ul>
          </div>
          <div className="card">
            <h4>useLayoutEffect (rare)</h4>
            <ul>
              <li>Measuring DOM elements</li>
              <li>Scroll position updates</li>
              <li>Tooltip positioning</li>
              <li>Preventing visual flicker</li>
              <li>Synchronous DOM mutations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="summary">
        <h4>Key Takeaway:</h4>
        <p>
          Use <strong>useEffect</strong> for everything by default. Only use <strong>useLayoutEffect</strong> 
          when you need to read/write DOM synchronously before the browser paints, to avoid visual inconsistencies.
        </p>
      </div>
    </div>
  )
}

export default UseEffectVsLayoutEffect
