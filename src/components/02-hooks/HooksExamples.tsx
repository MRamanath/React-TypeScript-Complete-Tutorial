import { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect, useImperativeHandle, forwardRef, createContext } from 'react'

// ===========================
// 1. useState HOOK
// ===========================

const UseStateExample: React.FC = () => {
  // Basic state
  const [count, setCount] = useState<number>(0)
  
  // State with object
  const [user, setUser] = useState<{ name: string; age: number }>({
    name: 'John',
    age: 25
  })
  
  // State with array
  const [items, setItems] = useState<string[]>(['React', 'TypeScript'])
  
  // Lazy initialization - expensive computation only runs once
  const [data, setData] = useState<number>(() => {
    console.log('Expensive initialization')
    return Array.from({ length: 1000 }, (_, i) => i).reduce((a, b) => a + b, 0)
  })

  const updateUser = () => {
    // Updating object state - always create new object
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }))
  }

  const addItem = () => {
    setItems(prevItems => [...prevItems, `Item ${prevItems.length + 1}`])
  }

  return (
    <div className="example">
      <h4>useState Examples</h4>
      
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p>User: {user.name}, Age: {user.age}</p>
        <button onClick={updateUser}>Increment Age</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p>Items: {items.join(', ')}</p>
        <button onClick={addItem}>Add Item</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p>Data sum (lazy init): {data}</p>
      </div>
    </div>
  )
}

// ===========================
// 2. useEffect HOOK
// ===========================

const UseEffectExample: React.FC = () => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<string>('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Runs after every render
  useEffect(() => {
    console.log('Component rendered')
  })

  // Runs only once on mount (empty dependency array)
  useEffect(() => {
    console.log('Component mounted')
    
    // Cleanup function
    return () => {
      console.log('Component will unmount')
    }
  }, [])

  // Runs when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`)
    document.title = `Count: ${count}`
  }, [count])

  // Example: Event listener with cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Example: Fetch data (simulated)
  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (isMounted) {
        setData(`Data fetched at ${new Date().toLocaleTimeString()}`)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="example">
      <h4>useEffect Examples</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Window Width: {windowWidth}px</p>
      <p>{data || 'Loading...'}</p>
    </div>
  )
}

// ===========================
// 3. useContext HOOK
// ===========================

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const ThemedComponent: React.FC = () => {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('ThemedComponent must be used within ThemeProvider')
  }

  const { theme, toggleTheme } = context

  return (
    <div 
      className="example"
      style={{
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#1a1a1a',
        color: theme === 'light' ? '#000' : '#fff',
        transition: 'all 0.3s'
      }}
    >
      <h4>useContext Example</h4>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

const UseContextExample: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  )
}

// ===========================
// 4. useReducer HOOK
// ===========================

interface State {
  count: number
  history: number[]
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      }
    case 'RESET':
      return {
        count: 0,
        history: [0]
      }
    case 'SET':
      return {
        count: action.payload,
        history: [...state.history, action.payload]
      }
    default:
      return state
  }
}

const UseReducerExample: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, history: [0] })

  return (
    <div className="example">
      <h4>useReducer Example</h4>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>Set to 10</button>
      <p>History: {state.history.slice(-5).join(', ')}</p>
    </div>
  )
}

// ===========================
// 5. useCallback HOOK
// ===========================

interface TodoItem {
  id: number
  text: string
}

const TodoList: React.FC<{ todos: TodoItem[]; onRemove: (id: number) => void }> = ({ todos, onRemove }) => {
  console.log('TodoList rendered')
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onRemove(todo.id)} style={{ marginLeft: '1rem' }}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

const UseCallbackExample: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Learn useCallback' },
    { id: 2, text: 'Optimize performance' }
  ])
  const [count, setCount] = useState(0)

  // Without useCallback, this function is recreated on every render
  // With useCallback, it's only recreated when dependencies change
  const removeTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, []) // Empty deps means function never changes

  return (
    <div className="example">
      <h4>useCallback Example</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <TodoList todos={todos} onRemove={removeTodo} />
    </div>
  )
}

// ===========================
// 6. useMemo HOOK
// ===========================

const UseMemoExample: React.FC = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5])

  // Expensive calculation - only recalculated when items change
  const sum = useMemo(() => {
    console.log('Calculating sum...')
    return items.reduce((acc, item) => acc + item, 0)
  }, [items])

  // Another expensive calculation
  const sortedItems = useMemo(() => {
    console.log('Sorting items...')
    return [...items].sort((a, b) => b - a)
  }, [items])

  return (
    <div className="example">
      <h4>useMemo Example</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setItems([...items, Math.floor(Math.random() * 100)])}>
        Add Random Item
      </button>
      <p>Sum: {sum}</p>
      <p>Sorted: {sortedItems.join(', ')}</p>
    </div>
  )
}

// ===========================
// 7. useRef HOOK
// ===========================

const UseRefExample: React.FC = () => {
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCount = useRef(0)
  const prevCountRef = useRef<number>()

  useEffect(() => {
    renderCount.current += 1
    prevCountRef.current = count
  })

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const getValue = () => {
    alert(`Input value: ${inputRef.current?.value}`)
  }

  return (
    <div className="example">
      <h4>useRef Examples</h4>
      
      {/* DOM reference */}
      <div>
        <input ref={inputRef} type="text" placeholder="Focus me!" />
        <button onClick={focusInput}>Focus Input</button>
        <button onClick={getValue}>Get Value</button>
      </div>

      {/* Mutable value that persists */}
      <div style={{ marginTop: '1rem' }}>
        <p>Current count: {count}</p>
        <p>Previous count: {prevCountRef.current}</p>
        <p>Render count: {renderCount.current}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}

// ===========================
// 8. useLayoutEffect HOOK
// ===========================

const UseLayoutEffectExample: React.FC = () => {
  const [width, setWidth] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  // Runs synchronously after DOM mutations, before paint
  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth)
    }
  }, [])

  return (
    <div className="example">
      <h4>useLayoutEffect Example</h4>
      <div ref={divRef} style={{ backgroundColor: '#2a2a2a', padding: '1rem' }}>
        This div's width is: {width}px
      </div>
      <p>useLayoutEffect measures DOM before browser paint</p>
    </div>
  )
}

