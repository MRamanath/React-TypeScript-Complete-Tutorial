import React, { Component, createContext, useContext, useState, lazy, Suspense, useRef, forwardRef, useTransition, useDeferredValue, Fragment, Profiler } from 'react'
import { createPortal } from 'react-dom'
import type { ErrorInfo, ReactNode, ProfilerOnRenderCallback } from 'react'

// ===========================
// 1. ERROR BOUNDARIES
// ===========================

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error">
            <h4>Something went wrong!</h4>
            <p>{this.state.error?.message}</p>
            <button onClick={() => this.setState({ hasError: false, error: null })}>
              Try Again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

const BuggyComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('I crashed!')
  }
  return <p>Everything is fine!</p>
}

const ErrorBoundaryExample: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  return (
    <div className="example">
      <h4>Error Boundary Example</h4>
      <button onClick={() => setShouldThrow(!shouldThrow)}>
        Toggle Error
      </button>
      
      <ErrorBoundary>
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  )
}

// ===========================
// 2. PORTALS
// ===========================

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: ReactNode }> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  if (!isOpen) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#2a2a2a',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: '1rem' }}>Close</button>
      </div>
    </div>,
    document.body
  )
}

const PortalsExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="example">
      <h4>Portals Example</h4>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Modal Content</h3>
        <p>This modal is rendered outside the parent DOM hierarchy using createPortal!</p>
      </Modal>
    </div>
  )
}

// ===========================
// 3. REFS & FORWARDING
// ===========================

interface FancyInputProps {
  placeholder?: string
}

const FancyInput = forwardRef<HTMLInputElement, FancyInputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      style={{
        padding: '0.5rem',
        border: '2px solid #646cff',
        borderRadius: '4px',
        backgroundColor: '#2a2a2a',
        color: 'white'
      }}
    />
  )
})

FancyInput.displayName = 'FancyInput'

const RefsExample: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const scrollToDiv = () => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="example">
      <h4>Refs & Forwarding Example</h4>
      <FancyInput ref={inputRef} placeholder="Fancy input with forwarded ref" />
      <button onClick={focusInput}>Focus Input</button>
      
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #444', marginTop: '1rem' }}>
        <p>Scroll down...</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Line {i + 1}</p>
        ))}
        <div ref={divRef} style={{ backgroundColor: '#646cff', padding: '1rem' }}>
          Target div
        </div>
      </div>
      <button onClick={scrollToDiv}>Scroll to Target</button>
    </div>
  )
}

// ===========================
// 4. LAZY LOADING & SUSPENSE
// ===========================

// Simulate a heavy component
const HeavyComponent: React.FC = () => {
  return (
    <div className="card">
      <h4>Heavy Component Loaded!</h4>
      <p>This component was loaded lazily.</p>
      <img 
        src="https://via.placeholder.com/400x200/646cff/ffffff?text=Lazy+Loaded+Image" 
        alt="Lazy loaded"
        style={{ width: '100%', borderRadius: '4px' }}
      />
    </div>
  )
}

// Lazy load the component
const LazyHeavyComponent = lazy(() => {
  return new Promise<{ default: React.FC }>((resolve) => {
    setTimeout(() => {
      resolve({ default: HeavyComponent })
    }, 2000) // Simulate network delay
  })
})

const LazyLoadingExample: React.FC = () => {
  const [showHeavy, setShowHeavy] = useState(false)

  return (
    <div className="example">
      <h4>Lazy Loading & Suspense Example</h4>
      <button onClick={() => setShowHeavy(!showHeavy)}>
        {showHeavy ? 'Hide' : 'Load'} Heavy Component
      </button>

      {showHeavy && (
        <Suspense fallback={<div className="card">Loading heavy component...</div>}>
          <LazyHeavyComponent />
        </Suspense>
      )}
    </div>
  )
}

// ===========================
// 5. CONTEXT API ADVANCED
// ===========================

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="card">
      <h4>User Profile</h4>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const LoginForm: React.FC = () => {
  const { login } = useAuth()

  const handleLogin = () => {
    login({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    })
  }

  return (
    <div className="card">
      <h4>Login</h4>
      <button onClick={handleLogin}>Login as Admin</button>
    </div>
  )
}

const ContextAPIExample: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="example">
      <h4>Context API Advanced Example</h4>
      {isAuthenticated ? <UserProfile /> : <LoginForm />}
    </div>
  )
}

const ContextWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <ContextAPIExample />
    </AuthProvider>
  )
}

// ===========================
// 6. useTransition & useDeferredValue
// ===========================

