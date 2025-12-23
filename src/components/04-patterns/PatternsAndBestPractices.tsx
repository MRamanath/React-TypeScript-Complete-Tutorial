import { Component, ComponentType, useState, useCallback, useMemo, memo, createContext, useContext } from 'react'
import type { ReactNode } from 'react'

// ===========================
// 1. HIGHER-ORDER COMPONENTS (HOC)
// ===========================

// HOC that adds loading functionality
interface WithLoadingProps {
  isLoading: boolean
}

function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithLoadingProps> {
  return (props: P & WithLoadingProps) => {
    const { isLoading, ...restProps } = props
    
    if (isLoading) {
      return <div className="card">Loading...</div>
    }
    
    return <WrappedComponent {...(restProps as P)} />
  }
}

// HOC that adds authentication check
interface WithAuthProps {
  isAuthenticated: boolean
}

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithAuthProps> {
  return (props: P & WithAuthProps) => {
    const { isAuthenticated, ...restProps } = props
    
    if (!isAuthenticated) {
      return <div className="error">Please log in to access this content</div>
    }
    
    return <WrappedComponent {...(restProps as P)} />
  }
}

interface DataDisplayProps {
  data: string[]
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  return (
    <div className="card">
      <h4>Data Display</h4>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const DataDisplayWithLoading = withLoading(DataDisplay)
const DataDisplayWithAuth = withAuth(DataDisplay)

const HOCExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const data = ['Item 1', 'Item 2', 'Item 3']

  return (
    <div className="example">
      <h4>Higher-Order Components Example</h4>
      
      <div>
        <button onClick={() => setIsLoading(!isLoading)}>
          Toggle Loading
        </button>
        <DataDisplayWithLoading data={data} isLoading={isLoading} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
          Toggle Auth
        </button>
        <DataDisplayWithAuth data={data} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  )
}

// ===========================
// 2. RENDER PROPS PATTERN
// ===========================

interface MousePosition {
  x: number
  y: number
}

interface MouseTrackerProps {
  render: (position: MousePosition) => ReactNode
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      style={{ 
        border: '2px solid #646cff', 
        padding: '2rem',
        minHeight: '200px',
        borderRadius: '8px'
      }}
    >
      {render(position)}
    </div>
  )
}

// Alternative: children as function
interface DataFetcherProps {
  children: (data: { loading: boolean; data: string[] }) => ReactNode
}

const DataFetcher: React.FC<DataFetcherProps> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<string[]>([])

  useState(() => {
    setTimeout(() => {
      setData(['Data 1', 'Data 2', 'Data 3'])
      setLoading(false)
    }, 1000)
  })

  return <>{children({ loading, data })}</>
}

const RenderPropsExample: React.FC = () => {
  return (
    <div className="example">
      <h4>Render Props Pattern Example</h4>
      
      <MouseTracker
        render={({ x, y }) => (
          <div>
            <h5>Move your mouse here!</h5>
            <p>Mouse position: ({x}, {y})</p>
          </div>
        )}
      />

      <div style={{ marginTop: '1rem' }}>
        <DataFetcher>
          {({ loading, data }) => (
            loading ? (
              <p>Loading data...</p>
            ) : (
              <ul>
                {data.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )
          )}
        </DataFetcher>
      </div>
    </div>
  )
}

// ===========================
// 3. COMPOUND COMPONENTS PATTERN
// ===========================

interface TabsContextType {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

const Tabs: React.FC<{ children: ReactNode; defaultTab: string }> & {
  Tab: typeof Tab
  Panel: typeof Panel
} = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="card">{children}</div>
    </TabsContext.Provider>
  )
}

const Tab: React.FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === id

  return (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        backgroundColor: isActive ? '#646cff' : '#2a2a2a',
        borderBottom: isActive ? '3px solid #ffd700' : 'none'
      }}
    >
      {children}
    </button>
  )
}

