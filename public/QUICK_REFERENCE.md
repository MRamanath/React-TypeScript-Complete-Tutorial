# React TypeScript Quick Reference

## Quick Command Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Common Patterns Cheat Sheet

### Component Definition

```typescript
// Functional Component
interface Props {
  name: string
  age?: number
}

const MyComponent: React.FC<Props> = ({ name, age }) => {
  return <div>{name}</div>
}

// With children
interface PropsWithChildren {
  children: React.ReactNode
}
```

### useState

```typescript
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)
const [items, setItems] = useState<string[]>([])

// Update
setCount(count + 1)
setCount(prev => prev + 1)  // Preferred
```

### useEffect

```typescript
// Run once on mount
useEffect(() => {
  console.log('Mounted')
  return () => console.log('Cleanup')
}, [])

// Run when dependency changes
useEffect(() => {
  console.log('Count changed:', count)
}, [count])

// Async in useEffect
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch('/api')
    setData(await data.json())
  }
  fetchData()
}, [])
```

### useCallback & useMemo

```typescript
// Memoize function
const handleClick = useCallback(() => {
  console.log('Clicked')
}, [])

// Memoize value
const expensiveValue = useMemo(() => {
  return computeExpensive(data)
}, [data])
```

### useRef

```typescript
// DOM reference
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// Mutable value
const countRef = useRef(0)
countRef.current += 1
```

### useContext

```typescript
const ThemeContext = createContext<Theme | undefined>(undefined)

// Provider
<ThemeContext.Provider value={theme}>
  {children}
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext)
```

### useReducer

```typescript
type State = { count: number }
type Action = { type: 'increment' } | { type: 'decrement' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
dispatch({ type: 'increment' })
```

### Event Handlers

```typescript
// Mouse
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {}

// Input
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

// Form
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

// Keyboard
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {}
```

### Custom Hooks

```typescript
function useCounter(initial: number) {
  const [count, setCount] = useState(initial)
  
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initial)
  
  return { count, increment, decrement, reset }
}

// Usage
const counter = useCounter(0)
```

### Performance Optimization

```typescript
// Memoize component
const MemoComponent = memo(MyComponent)

// Memoize with custom comparison
const MemoComponent = memo(MyComponent, (prev, next) => {
  return prev.id === next.id
})

// Split expensive computations
const result = useMemo(() => expensiveCalc(data), [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

### Error Boundaries

```typescript
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }
  
  render() {
    if (this.state.hasError) return <ErrorUI />
    return this.props.children
  }
}
```

### Lazy Loading

```typescript
const LazyComponent = lazy(() => import('./Component'))

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### Context Pattern

```typescript
// Create context with type
interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be within AuthProvider')
  return context
}

// Provider
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  
  return (
    <AuthContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Interview Quick Tips

### Component Lifecycle
- **Mount**: constructor → render → componentDidMount
- **Update**: render → componentDidUpdate
- **Unmount**: componentWillUnmount

### Hooks Rules
1. Only call at top level (not in loops/conditions)
2. Only call from React functions
3. Custom hooks start with "use"

### Virtual DOM
- In-memory representation of UI
- React diffs changes (reconciliation)
- Only updates changed parts

### Keys in Lists
- Help React identify changes
- Should be stable, unique, consistent
- Don't use array index if list can change

### Common Gotchas
- State updates are asynchronous
- useEffect runs after render
- Closures in effects (stale closure problem)
- Objects/arrays need new references to trigger updates

## TypeScript Types Reference

```typescript
// Component Props
interface ComponentProps {
  required: string
  optional?: number
  callback: (id: number) => void
  children?: React.ReactNode
}

// Event Types
React.MouseEvent<HTMLButtonElement>
React.ChangeEvent<HTMLInputElement>
React.FormEvent<HTMLFormElement>
React.KeyboardEvent<HTMLInputElement>

// Ref Types
React.RefObject<HTMLDivElement>
React.MutableRefObject<number>

// Generic Component
interface ListProps<T> {
  items: T[]
  render: (item: T) => React.ReactNode
}

// Union Types
type Status = 'idle' | 'loading' | 'success' | 'error'

// Discriminated Unions
type State =
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: string }
```
