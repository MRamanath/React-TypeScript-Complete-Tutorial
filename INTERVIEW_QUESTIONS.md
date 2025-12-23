# React Interview Questions & Answers

## 📚 Complete Guide for Interview Preparation

---

## Basic Level Questions

### 1. What is React?

**Answer:** React is a JavaScript library for building user interfaces, particularly single-page applications. It's component-based, declarative, and uses a virtual DOM for efficient updates.

**Key Points:**
- Developed by Facebook (Meta)
- Component-based architecture
- One-way data flow
- Virtual DOM for performance
- Reusable components

---

### 2. What is JSX?

**Answer:** JSX (JavaScript XML) is a syntax extension that allows writing HTML-like code in JavaScript. It gets compiled to `React.createElement()` calls.

```typescript
// JSX - Syntactic sugar for creating React elements
const element = <h1>Hello, World!</h1>

// Compiles to - React.createElement(type, props, children)
// First arg: element type ('h1', 'div', or component)
// Second arg: props object (null means no props)
// Third arg: children (content inside the element)
const element = React.createElement('h1', null, 'Hello, World!')
```

**Explanation:** JSX looks like HTML but it's JavaScript. During build time (via Babel), JSX transforms into `React.createElement()` calls. This is why you need to import React even if you don't use it directly - the compiled code uses it.

**Key Points:**
- Not required but recommended
- Makes code more readable
- Supports JavaScript expressions in `{}`
- Must return single root element

---

### 3. What are Components?

**Answer:** Components are independent, reusable pieces of UI. They accept inputs (props) and return React elements describing what should appear on screen.

**Types:**
```typescript
// Functional Component (Modern, Preferred)
// - Simpler syntax
// - Can use hooks (useState, useEffect, etc.)
// - No 'this' keyword confusion
const Welcome: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}</h1>
}

// Class Component (Legacy, but still supported)
// - Uses lifecycle methods
// - Has 'this' context
// - More boilerplate code
class Welcome extends React.Component<{ name: string }> {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

**Explanation:** Functional components are now the standard. They're simpler and with hooks, can do everything class components can. Class components are mainly found in older codebases.

---

### 4. Props vs State?

**Answer:**

| Props | State |
|-------|-------|
| Passed from parent | Internal to component |
| Read-only (immutable) | Can be updated |
| For component communication | For component data |
| Cannot be changed by component | Changed with setState/useState |

```typescript
// Props - Data passed from parent to child
// Think of it like function arguments
// Parent controls the values, child just displays them
<UserCard name="John" age={25} />

// State - Data managed within the component itself
// Component can read and update its own state
// When state changes, component re-renders automatically
const [count, setCount] = useState(0)

// Example showing the difference:
function Parent() {
  const [count, setCount] = useState(0)  // Parent's state
  
  return (
    <Child count={count} />  // Passed as prop to child
  )
}

function Child({ count }: { count: number }) {
  // count is a prop - Child can read it but can't change it
  return <div>Count: {count}</div>
}
```

**Explanation:** Props flow down from parent to child (one-way data flow). State is private to the component. If you need to change a value from the child, pass a function as a prop that updates the parent's state.

---

### 5. What is the Virtual DOM?

**Answer:** The Virtual DOM is a lightweight copy of the actual DOM kept in memory. React uses it to efficiently determine what changed and only update those parts in the real DOM.

**Process:**
1. State changes trigger re-render
2. New Virtual DOM tree is created
3. React diffs new tree with old tree (reconciliation)
4. Only changed nodes are updated in real DOM

**Benefits:**
- Faster than manipulating real DOM
- Batch updates for efficiency
- Cross-platform (React Native)

---

## Intermediate Level Questions

### 6. Explain React Lifecycle Methods

**Answer:** Lifecycle methods are hooks that run at specific times in a component's life.

**Class Component Lifecycle:**

```typescript
class MyComponent extends React.Component {
  // Mounting
  constructor(props) {
    super(props)
    // Initialize state
  }
  
  componentDidMount() {
    // After first render - fetch data, subscriptions
  }
  
  // Updating
  shouldComponentUpdate(nextProps, nextState) {
    // Return true/false to control re-render
  }
  
  componentDidUpdate(prevProps, prevState) {
    // After update - DOM operations based on changes
  }
  
  // Unmounting
  componentWillUnmount() {
    // Cleanup - remove listeners, cancel requests
  }
}
```

**Functional Component (Hooks):**
```typescript
useEffect(() => {
  // componentDidMount + componentDidUpdate
  return () => {
    // componentWillUnmount
  }
}, [dependencies])
```

---

### 7. What are Hooks? What are the rules?

**Answer:** Hooks are functions that let you use state and lifecycle features in functional components.

**Rules of Hooks:**
1. **Only call at top level** - Not in loops, conditions, or nested functions
2. **Only call from React functions** - Components or custom hooks
3. **Custom hooks must start with "use"**

```typescript
// ✅ Correct - Hooks at the top level
// React relies on the order of hook calls to track state
// This order must be consistent across renders
function MyComponent() {
  const [count, setCount] = useState(0)  // Always called
  
  useEffect(() => {
    // Effect logic
  }, [])
  
  // Conditional logic goes INSIDE hooks, not around them
  if (condition) {
    // Do something with count
  }
}

// ❌ Wrong - Hook inside condition
function MyComponent() {
  if (condition) {
    // This breaks React's hook tracking!
    // Sometimes this hook runs, sometimes it doesn't
    // React loses track of which hook is which
    const [count, setCount] = useState(0)
  }
}

// ❌ Also wrong - Hook in loop
for (let i = 0; i < 5; i++) {
  const [value, setValue] = useState(0)  // Different number of calls each time!
}
```

**Explanation:** React uses the order of hook calls to associate state with components. If hooks are called conditionally or in loops, the order changes between renders, breaking React's state management.
```

---

### 8. useEffect vs useLayoutEffect?

**Answer:**

| useEffect | useLayoutEffect |
|-----------|-----------------|
| Runs asynchronously after paint | Runs synchronously before paint |
| Doesn't block browser painting | Blocks visual updates |
| Use for most side effects | Use for DOM measurements |

```typescript
// useEffect - Runs AFTER browser paints the screen
// Most common choice for side effects
// Doesn't block visual updates
useEffect(() => {
  fetchData() // API calls, subscriptions, logging, etc.
}, [])

// useLayoutEffect - Runs BEFORE browser paints
// Use when you need to measure or mutate DOM
// Blocks painting until complete (can cause lag if slow)
useLayoutEffect(() => {
  // Example: Measure element size to position a tooltip
  const height = divRef.current.offsetHeight
  setHeight(height) // Update happens before user sees anything
  
  // Without this, user would see a "jump" as position updates
}, [])
```

**Explanation:**
- **useEffect**: "Do this after React renders to screen" → Good for most cases
- **useLayoutEffect**: "Do this before React renders to screen" → Good for DOM measurements to avoid visual flicker

**When to use useLayoutEffect:**
- Measuring DOM elements
- Animations that need to be synchronous
- Preventing visual flickers

---

### 9. useState vs useReducer?

**Answer:**

**useState** - Simple state:
```typescript
// Good for independent, simple values
// Each piece of state is separate
const [count, setCount] = useState(0)
const [name, setName] = useState('')

// Direct updates
setCount(count + 1)
setName('John')
```

**useReducer** - Complex state:
```typescript
// Good when state has multiple related values
// All state updates go through one function (reducer)
// Makes complex logic more predictable
const reducer = (state, action) => {
  // Central place for all state logic
  switch(action.type) {
    case 'increment': 
      return { count: state.count + 1 }  // Return new state
    case 'decrement': 
      return { count: state.count - 1 }
    default:
      return state
  }
}

// Initialize with reducer function and initial state
const [state, dispatch] = useReducer(reducer, { count: 0 })

// Update by dispatching "actions" (objects describing what happened)
dispatch({ type: 'increment' })  // Descriptive, testable
```

**Explanation:** Use `useState` for simple, independent values. Use `useReducer` when you have:
- Multiple related state values that change together
- Complex update logic
- Need to test state logic separately
- Want to use actions like Redux

**Use useReducer when:**
- State logic is complex
- Multiple sub-values in state
- Next state depends on previous
- Want to pass dispatch instead of callbacks

---

### 10. What is useCallback? When to use it?

**Answer:** `useCallback` memoizes functions so they don't get recreated on every render.

```typescript
// Without useCallback - new function every render
function Parent() {
  const handleClick = () => {
    console.log('Clicked')
  }
  // Every time Parent renders, handleClick is a NEW function
  // Even though it does the same thing!
  
  return <Child onClick={handleClick} />
}

// With useCallback - same function reference
function Parent() {
  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, [])  // Empty array = function never changes
  // React reuses the SAME function across renders
  
  return <Child onClick={handleClick} />
}

// Why does this matter? Memoized children!
const MemoizedChild = memo(Child)

// Without useCallback: new function → props changed → child re-renders
// With useCallback: same function → props unchanged → child skips render
<MemoizedChild onClick={handleClick} />

// Example with dependencies:
function SearchBar({ userId }: { userId: string }) {
  const handleSearch = useCallback((query: string) => {
    // This function needs userId from props
    searchAPI.search(query, userId)
  }, [userId])  // Function recreated only when userId changes
  
  return <SearchInput onSearch={handleSearch} />
}
```

**Explanation:** Functions are objects in JavaScript. Creating a new function each render means a new object reference. useCallback keeps the same reference, preventing unnecessary child re-renders when used with `memo()`.

**When to use:**
- Passing callbacks to memoized components
- In dependency arrays of other hooks
- Expensive callback functions

---

### 11. What is useMemo? Difference from useCallback?

**Answer:** `useMemo` memoizes **computed values**, `useCallback` memoizes **functions**.

