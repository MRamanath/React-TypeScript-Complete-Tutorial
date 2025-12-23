import { lazy, Suspense, useState, ComponentType } from 'react'

/**
 * Code Splitting and Lazy Loading
 * Load components on-demand to reduce initial bundle size
 */

// Lazy loaded components
const HeavyComponent = lazy(() => {
  // Simulate network delay
  return new Promise<{ default: ComponentType<any> }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="card">
            <h3>Heavy Component Loaded! 🎉</h3>
            <p>This component was loaded on-demand.</p>
            <p>Initial bundle size is much smaller!</p>
          </div>
        )
      })
    }, 1000)
  })
})

const LazyChart = lazy(() => {
  return new Promise<{ default: ComponentType<any> }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="card">
            <h3>📊 Chart Component</h3>
            <div style={{
              height: '200px',
              background: 'linear-gradient(45deg, #646cff 0%, #747bff 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              Fancy Chart Visualization
            </div>
            <p className="info">This would be a heavy charting library (Chart.js, D3, etc.)</p>
          </div>
        )
      })
    }, 800)
  })
})

const LazyEditor = lazy(() => {
  return new Promise<{ default: ComponentType<any> }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="card">
            <h3>📝 Rich Text Editor</h3>
            <div style={{
              minHeight: '150px',
              padding: '1rem',
              border: '1px solid #646cff',
              borderRadius: '4px',
              background: '#1a1a1a'
            }}>
              <p>This would be a heavy editor like Monaco, CodeMirror, or TinyMCE</p>
              <p style={{ marginTop: '1rem', color: '#888' }}>Loaded only when needed!</p>
            </div>
          </div>
        )
      })
    }, 1200)
  })
})

// Loading Spinner
function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      fontSize: '1.2rem',
      color: '#646cff'
    }}>
      <div className="spinner" />
      Loading...
    </div>
  )
}

// Skeleton Loader
function SkeletonCard() {
  return (
    <div className="card skeleton-loader">
      <div className="skeleton-title" />
      <div className="skeleton-text" />
      <div className="skeleton-text" />
      <div className="skeleton-text" style={{ width: '60%' }} />
    </div>
  )
}

// Basic Lazy Loading
function BasicLazyExample() {
  const [show, setShow] = useState(false)

  return (
    <div className="card">
      <h3>1. Basic Lazy Loading</h3>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Load'} Component
      </button>
      {show && (
        <Suspense fallback={<LoadingSpinner />}>
          <HeavyComponent />
        </Suspense>
      )}
      <p className="info">✓ Component code is fetched only when needed</p>
    </div>
  )
}

// Multiple Suspense Boundaries
function MultipleBoundariesExample() {
  const [showChart, setShowChart] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  return (
    <div className="card">
      <h3>2. Multiple Suspense Boundaries</h3>
      <div className="button-group">
        <button onClick={() => setShowChart(!showChart)}>
          {showChart ? 'Hide' : 'Load'} Chart
        </button>
        <button onClick={() => setShowEditor(!showEditor)}>
          {showEditor ? 'Hide' : 'Load'} Editor
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        {showChart && (
          <Suspense fallback={<SkeletonCard />}>
            <LazyChart />
          </Suspense>
        )}
        {showEditor && (
          <Suspense fallback={<SkeletonCard />}>
            <LazyEditor />
          </Suspense>
        )}
      </div>
      <p className="info">✓ Each component loads independently</p>
    </div>
  )
}

