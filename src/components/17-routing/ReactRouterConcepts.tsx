import { useState } from 'react'

export default function ReactRouterConcepts() {
  const [activeDemo, setActiveDemo] = useState<string>('overview')

  return (
    <div className="example-container">
      <h2>🧭 React Router</h2>
      <p className="subtitle">Routing concepts, navigation patterns, and interview questions</p>

      <div className="demo-nav">
        <button onClick={() => setActiveDemo('overview')} className={activeDemo === 'overview' ? 'active' : ''}>
          Overview
        </button>
        <button onClick={() => setActiveDemo('basic')} className={activeDemo === 'basic' ? 'active' : ''}>
          Basic Routing
        </button>
        <button onClick={() => setActiveDemo('dynamic')} className={activeDemo === 'dynamic' ? 'active' : ''}>
          Dynamic Routes
        </button>
        <button onClick={() => setActiveDemo('nested')} className={activeDemo === 'nested' ? 'active' : ''}>
          Nested Routes
        </button>
        <button onClick={() => setActiveDemo('navigation')} className={activeDemo === 'navigation' ? 'active' : ''}>
          Navigation
        </button>
        <button onClick={() => setActiveDemo('hooks')} className={activeDemo === 'hooks' ? 'active' : ''}>
          Router Hooks
        </button>
        <button onClick={() => setActiveDemo('protection')} className={activeDemo === 'protection' ? 'active' : ''}>
          Route Protection
        </button>
        <button onClick={() => setActiveDemo('live-basic')} className={activeDemo === 'live-basic' ? 'active' : ''}>
          Live: Basic Router
        </button>
        <button onClick={() => setActiveDemo('live-nested')} className={activeDemo === 'live-nested' ? 'active' : ''}>
          Live: Nested Routes
        </button>
        <button onClick={() => setActiveDemo('live-protected')} className={activeDemo === 'live-protected' ? 'active' : ''}>
          Live: Protected Routes
        </button>
        <button onClick={() => setActiveDemo('interview')} className={activeDemo === 'interview' ? 'active' : ''}>
          Interview Q&A
        </button>
      </div>

      {activeDemo === 'overview' && <OverviewSection />}
      {activeDemo === 'basic' && <BasicRoutingSection />}
      {activeDemo === 'dynamic' && <DynamicRoutesSection />}
      {activeDemo === 'nested' && <NestedRoutesSection />}
      {activeDemo === 'navigation' && <NavigationSection />}
      {activeDemo === 'hooks' && <RouterHooksSection />}
      {activeDemo === 'protection' && <RouteProtectionSection />}
      {activeDemo === 'live-basic' && <LiveBasicRouterDemo />}
      {activeDemo === 'live-nested' && <LiveNestedRoutesDemo />}
      {activeDemo === 'live-protected' && <LiveProtectedRoutesDemo />}
      {activeDemo === 'interview' && <InterviewQASection />}
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="section">
      <h3>What is React Router?</h3>
      <p>
        React Router is the standard routing library for React. It enables navigation between views, 
        URL parameter handling, and maintains application state through browser history.
      </p>

      <div className="code-block">
        <h4>Installation:</h4>
        <pre>{`npm install react-router-dom`}</pre>
      </div>

      <div className="code-block">
        <h4>Key Concepts:</h4>
        <pre>{`• BrowserRouter - HTML5 history API wrapper
• Routes - Container for all Route components
• Route - Defines URL to component mapping
• Link/NavLink - Navigation components
• useNavigate - Programmatic navigation
• useParams - Access URL parameters
• useLocation - Access current location
• useSearchParams - Query string handling`}</pre>
      </div>

      <div className="code-block">
        <h4>React Router v6 Major Changes:</h4>
        <pre>{`• <Switch> → <Routes>
• <Route component={} /> → <Route element={} />
• useHistory() → useNavigate()
• Exact prop removed (default behavior)
• Nested routes simplified
• Relative routes and links
• Better TypeScript support`}</pre>
      </div>
    </div>
  )
}