```typescript
// useMemo - memoizes the RESULT of a computation
const expensiveValue = useMemo(() => {
  // Imagine this takes 100ms to compute
  return computeExpensiveValue(a, b)
}, [a, b])  // Only recompute when a or b changes

// Without useMemo, this runs on EVERY render (even when a,b unchanged)
// With useMemo, React caches the result and reuses it

// useCallback - memoizes the FUNCTION itself
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])  // Only create new function when a or b changes

// Relationship:
// useCallback(fn, deps) is the same as useMemo(() => fn, deps)
// useCallback is just a convenience for the common case of memoizing functions

// Practical example:
function TodoList({ todos }: { todos: Todo[] }) {
  // Without useMemo: filters on every render (expensive for large lists)
  // const completed = todos.filter(t => t.completed)
  
  // With useMemo: only filters when todos array changes
  const completed = useMemo(
    () => todos.filter(t => t.completed),
    [todos]
  )
  
  return <div>{completed.length} completed</div>
}
```

**Explanation:**
- **useMemo**: Caches a *value* (number, object, array, etc.) - "Remember this calculation"
- **useCallback**: Caches a *function* - "Remember this function"
- Both help avoid expensive recalculations or object recreations

**When to use useMemo:**
- Expensive calculations
- Referential equality for objects/arrays
- Preventing child re-renders

---

### 12. What is the Context API?

**Answer:** Context provides a way to pass data through component tree without manually passing props at every level.

```typescript
// 1. Create Context - defines the "channel" for data
const ThemeContext = createContext<'light' | 'dark'>('light')
// The 'light' parameter is the default value
// Only used if component uses context WITHOUT a Provider

// 2. Provider - wraps components that need access to the data
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  // Everything inside Provider can access the theme value
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponent />
      <AnotherComponent />
    </ThemeContext.Provider>
  )
}

// 3. Consumer - components that need the data
function ThemedComponent() {
  // useContext hook reads the value from nearest Provider above
  const theme = useContext(ThemeContext)
  
  return (
    <div style={{ 
      background: theme === 'light' ? '#fff' : '#000',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      Current theme: {theme}
    </div>
  )
}
```

**Explanation:** Context is like a "wireless connection" for data. Instead of passing props through every level (prop drilling), you "broadcast" data from a Provider and any component below can "tune in" with useContext. Perfect for data needed by many components (theme, user info, language).
```

**Use cases:**
- Theme
- Authentication
- Language/i18n
- Global state

**Caution:** Context changes cause all consumers to re-render

---

## Advanced Level Questions

### 13. How does React Reconciliation work?

**Answer:** Reconciliation is the process React uses to diff the Virtual DOM and update the real DOM efficiently.

**Algorithm:**
1. **Elements of different types** → Destroy old tree, build new tree
   - `<div>` changing to `<span>` = complete rebuild
2. **Same type DOM elements** → Keep DOM node, update changed attributes
   - `<div className="old">` to `<div className="new">` = just update className
3. **Same type components** → Instance stays same, update props, call render
   - Component re-renders with new props
4. **Keys in lists** → Match children across renders efficiently
   - React uses keys to know which items moved, added, or removed

```typescript
// Without keys - poor performance
// React compares by position:
// Item 1 at position 0 vs Item 1 at position 0 ✓
// Item 2 at position 1 vs Item 2 at position 1 ✓
// If you insert Item 0 at the beginning,
// React thinks ALL items changed!
{items.map(item => <Item>{item}</Item>)}

// With keys - optimized
// React compares by key:
// key="1" still matches key="1" even if position changed
// React knows to just move DOM nodes, not recreate them
{items.map(item => <Item key={item.id}>{item}</Item>)}

// Example showing the difference:
const items = ['A', 'B', 'C']
// User adds 'Z' at the beginning: ['Z', 'A', 'B', 'C']

// Without keys:
// React: position 0 changed from 'A' to 'Z' → update
// React: position 1 changed from 'B' to 'A' → update
// React: position 2 changed from 'C' to 'B' → update
// React: position 3 is new 'C' → create
// Result: 3 updates + 1 create = slow!

// With keys:
// React: key="a" still exists → keep it
// React: key="b" still exists → keep it
// React: key="c" still exists → keep it
// React: key="z" is new → create it
// Result: just 1 create = fast!
```

**Explanation:** Reconciliation is React's "diffing" algorithm. It figures out the minimal set of changes needed to update the DOM. Keys help React identify which items are which across renders, dramatically improving performance for lists.

**Fiber Architecture (React 16+):**
- Incremental rendering
- Pause and resume work
- Assign priority to updates
- Reuse previously completed work

---

### 14. What are Error Boundaries?

**Answer:** Error Boundaries are React components that catch JavaScript errors in child component tree and display fallback UI.

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  
  // Called when a child component throws an error during rendering
  // Return new state to trigger fallback UI
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }
  
  // Called after an error is caught
  // Use this to log errors to error reporting service
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error tracking service (Sentry, LogRocket, etc.)
  }
  
  render() {
    // If an error occurred, show fallback UI
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    
    // Otherwise, render children normally
    return this.props.children
  }
}

// Usage - wrap risky components
<ErrorBoundary>
  <MyComponent />  {/* If this crashes, ErrorBoundary catches it */}
</ErrorBoundary>

// Can have multiple boundaries at different levels
<ErrorBoundary fallback={<MainError />}>
  <Layout>
    <ErrorBoundary fallback={<SidebarError />}>
      <Sidebar />  {/* Sidebar error only affects sidebar */}
    </ErrorBoundary>
    <ErrorBoundary fallback={<ContentError />}>
      <Content />  {/* Content error only affects content */}
    </ErrorBoundary>
  </Layout>
</ErrorBoundary>
```

**Explanation:** Error Boundaries are like try-catch for React components. They catch errors in child components and show a fallback UI instead of crashing the entire app. Note: They DON'T catch errors in event handlers (use regular try-catch for those) or async code.

**Limitations:**
- Only work in class components (no hook yet)
- Don't catch errors in event handlers
- Don't catch async errors
- Don't catch errors in Error Boundary itself

---

### 15. Explain React 18 New Features

**Answer:**

**1. Concurrent Rendering:**
- React can interrupt rendering to handle high-priority updates

**2. Automatic Batching:**
```typescript
// React 17: Only batched in React event handlers
function handleClick() {
  setCount(c => c + 1)  // Batched 
  setFlag(f => !f)      // together = 1 render
}

setTimeout(() => {
  setCount(c => c + 1)  // Re-render 1
  setFlag(f => !f)      // Re-render 2 (not batched!)
}, 100)

fetch('/api').then(() => {
  setCount(c => c + 1)  // Re-render 1
  setFlag(f => !f)      // Re-render 2 (not batched!)
})

// React 18: Batched everywhere automatically
function handleClick() {
  setCount(c => c + 1)  // Batched 
  setFlag(f => !f)      // together = 1 render
}

setTimeout(() => {
  setCount(c => c + 1)  // Now batched!
  setFlag(f => !f)      // Single render
}, 100)

fetch('/api').then(() => {
  setCount(c => c + 1)  // Now batched!
  setFlag(f => !f)      // Single render
})

// If you need to force separate renders (rare):
import { flushSync } from 'react-dom'

flushSync(() => {
  setCount(c => c + 1)  // Render immediately
})
setFlag(f => !f)  // Then render again
```

**Explanation:** Batching groups multiple state updates into one re-render for better performance. React 17 only batched inside event handlers. React 18 batches everywhere - timeouts, promises, native events. This means fewer re-renders = better performance automatically.

**3. Transitions:**
```typescript
import { useTransition } from 'react'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()
  
  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)  // Urgent: update input immediately (user expects instant feedback)
    
    startTransition(() => {
      // Non-urgent: updating results can be delayed
      // If user keeps typing, React can interrupt this to process new input
      setResults(expensiveSearch(value))
    })
  }
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {/* Input stays responsive even during expensive search */}
      {isPending && <Spinner />}  {/* Show loading state */}
      <Results items={results} />  {/* May show stale results briefly */}
    </div>
  )
}
```

**Explanation:** Transitions let you mark some updates as "non-urgent". React keeps the UI responsive by prioritizing urgent updates (like typing) over non-urgent ones (like search results). The input never lags, even if the search is slow.

**4. Suspense Improvements:**
```typescript
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

**5. New Hooks:**
- `useTransition` - Mark updates as non-urgent
- `useDeferredValue` - Defer less important updates
- `useId` - Generate unique IDs for accessibility

---

### 16. Performance Optimization Techniques

**Answer:**

**1. React.memo:**
```typescript
// Without memo - re-renders every time parent renders
const ExpensiveComponent = ({ value }: { value: number }) => {
  console.log('Rendering ExpensiveComponent...')  // Logs on every parent render!
  // Imagine expensive calculations here
  return <div>{value}</div>
}

// With memo - only re-renders when props actually change
const ExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log('Rendering ExpensiveComponent...')  // Only logs when value changes
  return <div>{value}</div>
})

// Example:
function Parent() {
  const [count, setCount] = useState(0)
  const [unrelated, setUnrelated] = useState(0)
  
  return (
    <>
      <ExpensiveComponent value={count} />
      {/* Without memo: clicking this button causes ExpensiveComponent to re-render */}
      {/* With memo: ExpensiveComponent doesn't re-render because value didn't change */}
      <button onClick={() => setUnrelated(u => u + 1)}>
        Change unrelated state
      </button>
    </>
  )
}
```

**Explanation:** React.memo tells React to skip rendering if props haven't changed. It does a shallow comparison of props. Use it for components that render often with the same props or have expensive render logic.

**2. useMemo & useCallback:**
```typescript
const value = useMemo(() => expensive(a, b), [a, b])
const callback = useCallback(() => doSomething(), [])
```

**3. Code Splitting:**
```typescript
// Instead of importing normally (adds to main bundle)
// import Heavy from './Heavy'

// Use lazy import - creates separate chunk loaded on demand
const Heavy = lazy(() => import('./Heavy'))

// Suspense shows fallback while loading the chunk
function App() {
  const [show, setShow] = useState(false)
  
  return (
    <div>
      {/* Heavy component code only downloads when show becomes true */}
      <button onClick={() => setShow(true)}>Load Heavy Component</button>
      
      {show && (
        <Suspense fallback={<div>Loading Heavy Component...</div>}>
          <Heavy />  {/* Downloads separate JS file on first render */}
        </Suspense>
      )}
    </div>
  )
}

