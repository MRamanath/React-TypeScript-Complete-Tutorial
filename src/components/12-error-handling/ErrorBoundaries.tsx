import { Component, ErrorInfo, ReactNode, useState } from 'react'

/**
 * Error Boundaries
 * Class components that catch JavaScript errors in child component tree
 */

// Error Boundary Class Component
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
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
    // Update state so next render shows fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <h3>⚠️ Something went wrong</h3>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Buggy Component
function BuggyCounter() {
  const [count, setCount] = useState(0)

  if (count === 5) {
    throw new Error('Counter crashed at 5!')
  }

  return (
    <div className="card">
      <h4>Buggy Counter: {count}</h4>
      <button onClick={() => setCount(count + 1)}>
        Increment (crashes at 5)
      </button>
    </div>
  )
}

// Component that throws on mount
function ThrowOnMount(): JSX.Element {
  throw new Error('Component failed to mount!')
  return <div /> // Never reached
}

// Component with async error (NOT caught by Error Boundary)
function AsyncError() {
  const [error, setError] = useState(false)

  const causeAsyncError = () => {
    setTimeout(() => {
      throw new Error('Async error - NOT caught by Error Boundary')
    }, 100)
  }

  const causeCaughtError = () => {
    setError(true)
  }

  if (error) {
    throw new Error('Synchronous error - caught by Error Boundary')
  }

  return (
    <div className="card">
      <h4>Async vs Sync Errors</h4>
      <div className="button-group">
        <button onClick={causeCaughtError}>
          Throw Sync Error (caught ✓)
        </button>
        <button onClick={causeAsyncError}>
          Throw Async Error (NOT caught ✗)
        </button>
      </div>
      <p className="info">
        Error boundaries only catch errors during render, lifecycle methods, and constructors
      </p>
    </div>
  )
}

// Multiple Error Boundaries
function MultipleErrorBoundaries() {
  const [resetKey1, setResetKey1] = useState(0)
  const [resetKey2, setResetKey2] = useState(0)

  return (
    <div className="section">
      <h3>Multiple Error Boundaries</h3>
      <p>Each boundary catches errors independently</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <ErrorBoundary
          key={resetKey1}
          fallback={
            <div className="error-fallback">
              <h4>Boundary 1 caught an error</h4>
              <button onClick={() => setResetKey1(k => k + 1)}>Reset</button>
            </div>
          }
        >
          <BuggyCounter />
        </ErrorBoundary>

        <ErrorBoundary
          key={resetKey2}
          fallback={
            <div className="error-fallback">
              <h4>Boundary 2 caught an error</h4>
              <button onClick={() => setResetKey2(k => k + 1)}>Reset</button>
            </div>
          }
        >
          <BuggyCounter />
        </ErrorBoundary>
      </div>
      <p className="info">✓ One error doesn't crash the entire app</p>
    </div>
  )
}

// Error Logging Example
function ErrorLoggingExample() {
  const [errors, setErrors] = useState<Array<{ error: string; stack: string; time: string }>>([])
  const [key, setKey] = useState(0)

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    setErrors(prev => [...prev, {
      error: error.message,
      stack: errorInfo.componentStack || '',
      time: new Date().toLocaleTimeString()
    }])
  }

  return (
    <div className="section">
      <h3>Error Logging</h3>
      <ErrorBoundary
        key={key}
        onError={handleError}
        fallback={
          <div className="error-fallback">
            <h4>Component crashed</h4>
            <button onClick={() => setKey(k => k + 1)}>Reset Component</button>
          </div>
        }
      >
        <BuggyCounter />
      </ErrorBoundary>

      {errors.length > 0 && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <h4>Error Log ({errors.length})</h4>
          {errors.map((log, i) => (
            <div key={i} style={{ 
              marginBottom: '1rem', 
              padding: '0.5rem', 
              background: 'rgba(255, 0, 0, 0.1)',
              borderLeft: '3px solid #ff4444',
              fontSize: '0.85rem'
            }}>
              <strong>{log.time}:</strong> {log.error}
              <details>
                <summary>Component Stack</summary>
                <pre style={{ fontSize: '0.75rem' }}>{log.stack}</pre>
              </details>
            </div>
          ))}
          <button onClick={() => setErrors([])}>Clear Log</button>
        </div>
      )}
    </div>
  )
}

// Production-ready Error Boundary
class ProductionErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to external service (Sentry, LogRocket, etc.)
    console.error('Production Error:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h2>😔 Oops! Something went wrong</h2>
          <p>We've been notified and are working on a fix.</p>
          <div className="button-group">
            <button onClick={() => window.location.reload()}>
              Reload Page
            </button>
            <button onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
          <details style={{ marginTop: '1rem' }}>
            <summary>Error Details</summary>
            <pre style={{ textAlign: 'left', fontSize: '0.85rem' }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

function ProductionExample() {
  const [showBuggy, setShowBuggy] = useState(false)

  return (
    <div className="section">
      <h3>Production-Ready Error Boundary</h3>
      <button onClick={() => setShowBuggy(!showBuggy)}>
        {showBuggy ? 'Hide' : 'Show'} Buggy Component
      </button>
      {showBuggy && (
        <ProductionErrorBoundary>
          <ThrowOnMount />
        </ProductionErrorBoundary>
      )}
    </div>
  )
}

export default function ErrorBoundariesDemo() {
  return (
    <div className="example-container">
      <h2>Error Boundaries</h2>
      <p className="subtitle">Catch and handle errors in component tree gracefully</p>

      <div className="section">
        <h3>Basic Error Boundary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h4>❌ Without Error Boundary</h4>
            <p className="info">Entire app crashes</p>
          </div>
          <div>
            <h4>✓ With Error Boundary</h4>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
            <p className="info">Only component crashes, shows fallback UI</p>
          </div>
        </div>
      </div>

      <MultipleErrorBoundaries />

      <div className="section">
        <h3>What Error Boundaries Catch</h3>
        <ErrorBoundary>
          <AsyncError />
        </ErrorBoundary>
      </div>

      <ErrorLoggingExample />

      <ProductionExample />

      <div className="section">
        <h3>What Error Boundaries DON'T Catch</h3>
        <div className="card">
          <ul style={{ textAlign: 'left' }}>
            <li>❌ Event handlers (use try-catch)</li>
            <li>❌ Asynchronous code (setTimeout, promises)</li>
            <li>❌ Server-side rendering errors</li>
            <li>❌ Errors thrown in the error boundary itself</li>
            <li>❌ Errors in event handlers</li>
          </ul>
        </div>
      </div>

      <div className="summary">
        <h4>Best Practices:</h4>
        <ul>
          <li><strong>Granular Boundaries:</strong> Place boundaries around independent features</li>
          <li><strong>Meaningful Fallbacks:</strong> Show helpful error messages, not generic ones</li>
          <li><strong>Error Logging:</strong> Report errors to monitoring services (Sentry, Bugsnag)</li>
          <li><strong>Recovery Options:</strong> Provide "Try Again" or "Go Home" buttons</li>
          <li><strong>Development vs Production:</strong> Show stack traces in dev, friendly messages in prod</li>
          <li><strong>Class Components Only:</strong> Currently no hooks equivalent for error boundaries</li>
        </ul>
      </div>

      <div className="code-preview">
        <h4>Basic Implementation:</h4>
        <pre>{`class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log to error service
    logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />
    }
    return this.props.children
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`}</pre>
      </div>
    </div>
  )
}
