import { useState, ComponentType, ReactNode } from 'react'

/**
 * Advanced Patterns: HOC and Render Props
 * Two powerful patterns for component composition and code reuse
 */

// ============ Higher-Order Components (HOC) ============

// 1. withLoading HOC
function withLoading<P extends object>(
  Component: ComponentType<P>,
  loadingMessage = 'Loading...'
) {
  return function WithLoadingComponent(props: P & { isLoading: boolean }) {
    const { isLoading, ...rest } = props
    
    if (isLoading) {
      return (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner" />
          <p>{loadingMessage}</p>
        </div>
      )
    }
    
    return <Component {...(rest as P)} />
  }
}

// Component to be enhanced
function UserProfile({ name, email }: { name: string; email: string }) {
  return (
    <div className="card">
      <h4>User Profile</h4>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  )
}

const UserProfileWithLoading = withLoading(UserProfile, 'Fetching user data...')

function HOCLoadingExample() {
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="card">
      <h3>1. HOC: withLoading</h3>
      <button onClick={fetchData}>Fetch User</button>
      <UserProfileWithLoading
        isLoading={isLoading}
        name="John Doe"
        email="john@example.com"
      />
      <p className="info">✓ HOC adds loading state to any component</p>
    </div>
  )
}

// 2. withAuth HOC
function withAuth<P extends object>(Component: ComponentType<P>) {
  return function WithAuthComponent(props: P & { isAuthenticated: boolean }) {
    const { isAuthenticated, ...rest } = props
    
    if (!isAuthenticated) {
      return (
        <div className="card" style={{ background: 'rgba(244, 67, 54, 0.1)' }}>
          <h4>🔒 Access Denied</h4>
          <p>Please log in to view this content</p>
        </div>
      )
    }
    
    return <Component {...(rest as P)} />
  }
}

function SecretContent() {
  return (
    <div className="card" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
      <h4>🎉 Secret Content</h4>
      <p>This is protected content only visible to authenticated users!</p>
    </div>
  )
}

const ProtectedContent = withAuth(SecretContent)

function HOCAuthExample() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <div className="card">
      <h3>2. HOC: withAuth</h3>
      <button onClick={() => setIsAuth(!isAuth)}>
        {isAuth ? 'Logout' : 'Login'}
      </button>
      <ProtectedContent isAuthenticated={isAuth} />
      <p className="info">✓ HOC protects components with authentication</p>
    </div>
  )
}

// 3. withLogger HOC (Props Proxy)
function withLogger<P extends object>(Component: ComponentType<P>, componentName: string) {
  return function WithLoggerComponent(props: P) {
    console.log(`[${componentName}] Rendered with props:`, props)
    
    return (
      <div style={{ border: '2px solid #646cff', borderRadius: '8px', padding: '1rem' }}>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
          🔍 Logged: {componentName}
        </div>
        <Component {...props} />
      </div>
    )
  }
}

function SimpleButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick}>{label}</button>
}

const LoggedButton = withLogger(SimpleButton, 'SimpleButton')

function HOCLoggerExample() {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <h3>3. HOC: withLogger</h3>
      <LoggedButton
        label={`Clicked ${count} times`}
        onClick={() => setCount(count + 1)}
      />
      <p className="info">✓ Check console for logged props</p>
    </div>
  )
}

// 4. Composing Multiple HOCs
const EnhancedComponent = withLogger(
  withLoading(UserProfile, 'Loading user...'),
  'UserProfileWithLoading'
)

function HOCCompositionExample() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="card">
      <h3>4. Composing Multiple HOCs</h3>
      <button onClick={() => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1500)
      }}>
        Load User
      </button>
      <EnhancedComponent
        isLoading={isLoading}
        name="Jane Smith"
        email="jane@example.com"
      />
      <p className="info">✓ Multiple HOCs stacked together</p>
    </div>
  )
}

// ============ Render Props Pattern ============

// 1. Mouse Tracker with Render Props
interface MousePosition {
  x: number
  y: number
}

function MouseTracker({ render }: { render: (mouse: MousePosition) => ReactNode }) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        height: '200px',
        border: '2px solid #646cff',
        borderRadius: '8px',
        position: 'relative',
        cursor: 'crosshair'
      }}
    >
      {render(position)}
    </div>
  )
}

function RenderPropsMouseExample() {
  return (
    <div className="card">
      <h3>5. Render Props: Mouse Tracker</h3>
      <MouseTracker
        render={(mouse) => (
          <div style={{
            position: 'absolute',
            left: mouse.x,
            top: mouse.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#646cff',
              borderRadius: '50%',
              boxShadow: '0 0 10px #646cff'
            }} />
            <div style={{
              marginTop: '5px',
              fontSize: '0.8rem',
              color: '#646cff',
              whiteSpace: 'nowrap'
            }}>
              ({mouse.x}, {mouse.y})
            </div>
          </div>
        )}
      />
      <p className="info">✓ Move mouse to track position</p>
    </div>
  )
}

// 2. Data Fetcher with Render Props
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => ReactNode
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.3) {
        setData({ name: 'API Data', value: Math.floor(Math.random() * 100) } as T)
      } else {
        setError(new Error('Failed to fetch data'))
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        Fetch Data from {url}
      </button>
      <div style={{ marginTop: '1rem' }}>
        {children(data, loading, error)}
      </div>
    </div>
  )
}

