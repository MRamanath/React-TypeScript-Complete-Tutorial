import { useState, useMemo } from 'react'

/**
 * useMemo Example
 * Memoizes computed values to avoid expensive recalculations
 */

// Expensive computation simulator
function expensiveCalculation(num: number): number {
  console.log('🔄 Running expensive calculation...')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += num
  }
  return result
}

function UseMemoDemo() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([1, 2, 3, 4, 5])
  const [darkMode, setDarkMode] = useState(false)

  // WITHOUT useMemo - calculates on every render
  // const expensiveValueWithout = expensiveCalculation(count)

  // WITH useMemo - only calculates when count changes
  const expensiveValueWith = useMemo(() => {
    return expensiveCalculation(count)
  }, [count])

  // Memoize filtered list
  const filteredItems = useMemo(() => {
    console.log('🔍 Filtering items...')
    return items.filter(item => item > 2)
  }, [items])

  // Memoize object to prevent reference change
  const themeStyles = useMemo(() => ({
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#333',
    padding: '1rem',
    borderRadius: '4px'
  }), [darkMode])

  return (
    <div className="example-container">
      <h2>useMemo Example</h2>

      <div className="section">
        <h3>Expensive Calculation</h3>
        <p>Count: {count}</p>
        <p>Expensive Result: {expensiveValueWith}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <p className="info">
          👀 Check console - calculation only runs when count changes
        </p>
      </div>

      <div className="section">
        <h3>Array Filtering with useMemo</h3>
        <p>Items: {items.join(', ')}</p>
        <p>Filtered ({">"} 2): {filteredItems.join(', ')}</p>
        <button onClick={() => setItems([...items, items.length + 1])}>
          Add Item
        </button>
        <p className="info">
          👀 Filtering only happens when items array changes
        </p>
      </div>

      <div className="section">
        <h3>Memoized Object Reference</h3>
        <div style={themeStyles}>
          <p>Theme: {darkMode ? 'Dark' : 'Light'}</p>
          <button onClick={() => setDarkMode(!darkMode)}>
            Toggle Theme
          </button>
        </div>
        <p className="info">
          ✓ Style object has stable reference unless darkMode changes
        </p>
      </div>

      <div className="section">
        <h3>Test Re-renders</h3>
        <button onClick={() => console.log('Triggered re-render')}>
          Trigger Re-render (no state change)
        </button>
        <p className="info">
          Without useMemo: expensive calculation runs on every render<br />
          With useMemo: calculation skipped if dependencies unchanged
        </p>
      </div>

      <div className="summary">
        <h4>useMemo vs useCallback:</h4>
        <ul>
          <li><strong>useMemo:</strong> Memoizes <em>values</em> (numbers, objects, arrays)</li>
          <li><strong>useCallback:</strong> Memoizes <em>functions</em></li>
          <li><code>useCallback(fn, deps)</code> === <code>useMemo(() =&gt; fn, deps)</code></li>
          <li>Use useMemo for expensive calculations or to maintain reference equality</li>
        </ul>
      </div>
    </div>
  )
}

export default UseMemoDemo