const Panel: React.FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Panel must be used within Tabs')

  const { activeTab } = context
  if (activeTab !== id) return null

  return <div style={{ padding: '1rem' }}>{children}</div>
}

Tabs.Tab = Tab
Tabs.Panel = Panel

const CompoundComponentsExample: React.FC = () => {
  return (
    <div className="example">
      <h4>Compound Components Pattern Example</h4>
      
      <Tabs defaultTab="tab1">
        <div>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
          <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
        </div>
        
        <Tabs.Panel id="tab1">
          <h5>Tab 1 Content</h5>
          <p>This is the content for tab 1</p>
        </Tabs.Panel>
        
        <Tabs.Panel id="tab2">
          <h5>Tab 2 Content</h5>
          <p>This is the content for tab 2</p>
        </Tabs.Panel>
        
        <Tabs.Panel id="tab3">
          <h5>Tab 3 Content</h5>
          <p>This is the content for tab 3</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

// ===========================
// 4. CONTAINER/PRESENTATIONAL PATTERN
// ===========================

// Presentational Component (Pure UI)
interface UserListProps {
  users: Array<{ id: number; name: string; email: string }>
  onUserClick: (id: number) => void
}

const UserList: React.FC<UserListProps> = memo(({ users, onUserClick }) => {
  console.log('UserList rendered')
  
  return (
    <div>
      {users.map(user => (
        <div
          key={user.id}
          className="card"
          onClick={() => onUserClick(user.id)}
          style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
        >
          <h5>{user.name}</h5>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
})

UserList.displayName = 'UserList'

// Container Component (Logic)
const UserListContainer: React.FC = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ])

  const handleUserClick = useCallback((id: number) => {
    alert(`Clicked user with ID: ${id}`)
  }, [])

  return <UserList users={users} onUserClick={handleUserClick} />
}

const ContainerPresentationalExample: React.FC = () => {
  return (
    <div className="example">
      <h4>Container/Presentational Pattern Example</h4>
      <UserListContainer />
    </div>
  )
}

// ===========================
// 5. CUSTOM HOOKS PATTERN
// ===========================

// Custom hook for form handling
interface FormValues {
  [key: string]: string
}

function useForm(initialValues: FormValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormValues>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (validationRules: { [key: string]: (value: string) => string | null }) => {
    const newErrors: FormValues = {}
    
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key](values[key])
      if (error) {
        newErrors[key] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, validate, reset }
}

// Custom hook for API calls
function useAPI<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

const CustomHooksPatternExample: React.FC = () => {
  const form = useForm({ username: '', email: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const isValid = form.validate({
      username: (value) => !value ? 'Username is required' : null,
      email: (value) => !value ? 'Email is required' : 
             !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : null
    })

    if (isValid) {
      alert(`Form submitted: ${JSON.stringify(form.values)}`)
      form.reset()
    }
  }

  return (
    <div className="example">
      <h4>Custom Hooks Pattern Example</h4>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            value={form.values.username}
            onChange={form.handleChange}
            placeholder="Username"
          />
          {form.errors.username && (
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{form.errors.username}</p>
          )}
        </div>
        
        <div>
          <input
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            placeholder="Email"
          />
          {form.errors.email && (
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{form.errors.email}</p>
          )}
        </div>
        
        <button type="submit">Submit</button>
        <button type="button" onClick={form.reset}>Reset</button>
      </form>
    </div>
  )
}

// ===========================
// 6. PERFORMANCE OPTIMIZATION
// ===========================

// React.memo example
const ExpensiveComponent = memo<{ data: number[] }>(({ data }) => {
  console.log('ExpensiveComponent rendered')
  
  // Simulate expensive computation
  const sum = data.reduce((acc, val) => acc + val, 0)
  
  return (
    <div className="card">
      <h5>Expensive Component (memoized)</h5>
      <p>Sum: {sum}</p>
    </div>
  )
})

ExpensiveComponent.displayName = 'ExpensiveComponent'

const PerformanceExample: React.FC = () => {
  const [count, setCount] = useState(0)
  const [data] = useState([1, 2, 3, 4, 5])

  // Memoized calculation
  const expensiveCalculation = useMemo(() => {
    console.log('Running expensive calculation...')
    return data.reduce((acc, val) => acc + val ** 2, 0)
  }, [data])

  // Memoized callback
  const handleClick = useCallback(() => {
    console.log('Button clicked')
  }, [])

  return (
    <div className="example">
      <h4>Performance Optimization Example</h4>
      
      <div>
        <p>Count (changing): {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Expensive calculation (memoized): {expensiveCalculation}</p>
      </div>

      <ExpensiveComponent data={data} />
      
      <button onClick={handleClick}>Memoized Handler</button>
      
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}>
        Check console - ExpensiveComponent only re-renders when data changes,
        not when count changes
      </p>
    </div>
  )
}

// ===========================
// 7. COMPOSITION PATTERN
// ===========================

interface BoxProps {
  children: ReactNode
  title?: string
}

const Box: React.FC<BoxProps> = ({ children, title }) => {
  return (
    <div className="card">
      {title && <h5>{title}</h5>}
      {children}
    </div>
  )
}

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: variant === 'primary' ? '#646cff' : '#747bff'
      }}
    >
      {children}
    </button>
  )
}

