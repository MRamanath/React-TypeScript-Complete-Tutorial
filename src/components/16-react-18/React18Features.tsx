import { useState, useTransition, useDeferredValue, startTransition, useId, useSyncExternalStore } from 'react'

/**
 * React 18 Features
 * New concurrent features and hooks introduced in React 18
 */

// 1. useTransition - Mark updates as non-urgent
function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [input, setInput] = useState('')
  const [list, setList] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Urgent: Update input immediately
    setInput(e.target.value)

    // Non-urgent: Update list without blocking
    startTransition(() => {
      const newList = []
      for (let i = 0; i < 10000; i++) {
        newList.push(`${e.target.value} - Item ${i}`)
      }
      setList(newList)
    })
  }

  return (
    <div className="card">
      <h3>1. useTransition</h3>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type to see smooth updates..."
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      {isPending && <div style={{ color: '#646cff' }}>Updating list...</div>}
      <div style={{
        height: '150px',
        overflow: 'auto',
        border: '1px solid #646cff',
        borderRadius: '4px',
        padding: '0.5rem',
        fontSize: '0.8rem'
      }}>
        {list.slice(0, 50).map((item, i) => (
          <div key={i}>{item}</div>
        ))}
        {list.length > 50 && <div>...and {list.length - 50} more items</div>}
      </div>
      <p className="info">
        ✓ Input stays responsive during heavy list update<br />
        ⚡ useTransition keeps urgent updates fast
      </p>
    </div>
  )
}

// 2. useDeferredValue - Defer expensive computations
function UseDeferredValueDemo() {
  const [input, setInput] = useState('')
  const deferredInput = useDeferredValue(input)

  // Expensive computation
  const expensiveList = []
  for (let i = 0; i < 5000; i++) {
    expensiveList.push(`${deferredInput} - ${i}`)
  }

  return (
    <div className="card">
      <h3>2. useDeferredValue</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <div style={{ color: '#888', marginBottom: '0.5rem' }}>
        Current: {input} | Deferred: {deferredInput}
      </div>
      <div style={{
        height: '120px',
        overflow: 'auto',
        border: '1px solid #646cff',
        borderRadius: '4px',
        padding: '0.5rem',
        fontSize: '0.8rem',
        opacity: input !== deferredInput ? 0.5 : 1,
        transition: 'opacity 0.2s'
      }}>
        {expensiveList.slice(0, 30).map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
      <p className="info">
        ✓ Input updates immediately<br />
        ⏱️ List update is deferred (uses stale value while busy)
      </p>
    </div>
  )
}

// 3. startTransition (standalone)
function StartTransitionDemo() {
  const [tab, setTab] = useState<'about' | 'posts' | 'contact'>('about')
  const [isPending, setIsPending] = useState(false)

  const handleTabChange = (newTab: typeof tab) => {
    setIsPending(true)
    startTransition(() => {
      setTab(newTab)
      setIsPending(false)
    })
  }

  // Simulate slow component
  const SlowComponent = ({ name }: { name: string }) => {
    const items = []
    for (let i = 0; i < 500; i++) {
      items.push(<div key={i}>Item {i} for {name}</div>)
    }
    return <div style={{ height: '100px', overflow: 'auto', fontSize: '0.8rem' }}>{items}</div>
  }

  return (
    <div className="card">
      <h3>3. startTransition</h3>
      <div className="button-group" style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => handleTabChange('about')}
          style={{ background: tab === 'about' ? '#646cff' : undefined }}
        >
          About {tab === 'about' && isPending && '⏳'}
        </button>
        <button
          onClick={() => handleTabChange('posts')}
          style={{ background: tab === 'posts' ? '#646cff' : undefined }}
        >
          Posts {tab === 'posts' && isPending && '⏳'}
        </button>
        <button
          onClick={() => handleTabChange('contact')}
          style={{ background: tab === 'contact' ? '#646cff' : undefined }}
        >
          Contact {tab === 'contact' && isPending && '⏳'}
        </button>
      </div>
      <SlowComponent name={tab} />
      <p className="info">✓ Tab switches stay responsive even with slow components</p>
    </div>
  )
}