function RenderPropsDataExample() {
  return (
    <div className="card">
      <h3>6. Render Props: Data Fetcher</h3>
      <DataFetcher<{ name: string; value: number }> url="/api/data">
        {(data, loading, error) => {
          if (loading) return <div>Loading data...</div>
          if (error) return <div style={{ color: '#f44336' }}>Error: {error.message}</div>
          if (data) return (
            <div style={{ padding: '1rem', background: 'rgba(100, 108, 255, 0.1)', borderRadius: '4px' }}>
              <strong>{data.name}:</strong> {data.value}
            </div>
          )
          return <div>Click button to fetch data</div>
        }}
      </DataFetcher>
      <p className="info">✓ Render prop provides data, loading, and error states</p>
    </div>
  )
}

// 3. Toggle with Render Props
function Toggle({ children }: { children: (on: boolean, toggle: () => void) => ReactNode }) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  return <>{children(on, toggle)}</>
}

function RenderPropsToggleExample() {
  return (
    <div className="card">
      <h3>7. Render Props: Toggle</h3>
      <Toggle>
        {(on, toggle) => (
          <div>
            <button onClick={toggle}>
              {on ? 'ON' : 'OFF'}
            </button>
            {on && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'rgba(76, 175, 80, 0.2)',
                borderRadius: '4px'
              }}>
                ✓ Content is visible when toggled ON
              </div>
            )}
          </div>
        )}
      </Toggle>
      <p className="info">✓ Render prop receives state and updater function</p>
    </div>
  )
}

// 4. Children as Function (Render Props variant)
function WindowSize({ children }: { children: (size: { width: number; height: number }) => ReactNode }) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useState(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return <>{children(size)}</>
}

function RenderPropsWindowExample() {
  return (
    <div className="card">
      <h3>8. Render Props: Window Size</h3>
      <WindowSize>
        {(size) => (
          <div style={{
            padding: '1rem',
            background: 'rgba(100, 108, 255, 0.1)',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {size.width} x {size.height}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#888' }}>
              Resize window to see it update
            </div>
          </div>
        )}
      </WindowSize>
      <p className="info">✓ Children as function pattern</p>
    </div>
  )
}

export default function AdvancedPatternsDemo() {
  return (
    <div className="example-container">
      <h2>Advanced Patterns: HOC & Render Props</h2>
      <p className="subtitle">Two powerful patterns for component composition and code reuse</p>

      <div className="section">
        <h3>Higher-Order Components (HOC)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <HOCLoadingExample />
          <HOCAuthExample />
          <HOCLoggerExample />
          <HOCCompositionExample />
        </div>
      </div>

      <div className="section">
        <h3>Render Props Pattern</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <RenderPropsMouseExample />
          <RenderPropsDataExample />
          <RenderPropsToggleExample />
          <RenderPropsWindowExample />
        </div>
      </div>

      <div className="section">
        <h3>Pattern Comparison</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>Higher-Order Components</h4>
            <div style={{ textAlign: 'left' }}>
              <p><strong>✅ Pros:</strong></p>
              <ul>
                <li>Clean component composition</li>
                <li>Easy to compose multiple HOCs</li>
                <li>Static composition (compile time)</li>
                <li>Works with class components</li>
              </ul>
              <p><strong>❌ Cons:</strong></p>
              <ul>
                <li>Wrapper hell (many nested components)</li>
                <li>Props collision possible</li>
                <li>Hard to trace data flow</li>
                <li>Must forward refs manually</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h4>Render Props</h4>
            <div style={{ textAlign: 'left' }}>
              <p><strong>✅ Pros:</strong></p>
              <ul>
                <li>Clear data flow</li>
                <li>No naming collisions</li>
                <li>Dynamic composition (runtime)</li>
                <li>More flexible</li>
              </ul>
              <p><strong>❌ Cons:</strong></p>
              <ul>
                <li>Callback hell (nesting)</li>
                <li>Slightly more verbose</li>
                <li>Performance: creates new function each render</li>
                <li>Less intuitive for beginners</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="summary">
        <h4>Modern Alternatives:</h4>
        <div className="card">
          <p><strong>🎯 React Hooks (Recommended)</strong></p>
          <p>Both HOC and Render Props patterns are largely replaced by Custom Hooks in modern React:</p>
          <ul style={{ textAlign: 'left' }}>
            <li>✓ Simpler and more composable</li>
            <li>✓ No wrapper components</li>
            <li>✓ Better performance</li>
            <li>✓ Easier to understand and test</li>
          </ul>
          <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#888' }}>
            However, HOC and Render Props are still useful for:
          </p>
          <ul style={{ textAlign: 'left', color: '#888' }}>
            <li>Legacy codebases</li>
            <li>Third-party library integration</li>
            <li>Advanced component composition scenarios</li>
          </ul>
        </div>
      </div>

      <div className="code-preview">
        <h4>Code Examples:</h4>
        <pre>{`// HOC Pattern
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <Loading />
    return <Component {...props} />
  }
}
const EnhancedComponent = withLoading(MyComponent)

// Render Props Pattern
<DataFetcher url="/api/data">
  {(data, loading, error) => {
    if (loading) return <Loading />
    if (error) return <Error error={error} />
    return <Display data={data} />
  }}
</DataFetcher>

// Modern Hooks (Recommended)
function useData(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  // ... fetch logic
  return { data, loading, error }
}
function MyComponent() {
  const { data, loading, error } = useData('/api/data')
  // ... render logic
}`}</pre>
      </div>

      <style>{`
        .spinner {
          width: 30px;
          height: 30px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #646cff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 0.5rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