function BasicRoutingSection() {
  return (
    <div className="section">
      <h3>Basic Routing Setup</h3>

      <div className="code-block">
        <h4>1. App Setup with BrowserRouter:</h4>
        <pre>{`import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

// * matches any unmatched routes (404 page)`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Navigation with Link:</h4>
        <pre>{`import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      {/* Basic Link */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      
      {/* NavLink - adds 'active' class to current route */}
      <NavLink 
        to="/contact"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Contact
      </NavLink>
    </nav>
  )
}`}</pre>
      </div>

      <div className="info-box">
        <h4>💡 Link vs a tag:</h4>
        <ul>
          <li><code>&lt;Link&gt;</code> - Prevents page reload, uses client-side routing</li>
          <li><code>&lt;a&gt;</code> - Full page reload, loses React state</li>
        </ul>
      </div>
    </div>
  )
}

function DynamicRoutesSection() {
  return (
    <div className="section">
      <h3>Dynamic Routes & URL Parameters</h3>

      <div className="code-block">
        <h4>1. Define Dynamic Route:</h4>
        <pre>{`import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Single parameter */}
      <Route path="/users/:userId" element={<UserProfile />} />
      
      {/* Multiple parameters */}
      <Route path="/posts/:postId/comments/:commentId" 
             element={<Comment />} />
      
      {/* Optional parameter with ? */}
      <Route path="/products/:category/:id?" 
             element={<Products />} />
    </Routes>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Access Parameters with useParams:</h4>
        <pre>{`import { useParams } from 'react-router-dom'

function UserProfile() {
  const { userId } = useParams<{ userId: string }>()
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
    </div>
  )
}

// Example URLs:
// /users/123 → userId = "123"
// /users/john → userId = "john"`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Query Parameters with useSearchParams:</h4>
        <pre>{`import { useSearchParams } from 'react-router-dom'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Read query params
  const sort = searchParams.get('sort') // ?sort=price
  const filter = searchParams.get('filter') // ?filter=new
  
  // Update query params
  const handleSort = (value: string) => {
    setSearchParams({ sort: value })
  }
  
  return (
    <div>
      <button onClick={() => handleSort('price')}>
        Sort by Price
      </button>
      <p>Current sort: {sort}</p>
    </div>
  )
}

// URL: /products?sort=price&filter=new
// sort = "price"
// filter = "new"`}</pre>
      </div>

      <div className="info-box">
        <h4>💡 URL Parameters vs Query Parameters:</h4>
        <ul>
          <li><strong>Path params</strong> (/users/:id) - Required, part of route definition</li>
          <li><strong>Query params</strong> (?sort=name) - Optional, not in route definition</li>
        </ul>
      </div>
    </div>
  )
}

function NestedRoutesSection() {
  return (
    <div className="section">
      <h3>Nested Routes</h3>

      <div className="code-block">
        <h4>1. Parent Route with Outlet:</h4>
        <pre>{`import { Routes, Route, Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Child routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="users" element={<Users />}>
          {/* Nested child routes */}
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  )
}

// Layout component with Outlet for child routes
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      <main>
        {/* Child routes render here */}
        <Outlet />
      </main>
    </div>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Nested Route Example:</h4>
        <pre>{`function Users() {
  return (
    <div>
      <h1>Users Page</h1>
      <nav>
        <Link to="/users">All Users</Link>
        <Link to="/users/1">User 1</Link>
        <Link to="/users/2">User 2</Link>
      </nav>
      {/* Nested routes render here */}
      <Outlet />
    </div>
  )
}

function UsersList() {
  return <div>List of all users...</div>
}

function UserProfile() {
  const { userId } = useParams()
  return <div>Profile for user {userId}</div>
}

// URL Matching:
// /users → Users + UsersList
// /users/1 → Users + UserProfile(1)
// /users/2 → Users + UserProfile(2)`}</pre>
      </div>

      <div className="info-box">
        <h4>💡 Index Routes:</h4>
        <p><code>&lt;Route index&gt;</code> renders when parent route matches exactly, without additional path segments.</p>
      </div>
    </div>
  )
}

function NavigationSection() {
  return (
    <div className="section">
      <h3>Programmatic Navigation</h3>

      <div className="code-block">
        <h4>1. useNavigate Hook:</h4>
        <pre>{`import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const success = await login()
    
    if (success) {
      // Navigate to dashboard
      navigate('/dashboard')
      
      // Navigate with replace (no back button)
      navigate('/dashboard', { replace: true })
      
      // Navigate back
      navigate(-1) // Go back 1 page
      navigate(-2) // Go back 2 pages
      
      // Navigate forward
      navigate(1)
    }
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Navigate with State:</h4>
        <pre>{`function ProductList() {
  const navigate = useNavigate()
  
  const viewProduct = (product: Product) => {
    // Pass state to next route
    navigate('/product', { 
      state: { product, from: '/products' }
    })
  }
  
  return <button onClick={() => viewProduct(item)}>View</button>
}

// Access state in destination component
function ProductDetail() {
  const location = useLocation()
  const { product, from } = location.state || {}
  
  return (
    <div>
      <h1>{product?.name}</h1>
      <Link to={from || '/'}>Back</Link>
    </div>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Redirect Component (v6):</h4>
        <pre>{`import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuth()
  
  if (!isAuthenticated) {
    // Redirect to login
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>`}</pre>
      </div>
    </div>
  )
}

function RouterHooksSection() {
  return (
    <div className="section">
      <h3>React Router Hooks</h3>

      <div className="code-block">
        <h4>1. useLocation - Current Location Info:</h4>
        <pre>{`import { useLocation } from 'react-router-dom'

function CurrentPath() {
  const location = useLocation()
  
  console.log(location.pathname)  // "/users/123"
  console.log(location.search)    // "?sort=name"
  console.log(location.hash)      // "#section1"
  console.log(location.state)     // { from: '/login' }
  console.log(location.key)       // "unique-key"
  
  return <div>Current: {location.pathname}</div>
}`}</pre>
      </div>

      <div className="code-block">
        <h4>2. useParams - URL Parameters:</h4>
        <pre>{`import { useParams } from 'react-router-dom'

// Route: /posts/:postId/comments/:commentId
function Comment() {
  const params = useParams<{
    postId: string
    commentId: string
  }>()
  
  return (
    <div>
      Post: {params.postId}
      Comment: {params.commentId}
    </div>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>3. useSearchParams - Query Strings:</h4>
        <pre>{`import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Get values
  const query = searchParams.get('q')
  const page = searchParams.get('page') || '1'
  
  // Set values
  const updateSearch = (value: string) => {
    setSearchParams({ q: value, page: '1' })
  }
  
  // Update single param
  const nextPage = () => {
    setSearchParams(prev => {
      prev.set('page', String(Number(page) + 1))
      return prev
    })
  }
  
  return <div>Search: {query}</div>
}`}</pre>
      </div>

      <div className="code-block">
        <h4>4. useNavigate - Programmatic Navigation:</h4>
        <pre>{`import { useNavigate } from 'react-router-dom'

function Actions() {
  const navigate = useNavigate()
  
  return (
    <>
      <button onClick={() => navigate('/home')}>
        Go Home
      </button>
      <button onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button onClick={() => navigate('/login', { replace: true })}>
        Logout (no history)
      </button>
    </>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>5. useMatch - Match Route Pattern:</h4>
        <pre>{`import { useMatch } from 'react-router-dom'

function Navigation() {
  const isUsersPage = useMatch('/users/*')
  const isSpecificUser = useMatch('/users/:userId')
  
  return (
    <nav>
      <Link 
        to="/users" 
        className={isUsersPage ? 'active' : ''}
      >
        Users {isUsersPage && '✓'}
      </Link>
    </nav>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>6. useRoutes - Routes as Objects:</h4>
        <pre>{`import { useRoutes } from 'react-router-dom'

function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    {
      path: '/users',
      element: <Users />,
      children: [
        { index: true, element: <UsersList /> },
        { path: ':userId', element: <UserProfile /> }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])
  
  return routes
}`}</pre>
      </div>
    </div>
  )
}

function RouteProtectionSection() {
  return (
    <div className="section">
      <h3>Protected Routes & Authentication</h3>

      <div className="code-block">
        <h4>1. Protected Route Component:</h4>
        <pre>{`import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: JSX.Element
  requiredRole?: string
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()
  
  if (!isAuthenticated) {
    // Redirect to login, save attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    // User doesn't have required role
    return <Navigate to="/unauthorized" replace />
  }
  
  return children
}

// Usage
<Routes>
  <Route path="/login" element={<Login />} />
  
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />
  
  <Route 
    path="/admin" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminPanel />
      </ProtectedRoute>
    } 
  />
</Routes>`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Login with Redirect Back:</h4>
        <pre>{`import { useNavigate, useLocation } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  
  // Get the page user tried to access
  const from = location.state?.from?.pathname || '/'
  
  const handleLogin = async (credentials: Credentials) => {
    const success = await login(credentials)
    
    if (success) {
      // Redirect back to attempted page
      navigate(from, { replace: true })
    }
  }
  
  return <form onSubmit={handleLogin}>...</form>
}`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Role-Based Routes:</h4>
        <pre>{`function App() {
  const { user } = useAuth()
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* User routes */}
      {user && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </>
      )}
      
      {/* Admin routes */}
      {user?.role === 'admin' && (
        <>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/users" element={<UserManagement />} />
        </>
      )}
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>4. Auth Context Example:</h4>
        <pre>{`// AuthContext.tsx
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is logged in
    checkAuth().then(setUser).finally(() => setLoading(false))
  }, [])
  
  const login = async (credentials: Credentials) => {
    const user = await loginApi(credentials)
    setUser(user)
    return true
  }
  
  const logout = () => {
    setUser(null)
    logoutApi()
  }
  
  if (loading) return <Loading />
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be within AuthProvider')
  return context
}`}</pre>
      </div>
    </div>
  )
}

function InterviewQASection() {
  return (
    <div className="section">
      <h3>🎯 React Router Interview Questions</h3>

      <div className="qa-block">
        <h4>Q1: What is React Router and why use it?</h4>
        <p><strong>Answer:</strong></p>
        <p>
          React Router is a routing library for React that enables navigation between views, 
          manages browser history, and keeps UI in sync with URL. Without it, you'd need to 
          manually handle browser history API and URL changes.
        </p>
        <p><strong>Benefits:</strong></p>
        <ul>
          <li>Client-side routing (no page reload)</li>
          <li>URL-based navigation and deep linking</li>
          <li>Browser history management</li>
          <li>Nested routing support</li>
          <li>Code splitting with lazy loading</li>
        </ul>
      </div>

      <div className="qa-block">
        <h4>Q2: What's the difference between BrowserRouter and HashRouter?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// BrowserRouter
// URLs: https://app.com/about
// Uses HTML5 History API (pushState)
// Requires server configuration for deep links
// Clean URLs, SEO friendly

<BrowserRouter>
  <App />
</BrowserRouter>

// HashRouter
// URLs: https://app.com/#/about
// Uses URL hash (#)
// Works without server configuration
// Not ideal for SEO

<HashRouter>
  <App />
</HashRouter>`}</pre>
        <p><strong>When to use HashRouter:</strong> Static hosting (GitHub Pages), no server control</p>
      </div>

      <div className="qa-block">
        <h4>Q3: Difference between Link and NavLink?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// Link - Basic navigation
<Link to="/about">About</Link>

// NavLink - Knows if route is active
<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
  style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}
>
  About
</NavLink>`}</pre>
        <p>
          <strong>NavLink</strong> provides <code>isActive</code> prop to style active links, 
          useful for navigation menus to highlight current page.
        </p>
      </div>

      <div className="qa-block">
        <h4>Q4: How to handle 404 (Not Found) pages?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  
  {/* Catch all unmatched routes */}
  <Route path="*" element={<NotFound />} />
</Routes>

function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  )
}`}</pre>
        <p><code>path="*"</code> matches any route not matched by previous routes.</p>
      </div>

      <div className="qa-block">
        <h4>Q5: How to implement protected/private routes?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  if (!isAuthenticated) {
    // Save attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q6: Difference between useNavigate and Navigate component?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// useNavigate - Hook for programmatic navigation
function Button() {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/home')}>Go</button>
}

// Navigate - Component for declarative redirects
function ProtectedRoute({ children }) {
  const isAuth = useAuth()
  return isAuth ? children : <Navigate to="/login" replace />
}`}</pre>
        <p>
          <strong>useNavigate:</strong> Use in event handlers, effects (programmatic)<br/>
          <strong>Navigate:</strong> Use for conditional rendering (declarative)
        </p>
      </div>

      <div className="qa-block">
        <h4>Q7: How to pass data between routes?</h4>
        <p><strong>Answer:</strong></p>
        <p><strong>Method 1: URL Parameters</strong></p>
        <pre>{`// Send
<Link to="/user/123">User Profile</Link>

// Receive
const { userId } = useParams()`}</pre>

        <p><strong>Method 2: Query Parameters</strong></p>
        <pre>{`// Send
<Link to="/search?q=react&page=1">Search</Link>

// Receive
const [searchParams] = useSearchParams()
const query = searchParams.get('q')`}</pre>

        <p><strong>Method 3: State (not in URL)</strong></p>
        <pre>{`// Send
navigate('/profile', { state: { user: userData } })

// Receive
const location = useLocation()
const user = location.state?.user`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q8: What are nested routes? How to implement them?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// Parent route with Outlet
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    
    {/* Nested routes */}
    <Route path="users" element={<Users />}>
      <Route index element={<UsersList />} />
      <Route path=":userId" element={<UserProfile />} />
    </Route>
  </Route>
</Routes>

// Layout component
function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Child routes render here */}
    </div>
  )
}