const TransitionExample: React.FC = () => {
  const [input, setInput] = useState('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    
    // Mark the state update as non-urgent
    startTransition(() => {
      const newList = Array.from({ length: 5000 }, (_, i) => `${e.target.value} - ${i}`)
      setList(newList)
    })
  }

  return (
    <div className="example">
      <h4>useTransition Example</h4>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type something (will generate 5000 items)"
      />
      {isPending && <p>Updating list...</p>}
      <p>List length: {list.length}</p>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #444', marginTop: '1rem' }}>
        {list.slice(0, 50).map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  )
}

const DeferredValueExample: React.FC = () => {
  const [input, setInput] = useState('')
  const deferredInput = useDeferredValue(input)

  return (
    <div className="example">
      <h4>useDeferredValue Example</h4>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something"
      />
      <p>Immediate value: {input}</p>
      <p>Deferred value: {deferredInput}</p>
      <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
        Deferred value updates with lower priority
      </p>
    </div>
  )
}

// ===========================
// 7. STRICT MODE
// ===========================

const StrictModeExample: React.FC = () => {
  const [count, setCount] = useState(0)

  // In StrictMode, this will log twice in development
  console.log('StrictModeExample rendered')

  return (
    <div className="example">
      <h4>Strict Mode</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
        Check console - in development, StrictMode causes double rendering to detect side effects
      </p>
    </div>
  )
}

// ===========================
// 8. FRAGMENTS
// ===========================

const FragmentsExample: React.FC = () => {
  return (
    <div className="example">
      <h4>Fragments Example</h4>
      
      {/* Short syntax */}
      <>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </>

      {/* Long syntax with key (useful for lists) */}
      {['Item 1', 'Item 2'].map((item, index) => (
        <Fragment key={index}>
          <dt>{item}</dt>
          <dd>Description for {item}</dd>
        </Fragment>
      ))}
    </div>
  )
}

// ===========================
// 9. PROFILER
// ===========================

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  })
}

const ExpensiveComponent: React.FC<{ count: number }> = ({ count }) => {
  // Simulate expensive computation
  const items = Array.from({ length: 1000 }, (_, i) => i * count)
  return <p>Sum: {items.reduce((a, b) => a + b, 0)}</p>
}

const ProfilerExample: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="example">
      <h4>Profiler Example</h4>
      <Profiler id="ExpensiveComponent" onRender={onRenderCallback}>
        <ExpensiveComponent count={count} />
      </Profiler>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
        Check console for profiling data
      </p>
    </div>
  )
}

// ===========================
// MAIN COMPONENT
// ===========================

const AdvancedConcepts: React.FC = () => {
  return (
    <div className="section">
      <h2>Chapter 3: Advanced Concepts</h2>

      <div className="section">
        <h3>3.1 Error Boundaries</h3>
        <p>Catch JavaScript errors in component tree and display fallback UI.</p>
        <ErrorBoundaryExample />
      </div>

      <div className="section">
        <h3>3.2 Portals</h3>
        <p>Render children into a DOM node outside parent hierarchy.</p>
        <PortalsExample />
      </div>

      <div className="section">
        <h3>3.3 Refs & Forwarding</h3>
        <p>Access DOM elements and forward refs to child components.</p>
        <RefsExample />
      </div>

      <div className="section">
        <h3>3.4 Lazy Loading & Suspense</h3>
        <p>Code-split and lazy load components for better performance.</p>
        <LazyLoadingExample />
      </div>

      <div className="section">
        <h3>3.5 Context API Advanced</h3>
        <p>Share data across component tree without prop drilling.</p>
        <ContextWrapper />
      </div>

      <div className="section">
        <h3>3.6 useTransition</h3>
        <p>Mark state updates as non-urgent to keep UI responsive.</p>
        <TransitionExample />
      </div>

      <div className="section">
        <h3>3.7 useDeferredValue</h3>
        <p>Defer updating parts of UI to keep it responsive.</p>
        <DeferredValueExample />
      </div>

      <div className="section">
        <h3>3.8 Strict Mode</h3>
        <p>Identify potential problems in development mode.</p>
        <StrictModeExample />
      </div>

      <div className="section">
        <h3>3.9 Fragments</h3>
        <p>Group multiple elements without adding extra DOM nodes.</p>
        <FragmentsExample />
      </div>

      <div className="section">
        <h3>3.10 Profiler</h3>
        <p>Measure rendering performance of React components.</p>
        <ProfilerExample />
      </div>

      <div className="section" style={{ backgroundColor: '#2a2a2a' }}>
        <h3>📝 Interview Questions</h3>
        <ul>
          <li><strong>Q:</strong> What are Error Boundaries?</li>
          <li><strong>A:</strong> Class components that catch errors in child component tree and display fallback UI.</li>
          
          <li><strong>Q:</strong> When to use Portals?</li>
          <li><strong>A:</strong> For modals, tooltips, or any element that needs to break out of parent DOM hierarchy.</li>
          
          <li><strong>Q:</strong> What is React.lazy()?</li>
          <li><strong>A:</strong> Function for code-splitting and lazy loading components dynamically.</li>
          
          <li><strong>Q:</strong> What is Suspense?</li>
          <li><strong>A:</strong> Component that displays fallback while waiting for lazy components or async operations.</li>
          
          <li><strong>Q:</strong> Difference between useTransition and useDeferredValue?</li>
          <li><strong>A:</strong> useTransition marks state updates as transitions; useDeferredValue defers a value's update.</li>
          
          <li><strong>Q:</strong> What is Strict Mode?</li>
          <li><strong>A:</strong> Development mode tool that highlights potential problems via double rendering and warnings.</li>
          
          <li><strong>Q:</strong> Why use Fragments?</li>
          <li><strong>A:</strong> To group elements without adding extra DOM nodes, keeping markup clean.</li>
        </ul>
      </div>
    </div>
  )
}

export default AdvancedConcepts
