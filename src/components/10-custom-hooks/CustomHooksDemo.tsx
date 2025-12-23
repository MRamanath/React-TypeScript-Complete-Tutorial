import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom Hooks Examples
 * Reusable hooks for common patterns
 */

// 1. useDebounce - Delays updating a value
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// 2. useToggle - Boolean state with toggle function
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}

// 3. usePrevious - Get previous value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

// 4. useLocalStorage - Sync state with localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

// Demo Components
function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [searchCount, setSearchCount] = useState(0)

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm)
      setSearchCount(prev => prev + 1)
    }
  }, [debouncedSearchTerm])

  return (
    <div className="card">
      <h3>useDebounce</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
      />
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Immediate:</strong> {searchTerm || '(empty)'}</p>
        <p><strong>Debounced (500ms):</strong> {debouncedSearchTerm || '(empty)'}</p>
        <p><strong>API Calls Made:</strong> {searchCount}</p>
      </div>
      <p className="info">
        ✓ Only triggers search 500ms after you stop typing
      </p>
    </div>
  )
}

function ToggleDemo() {
  const modal = useToggle()
  const darkMode = useToggle(false)

  return (
    <div className="card">
      <h3>useToggle</h3>
      <div className="button-group">
        <button onClick={modal.toggle}>Toggle Modal</button>
        <button onClick={modal.setTrue}>Open Modal</button>
        <button onClick={modal.setFalse}>Close Modal</button>
      </div>
      {modal.value && (
        <div className="modal-overlay" onClick={modal.setFalse}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h4>Modal Content</h4>
            <p>This is a modal dialog</p>
            <button onClick={modal.setFalse}>Close</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode.value}
            onChange={darkMode.toggle}
          />
          Dark Mode
        </label>
        <p>Dark mode is: {darkMode.value ? 'ON' : 'OFF'}</p>
      </div>
      <p className="info">
        ✓ Clean API for boolean state with built-in toggle functions
      </p>
    </div>
  )
}

function PreviousDemo() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div className="card">
      <h3>usePrevious</h3>
      <div className="button-group">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Current:</strong> {count}</p>
        <p><strong>Previous:</strong> {prevCount ?? 'N/A'}</p>
        <p><strong>Change:</strong> {
          prevCount !== undefined
            ? count > prevCount ? `↑ +${count - prevCount}` : count < prevCount ? `↓ ${count - prevCount}` : '→ No change'
            : 'First render'
        }</p>
      </div>
      <p className="info">
        ✓ Access previous value of state or prop
      </p>
    </div>
  )
}

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('user-name', '')
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')

  return (
    <div className="card">
      <h3>useLocalStorage</h3>
      <div className="form-group">
        <label>Name (persisted):</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label>Theme (persisted):</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
        <p>Hello, {name || 'Guest'}!</p>
        <p>Theme: {theme}</p>
      </div>
      <p className="info">
        ✓ State automatically synced with localStorage<br />
        ✓ Refresh the page - your data persists!
      </p>
    </div>
  )
}

export default function CustomHooksDemo() {
  return (
    <div className="example-container">
      <h2>Custom Hooks</h2>
      <p className="subtitle">Reusable logic extraction for cleaner components</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <DebounceDemo />
        <ToggleDemo />
        <PreviousDemo />
        <LocalStorageDemo />
      </div>

      <div className="section">
        <h3>Custom Hook Rules</h3>
        <div className="card">
          <ul>
            <li>✓ Must start with "use" prefix</li>
            <li>✓ Can call other hooks</li>
            <li>✓ Follow all hooks rules (top level, React functions only)</li>
            <li>✓ Extract reusable stateful logic</li>
            <li>✓ Can return anything (values, functions, objects)</li>
          </ul>
        </div>
      </div>

      <div className="section">
        <h3>Benefits of Custom Hooks</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>Reusability</h4>
            <p>Write logic once, use it in multiple components</p>
          </div>
          <div className="card">
            <h4>Testability</h4>
            <p>Test hooks independently from components</p>
          </div>
          <div className="card">
            <h4>Separation of Concerns</h4>
            <p>Keep components focused on rendering</p>
          </div>
        </div>
      </div>

      <div className="code-preview">
        <h4>Creating a Custom Hook:</h4>
        <pre>{`function useCustomHook(param) {
  const [state, setState] = useState(initial)
  
  useEffect(() => {
    // Side effects
  }, [param])
  
  const helper = useCallback(() => {
    // Helper function
  }, [])
  
  return { state, helper }
}

// Usage
function Component() {
  const { state, helper } = useCustomHook(value)
  return <div>{state}</div>
}`}</pre>
      </div>
    </div>
  )
}