// Users component
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Outlet /> {/* Nested child routes render here */}
    </div>
  )
}`}</pre>
        <p><code>&lt;Outlet /&gt;</code> is a placeholder where child routes are rendered.</p>
      </div>

      <div className="qa-block">
        <h4>Q9: How to implement breadcrumbs navigation?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`function Breadcrumbs() {
  const location = useLocation()
  
  // Split pathname into segments
  const paths = location.pathname.split('/').filter(x => x)
  
  return (
    <nav>
      <Link to="/">Home</Link>
      {paths.map((path, index) => {
        const to = \`/\${paths.slice(0, index + 1).join('/')}\`
        const isLast = index === paths.length - 1
        
        return (
          <span key={to}>
            {' / '}
            {isLast ? (
              <span>{path}</span>
            ) : (
              <Link to={to}>{path}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

// URL: /users/123/posts
// Renders: Home / users / 123 / posts`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q10: How to prevent navigation (e.g., unsaved changes)?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// React Router v6 doesn't have built-in support
// Use browser's beforeunload event

function FormWithUnsavedChanges() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const navigate = useNavigate()
  
  // Prevent browser navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])
  
  // Custom navigation handler
  const handleNavigation = (to: string) => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Leave anyway?')
      if (!confirm) return
    }
    navigate(to)
  }
  
  return <form onChange={() => setHasUnsavedChanges(true)}>...</form>
}`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q11: How to implement code splitting with React Router?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Lazy load components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}

// Each route component is in a separate bundle
// Only loads when user navigates to that route`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q12: What's the difference between replace and push in navigation?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// Push (default) - Adds to history stack
navigate('/dashboard')
// User can go back with browser back button

// Replace - Replaces current entry
navigate('/dashboard', { replace: true })
// User cannot go back to previous page

// Use cases for replace:
// 1. After successful login
// 2. Redirects
// 3. After form submission
// 4. Replacing temporary/intermediate pages`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q13: How to scroll to top on route change?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

// Usage in App
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>...</Routes>
    </BrowserRouter>
  )
}`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q14: How to implement a "Go Back" button?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()
  
  return (
    <button onClick={() => navigate(-1)}>
      ← Go Back
    </button>
  )
}

// navigate(-1) - Back 1 page
// navigate(-2) - Back 2 pages
// navigate(1) - Forward 1 page`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q15: How to handle route-based authentication?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// 1. Create auth context
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  
  const login = async (credentials: Credentials) => {
    const user = await loginAPI(credentials)
    setUser(user)
  }
  
  const logout = () => setUser(null)
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 2. Protected route wrapper
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