// Result:
// - Initial bundle: smaller, faster load
// - Heavy component: loads only when needed
// - Better performance for features users might not use
```

**Explanation:** Code splitting breaks your app into smaller chunks that load on demand. Instead of downloading 1MB of JavaScript upfront, load 200KB initially and the rest as needed. Users get a faster initial load.

**4. Virtualization:**
- Only render visible items in long lists
- Libraries: react-window, react-virtualized

**5. Proper Key Usage:**
```typescript
// ❌ Using index
items.map((item, i) => <Item key={i} />)

// ✅ Using stable ID
items.map(item => <Item key={item.id} />)
```

**6. Avoid Inline Objects/Functions:**
```typescript
// ❌ New object every render
<Component style={{ color: 'red' }} />

// ✅ Defined outside or memoized
const style = { color: 'red' }
<Component style={style} />
```

---

### 17. Design Patterns in React

**Answer:**

**1. Higher-Order Component (HOC):**
```typescript
function withAuth<P>(Component: ComponentType<P>) {
  return (props: P) => {
    if (!isAuthenticated) return <Login />
    return <Component {...props} />
  }
}
```

**2. Render Props:**
```typescript
<DataProvider render={data => <Display data={data} />} />
```

**3. Compound Components:**
```typescript
<Tabs>
  <Tabs.Tab>Tab 1</Tabs.Tab>
  <Tabs.Panel>Content 1</Tabs.Panel>
</Tabs>
```

**4. Container/Presentational:**
- Container: Logic, state, API calls
- Presentational: UI only, receives props

**5. Custom Hooks:**
```typescript
function useAuth() {
  const [user, setUser] = useState(null)
  // Auth logic
  return { user, login, logout }
}
```

---

### 18. Controlled vs Uncontrolled Components

**Answer:**

**Controlled:**
- React controls form data
- Value stored in state
- onChange updates state
- Single source of truth (the state)

```typescript
function Controlled() {
  const [value, setValue] = useState('')
  
  // Every keystroke:
  // 1. Updates state
  // 2. Triggers re-render
  // 3. Input shows new state value
  return (
    <input
      value={value}  // Input value comes from state
      onChange={e => setValue(e.target.value)}  // State updates on change
    />
  )
  // You can access current value anytime via 'value' variable
  // Easy to validate, format, or sync with other components
}
```

**Uncontrolled:**
- DOM controls form data
- Use refs to get values
- Less React re-renders
- Direct DOM access

```typescript
function Uncontrolled() {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleSubmit = () => {
    // Only read value when you need it (on submit)
    console.log(inputRef.current?.value)
  }
  
  // Typing doesn't cause re-renders
  // Input is controlled by DOM, not React
  return (
    <>
      <input 
        ref={inputRef}  // Attach ref to get DOM reference
        defaultValue="initial"  // Use defaultValue, not value
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
```

**Explanation:**
- **Controlled**: React is the "boss" of the input. Every change goes through React state. More control, easier to manipulate.
- **Uncontrolled**: DOM is the "boss". React just reads the value when needed. Less code, better performance for simple cases.

**When to use uncontrolled:**
- File inputs
- Integration with non-React code
- Large forms where performance matters

---

### 19. React Fiber Architecture

**Answer:** Fiber is React's reconciliation algorithm since React 16. It enables:

**Features:**
1. **Incremental Rendering** - Split work into chunks
2. **Pause and Resume** - Interrupt low-priority work for urgent updates
3. **Assign Priority** - Different priorities for different updates
4. **Reuse Work** - Reuse previously completed work
5. **Multiple Types** - Handle different types of updates

**How it works:**
- Each component is a "fiber" (unit of work)
- Work is broken into small units
- React scheduler decides what to work on
- Can abort work if no longer needed

**Benefits:**
- Smoother animations
- Better perceived performance
- No blocking the main thread

---

### 20. Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)

**Answer:**

**CSR (Client-Side Rendering):**
- JavaScript renders on client
- Faster subsequent navigation
- SEO challenges
- Initial load slower

**SSR (Server-Side Rendering):**
- HTML generated on server
- Better SEO
- Faster initial load
- Full page refreshes

**React Solutions:**
- **Next.js** - SSR/SSG framework
- **Gatsby** - Static site generator
- **React Server Components** - React 18 feature

```typescript
// Next.js SSR
export async function getServerSideProps() {
  const data = await fetchData()
  return { props: { data } }
}
```

---

## Common Coding Challenges

### 1. Debounced Search

```typescript
// Custom hook that delays updating a value
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    // Set up a timer to update after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    // If value changes before timer fires, cancel old timer
    // and set up a new one
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

// Usage - search as user types, but only after they stop typing
function SearchComponent() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)  // Wait 500ms after typing stops
  
  useEffect(() => {
    // This only runs 500ms after user stops typing
    if (debouncedSearch) {
      // API call with debouncedSearch
      fetch(`/api/search?q=${debouncedSearch}`)
    }
  }, [debouncedSearch])
  
  // Input updates immediately (feels responsive)
  // But API call waits (saves requests)
  return (
    <input 
      value={search} 
      onChange={e => setSearch(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

**Explanation:** Debouncing delays executing a function until after a pause. In search, this means: "Wait until user stops typing for 500ms, then search". Without debouncing, every keystroke = API call (wasteful). With debouncing, only the final search term = 1 API call (efficient).

**Example:**
User types "react"
- Without debounce: 5 API calls (r, re, rea, reac, react)
- With debounce: 1 API call (react)

### 2. Infinite Scroll

```typescript
function useInfiniteScroll(callback: () => void) {
  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled near bottom of page
      // window.innerHeight: visible viewport height
      // window.scrollY: how far user has scrolled down
      // document.body.offsetHeight: total page height
      
      const scrolledToBottom = 
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
      
      if (scrolledToBottom) {
        callback()  // Load more items
      }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback])
}

// Usage
function InfiniteList() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  
  const loadMore = useCallback(() => {
    // Fetch next page of items
    fetch(`/api/items?page=${page}`)
      .then(res => res.json())
      .then(newItems => {
        setItems(prev => [...prev, ...newItems])  // Append new items
        setPage(p => p + 1)  // Increment page for next load
      })
  }, [page])
  
  useInfiniteScroll(loadMore)
  
  return (
    <div>
      {items.map(item => <ItemCard key={item.id} item={item} />)}
    </div>
  )
}
```

**Explanation:** Infinite scroll loads more content as user scrolls down. When user is 500px from bottom, trigger the callback to fetch more items. Common in social media feeds, product listings, etc.

### 3. Previous Value Hook

```typescript
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  
  useEffect(() => {
    // After render, store current value for next render
    ref.current = value
  })
  
  // Return previous value (before current render)
  return ref.current
}

// Usage - compare current vs previous values
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <p>
        {count > (prevCount ?? 0) ? '↑ Increased' : '↓ Decreased'}
      </p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  )
}

// How it works:
// Render 1: count=0, prevCount=undefined (no previous value yet)
// Render 2: count=1, prevCount=0 (from previous render)
// Render 3: count=2, prevCount=1 (from previous render)
```

**Explanation:** This hook lets you access the previous value of a prop or state. Useful for:
- Comparing current vs previous values
- Detecting changes ("did count increase or decrease?")
- Animations based on value changes
- Undo functionality

The trick: useEffect runs AFTER render, so ref.current holds the value from the previous render.

---

### 21. What is prop drilling? How to avoid it?

**Answer:** Prop drilling is passing props through multiple intermediate components that don't need them, just to get data to a deeply nested component.

```typescript
// ❌ Prop Drilling Problem
function App() {
  const [user, setUser] = useState<User>(...)
  // App needs user data
  return <Layout user={user} />  // Pass to Layout
}

function Layout({ user }: { user: User }) {
  // Layout doesn't need user, just passes it along
  return (
    <div>
      <Header />
      <Sidebar user={user} />  // Pass to Sidebar
      <Footer />
    </div>
  )
}

function Sidebar({ user }: { user: User }) {
  // Sidebar doesn't need user, just passes it along
  return (
    <aside>
      <Nav />
      <UserProfile user={user} />  // Pass to UserProfile
    </aside>
  )
}

function UserProfile({ user }: { user: User }) {
  // Finally used here!
  return <div>{user.name}</div>
}

// Problem: Changed user prop type?
// Must update: App, Layout, Sidebar, UserProfile (maintenance nightmare!)
// Layout and Sidebar don't care about user, but have to deal with it
```

**Explanation:** Prop drilling creates unnecessary coupling. Components that don't use the data still need to know about it and pass it through. This makes refactoring hard and code brittle.

**Solutions:**

**1. Context API:**
```typescript
// Create a "broadcast channel" for user data
const UserContext = createContext<User | null>(null)

function App() {
  const [user, setUser] = useState<User>(...)
  
  // Broadcast user to all descendants
  return (
    <UserContext.Provider value={user}>
      <Layout />  {/* No user prop needed! */}
    </UserContext.Provider>
  )
}

function Layout() {
  // Layout doesn't need to know about user
  return (
    <div>
      <Header />
      <Sidebar />  {/* No user prop needed! */}
      <Footer />
    </div>
  )
}

function Sidebar() {
  // Sidebar doesn't need to know about user
  return (
    <aside>
      <Nav />
      <UserProfile />  {/* No user prop needed! */}
    </aside>
  )
}

function UserProfile() {
  // Directly "tune in" to user context
  const user = useContext(UserContext)
  return <div>{user?.name}</div>
}

// Benefits:
// - Layout and Sidebar don't deal with user prop
// - Only components that need user access it
// - Easier to refactor - change user type in one place
```

**Explanation:** Context is like a "wireless signal" broadcasting data. Instead of passing props through every level (wired connection), Provider broadcasts and any descendant can tune in with useContext. No intermediate components involved!

**2. Component Composition:**
```typescript
function App() {
  const [user, setUser] = useState<User>(...)
  return (
    <Layout>
      <Sidebar>
        <UserProfile user={user} />
      </Sidebar>
    </Layout>
  )
}
```

**3. State Management Libraries:**
- Redux, Zustand, Jotai, Recoil

---

### 22. What is the difference between createElement and cloneElement?

**Answer:**

**createElement** - Creates a new React element from scratch:
```typescript
// Manual way to create elements (what JSX compiles to)
React.createElement(
  'div',                        // Type: element or component
  { className: 'container' },   // Props: attributes/properties
  'Hello World'                 // Children: content inside
)

// This is what JSX <div className="container">Hello World</div> becomes
// JSX is just syntactic sugar for createElement calls

// Creating component elements:
React.createElement(Button, { onClick: handleClick }, 'Click me')
// Same as: <Button onClick={handleClick}>Click me</Button>
```

**cloneElement** - Clones an existing element and adds/overrides props:
```typescript
function ParentComponent() {
  // Start with an existing element
  const element = <Button>Click</Button>
  
  // Clone it and add/override props
  const clonedElement = React.cloneElement(element, {
    onClick: handleClick,           // Add new prop
    className: 'special-button'     // Add new prop
  })
  
  return clonedElement
  // Result: <Button onClick={handleClick} className="special-button">Click</Button>
}

// Real use case: Enhancing children
function Container({ children }: { children: React.ReactElement }) {
  // Add props to whatever child is passed
  return React.cloneElement(children, {
    style: { 
      ...children.props.style,      // Keep existing style
      border: '1px solid red'       // Add border
    },
    'data-enhanced': true           // Add data attribute
  })
}

// Usage:
<Container>
  <div style={{ padding: 10 }}>Content</div>
</Container>
// Result: <div style={{ padding: 10, border: '1px solid red' }} data-enhanced>Content</div>
```

**Explanation:**
- **createElement**: Build from scratch - "Make me a new div"
- **cloneElement**: Copy and modify - "Take this element and add these props to it"

cloneElement is useful when you need to enhance children passed to your component without knowing what they are.

---

### 23. What is React.Fragment and why use it?

**Answer:** Fragment lets you group elements without adding extra DOM nodes.

```typescript
// ❌ Extra div wrapper - creates unnecessary DOM element
function Component() {
  return (
    <div>  {/* Extra div appears in DOM */}
      <td>Cell 1</td>
      <td>Cell 2</td>
    </div>
  )
}
// DOM: <tr><div><td>Cell 1</td><td>Cell 2</td></div></tr>
// Invalid HTML! <div> can't be inside <tr>

// ✅ Fragment - no wrapper in DOM
function Component() {
  return (
    <>  {/* Fragment - doesn't create DOM element */}
      <td>Cell 1</td>
      <td>Cell 2</td>
    </>
  )
}
// DOM: <tr><td>Cell 1</td><td>Cell 2</td></tr>
// Valid HTML!

// Long syntax with key (needed for lists)
function List({ items }: { items: Item[] }) {
  return (
    <dl>  {/* Description list */}
      {items.map(item => (
        <React.Fragment key={item.id}>  {/* Can't use <> with key */}
          <dt>{item.term}</dt>           {/* Term */}
          <dd>{item.definition}</dd>     {/* Definition */}
        </React.Fragment>
      ))}
    </dl>
  )
}

// Without Fragment:
// <dl>
//   <div key="1"><dt>Term 1</dt><dd>Definition 1</dd></div>  ← Invalid HTML!
// </dl>

// With Fragment:
// <dl>
//   <dt>Term 1</dt><dd>Definition 1</dd>  ← Valid HTML!
//   <dt>Term 2</dt><dd>Definition 2</dd>
// </dl>
```

**Explanation:** React requires a single root element. Fragment satisfies this requirement without polluting your HTML with unnecessary wrapper divs. Especially important for proper HTML structure (table rows, lists, etc.) and avoiding CSS issues caused by extra divs.

**Benefits:**
- Cleaner DOM
- Valid HTML (e.g., table rows)
- No unnecessary divs affecting CSS

---

### 24. Explain React Refs and their use cases

**Answer:** Refs provide direct access to DOM elements or React components.

**Use Cases:**

**1. Focus Management:**
```typescript
function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    // Focus the input when component mounts
    // Can't do this with state - focus() is a DOM method
    inputRef.current?.focus()
  }, [])
  
  return <input ref={inputRef} />
}

// Practical use: Auto-focus search box, first form field, etc.
```

**Explanation:** Refs give you direct access to DOM elements to call browser methods like `focus()`, `play()`, `scrollIntoView()`, etc. You can't do these with state.

**2. Measure DOM Elements:**
```typescript
function MeasureComponent() {
  const divRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  
  useEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight)
    }
  }, [])
  
  return <div ref={divRef}>Height: {height}</div>
}
```

**3. Integrating Third-Party Libraries:**
```typescript
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const play = () => videoRef.current?.play()
  const pause = () => videoRef.current?.pause()
  
  return (
    <>
      <video ref={videoRef} src="video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </>
  )
}
```

**4. Storing Mutable Values (doesn't trigger re-render):**
```typescript
function Timer() {
  const intervalRef = useRef<number | null>(null)
  const [count, setCount] = useState(0)
  
  const start = () => {
    // Store interval ID in ref
    // Using state would cause re-render (wasteful)
    // Ref persists across renders without re-rendering
    intervalRef.current = window.setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }
  
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)  // Access stored ID
    }
  }
  
  return (
    <div>
      {count}
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

**Why use ref instead of state for interval ID?**
- State: `setIntervalId(id)` → causes re-render (unnecessary)
- Ref: `intervalRef.current = id` → no re-render (perfect!)

**Explanation:** Refs are perfect for values that need to persist across renders but DON'T need to trigger re-renders when they change. Examples: interval IDs, timeout IDs, previous values, animation frame IDs, WebSocket connections.

**Ref Forwarding:**
```typescript
const FancyInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  (props, ref) => {
    return <input ref={ref} {...props} />
  }
)

function Parent() {
  const inputRef = useRef<HTMLInputElement>(null)
  
  return <FancyInput ref={inputRef} />
}
```

---

### 25. What are Synthetic Events in React?

**Answer:** SyntheticEvent is React's cross-browser wrapper around native browser events.

**Key Features:**
- Same interface across all browsers (no browser inconsistencies)
- Pooled for performance in React < 17 (reused for different events)
- Normalized behavior (works the same in Chrome, Firefox, Safari, etc.)

```typescript
function EventExample() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()      // Prevent default behavior (like form submission)
    e.stopPropagation()     // Stop event from bubbling up to parent elements
    
    // SyntheticEvent properties:
    console.log(e.type)           // 'click' - event type
    console.log(e.currentTarget)  // Button element (element with the handler)
    console.log(e.target)         // Element that triggered event (could be child)
    console.log(e.nativeEvent)    // Original browser event (if you need it)
    
    // Example showing currentTarget vs target:
    // <button onClick={handleClick}>  ← currentTarget (has the handler)
    //   <span>Click me</span>  ← target (actually clicked)
    // </button>
  }
  
  return <button onClick={handleClick}>Click</button>
}
```

**Event Types in TypeScript:**
```typescript
// Mouse Events - clicks, hover, etc.
const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {}
const handleMouseEnter = (e: React.MouseEvent) => {}

// Form Events - input changes, form submission
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)  // New input value
}
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()  // Prevent page reload
}
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {}

