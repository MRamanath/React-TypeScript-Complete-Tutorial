import { useState, memo } from 'react'

/**
 * React.memo Example
 * Demonstrates preventing unnecessary re-renders
 */

// Regular component - re-renders every time parent renders
const RegularChild = ({ count }: { count: number }) => {
  console.log('🔴 RegularChild rendered')
  return (
    <div className="card" style={{ borderColor: '#f99' }}>
      <h4>Regular Child</h4>
      <p>Count: {count}</p>
      <p className="info">⚠️ Re-renders on every parent render</p>
    </div>
  )
}

// Memoized component - only re-renders when props change
const MemoizedChild = memo(({ count }: { count: number }) => {
  console.log('🟢 MemoizedChild rendered')
  return (
    <div className="card" style={{ borderColor: '#9f9' }}>
      <h4>Memoized Child</h4>
      <p>Count: {count}</p>
      <p className="info">✓ Only re-renders when count prop changes</p>
    </div>
  )
})

// Component with custom comparison
const CustomMemoChild = memo(
  ({ user }: { user: { id: string; name: string; age: number } }) => {
    console.log('🔵 CustomMemoChild rendered')
    return (
      <div className="card" style={{ borderColor: '#99f' }}>
        <h4>Custom Memo Child</h4>
        <p>User: {user.name}</p>
        <p className="info">✓ Only re-renders when user.id changes (custom comparison)</p>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id
  }
)

export default function ReactMemoDemo() {
  const [count, setCount] = useState(0)
  const [unrelatedState, setUnrelatedState] = useState(0)
  const [userName, setUserName] = useState('John')
  const [userAge, setUserAge] = useState(25)

  const user = {
    id: '1',
    name: userName,
    age: userAge
  }

  return (
    <div className="example-container">
      <h2>React.memo - Preventing Unnecessary Re-renders</h2>

      <div className="section">
        <h3>Parent Component State</h3>
        <div className="controls">
          <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
          </div>
          <div>
            <p>Unrelated State: {unrelatedState}</p>
            <button onClick={() => setUnrelatedState(unrelatedState + 1)}>
              Change Unrelated State
            </button>
          </div>
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User name"
            />
            <input
              type="number"
              value={userAge}
              onChange={(e) => setUserAge(Number(e.target.value))}
              placeholder="User age"
            />
          </div>
        </div>
        <p className="info">
          👀 Open browser console and click buttons to see render logs
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
        <RegularChild count={count} />
        <MemoizedChild count={count} />
        <CustomMemoChild user={user} />
      </div>

      <div className="section">
        <h3>What Happens?</h3>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Regular Child</th>
              <th>Memoized Child</th>
              <th>Custom Memo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Click "Increment Count"</td>
              <td>🔴 Re-renders</td>
              <td>🟢 Re-renders (count changed)</td>
              <td>🔵 Doesn't re-render (id unchanged)</td>
            </tr>
            <tr>
              <td>Click "Change Unrelated State"</td>
              <td>🔴 Re-renders</td>
              <td>🟢 Doesn't re-render (count unchanged)</td>
              <td>🔵 Doesn't re-render (id unchanged)</td>
            </tr>
            <tr>
              <td>Change user name</td>
              <td>🔴 Re-renders</td>
              <td>🟢 Doesn't re-render</td>
              <td>🔵 Doesn't re-render (id unchanged)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>When to use React.memo</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card" style={{ borderColor: '#9f9' }}>
            <h4>✅ Good Use Cases:</h4>
            <ul>
              <li>Component renders often with same props</li>
              <li>Expensive render logic</li>
              <li>Pure functional component</li>
              <li>Parent re-renders frequently</li>
              <li>Props rarely change</li>
            </ul>
          </div>
          <div className="card" style={{ borderColor: '#f99' }}>
            <h4>❌ Avoid When:</h4>
            <ul>
              <li>Props change frequently</li>
              <li>Cheap to render</li>
              <li>Premature optimization</li>
              <li>Component always renders differently</li>
              <li>Props contain functions/objects</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="summary">
        <h4>Key Points:</h4>
        <ul>
          <li>React.memo does <strong>shallow comparison</strong> of props</li>
          <li>Only prevents re-renders when props haven't changed</li>
          <li>Doesn't affect state or context changes in the component itself</li>
          <li>Can provide custom comparison function for complex props</li>
          <li>Works like PureComponent but for functional components</li>
        </ul>
      </div>

      <div className="code-preview">
        <h4>Basic Usage:</h4>
        <pre>{`// Without memo
const Child = ({ value }) => {
  return <div>{value}</div>
}

// With memo
const Child = memo(({ value }) => {
  return <div>{value}</div>
})

// With custom comparison
const Child = memo(
  ({ user }) => <div>{user.name}</div>,
  (prev, next) => prev.user.id === next.user.id
)`}</pre>
      </div>
    </div>
  )
}