const CompositionExample: React.FC = () => {
  return (
    <div className="example">
      <h4>Composition Pattern Example</h4>
      
      <Box title="User Actions">
        <p>Compose small, reusable components</p>
        <Button onClick={() => alert('Primary')}>Primary Action</Button>
        <Button onClick={() => alert('Secondary')} variant="secondary">
          Secondary Action
        </Button>
      </Box>

      <Box>
        <p>Box without title</p>
        <Box title="Nested Box">
          <p>Components can be composed infinitely</p>
        </Box>
      </Box>
    </div>
  )
}

// ===========================
// 8. STATE REDUCER PATTERN
// ===========================

type ToggleState = { on: boolean }
type ToggleAction = 
  | { type: 'TOGGLE' }
  | { type: 'SET_ON' }
  | { type: 'SET_OFF' }
  | { type: 'RESET' }

function toggleReducer(state: ToggleState, action: ToggleAction): ToggleState {
  switch (action.type) {
    case 'TOGGLE':
      return { on: !state.on }
    case 'SET_ON':
      return { on: true }
    case 'SET_OFF':
      return { on: false }
    case 'RESET':
      return { on: false }
    default:
      return state
  }
}

function useToggle(initialState = false) {
  const [state, dispatch] = useState<ToggleState>({ on: initialState })

  const toggle = useCallback(() => dispatch({ type: 'TOGGLE' } as any), [])
  const setOn = useCallback(() => dispatch({ type: 'SET_ON' } as any), [])
  const setOff = useCallback(() => dispatch({ type: 'SET_OFF' } as any), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' } as any), [])

  return { on: state.on, toggle, setOn, setOff, reset }
}

const StateReducerExample: React.FC = () => {
  const toggle = useToggle()

  return (
    <div className="example">
      <h4>State Reducer Pattern Example</h4>
      <p>Toggle is: {toggle.on ? 'ON' : 'OFF'}</p>
      <button onClick={toggle.toggle}>Toggle</button>
      <button onClick={toggle.setOn}>Set ON</button>
      <button onClick={toggle.setOff}>Set OFF</button>
      <button onClick={toggle.reset}>Reset</button>
    </div>
  )
}

// ===========================
// MAIN COMPONENT
// ===========================

const PatternsAndBestPractices: React.FC = () => {
  return (
    <div className="section">
      <h2>Chapter 4: Patterns & Best Practices</h2>

      <div className="section">
        <h3>4.1 Higher-Order Components (HOC)</h3>
        <p>Function that takes a component and returns a new component with enhanced functionality.</p>
        <HOCExample />
      </div>

      <div className="section">
        <h3>4.2 Render Props</h3>
        <p>Technique for sharing code using a prop whose value is a function.</p>
        <RenderPropsExample />
      </div>

      <div className="section">
        <h3>4.3 Compound Components</h3>
        <p>Pattern for creating components that work together to form a complete UI.</p>
        <CompoundComponentsExample />
      </div>

      <div className="section">
        <h3>4.4 Container/Presentational</h3>
        <p>Separate logic (container) from presentation (UI components).</p>
        <ContainerPresentationalExample />
      </div>

      <div className="section">
        <h3>4.5 Custom Hooks Pattern</h3>
        <p>Extract reusable logic into custom hooks.</p>
        <CustomHooksPatternExample />
      </div>

      <div className="section">
        <h3>4.6 Performance Optimization</h3>
        <p>Use React.memo, useMemo, and useCallback to optimize rendering.</p>
        <PerformanceExample />
      </div>

      <div className="section">
        <h3>4.7 Composition</h3>
        <p>Build complex UIs from simple, reusable components.</p>
        <CompositionExample />
      </div>

      <div className="section">
        <h3>4.8 State Reducer Pattern</h3>
        <p>Give users more control over component state management.</p>
        <StateReducerExample />
      </div>

      <div className="section" style={{ backgroundColor: '#2a2a2a' }}>
        <h3>📝 Interview Questions</h3>
        <ul>
          <li><strong>Q:</strong> What are Higher-Order Components?</li>
          <li><strong>A:</strong> Functions that take a component and return a new enhanced component. Used for code reuse and logic sharing.</li>
          
          <li><strong>Q:</strong> Render Props vs HOC?</li>
          <li><strong>A:</strong> Both share logic, but render props are more flexible and avoid wrapper hell. Hooks are now preferred.</li>
          
          <li><strong>Q:</strong> What is the Compound Components pattern?</li>
          <li><strong>A:</strong> Components that work together sharing implicit state, providing flexible and expressive APIs.</li>
          
          <li><strong>Q:</strong> When to use React.memo?</li>
          <li><strong>A:</strong> When a component renders often with same props, or renders are expensive.</li>
          
          <li><strong>Q:</strong> Difference between useMemo and useCallback?</li>
          <li><strong>A:</strong> useMemo memoizes values; useCallback memoizes functions. Both prevent unnecessary recalculations.</li>
          
          <li><strong>Q:</strong> What is composition over inheritance?</li>
          <li><strong>A:</strong> React recommends composing components rather than using inheritance for code reuse.</li>
          
          <li><strong>Q:</strong> Best practices for component structure?</li>
          <li><strong>A:</strong> Keep components small, single responsibility, prefer composition, use TypeScript, optimize performance.</li>
          
          <li><strong>Q:</strong> How to prevent unnecessary re-renders?</li>
          <li><strong>A:</strong> Use React.memo, useMemo, useCallback, proper key usage, and split components strategically.</li>
        </ul>
      </div>

      <div className="section" style={{ backgroundColor: '#1a3a1a' }}>
        <h3>✅ Best Practices Checklist</h3>
        <ul>
          <li>✓ Use TypeScript for type safety</li>
          <li>✓ Keep components small and focused</li>
          <li>✓ Use functional components with hooks</li>
          <li>✓ Implement proper error boundaries</li>
          <li>✓ Memoize expensive calculations</li>
          <li>✓ Use proper keys in lists</li>
          <li>✓ Avoid prop drilling with Context or state management</li>
          <li>✓ Code-split with React.lazy and Suspense</li>
          <li>✓ Follow naming conventions (PascalCase for components)</li>
          <li>✓ Write custom hooks for reusable logic</li>
          <li>✓ Use composition over inheritance</li>
          <li>✓ Optimize re-renders with memo, useMemo, useCallback</li>
        </ul>
      </div>
    </div>
  )
}

export default PatternsAndBestPractices