// Keyboard Events - key presses
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {  // Check which key was pressed
    // Do something
  }
}

// Touch Events - mobile touch interactions
const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {}
```

**Why Synthetic Events?**
```typescript
// Without React (vanilla JS):
// Different browsers might have different event properties
// event.target.value might not exist in older browsers
document.addEventListener('click', (e) => {
  // Need to handle browser differences yourself
})

// With React:
// Always works the same, React handles browser differences
<button onClick={(e) => {
  // e.target always works, all browsers
}}>
```

**Explanation:** React wraps browser events in SyntheticEvents to give you a consistent API across all browsers. You don't have to worry about browser quirks - React handles them for you.

---

### 26. What is StrictMode and what does it do?

**Answer:** StrictMode is a development tool that highlights potential problems.

```typescript
import { StrictMode } from 'react'

function App() {
  return (
    <StrictMode>
      <MyApp />
    </StrictMode>
  )
}
```

**What it does:**
1. **Identifies unsafe lifecycles** - Warns about deprecated methods
2. **Warns about legacy string ref API** - `ref="myRef"` is deprecated
3. **Detects unexpected side effects** - Intentionally double-invokes functions in development:
   - Component body
   - useState/useReducer/useMemo initializers
   - Class component constructor, render, shouldComponentUpdate
4. **Warns about deprecated findDOMNode**
5. **Detects legacy context API**

**Important:** Only runs in development, no impact on production.

```typescript
// This will log twice in StrictMode (development only)
function Component() {
  console.log('Rendering...')  // Logs twice!
  
  const [state, setState] = useState(() => {
    console.log('Initializing state...')  // Also logs twice!
    return 0
  })
  
  useEffect(() => {
    console.log('Effect running')  // Logs twice!
    // Helps detect missing cleanup
    return () => console.log('Cleanup')  // Also runs twice
  }, [])
  
  return <div>{state}</div>
}

// Why double invocation?
// - Helps you find bugs caused by side effects
// - Ensures your code can handle being called multiple times
// - Simulates mounting, unmounting, and remounting
// - In production, everything runs once (normal behavior)
```

**What to expect:**
```
Development with StrictMode:
Rendering...
Rendering...  ← intentional double call
Initializing state...
Initializing state...  ← intentional double call
Effect running
Cleanup  ← simulates unmount
Effect running  ← simulates remount

Production:
Rendering...  ← runs once
Initializing state...  ← runs once
Effect running  ← runs once
```

**Explanation:** StrictMode intentionally double-invokes functions in development to help you find bugs. If your code breaks with double-invocation, it might have hidden issues. React components should be "pure" - calling them multiple times should be safe.

---

### 27. What are Portals? Common use cases?

**Answer:** Portals render children into a DOM node outside the parent hierarchy.

```typescript
import { createPortal } from 'react-dom'

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null
  
  // Render to document.body instead of parent component
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body  // Target: where to actually render in DOM
  )
}

// Usage
function App() {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Modal component is here in React tree... */}
      <Modal isOpen={true}>
        <h1>Modal Content</h1>
      </Modal>
      {/* ...but renders to document.body in actual DOM! */}
    </div>
  )
}