// 3. App routes
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  )
}`}</pre>
      </div>

      <div className="info-box">
        <h4>💡 Key Takeaways:</h4>
        <ul>
          <li>Use BrowserRouter for clean URLs</li>
          <li>Link prevents page reload, maintains React state</li>
          <li>useParams for path parameters, useSearchParams for query strings</li>
          <li>Outlet for nested routes</li>
          <li>Navigate component for redirects, useNavigate for programmatic navigation</li>
          <li>Wrap protected routes with authentication check</li>
          <li>Use lazy loading for code splitting</li>
          <li>path="*" for 404 pages</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// LIVE DEMO 1: Basic Router with Navigation
// ============================================

import { MemoryRouter, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom'

function LiveBasicRouterDemo() {
  return (
    <div className="section">
      <h3>Live Demo: Basic Router & Navigation</h3>
      <p>A working router example with multiple routes and navigation.</p>
      
      <div className="demo-box" style={{ padding: '1rem', border: '2px solid #646cff' }}>
        <MemoryRouter initialEntries={['/']}>
          <BasicRouterApp />
        </MemoryRouter>
      </div>

      <div className="code-block" style={{ marginTop: '1rem' }}>
        <h4>Code:</h4>
        <pre>{`import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}`}</pre>
      </div>
    </div>
  )
}

function BasicRouterApp() {
  const location = useLocation()
  
  return (
    <div>
      <nav style={{ 
        padding: '1rem', 
        background: '#f5f5f5', 
        borderRadius: '4px',
        marginBottom: '1rem',
        display: 'flex',
        gap: '1rem',
        color: '#333'
      }}>
        <Link to="/" style={{ 
          padding: '0.5rem 1rem',
          background: location.pathname === '/' ? '#646cff' : '#fff',
          color: location.pathname === '/' ? '#fff' : '#646cff',
          textDecoration: 'none',
          borderRadius: '4px',
          border: '1px solid #646cff'
        }}>
          Home
        </Link>
        <Link to="/about" style={{ 
          padding: '0.5rem 1rem',
          background: location.pathname === '/about' ? '#646cff' : '#fff',
          color: location.pathname === '/about' ? '#fff' : '#646cff',
          textDecoration: 'none',
          borderRadius: '4px',
          border: '1px solid #646cff'
        }}>
          About
        </Link>
        <Link to="/contact" style={{ 
          padding: '0.5rem 1rem',
          background: location.pathname === '/contact' ? '#646cff' : '#fff',
          color: location.pathname === '/contact' ? '#fff' : '#646cff',
          textDecoration: 'none',
          borderRadius: '4px',
          border: '1px solid #646cff'
        }}>
          Contact
        </Link>
        <Link to="/users/42" style={{ 
          padding: '0.5rem 1rem',
          background: location.pathname.startsWith('/users') ? '#646cff' : '#fff',
          color: location.pathname.startsWith('/users') ? '#fff' : '#646cff',
          textDecoration: 'none',
          borderRadius: '4px',
          border: '1px solid #646cff'
        }}>
          User Profile
        </Link>
      </nav>

      <div style={{ padding: '1rem', background: '#1a1a1a', borderRadius: '4px', minHeight: '150px' }}>
        <div style={{ marginBottom: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
          Current Path: <code style={{ color: '#646cff' }}>{location.pathname}</code>
        </div>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/users/:userId" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div>
      <h3>🏠 Home Page</h3>
      <p>Welcome to the home page! Click the navigation links above to explore.</p>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <h3>ℹ️ About Page</h3>
      <p>This is the about page with information about our app.</p>
    </div>
  )
}

function ContactPage() {
  const navigate = useNavigate()
  
  return (
    <div>
      <h3>📧 Contact Page</h3>
      <p>Get in touch with us!</p>
      <button 
        onClick={() => navigate('/')}
        style={{ marginTop: '0.5rem' }}
      >
        Go Home (Programmatic Navigation)
      </button>
    </div>
  )
}

function UserProfilePage() {
  const { userId } = useParams()
  const navigate = useNavigate()
  
  return (
    <div>
      <h3>👤 User Profile</h3>
      <p>Viewing profile for user ID: <strong>{userId}</strong></p>
      <p>This is a dynamic route using URL parameters!</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button onClick={() => navigate('/users/1')}>User 1</button>
        <button onClick={() => navigate('/users/2')}>User 2</button>
        <button onClick={() => navigate('/users/100')}>User 100</button>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div>
      <h3>❌ 404 - Page Not Found</h3>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}

// ============================================
// LIVE DEMO 2: Nested Routes with Outlet
// ============================================

import { Outlet } from 'react-router-dom'

function LiveNestedRoutesDemo() {
  return (
    <div className="section">
      <h3>Live Demo: Nested Routes</h3>
      <p>Dashboard with nested routes using Outlet component.</p>
      
      <div className="demo-box" style={{ padding: '1rem', border: '2px solid #646cff' }}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<DashboardProfile />} />
              <Route path="settings" element={<DashboardSettings />} />
              <Route path="posts" element={<DashboardPosts />} />
              <Route path="posts/:postId" element={<DashboardPost />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </div>

      <div className="code-block" style={{ marginTop: '1rem' }}>
        <h4>Code:</h4>
        <pre>{`import { Outlet, Link } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      
      {/* Child routes render here */}
      <Outlet />
    </div>
  )
}

