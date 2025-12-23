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
