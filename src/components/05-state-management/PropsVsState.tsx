import { useState } from 'react'

/**
 * Props vs State Example
 * 
 * Props: Data passed from parent (immutable in child)
 * State: Data managed within component (mutable)
 */

// Child component receives props
function UserCard({ name, age }: { name: string; age: number }) {
  // Props are read-only - can't do: name = "new name"
  return (
    <div className="card">
      <h3>User Card (Props)</h3>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p className="info">✓ This component receives data via props (read-only)</p>
    </div>
  )
}

// Parent component with state
function PropsVsStateExample() {
  // State - component can update this
  const [count, setCount] = useState(0)
  const [userName, setUserName] = useState('John')
  const [userAge, setUserAge] = useState(25)

  return (
    <div className="example-container">
      <h2>Props vs State</h2>
      
      <div className="section">
        <h3>State Example (Internal Data)</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <p className="info">✓ Component controls its own state</p>
      </div>

      <div className="section">
        <h3>Props Example (Data Flow Down)</h3>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
            placeholder="Age"
          />
        </div>
        {/* Passing state as props to child */}
        <UserCard name={userName} age={userAge} />
        <p className="info">✓ Parent passes data down via props</p>
      </div>

      <div className="summary">
        <h4>Key Differences:</h4>
        <ul>
          <li><strong>Props:</strong> Passed from parent, read-only in child</li>
          <li><strong>State:</strong> Managed by component, can be updated</li>
          <li><strong>Data Flow:</strong> Props flow down (one-way)</li>
          <li><strong>Update:</strong> State via setState, Props via parent re-render</li>
        </ul>
      </div>
    </div>
  )
}

export default function PropsVsState() {
  return (
    <div className="demo-section">
      <PropsVsStateExample />
    </div>
  )
}