// Actual DOM structure:
// <body>
//   <div id="root">
//     <div style="overflow: hidden">  ← App
//       <!-- No modal here in DOM -->
//     </div>
//   </div>
//   <div class="modal-overlay">  ← Modal renders here!
//     <div class="modal-content">
//       <h1>Modal Content</h1>
//     </div>
//   </div>
// </body>
```

**Why use portals?**
```typescript
// Problem without portal:
<div style={{ overflow: 'hidden', zIndex: 1 }}>
  <Modal />  {/* Gets clipped by parent overflow! */}
             {/* Or covered by parent z-index! */}
</div>

// Solution with portal:
<div style={{ overflow: 'hidden', zIndex: 1 }}>
  <Modal />  {/* Renders to body, escapes parent constraints! */}
</div>
```

**Explanation:** Portals "teleport" components to render somewhere else in the DOM tree while keeping them in the same place in the React tree. This solves CSS issues (overflow, z-index) for modals, tooltips, and dropdowns. Events still bubble through the React tree, not the DOM tree!

**Common Use Cases:**
1. **Modals/Dialogs** - Escape parent overflow/z-index
2. **Tooltips** - Position independently of parent
3. **Notifications/Toasts** - Fixed position notifications
4. **Dropdowns** - Avoid clipping issues

**Key Benefit:** Event bubbling still works through the React tree, even though DOM is elsewhere.

---

### 28. How does code splitting work in React?

**Answer:** Code splitting breaks app into smaller chunks that load on demand.

**1. React.lazy and Suspense:**
```typescript
import { lazy, Suspense } from 'react'

// Dynamic import
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

**2. Route-based splitting:**
```typescript
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
```

**3. Named exports:**
```typescript
// HeavyComponents.tsx
export const ComponentA = () => <div>A</div>
export const ComponentB = () => <div>B</div>

// App.tsx
const ComponentA = lazy(() => 
  import('./HeavyComponents').then(module => ({ default: module.ComponentA }))
)
```

**4. Error boundaries with Suspense:**
```typescript
function App() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  )
}
```

**Benefits:**
- Smaller initial bundle
- Faster initial load
- Load features on demand
- Better performance

---

### 29. What is the key prop and why is it important?

**Answer:** The `key` prop helps React identify which items have changed, been added, or removed.

**Why Keys Matter:**
```typescript
// ❌ Without keys - React may reuse wrong elements
{items.map(item => <Item>{item.name}</Item>)}

// ❌ Using index - problems when list changes
{items.map((item, index) => <Item key={index}>{item.name}</Item>)}

// ✅ Stable unique keys
{items.map(item => <Item key={item.id}>{item.name}</Item>)}
```

**Problems with index as key:**
```typescript
// Initial state: ['A', 'B', 'C']
const items = ['A', 'B', 'C']

// With index keys:
// Render 1:
// <Item key={0}>A</Item>  → key 0, input value: "A"
// <Item key={1}>B</Item>  → key 1, input value: "B"
// <Item key={2}>C</Item>  → key 2, input value: "C"

// User deletes 'B', new state: ['A', 'C']
// Render 2:
// <Item key={0}>A</Item>  → key 0, input value: "A" (correct)
// <Item key={1}>C</Item>  → key 1, but React thinks this is the same item as before!
//                           So it keeps the input value "B" and just changes text to "C"
//                           BUG: Input shows "B" but label shows "C"!

{items.map((item, index) => (
  <div key={index}>  {/* DON'T DO THIS if list can change */}
    <span>{item}</span>
    <input defaultValue={item} />  {/* Will show wrong value after deletion */}
  </div>
))}

// With stable ID keys:
// Before: <Item key="a">A</Item> <Item key="b">B</Item> <Item key="c">C</Item>
// After:  <Item key="a">A</Item> <Item key="c">C</Item>
// React knows: "b" was removed, "a" and "c" are the same items
// Result: Input values stay correct!

{items.map(item => (
  <div key={item.id}>  {/* ALWAYS use stable, unique IDs */}
    <span>{item.name}</span>
    <input defaultValue={item.name} />  {/* Correct value */}
  </div>
))}
```

**Explanation:** Keys tell React which items are which across renders. Index keys break when items are added, removed, or reordered because the index changes but React thinks it's the same item. Always use stable, unique IDs (like database IDs) as keys.

**Rules for Keys:**
- Must be unique among siblings
- Must be stable (same key for same item across renders)
- Don't use random values or array indices if list can change
- Don't use objects as keys (use object.id)

**When index is OK:**
- Static lists that never change
- No reordering, filtering, or adding/removing

---

### 30. Explain batching in React

**Answer:** Batching is when React groups multiple state updates into a single re-render for performance.

**React 17 and earlier:**
```typescript
function handleClick() {
  // ✅ Batched - inside React event handler
  // These three updates result in ONE render
  setCount(c => c + 1)
  setFlag(f => !f)
  setData(d => [...d, newItem])
  // React groups them: "Make all three changes, then render once"
}

// ❌ Not batched - outside React's control
setTimeout(() => {
  setCount(c => c + 1)    // Render 1: count changes
  setFlag(f => !f)        // Render 2: flag changes  
  setData(d => [...d, newItem])  // Render 3: data changes
  // Total: 3 separate renders (slower!)
}, 1000)

fetch('/api').then(() => {
  setCount(c => c + 1)  // Render 1
  setFlag(f => !f)      // Render 2
  // Promises aren't batched in React 17
})
```

**React 18 - Automatic Batching:**
```typescript
// ✅ All batched - everywhere!
setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  setData(d => [...d, newItem])
  // Now batched! Only 1 render
}, 1000)

fetch('/api').then(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // Now batched! Only 1 render
})

// Even native events are batched:
document.addEventListener('click', () => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // Batched! Only 1 render
})

// Opt-out if you really need separate renders (rare):
import { flushSync } from 'react-dom'

flushSync(() => {
  setCount(c => c + 1)  // Forces immediate render
})
setFlag(f => !f)  // Then another render
```

**Explanation:** Batching groups multiple state updates into a single re-render. Think of it like this:
- Without batching: "Update count. Paint. Update flag. Paint. Update data. Paint." (3 paints)
- With batching: "Update count, flag, and data. Paint once." (1 paint)
React 18 made this automatic everywhere, not just in event handlers.

---

### 31. What is lazy evaluation in useState?

**Answer:** Lazy initialization runs expensive computation only once during initial render.

```typescript
// ❌ Runs expensive computation on EVERY render
// Even though the initial value is only used once!
function Component() {
  // This calls expensiveComputation() on every render:
  // - Initial render: use result
  // - Re-render 1: compute again, throw away result
  // - Re-render 2: compute again, throw away result
  // Wasted computation!
  const [state, setState] = useState(expensiveComputation())
  
  return <div>{state}</div>
}

// ✅ Lazy - runs only on initial mount
function Component() {
  // Pass a function, React only calls it once:
  // - Initial render: call function, use result
  // - Re-render 1: skip function entirely
  // - Re-render 2: skip function entirely
  // No wasted computation!
  const [state, setState] = useState(() => expensiveComputation())
  
  return <div>{state}</div>
}

// Real-world example:
function TodoList() {
  // ❌ Bad: reads localStorage on every render
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos') || '[]')
  )
  
  // ✅ Good: reads localStorage only once
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos')
    return stored ? JSON.parse(stored) : []
  })
  
  return <ul>{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}</ul>
}
```

**Explanation:** Without lazy initialization, React calls your function on every render even though it only uses the result on the first render. Wrapping in a function tells React "only call this once, on mount".

---

### 32. Difference between useEffect and useLayoutEffect?

**Answer:** Timing of execution differs.

**Execution Order:**
```
1. React updates DOM
2. Browser paints screen (useEffect hasn't run yet)
3. useLayoutEffect runs (synchronously, blocks paint)
4. Browser paints (if useLayoutEffect made changes)
5. useEffect runs (asynchronously, doesn't block)
```

**Visual Example:**
```typescript
// ❌ useEffect - flicker visible
function Component() {
  const [position, setPosition] = useState(0)
  
  useEffect(() => {
    // Runs AFTER paint
    setPosition(calculatePosition())  // Causes visible flicker
  }, [])
  
  return <div style={{ left: position }}>Content</div>
}

// ✅ useLayoutEffect - no flicker
function Component() {
  const [position, setPosition] = useState(0)
  
  useLayoutEffect(() => {
    // Runs BEFORE paint
    setPosition(calculatePosition())  // No flicker
  }, [])
  
  return <div style={{ left: position }}>Content</div>
}
```

**Use useLayoutEffect for:**
- Measuring DOM (offsetWidth, offsetHeight, etc.)
- Scroll position updates
- Animations that must be synchronous
- Preventing visual flicker

**Use useEffect for:**
- Everything else (data fetching, subscriptions, etc.)

---

### 33. What is React.memo and when to use it?

**Answer:** React.memo is a HOC that memoizes components to prevent unnecessary re-renders.

```typescript
// Without memo - re-renders even if props haven't changed
const ExpensiveComponent = ({ value }: { value: number }) => {
  console.log('Rendering...')
  // Expensive computation
  return <div>{value}</div>
}

// With memo - only re-renders when props change
const ExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log('Rendering...')
  return <div>{value}</div>
})

// Parent
function Parent() {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)
  
  return (
    <>
      {/* Won't re-render when otherState changes */}
      <ExpensiveComponent value={count} />
      <button onClick={() => setOtherState(s => s + 1)}>
        Change Other State
      </button>
    </>
  )
}
```

**Custom comparison:**
```typescript
const MyComponent = memo(
  ({ user }: { user: User }) => {
    return <div>{user.name}</div>
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id
  }
)
```

**When to use:**
- Component renders often with same props
- Component is expensive to render
- Pure functional component (output depends only on props)

**When NOT to use:**
- Props change frequently
- Component is cheap to render
- Premature optimization

---

### 34. How to optimize performance in React?

**Answer:** Multiple strategies for optimization:

**1. Avoid Unnecessary Re-renders:**
```typescript
// Use React.memo
const Child = memo(ExpensiveChild)

// Use useMemo for objects/arrays
const config = useMemo(() => ({ theme: 'dark' }), [])

// Use useCallback for functions
const handleClick = useCallback(() => {
  console.log('clicked')
}, [])
```

