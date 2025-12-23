import React, { Component } from 'react'

// ===========================
// 1. FUNCTIONAL COMPONENTS
// ===========================

// Basic functional component
const WelcomeMessage: React.FC = () => {
  return <h3>Welcome to React TypeScript!</h3>
}

// Functional component with props
interface GreetingProps {
  name: string
  age?: number // Optional prop
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div className="example">
      <p>Hello, {name}!</p>
      {age && <p>Age: {age}</p>}
    </div>
  )
}

// ===========================
// 2. CLASS COMPONENTS
// ===========================

interface ClassCounterProps {
  initialCount?: number
}

interface ClassCounterState {
  count: number
  message: string
}

class ClassCounter extends Component<ClassCounterProps, ClassCounterState> {
  constructor(props: ClassCounterProps) {
    super(props)
    this.state = {
      count: props.initialCount || 0,
      message: 'Class Component Example'
    }
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  componentDidMount() {
    console.log('ClassCounter mounted')
  }

  componentDidUpdate(prevProps: ClassCounterProps, prevState: ClassCounterState) {
    if (prevState.count !== this.state.count) {
      console.log(`Count updated to: ${this.state.count}`)
    }
  }

  componentWillUnmount() {
    console.log('ClassCounter will unmount')
  }

  render() {
    return (
      <div className="example">
        <h4>{this.state.message}</h4>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    )
  }
}

// ===========================
// 3. JSX & EXPRESSIONS
// ===========================

const JSXExample: React.FC = () => {
  const isLoggedIn = true
  const username = 'John Doe'
  const items = ['Apple', 'Banana', 'Cherry']
  
  const getGreeting = (name: string) => `Welcome, ${name}!`

  return (
    <div className="example">
      <h4>JSX Examples</h4>
      
      {/* Conditional Rendering */}
      {isLoggedIn ? <p>{getGreeting(username)}</p> : <p>Please log in</p>}
      
      {/* List Rendering */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {/* Inline Styles */}
      <p style={{ color: '#646cff', fontWeight: 'bold' }}>Styled Text</p>
      
      {/* Expression Evaluation */}
      <p>2 + 2 = {2 + 2}</p>
    </div>
  )
}

// ===========================
// 4. PROPS IN DETAIL
// ===========================

// Children props
interface CardProps {
  title: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  )
}

// Props with default values
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
}

const CustomButton: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary',
  onClick 
}) => {
  const styles = {
    primary: { backgroundColor: '#646cff' },
    secondary: { backgroundColor: '#747bff' },
    danger: { backgroundColor: '#ff6b6b' }
  }

  return (
    <button style={styles[variant]} onClick={onClick}>
      {label}
    </button>
  )
}

// Props with callbacks
interface FormInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const FormInput: React.FC<FormInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ display: 'block', width: '100%', maxWidth: '300px' }}
    />
  )
}

// ===========================
// 5. EVENTS HANDLING
// ===========================

const EventsExample: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked', e.currentTarget)
    alert('Button clicked!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Form submitted!')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed')
    }
  }

  return (
    <div className="example">
      <h4>Event Handling</h4>
      <button onClick={handleClick}>Click Me</button>
      <input 
        type="text" 
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter"
      />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  )
}

// ===========================
// 6. CONDITIONAL RENDERING
// ===========================

interface UserStatus {
  isLoggedIn: boolean
  isAdmin: boolean
  username?: string
}

const ConditionalRenderingExample: React.FC = () => {
  const [userStatus, setUserStatus] = React.useState<UserStatus>({
    isLoggedIn: false,
    isAdmin: false
  })

  return (
    <div className="example">
      <h4>Conditional Rendering</h4>
      
      {/* If-Else with ternary */}
      {userStatus.isLoggedIn ? (
        <p>Welcome back, {userStatus.username || 'User'}!</p>
      ) : (
        <p>Please log in</p>
      )}

      {/* Logical AND */}
      {userStatus.isAdmin && <p className="highlight">Admin Access Granted</p>}

      {/* Multiple conditions */}
      {userStatus.isLoggedIn && userStatus.isAdmin ? (
        <p>Admin Dashboard</p>
      ) : userStatus.isLoggedIn ? (
        <p>User Dashboard</p>
      ) : (
        <p>Public Page</p>
      )}

      <button onClick={() => setUserStatus({ ...userStatus, isLoggedIn: !userStatus.isLoggedIn })}>
        Toggle Login
      </button>
      <button onClick={() => setUserStatus({ ...userStatus, isAdmin: !userStatus.isAdmin })}>
        Toggle Admin
      </button>
    </div>
  )
}