// Route-based Code Splitting
function RouteBasedExample() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'dashboard' | 'settings'>('home')

  const HomePage = lazy(() => Promise.resolve({
    default: () => (
      <div className="card">
        <h3>🏠 Home Page</h3>
        <p>Welcome to the home page!</p>
      </div>
    )
  }))

  const DashboardPage = lazy(() => new Promise<{ default: ComponentType }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="card">
            <h3>📊 Dashboard Page</h3>
            <p>Heavy dashboard with charts and analytics</p>
          </div>
        )
      })
    }, 800)
  }))

  const SettingsPage = lazy(() => new Promise<{ default: ComponentType }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="card">
            <h3>⚙️ Settings Page</h3>
            <p>Settings and configuration</p>
          </div>
        )
      })
    }, 600)
  }))

  return (
    <div className="card">
      <h3>3. Route-Based Code Splitting</h3>
      <div className="button-group">
        <button
          onClick={() => setCurrentRoute('home')}
          style={{ background: currentRoute === 'home' ? '#646cff' : undefined }}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentRoute('dashboard')}
          style={{ background: currentRoute === 'dashboard' ? '#646cff' : undefined }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentRoute('settings')}
          style={{ background: currentRoute === 'settings' ? '#646cff' : undefined }}
        >
          Settings
        </button>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'dashboard' && <DashboardPage />}
        {currentRoute === 'settings' && <SettingsPage />}
      </Suspense>

      <p className="info">✓ Each route loads its own bundle on demand</p>
    </div>
  )
}

// Nested Suspense
function NestedSuspenseExample() {
  const [show, setShow] = useState(false)

  const OuterComponent = lazy(() => {
    return new Promise<{ default: ComponentType }>(resolve => {
      setTimeout(() => {
        resolve({
          default: () => {
            const InnerComponent = lazy(() => {
              return new Promise<{ default: ComponentType }>(resolve => {
                setTimeout(() => {
                  resolve({
                    default: () => (
                      <div style={{
                        padding: '1rem',
                        border: '2px solid #646cff',
                        borderRadius: '4px',
                        marginTop: '1rem'
                      }}>
                        <h4>Inner Component</h4>
                        <p>This loaded after the outer component</p>
                      </div>
                    )
                  })
                }, 800)
              })
            })

            return (
              <div className="card">
                <h4>Outer Component</h4>
                <p>Outer component loaded first</p>
                <Suspense fallback={<div style={{ padding: '1rem' }}>Loading inner...</div>}>
                  <InnerComponent />
                </Suspense>
              </div>
            )
          }
        })
      }, 1000)
    })
  })

  return (
    <div className="card">
      <h3>4. Nested Suspense</h3>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Load'} Nested Components
      </button>
      {show && (
        <Suspense fallback={<LoadingSpinner />}>
          <OuterComponent />
        </Suspense>
      )}
      <p className="info">✓ Cascading loading states</p>
    </div>
  )
}