**2. Code Splitting:**
```typescript
const Heavy = lazy(() => import('./Heavy'))
<Suspense fallback={<Loading />}>
  <Heavy />
</Suspense>
```

**3. Virtualization (Long Lists):**
```typescript
import { FixedSizeList } from 'react-window'

function LongList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  )
}
```

**4. Debouncing/Throttling:**
```typescript
const debouncedSearch = useDebounce(searchTerm, 500)

useEffect(() => {
  // API call with debounced value
}, [debouncedSearch])
```

**5. Proper Key Usage:**
```typescript
// ✅ Stable keys
{items.map(item => <Item key={item.id} {...item} />)}
```

**6. Lazy State Initialization:**
```typescript
const [data, setData] = useState(() => expensiveComputation())
```

**7. Production Build:**
```bash
npm run build  # Optimized production bundle
```

**8. Web Workers for Heavy Computation:**
```typescript
// Offload to worker thread
const worker = new Worker('worker.js')
worker.postMessage(data)
worker.onmessage = (e) => setResult(e.data)
```

---

### 35. What are Custom Hooks and how to create them?

**Answer:** Custom hooks extract reusable stateful logic into functions.

**Rules:**
- Must start with "use"
- Can call other hooks
- Follow hooks rules

**Example 1: useToggle**
```typescript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])
  
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  
  return { value, toggle, setTrue, setFalse }
}

// Usage
function Component() {
  const modal = useToggle()
  
  return (
    <>
      <button onClick={modal.setTrue}>Open</button>
      {modal.value && <Modal onClose={modal.setFalse} />}
    </>
  )
}
```

**Example 2: useLocalStorage**
```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
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

// Usage
function Component() {
  const [name, setName] = useLocalStorage('name', '')
  return <input value={name} onChange={e => setName(e.target.value)} />
}
```

**Example 3: useFetch**
```typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let cancelled = false
    
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const json = await response.json()
        
        if (!cancelled) {
          setData(json)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    fetchData()
    
    return () => {
      cancelled = true
    }
  }, [url])
  
  return { data, loading, error }
}

// Usage
function Component() {
  const { data, loading, error } = useFetch<User[]>('/api/users')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <ul>{data?.map(user => <li key={user.id}>{user.name}</li>)}</ul>
}
```

**Example 4: useDebounce**
```typescript
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
```

---

### 36. What is React Context and when to use it?

**Answer:** Context provides global state without prop drilling.

**When to use:**
- Theme (light/dark mode)
- Authentication (current user)
- Language/Localization
- Global UI state (modals, notifications)

**When NOT to use:**
- Frequently changing values (causes all consumers to re-render)
- Simple parent-child communication (use props)

**Implementation:**
```typescript
// 1. Create Context with type
interface AuthContextType {
  user: User | null
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 2. Create Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is logged in
    checkAuth().then(setUser).finally(() => setIsLoading(false))
  }, [])
  
  const login = async (credentials: Credentials) => {
    const user = await authAPI.login(credentials)
    setUser(user)
  }
  
  const logout = async () => {
    await authAPI.logout()
    setUser(null)
  }
  
  const value = { user, login, logout, isLoading }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 3. Create custom hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// 4. Use in app
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

function Profile() {
  const { user, logout } = useAuth()
  
  if (!user) return <Login />
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

**Optimization - Split contexts:**
```typescript
// Bad - all consumers re-render on any change
const AppContext = createContext({ theme, user, settings, notifications })

// Good - separate concerns
const ThemeContext = createContext(theme)
const UserContext = createContext(user)
const SettingsContext = createContext(settings)
```

---

### 37. What is useReducer and when to use it?

**Answer:** useReducer is an alternative to useState for complex state logic.

**When to use useReducer:**
- Multiple sub-values in state
- Complex state transitions
- Next state depends on previous
- Want to pass dispatch down instead of multiple callbacks

```typescript
// Complex state
interface State {
  count: number
  step: number
  history: number[]
  canUndo: boolean
  canRedo: boolean
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' }
  | { type: 'undo' }
  | { type: 'redo' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step],
        canUndo: true
      }
    
    case 'decrement':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count - state.step],
        canUndo: true
      }
    
    case 'setStep':
      return { ...state, step: action.payload }
    
    case 'reset':
      return {
        count: 0,
        step: 1,
        history: [0],
        canUndo: false,
        canRedo: false
      }
    
    case 'undo':
      if (state.history.length > 1) {
        const newHistory = state.history.slice(0, -1)
        return {
          ...state,
          count: newHistory[newHistory.length - 1],
          history: newHistory,
          canUndo: newHistory.length > 1
        }
      }
      return state
    
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
    history: [0],
    canUndo: false,
    canRedo: false
  })
  
  return (
    <div>
      <h1>{state.count}</h1>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: 'setStep', payload: +e.target.value })}
      />
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button 
        onClick={() => dispatch({ type: 'undo' })}
        disabled={!state.canUndo}
      >
        Undo
      </button>
    </div>
  )
}
```

**useReducer with Context (Redux-like pattern):**
```typescript
const TodoContext = createContext<{
  state: TodoState
  dispatch: Dispatch<TodoAction>
} | undefined>(undefined)

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

function TodoList() {
  const { state, dispatch } = useContext(TodoContext)!
  
  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
```

---

### 38. Explain the component lifecycle in detail

**Answer:** 

**Functional Components (Hooks):**
```typescript
function Component({ prop }: Props) {
  // 1. INITIALIZATION - Runs every render
  console.log('Component body executing')
  
  // 2. MOUNTING - Runs once after first render
  useEffect(() => {
    console.log('Mounted - fetch data, setup subscriptions')
    
    return () => {
      console.log('Unmounting - cleanup subscriptions')
    }
  }, [])
  
  // 3. UPDATING - Runs when prop changes
  useEffect(() => {
    console.log('Prop changed:', prop)
  }, [prop])
  
  // 4. EVERY RENDER - Runs after every render
  useEffect(() => {
    console.log('After every render')
  })
  
  // 5. LAYOUT EFFECT - Before browser paint
  useLayoutEffect(() => {
    console.log('Before paint - measure DOM')
  }, [])
  
  return <div>{prop}</div>
}
```

**Class Components (Legacy):**
```typescript
class Component extends React.Component<Props, State> {
  // 1. MOUNTING PHASE
  constructor(props: Props) {
    super(props)
    console.log('1. Constructor - initialize state')
    this.state = { count: 0 }
  }
  
  static getDerivedStateFromProps(props: Props, state: State) {
    console.log('2. getDerivedStateFromProps - sync state to props')
    return null // or new state
  }
  
  render() {
    console.log('3. Render - return JSX')
    return <div>{this.state.count}</div>
  }
  
  componentDidMount() {
    console.log('4. componentDidMount - fetch data, subscriptions')
  }
  
  // 2. UPDATING PHASE
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    console.log('5. shouldComponentUpdate - optimize re-renders')
    return true // or false to prevent render
  }
  
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log('6. getSnapshotBeforeUpdate - capture DOM state')
    return null // or snapshot value
  }
  
  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    console.log('7. componentDidUpdate - after update, compare props/state')
  }
  
  // 3. UNMOUNTING PHASE
  componentWillUnmount() {
    console.log('8. componentWillUnmount - cleanup')
  }
  
  // 4. ERROR HANDLING
  static getDerivedStateFromError(error: Error) {
    console.log('9. getDerivedStateFromError')
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('10. componentDidCatch - log error')
  }
}
```

**Order of execution:**
```
Initial Render:
1. Constructor
2. getDerivedStateFromProps
3. Render
4. React updates DOM
5. componentDidMount

Update (props/state change):
1. getDerivedStateFromProps
2. shouldComponentUpdate
3. Render
4. getSnapshotBeforeUpdate
5. React updates DOM
6. componentDidUpdate

Unmount:
1. componentWillUnmount
```

---

### 39. What are the different ways to style React components?

**Answer:**

**1. Inline Styles:**
```typescript
function Component() {
  const style = {
    color: 'blue',
    fontSize: '16px',
    backgroundColor: '#f0f0f0'
  }
  
  return <div style={style}>Content</div>
}
```

**Pros:** Dynamic, scoped to component
**Cons:** No pseudo-classes, no media queries, camelCase

**2. CSS Modules:**
```typescript
// Button.module.css
.button {
  background: blue;
  padding: 10px;
}

.button:hover {
  background: darkblue;
}

// Button.tsx
import styles from './Button.module.css'

function Button() {
  return <button className={styles.button}>Click</button>
}
```

**Pros:** Scoped, all CSS features
**Cons:** Extra file, build setup

**3. Styled Components (CSS-in-JS):**
```typescript
import styled from 'styled-components'

const Button = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? 'blue' : 'gray'};
  padding: 10px 20px;
  border-radius: 4px;
  
  &:hover {
    background: darkblue;
  }
  
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`

function Component() {
  return <Button primary>Click</Button>
}
```

**Pros:** Dynamic, scoped, full CSS features, TypeScript support
**Cons:** Runtime overhead, larger bundle

**4. Tailwind CSS (Utility-first):**
```typescript
function Component() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click
    </button>
  )
}
```

**Pros:** Fast development, small bundle, consistent design
**Cons:** Verbose classes, learning curve

**5. Emotion:**
```typescript
import { css } from '@emotion/react'

const buttonStyle = css`
  background: blue;
  &:hover { background: darkblue; }
`

function Component() {
  return <button css={buttonStyle}>Click</button>
}
```

**6. Regular CSS:**
```typescript
// styles.css
.button {
  background: blue;
}

// Component.tsx
import './styles.css'

function Component() {
  return <button className="button">Click</button>
}
```

---

### 40. How to handle forms in React?

**Answer:**

**1. Controlled Components:**
```typescript
function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!values.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!values.password) {
      newErrors.password = 'Password is required'
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    try {
      await login(values)
    } catch (error) {
      setErrors({ submit: 'Login failed' })
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      
      {errors.submit && <div className="error">{errors.submit}</div>}
      
      <button type="submit">Login</button>
    </form>
  )
}
```