// In App.tsx
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<DashboardProfile />} />
    <Route path="settings" element={<DashboardSettings />} />
  </Route>
</Routes>`}</pre>
      </div>
    </div>
  )
}

function DashboardLayout() {
  const location = useLocation()
  
  return (
    <div>
      <div style={{ 
        padding: '1rem', 
        background: '#f5f5f5', 
        borderRadius: '4px',
        marginBottom: '1rem',
        color: '#333'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>📊 Dashboard</h3>
        <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/dashboard" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname === '/dashboard' ? '#646cff' : '#fff',
            color: location.pathname === '/dashboard' ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Home
          </Link>
          <Link to="/dashboard/profile" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname === '/dashboard/profile' ? '#646cff' : '#fff',
            color: location.pathname === '/dashboard/profile' ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Profile
          </Link>
          <Link to="/dashboard/settings" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname === '/dashboard/settings' ? '#646cff' : '#fff',
            color: location.pathname === '/dashboard/settings' ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Settings
          </Link>
          <Link to="/dashboard/posts" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname.startsWith('/dashboard/posts') ? '#646cff' : '#fff',
            color: location.pathname.startsWith('/dashboard/posts') ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Posts
          </Link>
        </nav>
      </div>

      <div style={{ padding: '1rem', background: '#1a1a1a', borderRadius: '4px', minHeight: '150px' }}>
        <div style={{ marginBottom: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
          Nested Route: <code style={{ color: '#646cff' }}>{location.pathname}</code>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

function DashboardHome() {
  return (
    <div>
      <h4>Dashboard Home</h4>
      <p>Welcome to your dashboard! Select a section from the navigation above.</p>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '4px' }}>
        <h5>Quick Stats</h5>
        <ul style={{ color: '#aaa' }}>
          <li>Total Posts: 42</li>
          <li>Profile Views: 1,234</li>
          <li>Last Login: Today</li>
        </ul>
      </div>
    </div>
  )
}

function DashboardProfile() {
  return (
    <div>
      <h4>👤 User Profile</h4>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '4px' }}>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Role:</strong> Developer</p>
        <p><strong>Member Since:</strong> 2024</p>
      </div>
    </div>
  )
}

function DashboardSettings() {
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState(true)
  
  return (
    <div>
      <h4>⚙️ Settings</h4>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '4px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Theme:</label>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', background: '#1a1a1a', color: '#fff', border: '1px solid #646cff' }}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="checkbox" 
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
      </div>
    </div>
  )
}

function DashboardPosts() {
  const navigate = useNavigate()
  const posts = [
    { id: 1, title: 'Getting Started with React Router' },
    { id: 2, title: 'Understanding Nested Routes' },
    { id: 3, title: 'Dynamic Route Parameters' },
  ]
  
  return (
    <div>
      <h4>📝 Blog Posts</h4>
      <div style={{ marginTop: '1rem' }}>
        {posts.map(post => (
          <div 
            key={post.id}
            onClick={() => navigate(`/dashboard/posts/${post.id}`)}
            style={{ 
              padding: '1rem', 
              background: '#2a2a2a', 
              borderRadius: '4px',
              marginBottom: '0.5rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#3a3a3a'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#2a2a2a'}
          >
            <strong>{post.title}</strong>
            <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Post ID: {post.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardPost() {
  const { postId } = useParams()
  const navigate = useNavigate()
  
  return (
    <div>
      <button 
        onClick={() => navigate('/dashboard/posts')}
        style={{ marginBottom: '1rem' }}
      >
        ← Back to Posts
      </button>
      <h4>📄 Post Details</h4>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '4px' }}>
        <p><strong>Post ID:</strong> {postId}</p>
        <p style={{ marginTop: '1rem', color: '#aaa' }}>
          This is the content for post {postId}. Notice how the URL parameter
          changes when you navigate between different posts!
        </p>
      </div>
    </div>
  )
}

// ============================================
// LIVE DEMO 3: Protected Routes & Auth
// ============================================

import { createContext, useContext, ReactNode } from 'react'

interface AuthContextType {
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

function LiveProtectedRoutesDemo() {
  return (
    <div className="section">
      <h3>Live Demo: Protected Routes & Authentication</h3>
      <p>Login to access protected routes. Try navigating without logging in!</p>
      
      <div className="demo-box" style={{ padding: '1rem', border: '2px solid #646cff' }}>
        <MemoryRouter initialEntries={['/']}>
          <AuthProviderDemo>
            <ProtectedRoutesApp />
          </AuthProviderDemo>
        </MemoryRouter>
      </div>

      <div className="code-block" style={{ marginTop: '1rem' }}>
        <h4>Code:</h4>
        <pre>{`import { Navigate } from 'react-router-dom'

