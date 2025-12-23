# React TypeScript Complete Tutorial

> **A comprehensive, production-ready React TypeScript tutorial covering all concepts, hooks, patterns, and best practices for interview preparation.**

[![React](https://img.shields.io/badge/React-18.3+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Tutorial Structure](#-tutorial-structure)
- [Section Details](#-section-details)
- [Key Concepts Covered](#-key-concepts-covered)
- [Interview Preparation](#-interview-preparation)
- [Best Practices](#-best-practices)
- [TypeScript Integration](#-typescript-integration)
- [Additional Resources](#-additional-resources)

---

## 🎯 Overview

This tutorial is a **complete, hands-on guide** to React 18.3+ with TypeScript 5.6+. It's designed specifically for:

- **Interview preparation** - Covers all common React interview questions
- **Concept mastery** - Every major React concept with working examples
- **TypeScript proficiency** - Proper typing for all React patterns
- **Modern best practices** - Latest React patterns and hooks
- **Reference material** - Easy-to-navigate, well-organized code

Each chapter includes:
- ✅ Working code examples
- ✅ Detailed explanations
- ✅ TypeScript type annotations
- ✅ Common interview questions & answers
- ✅ Best practices and patterns

---

## ✨ Features

- 🚀 **React 18.3+** - Latest features including Suspense, Transitions, and Concurrent Rendering
- 📘 **TypeScript 5.6+** - Fully typed with modern TypeScript features
- ⚡ **Vite** - Lightning-fast development with HMR
- 🎨 **Interactive Examples** - All concepts demonstrated with working code
- 📝 **Interview Questions** - 400+ questions with detailed answers
- 🏗️ **Design Patterns** - HOC, Render Props, Compound Components, and more
- 🧭 **React Router v6** - Complete routing guide with examples
- 🗄️ **Redux Toolkit** - Modern state management with 3 live demos
- 📚 **Documentation Viewer** - Interactive markdown documentation browser
- ⚙️ **Production Ready** - Best practices and optimization techniques

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd /Users/MRamanath/Desktop/react-js
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 🚀 Running the Project

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## 📖 Tutorial Structure

The tutorial is organized into 19 comprehensive sections:

```
src/
├── components/
│   ├── 01-fundamentals/           # ⚛️ Core React Concepts
│   ├── 02-hooks/                  # 🪝 React Hooks Basics
│   ├── 03-advanced/               # 🚀 Advanced Features
│   ├── 04-patterns/               # 🎯 Patterns & Best Practices
│   ├── 05-state-management/       # 📦 Props vs State
│   ├── 06-hooks-deep-dive/        # 🔍 Advanced Hook Patterns
│   ├── 07-context-patterns/       # 🌐 Context API Patterns
│   ├── 08-performance/            # ⚡ Performance Optimization
│   ├── 09-forms/                  # 📝 Form Handling
│   ├── 10-custom-hooks/           # 🎣 Custom Hooks
│   ├── 11-refs-and-dom/           # 🎯 Refs & DOM Access
│   ├── 12-error-handling/         # 🛡️ Error Boundaries
│   ├── 13-portals/                # 🚪 Portals
│   ├── 14-code-splitting/         # ✂️ Code Splitting & Lazy Loading
│   ├── 15-advanced-patterns/      # 🏗️ HOC & Render Props
│   ├── 16-react-18/               # 🆕 React 18 Features
│   ├── 17-routing/                # 🧭 React Router v6
│   ├── 18-redux-toolkit/          # 🗄️ Redux Toolkit with Live Demos
│   └── 19-docs/                   # 📚 Documentation Viewer
├── App.tsx                        # Main navigation component
├── main.tsx                       # Application entry point
└── index.css                      # Global styles
```

---

## 📋 Section Details

### Section 1-4: Core Concepts & Fundamentals
**Covered:** Components, JSX, Props, State, Hooks basics, Event handling, Lists, Conditional rendering

### Section 5: State Management
**Topics:** Props vs State, Data flow, Lifting state up, Prop drilling

### Section 6: Hooks Deep Dive
**Topics:** 
- useCallback vs useMemo performance comparison
- useEffect vs useLayoutEffect timing
- useState vs useReducer patterns
- Advanced hook optimization techniques

### Section 7: Context Patterns
**Topics:** Context API, Prop drilling solutions, Global state management

### Section 8: Performance Optimization
**Topics:** React.memo, useMemo, useCallback, Re-render optimization

### Section 9: Form Handling
**Topics:** Controlled vs Uncontrolled inputs, Form validation, Form state management

### Section 10: Custom Hooks
**Topics:** 
- useDebounce - Input debouncing
- useToggle - Boolean state management
- usePrevious - Track previous values
- useLocalStorage - Persistent state

### Section 11: Refs and DOM Access
**Topics:**
- Focus management
- DOM measurements
- Third-party library integration
- Storing mutable values
- forwardRef pattern
- useImperativeHandle

### Section 12: Error Handling
**Topics:** Error Boundaries, Error logging, Fallback UI, Production error handling

### Section 13: Portals
**Topics:** Modal dialogs, Tooltips, Notifications, Breaking out of DOM hierarchy

### Section 14: Code Splitting & Lazy Loading
**Topics:**
- React.lazy() for component splitting
- Suspense boundaries
- Route-based splitting
- Loading states
- Bundle size optimization

### Section 15: Advanced Patterns
**Topics:**
- Higher-Order Components (HOC)
- Render Props pattern
- Component composition
- Props proxy pattern
- Pattern comparison

### Section 16: React 18 Features
**Topics:**
- useTransition - Non-blocking updates
- useDeferredValue - Defer less important updates
- startTransition - Standalone transition API
- useId - SSR-safe unique IDs
- useSyncExternalStore - External store integration
- Automatic batching

### Section 17: React Router v6
**Topics:**
- Basic routing setup with BrowserRouter
- Route configuration and navigation
- Dynamic routes with URL parameters
- Nested routes and layouts
- Navigation hooks (useNavigate, useParams, useLocation)
- Route protection and authentication
- Link components and navigation
- 15 comprehensive interview Q&A

### Section 18: Redux Toolkit
**Topics:**
- Redux Toolkit setup and configuration
- createSlice for reducers and actions
- configureStore for store setup
- createAsyncThunk for async operations
- RTK Query for data fetching
- Redux DevTools integration
- **3 Live Interactive Demos:**
  1. **Counter Demo** - Basic state management with history tracking
  2. **Todos Demo** - CRUD operations with filtering (all/active/completed)
  3. **Async Users Demo** - API integration with loading states and individual card indicators
- 12 comprehensive interview Q&A

### Section 19: Documentation Viewer
**Topics:**
- GitHub-style markdown rendering
- Interactive documentation browser
- Comprehensive interview questions (400+)
- Quick reference guides
- Project README and setup instructions

---

## 📋 Complete Feature List

### Chapter 1: Fundamental Concepts

**What you'll learn:**
- Functional vs Class Components
- JSX syntax and expressions
- Props and children
- Event handling (onClick, onChange, onSubmit, etc.)
- Conditional rendering (ternary, logical AND)
- Lists and keys
- Controlled vs Uncontrolled components

**Key Examples:**
- `<Greeting name="Alice" age={25} />`
- `<ClassCounter initialCount={10} />`
- `<FormInput value={inputValue} onChange={setInputValue} />`
- Todo list with toggle functionality

**Interview Topics:**
- Difference between functional and class components
- Why keys are important in lists
- How event handling works in React
- Props vs State

---

### Chapter 2: React Hooks

**What you'll learn:**

#### Built-in Hooks:
1. **useState** - State management
2. **useEffect** - Side effects and lifecycle
3. **useContext** - Access context values
4. **useReducer** - Complex state logic
5. **useCallback** - Memoize callbacks
6. **useMemo** - Memoize computed values
7. **useRef** - DOM references and mutable values
8. **useLayoutEffect** - Synchronous effects
9. **useImperativeHandle** - Customize ref exposure

#### React 18+ Hooks:
10. **useTransition** - Non-blocking state updates
11. **useDeferredValue** - Defer less important updates

#### Custom Hooks:
- `useLocalStorage` - Persist state to localStorage
- `useDebounce` - Debounce values
- `useFetch` - Data fetching abstraction
- `useForm` - Form handling

**Key Examples:**
```typescript
// useState with different types
const [count, setCount] = useState<number>(0)
const [user, setUser] = useState<User>({ name: 'John', age: 25 })

// useEffect with cleanup
useEffect(() => {
  const handler = () => setWindowWidth(window.innerWidth)
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])

// useCallback to prevent re-renders
const removeTodo = useCallback((id: number) => {
  setTodos(prev => prev.filter(todo => todo.id !== id))
}, [])

// useMemo for expensive calculations
const sum = useMemo(() => {
  return items.reduce((acc, item) => acc + item, 0)
}, [items])
```

**Interview Topics:**
- Rules of hooks
- useEffect dependency array
- When to use useCallback vs useMemo
- useState vs useReducer
- useRef use cases

---

### Chapter 3: Advanced Concepts

**What you'll learn:**

1. **Error Boundaries** - Catch and handle errors gracefully
2. **Portals** - Render outside parent DOM hierarchy
3. **Refs & Forwarding** - Direct DOM access and ref forwarding
4. **Lazy Loading** - Code splitting with React.lazy()
5. **Suspense** - Loading states for lazy components
6. **Context API** - Advanced patterns with authentication example
7. **useTransition** - Keep UI responsive during updates
8. **useDeferredValue** - Defer non-urgent updates
9. **Strict Mode** - Development mode checks
10. **Fragments** - Group elements without extra DOM nodes
11. **Profiler** - Measure component performance

**Key Examples:**
```typescript
// Error Boundary
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo)
  }
}

// Portal for Modal
createPortal(
  <ModalContent />,
  document.body
)

// Lazy Loading
const LazyComponent = lazy(() => import('./HeavyComponent'))
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>

// useTransition for responsive UI
const [isPending, startTransition] = useTransition()
startTransition(() => {
  setLargeList(newData) // Non-urgent update
})
```

**Interview Topics:**
- Error Boundary limitations
- When to use Portals
- React.lazy and code splitting
- Suspense use cases
- Context API vs prop drilling

---

### Chapter 4: Patterns & Best Practices

**What you'll learn:**

#### Design Patterns:
1. **Higher-Order Components (HOC)** - Component enhancement
2. **Render Props** - Share code via function props
3. **Compound Components** - Components that work together
4. **Container/Presentational** - Separate logic from UI
5. **Custom Hooks** - Extract reusable logic
6. **Composition** - Build complex UIs from simple parts
7. **State Reducer** - Flexible state management

#### Performance Optimization:
- **React.memo** - Prevent unnecessary re-renders
- **useMemo** - Memoize expensive calculations
- **useCallback** - Memoize callback functions
- Component splitting strategies
- Key optimization techniques

**Key Examples:**
```typescript
// HOC Pattern
function withAuth<P>(Component: ComponentType<P>) {
  return (props: P & { isAuthenticated: boolean }) => {
    if (!props.isAuthenticated) return <Login />
    return <Component {...props} />
  }
}

// Render Props
<MouseTracker
  render={({ x, y }) => (
    <p>Position: ({x}, {y})</p>
  )}
/>

// Compound Components
<Tabs defaultTab="tab1">
  <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
  <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
</Tabs>

// Performance Optimization
const MemoizedComponent = memo(ExpensiveComponent)
const memoizedValue = useMemo(() => computeExpensive(data), [data])
const memoizedCallback = useCallback(() => handleClick(), [])
```

**Interview Topics:**
- HOC vs Render Props vs Hooks
- When to use React.memo
- Performance optimization strategies
- Composition over inheritance
- Custom hooks best practices

---

## 🎓 Key Concepts Covered

### Core React Concepts
- ✅ Components (Functional & Class)
- ✅ JSX & Expressions
- ✅ Props & PropTypes
- ✅ State Management
- ✅ Lifecycle Methods
- ✅ Event Handling
- ✅ Conditional Rendering
- ✅ Lists & Keys
- ✅ Forms (Controlled Components)

### React Hooks (All 11)
- ✅ useState
- ✅ useEffect
- ✅ useContext
- ✅ useReducer
- ✅ useCallback
- ✅ useMemo
- ✅ useRef
- ✅ useLayoutEffect
- ✅ useImperativeHandle
- ✅ useTransition (React 18)
- ✅ useDeferredValue (React 18)

### Advanced Features
- ✅ Error Boundaries
- ✅ Portals
- ✅ Refs & Forwarding
- ✅ Code Splitting (React.lazy)
- ✅ Suspense
- ✅ Context API
- ✅ Concurrent Features
- ✅ Strict Mode
- ✅ Fragments
- ✅ Profiler

### Design Patterns
- ✅ Higher-Order Components
- ✅ Render Props
- ✅ Compound Components
- ✅ Container/Presentational
- ✅ Custom Hooks
- ✅ Composition
- ✅ State Reducer Pattern

### Performance
- ✅ React.memo
- ✅ useMemo
- ✅ useCallback
- ✅ Code Splitting
- ✅ Lazy Loading
- ✅ Re-render Optimization

### Routing & State Management
- ✅ React Router v6 - Navigation, dynamic routes, nested routes
- ✅ Redux Toolkit - Modern Redux with simplified API
- ✅ createSlice - Reducers and actions
- ✅ createAsyncThunk - Async operations
- ✅ RTK Query - Data fetching and caching
- ✅ Redux DevTools - Time-travel debugging

### Documentation
- ✅ Markdown rendering with react-markdown
- ✅ GitHub-style formatting
- ✅ Interactive documentation browser
- ✅ 400+ interview questions with answers

---

## 💼 Interview Preparation

### Most Common React Interview Questions

#### Basic Level
1. **What is React?**
   - JavaScript library for building UIs, component-based, declarative

2. **Virtual DOM vs Real DOM?**
   - Virtual DOM is in-memory representation, React diffs and updates only changed nodes

3. **What is JSX?**
   - JavaScript XML, syntactic sugar for React.createElement()

4. **Props vs State?**
   - Props: immutable data from parent; State: mutable component data

5. **Controlled vs Uncontrolled components?**
   - Controlled: React controls form data via state; Uncontrolled: DOM handles form data

#### Intermediate Level
1. **Explain React lifecycle methods**
   - Mount: constructor → render → componentDidMount
   - Update: render → componentDidUpdate
   - Unmount: componentWillUnmount

2. **What are hooks? Rules of hooks?**
   - Functions to use state/lifecycle in functional components
   - Rules: Only top level, only in React functions

3. **useEffect vs useLayoutEffect?**
   - useEffect: async after paint; useLayoutEffect: sync before paint

4. **When to use useCallback vs useMemo?**
   - useCallback: memoize functions; useMemo: memoize values

5. **What is Context API?**
   - Share data across component tree without prop drilling

#### Advanced Level
1. **How does React reconciliation work?**
   - Diffing algorithm, keys for list optimization, fiber architecture

2. **What are Error Boundaries?**
   - Class components that catch errors in child tree

3. **Explain React 18 features**
   - Concurrent rendering, automatic batching, transitions, Suspense improvements

4. **Performance optimization techniques?**
   - React.memo, useMemo, useCallback, code splitting, virtualization

5. **Design patterns in React?**
   - HOC, Render Props, Compound Components, Custom Hooks

---

## ✅ Best Practices

### Component Design
- ✓ Keep components small and focused (Single Responsibility)
- ✓ Use functional components with hooks
- ✓ Prefer composition over inheritance
- ✓ Extract reusable logic into custom hooks
- ✓ Use TypeScript for type safety

### State Management
- ✓ Keep state as close as possible to where it's used
- ✓ Use Context API for global state (auth, theme)
- ✓ Consider state management libraries for complex apps (Redux, Zustand)
- ✓ Use useReducer for complex state logic

### Performance
- ✓ Use React.memo for expensive pure components
- ✓ Memoize callbacks with useCallback
- ✓ Memoize expensive calculations with useMemo
- ✓ Code-split with React.lazy and Suspense
- ✓ Use proper keys in lists
- ✓ Avoid anonymous functions in render (when passing as props)

### Code Organization
- ✓ One component per file
- ✓ Use index.ts for clean imports
- ✓ Group related components in folders
- ✓ Separate business logic from UI
- ✓ Use consistent naming conventions

### TypeScript
- ✓ Define interfaces for all props
- ✓ Use type inference where possible
- ✓ Avoid `any` type
- ✓ Use generics for reusable components
- ✓ Define return types for functions

### Error Handling
- ✓ Use Error Boundaries
- ✓ Handle async errors properly
- ✓ Provide user-friendly error messages
- ✓ Log errors for debugging

---

## 🔷 TypeScript Integration

### Component Props Typing

```typescript
// Functional component with props
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return <button onClick={onClick}>{label}</button>
}
```

### Event Handlers

```typescript
// Mouse events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget)
}

// Input events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)
}

// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}
```

### Hooks with TypeScript

```typescript
// useState with type
const [user, setUser] = useState<User | null>(null)

// useRef with DOM element
const inputRef = useRef<HTMLInputElement>(null)

// useContext with type
const theme = useContext<ThemeContextType>(ThemeContext)

// Custom hook with generic
function useLocalStorage<T>(key: string, initial: T): [T, (value: T) => void] {
  // implementation
}
```

### Advanced Types

```typescript
// Generic component
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <>{items.map(renderItem)}</>
}

// Discriminated unions
type Status = 
  | { type: 'loading' }
  | { type: 'success'; data: Data }
  | { type: 'error'; error: string }
```

---

## 📚 Additional Resources

### Official Documentation
- [React Docs](https://react.dev/) - Official React documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Vite Guide](https://vitejs.dev/guide/) - Vite documentation

### Learning Resources
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Kent C. Dodds Blog](https://kentcdodds.com/blog) - React patterns and best practices
- [Josh W. Comeau](https://www.joshwcomeau.com/) - React tutorials

### Tools & Libraries
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/) - Chrome extension
- [TypeScript ESLint](https://typescript-eslint.io/) - Linting
- [Testing Library](https://testing-library.com/react) - Testing

---

## 🏗️ Project Structure Best Practices

```
src/
├── components/          # Reusable components
│   ├── common/         # Shared components (Button, Input, Modal)
│   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   └── features/       # Feature-specific components
├── hooks/              # Custom hooks
├── context/            # Context providers
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Constants and enums
├── api/                # API calls
├── assets/             # Images, fonts, etc.
└── styles/             # Global styles
```

---

## 🤝 Contributing

This is a tutorial project, but suggestions for improvements are welcome!

---

## 📝 License

MIT License - Feel free to use this for learning and interview preparation.

---

## 🎯 Next Steps

After completing this tutorial:

1. **Build projects** - Apply concepts in real applications
2. **Learn state management** - Redux, Zustand, Jotai
3. **Explore routing** - React Router
4. **Add testing** - Jest, React Testing Library, Vitest
5. **Learn Next.js** - React framework for production
6. **Practice algorithms** - LeetCode, HackerRank with React context

---

## 📞 Support

If you find this tutorial helpful, please:
- ⭐ Star the repository
- 📢 Share with others preparing for interviews
- 🐛 Report issues or suggest improvements

---

**Happy Learning! 🚀**

*Last Updated: December 2024*
*React Version: 18.3+*
*TypeScript Version: 5.6+*