// Error Handling with Lazy Loading
function ErrorHandlingExample() {
  const [show, setShow] = useState(false)
  const [hasError, setHasError] = useState(false)

  const FailingComponent = lazy(() => {
    return new Promise<{ default: ComponentType }>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Failed to load component'))
      }, 1000)
    })
  })

  const handleRetry = () => {
    setHasError(false)
    setShow(false)
    setTimeout(() => setShow(true), 100)
  }

  return (
    <div className="card">
      <h3>5. Error Handling</h3>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Load'} Failing Component
      </button>
      {show && !hasError && (
        <Suspense fallback={<LoadingSpinner />}>
          <FailingComponent />
        </Suspense>
      )}
      {hasError && (
        <div className="error-fallback">
          <h4>❌ Failed to load component</h4>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
      <p className="info">⚠️ This component intentionally fails to demonstrate error handling</p>
    </div>
  )
}

// Preloading
function PreloadingExample() {
  const [show, setShow] = useState(false)

  const PreloadableComponent = lazy(() => {
    return new Promise<{ default: ComponentType }>(resolve => {
      setTimeout(() => {
        resolve({
          default: () => (
            <div className="card">
              <h4>✓ Preloaded Component</h4>
              <p>This component was preloaded on hover!</p>
            </div>
          )
        })
      }, 800)
    })
  })

  const handleMouseEnter = () => {
    // Simulate preload
    console.log('Preload initiated on hover')
  }

  return (
    <div className="card">
      <h3>6. Preloading</h3>
      <button
        onClick={() => setShow(!show)}
        onMouseEnter={handleMouseEnter}
        style={{ position: 'relative' }}
      >
        {show ? 'Hide' : 'Show'} Component (hover to preload)
      </button>
      {show && (
        <Suspense fallback={<LoadingSpinner />}>
          <PreloadableComponent />
        </Suspense>
      )}
      <p className="info">✓ Hover button to preload, click to show (instant!)</p>
    </div>
  )
}

export default function CodeSplittingDemo() {
  return (
    <div className="example-container">
      <h2>Code Splitting & Lazy Loading</h2>
      <p className="subtitle">Load components on-demand to reduce initial bundle size</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <BasicLazyExample />
        <MultipleBoundariesExample />
        <RouteBasedExample />
        <NestedSuspenseExample />
        <ErrorHandlingExample />
        <PreloadingExample />
      </div>

      <div className="section">
        <h3>Bundle Size Comparison</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>❌ Without Code Splitting:</h4>
            <div style={{ fontSize: '2rem', margin: '1rem 0', color: '#f44336' }}>~500 KB</div>
            <ul>
              <li>All components in one bundle</li>
              <li>Long initial load time</li>
              <li>User waits for unused code</li>
            </ul>
          </div>
          <div className="card">
            <h4>✅ With Code Splitting:</h4>
            <div style={{ fontSize: '2rem', margin: '1rem 0', color: '#4caf50' }}>~100 KB</div>
            <ul>
              <li>Initial: 100 KB</li>
              <li>Chart: +80 KB (on demand)</li>
              <li>Editor: +120 KB (on demand)</li>
              <li>Settings: +40 KB (on demand)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Best Practices</h3>
        <div className="card">
          <ul style={{ textAlign: 'left' }}>
            <li><strong>Route-based splitting:</strong> Most impactful - split by pages/routes</li>
            <li><strong>Component-based splitting:</strong> Split heavy components (charts, editors, modals)</li>
            <li><strong>Suspense boundaries:</strong> Place strategically - not too granular, not too coarse</li>
            <li><strong>Loading states:</strong> Use meaningful fallbacks (spinners, skeletons)</li>
            <li><strong>Error boundaries:</strong> Wrap Suspense with error boundaries</li>
            <li><strong>Preloading:</strong> Preload on hover/focus for instant feel</li>
            <li><strong>Bundle analysis:</strong> Use webpack-bundle-analyzer to find heavy chunks</li>
          </ul>
        </div>
      </div>

      <div className="summary">
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>lazy():</strong> Dynamically import component only when needed</li>
          <li><strong>Suspense:</strong> Shows fallback UI while component loads</li>
          <li><strong>Code Splitting:</strong> Break bundle into smaller chunks</li>
          <li><strong>Dynamic Import:</strong> import() returns a promise</li>
          <li><strong>Webpack Magic Comments:</strong> /* webpackChunkName: "name" */</li>
          <li><strong>Network Waterfall:</strong> Be aware of loading sequences</li>
        </ul>
      </div>

      <div className="code-preview">
        <h4>Implementation:</h4>
        <pre>{`import { lazy, Suspense } from 'react'

// 1. Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// 2. Wrap with Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}

// 3. Route-based splitting (React Router)
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

<Routes>
  <Route path="/" element={
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  } />
  <Route path="/dashboard" element={
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  } />
</Routes>

// 4. Named exports
const { Chart } = lazy(() => 
  import('./components').then(module => ({
    default: module.Chart
  }))
)`}</pre>
      </div>

      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #646cff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .skeleton-loader {
          animation: pulse 1.5s ease-in-out infinite;
        }
        .skeleton-title {
          height: 24px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          margin-bottom: 1rem;
          width: 60%;
        }
        .skeleton-text {
          height: 16px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