// 4. useId - Generate unique IDs
function UseIdDemo() {
  const id1 = useId()
  const id2 = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="card">
      <h3>4. useId</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor={id1} style={{ display: 'block', marginBottom: '0.5rem' }}>
            Name:
          </label>
          <input
            id={id1}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor={id2} style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
          </label>
          <input
            id={id2}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#888' }}>
        Generated IDs:<br />
        {id1}<br />
        {id2}
      </div>
      <p className="info">
        ✓ SSR-safe unique IDs<br />
        ✓ Matches between server and client
      </p>
    </div>
  )
}

// 5. useSyncExternalStore - Subscribe to external stores
function createStore(initialValue: number) {
  let value = initialValue
  const listeners = new Set<() => void>()

  return {
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot: () => value,
    increment: () => {
      value++
      listeners.forEach(listener => listener())
    },
    decrement: () => {
      value--
      listeners.forEach(listener => listener())
    }
  }
}

const externalStore = createStore(0)

function UseSyncExternalStoreDemo() {
  const value = useSyncExternalStore(
    externalStore.subscribe,
    externalStore.getSnapshot
  )

  return (
    <div className="card">
      <h3>5. useSyncExternalStore</h3>
      <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
        Count: {value}
      </div>
      <div className="button-group">
        <button onClick={() => externalStore.increment()}>+1</button>
        <button onClick={() => externalStore.decrement()}>-1</button>
      </div>
      <p className="info">
        ✓ Subscribe to external (non-React) stores<br />
        ✓ Concurrent-safe, prevents tearing
      </p>
    </div>
  )
}

// 6. Automatic Batching
function AutomaticBatchingDemo() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const [renders, setRenders] = useState(0)

  useState(() => {
    setRenders(r => r + 1)
  })

  const handleClickBatched = () => {
    // In React 18: All batched (1 render)
    setCount(c => c + 1)
    setFlag(f => !f)
    console.log('Batched update')
  }

  const handleClickAsync = () => {
    // In React 18: Also batched! (1 render)
    // In React 17: Would be 2 separate renders
    setTimeout(() => {
      setCount(c => c + 1)
      setFlag(f => !f)
      console.log('Async batched update')
    }, 100)
  }

  return (
    <div className="card">
      <h3>6. Automatic Batching</h3>
      <div style={{ marginBottom: '1rem' }}>
        <div>Count: {count}</div>
        <div>Flag: {flag ? '✓' : '✗'}</div>
        <div style={{ color: '#646cff' }}>Total Renders: {renders}</div>
      </div>
      <div className="button-group">
        <button onClick={handleClickBatched}>
          Update (Sync)
        </button>
        <button onClick={handleClickAsync}>
          Update (Async)
        </button>
      </div>
      <p className="info">
        ✓ Multiple setState calls batched into one render<br />
        ✓ Works in timeouts, promises, native events
      </p>
    </div>
  )
}

// 7. Transition vs Normal Update Comparison
function TransitionComparisonDemo() {
  const [withTransition, setWithTransition] = useState(true)
  const [input, setInput] = useState('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    const updateList = () => {
      const newList = []
      for (let i = 0; i < 8000; i++) {
        newList.push(`${value} - ${i}`)
      }
      setList(newList)
    }

    if (withTransition) {
      startTransition(updateList)
    } else {
      updateList()
    }
  }

  return (
    <div className="card">
      <h3>7. Transition Comparison</h3>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={withTransition}
          onChange={(e) => setWithTransition(e.target.checked)}
        />
        Use Transition (less janky)
      </label>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type to feel the difference..."
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      {isPending && <div style={{ color: '#646cff' }}>⏳ Updating...</div>}
      <div style={{
        height: '100px',
        overflow: 'auto',
        border: '1px solid #646cff',
        borderRadius: '4px',
        padding: '0.5rem',
        fontSize: '0.75rem'
      }}>
        {list.slice(0, 40).map((item, i) => <div key={i}>{item}</div>)}
      </div>
      <p className="info">
        {withTransition 
          ? '✓ Smooth typing with transition' 
          : '⚠️ Janky without transition'}
      </p>
    </div>
  )
}