**2. Form Libraries (React Hook Form):**
```typescript
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  
  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Min 6 characters'
          }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  )
}
```

**3. Uncontrolled with refs:**
```typescript
function Form() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} name="email" />
      <input ref={passwordRef} name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

### 41. What is the difference between Component and PureComponent?

**Answer:**

**Component:**
- Always re-renders when parent re-renders
- No built-in optimization

**PureComponent:**
- Implements `shouldComponentUpdate` with shallow prop/state comparison
- Prevents unnecessary re-renders
- Equivalent to React.memo for functional components

```typescript
// Regular Component - always re-renders
class RegularComponent extends React.Component<Props> {
  render() {
    return <div>{this.props.value}</div>
  }
}

// PureComponent - shallow comparison
class PureComp extends React.PureComponent<Props> {
  render() {
    return <div>{this.props.value}</div>
  }
}

// Functional equivalent
const MemoComponent = memo(({ value }: Props) => {
  return <div>{value}</div>
})
```

**Shallow comparison gotcha:**
```typescript
// ❌ Will always re-render (new array reference)
<PureComp items={[1, 2, 3]} />

// ✅ Reference stable
const items = [1, 2, 3]
<PureComp items={items} />

// Or use useMemo
const items = useMemo(() => [1, 2, 3], [])
```

---

### 42. How do you test React components?

**Answer:** Multiple testing approaches:

**1. Unit Testing with React Testing Library:**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

describe('Counter', () => {
  test('renders initial count', () => {
    render(<Counter initialCount={0} />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
  
  test('increments count on button click', async () => {
    render(<Counter initialCount={0} />)
    
    const button = screen.getByRole('button', { name: /increment/i })
    await userEvent.click(button)
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })
  
  test('handles async operations', async () => {
    render(<UserProfile userId="123" />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })
  
  test('handles form submission', async () => {
    const onSubmit = jest.fn()
    render(<LoginForm onSubmit={onSubmit} />)
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})
```

**2. Testing Hooks:**
```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter(0))
    expect(result.current.count).toBe(0)
  })
  
  test('increments count', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

**3. Testing with Context:**
```typescript
const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
)

test('uses context value', () => {
  render(<MyComponent />, { wrapper })
  // assertions
})
```

**4. Mocking API calls:**
```typescript
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'John' }]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetches and displays users', async () => {
  render(<UserList />)
  
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument()
  })
})
```

---

### 43. What is the difference between React and React Native?

**Answer:**

| React | React Native |
|-------|--------------|
| Web development | Mobile development (iOS/Android) |
| Uses DOM | Uses native components |
| HTML tags (`<div>`, `<span>`) | Native tags (`<View>`, `<Text>`) |
| CSS for styling | StyleSheet API |
| Runs in browser | Runs on mobile devices |
| react-dom package | react-native package |

```typescript
// React (Web)
function WebComponent() {
  return (
    <div style={{ padding: 10 }}>
      <h1>Hello Web</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

// React Native (Mobile)
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

function MobileComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Mobile</Text>
      <TouchableOpacity onPress={handleClick}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 20 }
})
```

**Similarities:**
- Same component model
- Same hooks (useState, useEffect, etc.)
- Same React principles
- Can share business logic

---

### 44. How do you handle async operations in React?

**Answer:** Multiple approaches:

**1. useEffect with async/await:**
```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Can't make useEffect callback async directly!
    // useEffect(() => async () => { ... })  // ❌ WRONG
    
    // Flag to prevent state updates if component unmounts
    let cancelled = false
    
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/users/${userId}`)
        const data = await response.json()
        
        // Only update state if still mounted
        if (!cancelled) {
          setUser(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    fetchUser()
    
    // Cleanup function runs when component unmounts or userId changes
    return () => {
      cancelled = true  // Prevent state updates after unmount
    }
  }, [userId])  // Re-run when userId changes
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>Not found</div>
  
  return <div>{user.name}</div>
}
```

**Explanation:** useEffect can't be async directly because it must return a cleanup function or nothing. Instead, define an async function inside useEffect and call it. The `cancelled` flag prevents "memory leak" warnings when setting state on unmounted components.

**2. Custom hook for data fetching:**
```typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // AbortController cancels fetch if component unmounts
    const controller = new AbortController()
    
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        // Don't set error if request was aborted (component unmounted)
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => setLoading(false))
    
    // Cancel request on unmount or url change
    return () => controller.abort()
  }, [url])
  
  return { data, loading, error }
}

// Usage - clean and reusable!
function Component() {
  const { data, loading, error } = useFetch<User>('/api/user')
  
  if (loading) return <Loading />
  if (error) return <Error message={error} />
  return <UserCard user={data!} />
}

// Can reuse in multiple components:
function Posts() {
  const { data: posts } = useFetch<Post[]>('/api/posts')
  // ...
}

function Comments() {
  const { data: comments } = useFetch<Comment[]>('/api/comments')
  // ...
}
```

**Explanation:** Custom hooks extract reusable logic. Instead of copy-pasting fetch code everywhere, write it once in a hook. Now every component can fetch data with just one line. The hook handles loading states, errors, and cleanup automatically.

**3. React Query (recommended for complex apps):**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: string }) {
  // useQuery handles everything automatically:
  // - Caching: Data stored in cache, reused across components
  // - Refetching: Automatically refetches when stale
  // - Loading/Error states: Built-in state management
  // - Background updates: Keeps data fresh
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],  // Unique identifier for this query
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json())
  })
  
  if (isLoading) return <Loading />
  if (error) return <Error />
  return <div>{data.name}</div>
}

// Mutations - for creating/updating/deleting data
function UpdateUser() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (user: User) => fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(user)
    }),
    onSuccess: () => {
      // After successful update, invalidate the cache
      // This triggers automatic refetch of user data
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
  
  return (
    <button onClick={() => mutation.mutate(newUser)}>
      Update {mutation.isLoading && '...'}
    </button>
  )
}

// Benefits:
// - Automatic caching (fetch once, use everywhere)
// - Automatic background refetching
// - No need to manage loading/error states manually
// - Pagination, infinite scroll built-in
// - Optimistic updates
```

**Explanation:** React Query is like a smart assistant for data fetching. It caches API responses, keeps them fresh, handles loading/error states, and synchronizes data across your entire app. Much better than managing fetch logic manually in every component.

**4. Suspense for Data Fetching (React 18):**
```typescript
// Resource-based approach
const userResource = fetchUser(userId)

function UserProfile() {
  const user = userResource.read() // Suspends if not ready
  return <div>{user.name}</div>
}

// Wrapper with Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile />
    </Suspense>
  )
}
```

---

### 45. What are Higher-Order Components (HOC)?

**Answer:** HOC is a function that takes a component and returns a new enhanced component.

**Use Cases:**
- Code reuse across multiple components
- Props manipulation or injection
- State abstraction (extract common logic)
- Render hijacking (conditionally render)

```typescript
// Basic HOC - adds loading functionality
function withLoading<P extends object>(
  Component: ComponentType<P>  // Take any component
): ComponentType<P & { isLoading: boolean }> {  // Return enhanced component
  
  return function WithLoadingComponent({ isLoading, ...props }: P & { isLoading: boolean }) {
    // Add loading logic
    if (isLoading) {
      return <div>Loading...</div>
    }
    // Render original component with its props
    return <Component {...(props as P)} />
  }
}

// Before HOC:
function UserList({ users }: { users: User[] }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}

// After HOC:
const UserListWithLoading = withLoading(UserList)

// Usage - now has loading prop:
<UserListWithLoading users={users} isLoading={loading} />

// The HOC added isLoading prop and loading UI for free!
// Can reuse withLoading on any component
const PostListWithLoading = withLoading(PostList)
const CommentListWithLoading = withLoading(CommentList)
```

**Explanation:** HOCs are like "component wrappers" that add extra functionality. Think of them as a factory: you give it a component, it gives you back an upgraded version with new features. Common for cross-cutting concerns like authentication, logging, or styling.

**Multiple HOCs:**
```typescript
// Authentication HOC
function withAuth<P>(Component: ComponentType<P>) {
  return function AuthComponent(props: P) {
    const { user, loading } = useAuth()
    
    if (loading) return <Loading />
    if (!user) return <Redirect to="/login" />
    
    return <Component {...props} />
  }
}

// Analytics HOC
function withAnalytics<P>(Component: ComponentType<P>, eventName: string) {
  return function AnalyticsComponent(props: P) {
    useEffect(() => {
      trackEvent(eventName, 'component_viewed')
    }, [])
    
    return <Component {...props} />
  }
}

// Theme HOC
function withTheme<P>(Component: ComponentType<P & { theme: Theme }>) {
  return function ThemedComponent(props: P) {
    const theme = useTheme()
    return <Component {...props} theme={theme} />
  }
}

// Compose multiple HOCs
const EnhancedComponent = withAuth(
  withTheme(
    withAnalytics(MyComponent, 'page_view')
  )
)
```

**Modern Alternative - Custom Hooks:**
```typescript
// Instead of HOC, use hooks
function MyComponent() {
  const { user, loading } = useAuth()
  const theme = useTheme()
  useAnalytics('page_view')
  
  if (loading) return <Loading />
  if (!user) return <Redirect to="/login" />
  
  return <div style={{ background: theme.bg }}>Content</div>
}
```

---

### 46. What is render props pattern?

**Answer:** Render props is a technique for sharing code using a prop whose value is a function.

```typescript
// Component with reusable logic
interface MousePosition {
  x: number
  y: number
}

interface MouseTrackerProps {
  render: (position: MousePosition) => React.ReactNode
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }
  
  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100vh' }}>
      {/* Call the render prop function with position data */}
      {render(position)}
    </div>
  )
}