// ===========================
// 7. LISTS & KEYS
// ===========================

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

const ListsExample: React.FC = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Learn TypeScript', completed: true },
    { id: 3, text: 'Build Projects', completed: false }
  ])

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="example">
      <h4>Lists and Keys</h4>
      <ul style={{ listStyle: 'none' }}>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id)}
            style={{ 
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.6 : 1
            }}
          >
            {todo.completed ? '✓' : '○'} {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ===========================
// MAIN COMPONENT
// ===========================

const FundamentalConcepts: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')

  return (
    <div className="section">
      <h2>Chapter 1: Fundamental Concepts</h2>
      
      <div className="section">
        <h3>1.1 Components</h3>
        <p>Components are the building blocks of React applications.</p>
        <WelcomeMessage />
        <Greeting name="Alice" age={25} />
        <Greeting name="Bob" />
      </div>

      <div className="section">
        <h3>1.2 Class Components</h3>
        <p>Traditional way of creating components with lifecycle methods.</p>
        <ClassCounter initialCount={10} />
      </div>

      <div className="section">
        <h3>1.3 JSX</h3>
        <p>JSX allows you to write HTML-like syntax in JavaScript.</p>
        <JSXExample />
      </div>

      <div className="section">
        <h3>1.4 Props</h3>
        <p>Props are used to pass data from parent to child components.</p>
        <Card title="Card Example">
          <p>This is the card content passed as children.</p>
          <CustomButton label="Primary" variant="primary" />
          <CustomButton label="Secondary" variant="secondary" />
          <CustomButton label="Danger" variant="danger" onClick={() => alert('Danger!')} />
        </Card>
        
        <div className="example">
          <h4>Controlled Input</h4>
          <FormInput 
            value={inputValue} 
            onChange={setInputValue}
            placeholder="Type something..."
          />
          <p>Current value: {inputValue}</p>
        </div>
      </div>

      <div className="section">
        <h3>1.5 Event Handling</h3>
        <p>Handle user interactions with event handlers.</p>
        <EventsExample />
      </div>

      <div className="section">
        <h3>1.6 Conditional Rendering</h3>
        <p>Render different UI based on conditions.</p>
        <ConditionalRenderingExample />
      </div>

      <div className="section">
        <h3>1.7 Lists and Keys</h3>
        <p>Render lists of data with unique keys.</p>
        <ListsExample />
      </div>

      <div className="section" style={{ backgroundColor: '#2a2a2a' }}>
        <h3>📝 Interview Questions</h3>
        <ul>
          <li><strong>Q:</strong> What is the difference between functional and class components?</li>
          <li><strong>A:</strong> Functional components are simpler, use hooks for state/lifecycle. Class components use this.state and lifecycle methods.</li>
          
          <li><strong>Q:</strong> What is JSX?</li>
          <li><strong>A:</strong> JSX is a syntax extension that allows writing HTML-like code in JavaScript, compiled to React.createElement calls.</li>
          
          <li><strong>Q:</strong> Why do we need keys in lists?</li>
          <li><strong>A:</strong> Keys help React identify which items have changed, added, or removed, optimizing re-renders.</li>
          
          <li><strong>Q:</strong> What are props?</li>
          <li><strong>A:</strong> Props are read-only data passed from parent to child components for communication.</li>
          
          <li><strong>Q:</strong> How do you handle events in React?</li>
          <li><strong>A:</strong> Use camelCase event handlers (onClick, onChange) and pass functions. Event objects are SyntheticEvents.</li>
        </ul>
      </div>
    </div>
  )
}

export default FundamentalConcepts
