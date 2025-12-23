import { createContext, useContext, useState, ReactNode } from 'react'

/**
 * Context API Example
 * Demonstrates how to avoid prop drilling using Context
 */

// 1. Create Context
interface User {
  name: string
  email: string
  role: string
}

const UserContext = createContext<User | null>(null)

// 2. Create Provider Component
function UserProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  })

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

// 3. Create custom hook for easier consumption
function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

// Components that DON'T need user data
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout" style={{ padding: '1rem', border: '2px solid #ddd' }}>
      <div className="info">✓ Layout (doesn't need user prop)</div>
      {children}
    </div>
  )
}

function Sidebar({ children }: { children: ReactNode }) {
  return (
    <div className="sidebar" style={{ padding: '1rem', border: '2px dashed #999', marginTop: '1rem' }}>
      <div className="info">✓ Sidebar (doesn't need user prop)</div>
      {children}
    </div>
  )
}

// Component that USES user data
function UserProfile() {
  const user = useUser() // Direct access via context!
  
  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <div className="info">✓ UserProfile uses context directly - no props needed!</div>
    </div>
  )
}

// Without Context (Prop Drilling)
function PropDrillingExample() {
  const user: User = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User'
  }

  return (
    <div className="example-section">
      <h3>❌ Without Context (Prop Drilling)</h3>
      <LayoutWithProps user={user} />
    </div>
  )
}

function LayoutWithProps({ user }: { user: User }) {
  return (
    <div className="layout" style={{ padding: '1rem', border: '2px solid #f99' }}>
      <div className="info">⚠️ Layout (must pass user prop even though it doesn't use it)</div>
      <SidebarWithProps user={user} />
    </div>
  )
}

function SidebarWithProps({ user }: { user: User }) {
  return (
    <div className="sidebar" style={{ padding: '1rem', border: '2px dashed #f66', marginTop: '1rem' }}>
      <div className="info">⚠️ Sidebar (must pass user prop even though it doesn't use it)</div>
      <UserProfileWithProps user={user} />
    </div>
  )
}

function UserProfileWithProps({ user }: { user: User }) {
  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <div className="info">Finally used here!</div>
    </div>
  )
}

// With Context
function ContextExample() {
  return (
    <UserProvider>
      <div className="example-section">
        <h3>✅ With Context (No Prop Drilling)</h3>
        <Layout>
          <Sidebar>
            <UserProfile />
          </Sidebar>
        </Layout>
      </div>
    </UserProvider>
  )
}

export default function ContextAPIDemo() {
  return (
    <div className="example-container">
      <h2>Context API - Avoiding Prop Drilling</h2>

      <div className="section">
        <h3>The Problem: Prop Drilling</h3>
        <p>
          When you need to pass data through multiple components that don't use it, 
          just to reach a deeply nested component.
        </p>
        <PropDrillingExample />
        <div className="summary">
          <strong>Issues with prop drilling:</strong>
          <ul>
            <li>Intermediate components must know about data they don't use</li>
            <li>Hard to refactor - changing prop type affects many components</li>
            <li>Tight coupling between components</li>
          </ul>
        </div>
      </div>

      <div className="section">
        <h3>The Solution: Context API</h3>
        <p>
          Context provides a way to pass data through the component tree without 
          having to pass props down manually at every level.
        </p>
        <ContextExample />
        <div className="summary">
          <strong>Benefits of Context:</strong>
          <ul>
            <li>✓ Intermediate components don't need to know about the data</li>
            <li>✓ Easier to refactor - only Provider and consumers affected</li>
            <li>✓ Loose coupling - components are more reusable</li>
            <li>✓ Perfect for global data (theme, auth, language)</li>
          </ul>
        </div>
      </div>

      <div className="section">
        <h3>Common Use Cases</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>Good for Context:</h4>
            <ul>
              <li>Theme (dark/light mode)</li>
              <li>User authentication</li>
              <li>Language/Localization</li>
              <li>Global UI state (modals, toasts)</li>
            </ul>
          </div>
          <div className="card">
            <h4>Avoid Context for:</h4>
            <ul>
              <li>Frequently changing values</li>
              <li>Simple parent-child communication</li>
              <li>Values used by few components</li>
              <li>Performance-critical updates</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="code-preview">
        <h4>Implementation Steps:</h4>
        <pre>{`// 1. Create Context
const UserContext = createContext<User | null>(null)

// 2. Create Provider
function UserProvider({ children }) {
  const [user, setUser] = useState(...)
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

// 3. Use Context
function Component() {
  const user = useContext(UserContext)
  return <div>{user.name}</div>
}`}</pre>
      </div>
    </div>
  )
}