// Usage - you control what to render with the data
function App() {
  return (
    <div>
      {/* Example 1: Show coordinates */}
      <MouseTracker
        render={({ x, y }) => (
          <div>Mouse position: {x}, {y}</div>
        )}
      />
      
      {/* Example 2: Follow mouse with image */}
      <MouseTracker
        render={({ x, y }) => (
          <img 
            src="cursor.png" 
            style={{ position: 'fixed', left: x, top: y }}
          />
        )}
      />
      
      {/* Same logic (tracking mouse), different UI! */}
    </div>
  )
}
```

**Explanation:** Render props let you share behavior (like tracking mouse position) while letting the consumer decide what to render. The component provides the data, you provide the UI. It's like: "Here's the data, you decide what to do with it."

**Children as function (alternative syntax):**
```typescript
interface DataProviderProps {
  children: (data: { loading: boolean; data: any[] }) => React.ReactNode
}

function DataProvider({ children }: DataProviderProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  
  useEffect(() => {
    fetchData().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])
  
  return <>{children({ loading, data })}</>
}

// Usage
<DataProvider>
  {({ loading, data }) => (
    loading ? <Loading /> : <List items={data} />
  )}
</DataProvider>
```

**Modern Alternative - Custom Hook:**
```typescript
// Better approach with hooks
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return position
}

// Usage - much cleaner!
function App() {
  const { x, y } = useMousePosition()
  return <div>Mouse: {x}, {y}</div>
}
```

---

### 47. How do you prevent re-renders in React?

**Answer:** Multiple optimization techniques:

**1. React.memo:**
```typescript
const ExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log('Rendering...')
  return <div>{value}</div>
})
```

**2. useMemo:**
```typescript
function Component({ items }: { items: Item[] }) {
  // Memoize expensive computation
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0)
  }, [items])
  
  // Memoize object to prevent child re-renders
  const config = useMemo(() => ({
    theme: 'dark',
    fontSize: 16
  }), [])
  
  return <ExpensiveChild config={config} total={total} />
}
```

**3. useCallback:**
```typescript
function Parent() {
  const [count, setCount] = useState(0)
  
  // Without useCallback - new function every render
  const handleClick = () => {
    console.log('clicked')
  }
  
  // With useCallback - same function reference
  const handleClickMemo = useCallback(() => {
    console.log('clicked')
  }, [])
  
  return <MemoChild onClick={handleClickMemo} />
}
```

**4. Split components:**
```typescript
// ❌ Bad: Entire component re-renders on input change
function Form() {
  const [name, setName] = useState('')
  const [expensiveData] = useState(() => computeExpensive())  // Expensive!
  
  // Every keystroke in input:
  // 1. Updates name
  // 2. Re-renders Form
  // 3. Re-renders ExpensiveDisplay (even though expensiveData didn't change!)
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <ExpensiveDisplay data={expensiveData} />  {/* Wasted re-render */}
    </div>
  )
}

// ✅ Good: Split into separate components
function Form() {
  return (
    <div>
      <NameInput />  {/* Only this re-renders when typing */}
      <ExpensiveDisplay />  {/* This doesn't re-render! */}
    </div>
  )
}

function NameInput() {
  const [name, setName] = useState('')  // State moved here
  return <input value={name} onChange={e => setName(e.target.value)} />
}

function ExpensiveDisplay() {
  const [data] = useState(() => computeExpensive())
  return <div>{data}</div>
}
```

**Explanation:** State at the top causes everything below to re-render. By splitting components, you isolate re-renders to only the parts that actually need to update. The expensive component never re-renders because its parent (Form) never re-renders.

**5. Move state down:**
```typescript
// ❌ State at top causes all children to re-render
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ExpensiveChild1 />
      <ExpensiveChild2 />
    </div>
  )
}

// ✅ Move state to where it's used
function Parent() {
  return (
    <div>
      <Counter />
      <ExpensiveChild1 />
      <ExpensiveChild2 />
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**6. Lift content up (children pattern):**
```typescript
// ❌ Problem: Children re-render when parent state changes
function Parent() {
  const [count, setCount] = useState(0)
  
  // Every click:
  // 1. count updates
  // 2. Parent re-renders
  // 3. ExpensiveChild re-renders (even though it doesn't use count!)
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ExpensiveChild />  {/* Wasted re-render */}
    </div>
  )
}

// ✅ Solution: Pass ExpensiveChild as children
function App() {
  // ExpensiveChild is created here, outside Parent
  return (
    <Parent>
      <ExpensiveChild />  {/* Created once, never changes */}
    </Parent>
  )
}

function Parent({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  
  // Every click:
  // 1. count updates
  // 2. Parent re-renders
  // 3. children prop is the same object → ExpensiveChild doesn't re-render!
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {children}  {/* Just renders the same element */}
    </div>
  )
}
```

**Why does this work?**
```typescript
// When App renders:
const childElement = <ExpensiveChild />  // Created once
<Parent>{childElement}</Parent>  // Passed as prop

// When Parent re-renders:
// children prop is still the same childElement object
// React sees: "same object = no need to re-render"
```

**Explanation:** This is a clever trick! By creating the child element outside the parent component and passing it as children, React sees it as the same element reference across parent re-renders. No re-render needed!

---

### 48. What is React Fiber?

**Answer:** Fiber is React's reconciliation algorithm introduced in React 16. It's a complete rewrite of React's core algorithm.

**Key Concepts:**

**1. Incremental Rendering:**
- Break work into chunks
- Pause and resume work
- Prioritize updates

**2. Virtual Stack Frame:**
- Each component is a "fiber" (unit of work)
- Can be paused and resumed
- Stored in memory as data structure

**3. Time Slicing:**
```typescript
// High priority - user input
const handleClick = () => {
  startTransition(() => {
    // Low priority - can be interrupted
    setSearchResults(computeExpensiveResults())
  })
}
```

**4. Priority Levels:**
- Synchronous (immediate)
- Task (user interactions)
- Animation
- High
- Low
- Offscreen

**Benefits:**
- Smoother animations
- Better perceived performance
- Ability to pause/resume rendering
- Split work across multiple frames
- Assign priority to updates

**Before Fiber (React 15):**
- Recursive rendering (call stack)
- Can't interrupt once started
- Could block main thread

**With Fiber (React 16+):**
- Linked list of fibers
- Can pause and come back later
- Responsive even during heavy updates

---

### 49. Explain React 18 Concurrent Features

**Answer:** Concurrent rendering allows React to prepare multiple versions of UI at the same time.

**1. useTransition:**
```typescript
function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)  // Urgent - update input immediately
    
    startTransition(() => {
      // Non-urgent - can be interrupted
      setResults(expensiveSearch(value))
    })
  }
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results items={results} />
    </div>
  )
}
```

**2. useDeferredValue:**
```typescript
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query)
  const results = useMemo(
    () => expensiveSearch(deferredQuery),
    [deferredQuery]
  )
  
  return (
    <div>
      {/* Shows stale results while computing new ones */}
      <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
        <Results items={results} />
      </div>
    </div>
  )
}
```

**3. Automatic Batching:**
```typescript
// React 17: Not batched
setTimeout(() => {
  setCount(c => c + 1)  // Render 1
  setFlag(f => !f)      // Render 2
}, 1000)

// React 18: Batched
setTimeout(() => {
  setCount(c => c + 1)  // Batched
  setFlag(f => !f)      // Single render
}, 1000)
```

**4. Suspense for Data Fetching:**
```typescript
function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfilePosts />
      </Suspense>
    </Suspense>
  )
}
```

**5. Server Components:**
```typescript
// .server.tsx - runs only on server
async function UserProfile({ id }: { id: string }) {
  const user = await db.user.findUnique({ where: { id } })
  return <div>{user.name}</div>
}

// .client.tsx - runs on client
'use client'
function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

---

### 50. What are some common React performance anti-patterns?

**Answer:**

**1. Creating objects/arrays in render:**
```typescript
// ❌ New object every render
function Component() {
  return <Child style={{ color: 'red' }} />
}

// ✅ Define outside or memoize
const style = { color: 'red' }
function Component() {
  return <Child style={style} />
}
```

**2. Inline function definitions:**
```typescript
// ❌ New function every render
<Child onClick={() => handleClick(id)} />

// ✅ Use useCallback
const handleClickWithId = useCallback(() => handleClick(id), [id])
<Child onClick={handleClickWithId} />
```

**3. Not using keys or using index:**
```typescript
// ❌ Using index
{items.map((item, i) => <Item key={i} {...item} />)}

// ✅ Using stable ID
{items.map(item => <Item key={item.id} {...item} />)}
```

**4. Large component trees:**
```typescript
// ❌ Monolithic component
function MassiveComponent() {
  return (
    <div>
      {/* hundreds of lines */}
    </div>
  )
}

// ✅ Split into smaller components
function App() {
  return (
    <>
      <Header />
      <Main />
      <Sidebar />
      <Footer />
    </>
  )
}
```

**5. Not memoizing context values:**
```typescript
// ❌ New object every render
function Provider({ children }) {
  const [state, setState] = useState(initial)
  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  )
}

// ✅ Memoize value
function Provider({ children }) {
  const [state, setState] = useState(initial)
  const value = useMemo(() => ({ state, setState }), [state])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
```

**6. Putting all state at top level:**
```typescript
// ❌ Global state causes all to re-render
function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  // Everything re-renders on search change
}

// ✅ Collocate state
function SearchBar() {
  const [search, setSearch] = useState('')
  // Only SearchBar re-renders
}
```

---

## Quick Tips for Interviews

1. **Explain trade-offs** - Every solution has pros/cons
2. **Think out loud** - Share your thought process
3. **Ask clarifying questions** - Understand requirements
4. **Start simple** - Basic solution first, then optimize
5. **Consider edge cases** - Empty arrays, null values, etc.
6. **Discuss TypeScript** - Type safety benefits
7. **Mention testing** - Unit tests, integration tests
8. **Performance awareness** - When and how to optimize
9. **Know recent updates** - React 18 features
10. **Real-world experience** - Share project examples
11. **Code organization** - Component structure, file naming
12. **Accessibility** - Semantic HTML, ARIA labels
13. **Security** - XSS prevention, sanitization
14. **State management** - When to use Context vs Redux
15. **Error handling** - Error boundaries, try-catch
16. **Network requests** - Loading states, error handling
17. **Bundle size** - Code splitting, tree shaking
18. **Browser compatibility** - Polyfills, feature detection
19. **SEO considerations** - SSR, meta tags
20. **Team collaboration** - Code reviews, conventions

---

**Good luck with your interviews! 🚀**