// ===========================
// 9. useImperativeHandle HOOK
// ===========================

interface CustomInputHandle {
  focus: () => void
  clear: () => void
  getValue: () => string
}

const CustomInput = forwardRef<CustomInputHandle, { placeholder?: string }>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    getValue: () => {
      return inputRef.current?.value || ''
    }
  }))

  return <input ref={inputRef} type="text" {...props} />
})

CustomInput.displayName = 'CustomInput'

const UseImperativeHandleExample: React.FC = () => {
  const customInputRef = useRef<CustomInputHandle>(null)

  return (
    <div className="example">
      <h4>useImperativeHandle Example</h4>
      <CustomInput ref={customInputRef} placeholder="Custom input" />
      <button onClick={() => customInputRef.current?.focus()}>Focus</button>
      <button onClick={() => customInputRef.current?.clear()}>Clear</button>
      <button onClick={() => alert(customInputRef.current?.getValue())}>Get Value</button>
    </div>
  )
}

// ===========================
// 10. CUSTOM HOOKS
// ===========================

// Custom hook for local storage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// Custom hook for debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Custom hook for fetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

const CustomHooksExample: React.FC = () => {
  const [name, setName] = useLocalStorage('name', '')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearch) {
      console.log('Searching for:', debouncedSearch)
    }
  }, [debouncedSearch])

  return (
    <div className="example">
      <h4>Custom Hooks Examples</h4>
      
      <div>
        <h5>useLocalStorage Hook</h5>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name (saved to localStorage)"
        />
        <p>Stored name: {name}</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h5>useDebounce Hook</h5>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search (debounced)"
        />
        <p>Search term: {searchTerm}</p>
        <p>Debounced: {debouncedSearch}</p>
      </div>
    </div>
  )
}

// ===========================
// MAIN COMPONENT
// ===========================

const HooksExamples: React.FC = () => {
  return (
    <div className="section">
      <h2>Chapter 2: React Hooks</h2>
      
      <div className="section">
        <h3>2.1 useState</h3>
        <p>Manage state in functional components.</p>
        <UseStateExample />
      </div>

      <div className="section">
        <h3>2.2 useEffect</h3>
        <p>Perform side effects in functional components.</p>
        <UseEffectExample />
      </div>

      <div className="section">
        <h3>2.3 useContext</h3>
        <p>Access context without prop drilling.</p>
        <UseContextExample />
      </div>

      <div className="section">
        <h3>2.4 useReducer</h3>
        <p>Manage complex state logic with reducers.</p>
        <UseReducerExample />
      </div>

      <div className="section">
        <h3>2.5 useCallback</h3>
        <p>Memoize callbacks to prevent unnecessary re-renders.</p>
        <UseCallbackExample />
      </div>

      <div className="section">
        <h3>2.6 useMemo</h3>
        <p>Memoize expensive computations.</p>
        <UseMemoExample />
      </div>

      <div className="section">
        <h3>2.7 useRef</h3>
        <p>Access DOM elements and persist mutable values.</p>
        <UseRefExample />
      </div>

      <div className="section">
        <h3>2.8 useLayoutEffect</h3>
        <p>Synchronously run effects after DOM mutations.</p>
        <UseLayoutEffectExample />
      </div>

      <div className="section">
        <h3>2.9 useImperativeHandle</h3>
        <p>Customize ref exposure to parent components.</p>
        <UseImperativeHandleExample />
      </div>

      <div className="section">
        <h3>2.10 Custom Hooks</h3>
        <p>Create reusable logic with custom hooks.</p>
        <CustomHooksExample />
      </div>

      <div className="section" style={{ backgroundColor: '#2a2a2a' }}>
        <h3>📝 Interview Questions</h3>
        <ul>
          <li><strong>Q:</strong> What are hooks?</li>
          <li><strong>A:</strong> Functions that let you use state and lifecycle features in functional components.</li>
          
          <li><strong>Q:</strong> What are the rules of hooks?</li>
          <li><strong>A:</strong> 1) Only call at top level 2) Only call from React functions 3) Custom hooks must start with "use".</li>
          
          <li><strong>Q:</strong> Difference between useEffect and useLayoutEffect?</li>
          <li><strong>A:</strong> useEffect runs asynchronously after paint; useLayoutEffect runs synchronously before paint.</li>
          
          <li><strong>Q:</strong> When to use useCallback vs useMemo?</li>
          <li><strong>A:</strong> useCallback memoizes functions; useMemo memoizes computed values.</li>
          
          <li><strong>Q:</strong> What is the dependency array in useEffect?</li>
          <li><strong>A:</strong> Array of values that trigger re-running the effect when they change. Empty [] runs once on mount.</li>
          
          <li><strong>Q:</strong> When to use useReducer instead of useState?</li>
          <li><strong>A:</strong> When state logic is complex, involves multiple sub-values, or next state depends on previous.</li>
          
          <li><strong>Q:</strong> What is the purpose of useRef?</li>
          <li><strong>A:</strong> Access DOM elements directly and store mutable values that don't trigger re-renders.</li>
        </ul>
      </div>
    </div>
  )
}

export default HooksExamples