export default function React18FeaturesDemo() {
  return (
    <div className="example-container">
      <h2>React 18 Features</h2>
      <p className="subtitle">New concurrent features and hooks introduced in React 18</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <UseTransitionDemo />
        <UseDeferredValueDemo />
        <StartTransitionDemo />
        <UseIdDemo />
        <UseSyncExternalStoreDemo />
        <AutomaticBatchingDemo />
        <TransitionComparisonDemo />
      </div>

      <div className="section">
        <h3>Concurrent Features Comparison</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>useTransition</h4>
            <ul style={{ textAlign: 'left', fontSize: '0.9rem' }}>
              <li>Mark updates as non-urgent</li>
              <li>Get isPending flag</li>
              <li>Keep UI responsive</li>
              <li>Good for: Heavy computations, large lists</li>
            </ul>
          </div>
          <div className="card">
            <h4>useDeferredValue</h4>
            <ul style={{ textAlign: 'left', fontSize: '0.9rem' }}>
              <li>Defer value updates</li>
              <li>Shows stale value while busy</li>
              <li>Simpler than useTransition</li>
              <li>Good for: Debouncing, live search</li>
            </ul>
          </div>
          <div className="card">
            <h4>startTransition</h4>
            <ul style={{ textAlign: 'left', fontSize: '0.9rem' }}>
              <li>Standalone transition API</li>
              <li>No isPending flag</li>
              <li>Use outside components</li>
              <li>Good for: Event handlers, callbacks</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Migration from React 17</h3>
        <div className="card">
          <table style={{ width: '100%', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #646cff' }}>
                <th style={{ padding: '0.5rem' }}>React 17</th>
                <th style={{ padding: '0.5rem' }}>React 18</th>
                <th style={{ padding: '0.5rem' }}>Benefit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem' }}>Manual batching only</td>
                <td style={{ padding: '0.5rem' }}>Automatic batching everywhere</td>
                <td style={{ padding: '0.5rem' }}>Fewer renders, better performance</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem' }}>No concurrent features</td>
                <td style={{ padding: '0.5rem' }}>useTransition, useDeferredValue</td>
                <td style={{ padding: '0.5rem' }}>Keep UI responsive</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem' }}>Random IDs (SSR issues)</td>
                <td style={{ padding: '0.5rem' }}>useId hook</td>
                <td style={{ padding: '0.5rem' }}>SSR-safe unique IDs</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem' }}>Tearing issues with stores</td>
                <td style={{ padding: '0.5rem' }}>useSyncExternalStore</td>
                <td style={{ padding: '0.5rem' }}>Concurrent-safe external stores</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="summary">
        <h4>When to Use React 18 Features:</h4>
        <ul>
          <li><strong>useTransition:</strong> When you have heavy state updates that block UI</li>
          <li><strong>useDeferredValue:</strong> For live search, filtering, or any deferred computation</li>
          <li><strong>startTransition:</strong> Mark non-urgent updates in event handlers</li>
          <li><strong>useId:</strong> Generate SSR-safe unique IDs for accessibility</li>
          <li><strong>useSyncExternalStore:</strong> When integrating with external state management</li>
          <li><strong>Automatic Batching:</strong> Free performance improvement (no changes needed)</li>
        </ul>
      </div>

      <div className="code-preview">
        <h4>Code Examples:</h4>
        <pre>{`// useTransition
const [isPending, startTransition] = useTransition()
startTransition(() => {
  setHeavyState(newValue) // Non-urgent update
})

// useDeferredValue
const deferredQuery = useDeferredValue(query)
const results = search(deferredQuery)

// startTransition (standalone)
startTransition(() => {
  navigate('/dashboard')
})

// useId
const id = useId()
<label htmlFor={id}>Name</label>
<input id={id} />

// useSyncExternalStore
const state = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot
)

// Automatic Batching (React 18)
setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // Both batched into one render!
}, 1000)`}</pre>
      </div>
    </div>
  )
}
