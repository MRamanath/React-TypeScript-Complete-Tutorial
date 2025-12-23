import { useState, useCallback, memo } from 'react'

/**
 * useCallback Example
 * Memoizes functions to prevent recreation on every render
 */

// Memoized child component - only re-renders when props change
const ChildComponent = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`Rendering ${label}...`)
  return (
    <button onClick={onClick} className="btn">
      {label}
    </button>
  )
})

function UseCallbackDemo() {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  // WITHOUT useCallback - new function every render
  const handleClickWithout = () => {
    console.log('Clicked (without useCallback)')
  }

  // WITH useCallback - same function reference
  const handleClickWith = useCallback(() => {
    console.log('Clicked (with useCallback)')
  }, []) // Empty deps = function never changes

  // useCallback with dependencies
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, []) // Using updater function, so no deps needed

  return (
    <div className="example-container">
      <h2>useCallback Example</h2>

      <div className="section">
        <h3>Current State</h3>
        <p>Count: {count}</p>
        <p>Other State: {otherState}</p>
      </div>

      <div className="section">
        <h3>Without useCallback</h3>
        <p className="info">⚠️ Child re-renders on every parent render</p>
        <ChildComponent onClick={handleClickWithout} label="Without useCallback" />
      </div>

      <div className="section">
        <h3>With useCallback</h3>
        <p className="info">✓ Child only re-renders when function changes</p>
        <ChildComponent onClick={handleClickWith} label="With useCallback" />
      </div>

      <div className="section">
        <h3>Test It</h3>
        <button onClick={handleIncrement}>Increment Count</button>
        <button onClick={() => setOtherState(s => s + 1)}>
          Change Other State (triggers re-render)
        </button>
        <p className="info">
          👀 Open console and click "Change Other State"<br />
          Without useCallback child re-renders, with useCallback it doesn't!
        </p>
      </div>

      <div className="summary">
        <h4>When to use useCallback:</h4>
        <ul>
          <li>Passing callbacks to memoized child components</li>
          <li>Function is a dependency of other hooks</li>
          <li>Expensive callback functions</li>
          <li>Preventing child re-renders in optimized components</li>
        </ul>
      </div>
    </div>
  )
}

export default UseCallbackDemo