// Protected Route Component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Usage in Routes
<Routes>
  <Route path="/login" element={<Login />} />
  <Route 
    path="/admin" 
    element={
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    } 
  />
</Routes>`}</pre>
      </div>
    </div>
  )
}

function AuthProviderDemo({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  
  const login = (username: string) => setUser(username)
  const logout = () => setUser(null)
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function ProtectedRoutesApp() {
  const location = useLocation()
  const { user } = useAuth()
  
  return (
    <div>
      <div style={{ 
        padding: '1rem', 
        background: '#f5f5f5', 
        borderRadius: '4px',
        marginBottom: '1rem',
        color: '#333'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: '#333' }}>🔐 Protected Routes Demo</h3>
          {user && (
            <div style={{ fontSize: '0.9rem', color: '#333' }}>
              Logged in as: <strong>{user}</strong>
            </div>
          )}
        </div>
        <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname === '/' ? '#646cff' : '#fff',
            color: location.pathname === '/' ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Home
          </Link>
          <Link to="/login" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname === '/login' ? '#646cff' : '#fff',
            color: location.pathname === '/login' ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Login
          </Link>
          <Link to="/admin" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname === '/admin' ? '#646cff' : '#fff',
            color: location.pathname === '/admin' ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Admin (Protected)
          </Link>
          <Link to="/profile" style={{ 
            padding: '0.5rem 1rem',
            background: location.pathname === '/profile' ? '#646cff' : '#fff',
            color: location.pathname === '/profile' ? '#fff' : '#646cff',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #646cff',
            fontSize: '0.9rem'
          }}>
            Profile (Protected)
          </Link>
        </nav>
      </div>

      <div style={{ padding: '1rem', background: '#1a1a1a', borderRadius: '4px', minHeight: '200px' }}>
        <div style={{ marginBottom: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
          Current Path: <code style={{ color: '#646cff' }}>{location.pathname}</code>
        </div>
        
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()
  
  if (!user) {
    return (
      <div>
        <h4>🔒 Access Denied</h4>
        <p>You must be logged in to view this page.</p>
        <Link to="/login" state={{ from: location.pathname }} style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#646cff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Go to Login
        </Link>
      </div>
    )
  }
  
  return children
}

function PublicHome() {
  const { user } = useAuth()
  
  return (
    <div>
      <h4>🏠 Public Home Page</h4>
      <p>This page is accessible to everyone!</p>
      {user ? (
        <p style={{ color: '#4ade80', marginTop: '1rem' }}>
          ✓ You are logged in as <strong>{user}</strong>
        </p>
      ) : (
        <p style={{ color: '#fbbf24', marginTop: '1rem' }}>
          ⚠️ You are not logged in. Try accessing protected routes!
        </p>
      )}
    </div>
  )
}

function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  
  const from = (location.state as any)?.from || '/admin'
  
  if (user) {
    return (
      <div>
        <h4>✅ Already Logged In</h4>
        <p>You are logged in as <strong>{user}</strong></p>
        <button onClick={() => navigate(from)}>
          Continue to {from}
        </button>
      </div>
    )
  }
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      login(username.trim())
      navigate(from, { replace: true })
    }
  }
  
  return (
    <div>
      <h4>🔐 Login Page</h4>
      <form onSubmit={handleLogin} style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{
              padding: '0.5rem',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '4px',
              border: '1px solid #646cff',
              background: '#1a1a1a',
              color: '#fff'
            }}
          />
        </div>
        <button type="submit" disabled={!username.trim()}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
        Tip: Enter any username to login
      </p>
    </div>
  )
}

function AdminPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <div>
      <h4>⚙️ Admin Panel</h4>
      <p>Welcome to the admin panel, <strong>{user}</strong>!</p>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '4px' }}>
        <h5>Admin Tools</h5>
        <ul style={{ color: '#aaa' }}>
          <li>User Management</li>
          <li>System Settings</li>
          <li>Analytics Dashboard</li>
          <li>Content Moderation</li>
        </ul>
      </div>
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Logout
      </button>
    </div>
  )
}

function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  return (
    <div>
      <h4>👤 User Profile</h4>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '4px' }}>
        <p><strong>Username:</strong> {user}</p>
        <p><strong>Email:</strong> {user}@example.com</p>
        <p><strong>Role:</strong> User</p>
        <p><strong>Status:</strong> <span style={{ color: '#4ade80' }}>Active</span></p>
      </div>
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Logout
      </button>
    </div>
  )
}
