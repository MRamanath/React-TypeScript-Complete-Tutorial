import { useState } from 'react'

export default function ReduxToolkitConcepts() {
  const [activeDemo, setActiveDemo] = useState<string>('overview')

  return (
    <div className="example-container">
      <h2>🔴 Redux Toolkit (RTK)</h2>
      <p className="subtitle">Modern Redux - State management with Redux Toolkit</p>

      <div className="demo-nav">
        <button onClick={() => setActiveDemo('overview')} className={activeDemo === 'overview' ? 'active' : ''}>
          Overview
        </button>
        <button onClick={() => setActiveDemo('setup')} className={activeDemo === 'setup' ? 'active' : ''}>
          Setup
        </button>
        <button onClick={() => setActiveDemo('slice')} className={activeDemo === 'slice' ? 'active' : ''}>
          Slices
        </button>
        <button onClick={() => setActiveDemo('async')} className={activeDemo === 'async' ? 'active' : ''}>
          Async Thunks
        </button>
        <button onClick={() => setActiveDemo('rtk-query')} className={activeDemo === 'rtk-query' ? 'active' : ''}>
          RTK Query
        </button>
        <button onClick={() => setActiveDemo('selectors')} className={activeDemo === 'selectors' ? 'active' : ''}>
          Selectors
        </button>
        <button onClick={() => setActiveDemo('middleware')} className={activeDemo === 'middleware' ? 'active' : ''}>
          Middleware
        </button>
        <button onClick={() => setActiveDemo('live-counter')} className={activeDemo === 'live-counter' ? 'active' : ''}>
          Live: Counter
        </button>
        <button onClick={() => setActiveDemo('live-todos')} className={activeDemo === 'live-todos' ? 'active' : ''}>
          Live: Todos
        </button>
        <button onClick={() => setActiveDemo('live-users')} className={activeDemo === 'live-users' ? 'active' : ''}>
          Live: Async Users
        </button>
        <button onClick={() => setActiveDemo('interview')} className={activeDemo === 'interview' ? 'active' : ''}>
          Interview Q&A
        </button>
      </div>

      {activeDemo === 'overview' && <OverviewSection />}
      {activeDemo === 'setup' && <SetupSection />}
      {activeDemo === 'slice' && <SliceSection />}
      {activeDemo === 'async' && <AsyncThunkSection />}
      {activeDemo === 'rtk-query' && <RTKQuerySection />}
      {activeDemo === 'selectors' && <SelectorsSection />}
      {activeDemo === 'middleware' && <MiddlewareSection />}
      {activeDemo === 'live-counter' && <LiveCounterDemo />}
      {activeDemo === 'live-todos' && <LiveTodosDemo />}
      {activeDemo === 'live-users' && <LiveUsersDemo />}
      {activeDemo === 'interview' && <InterviewQASection />}
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="section">
      <h3>What is Redux Toolkit?</h3>
      <p>
        Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development.
        It's the modern way to write Redux - simpler, less boilerplate, better defaults.
      </p>

      <div className="info-box">
        <h4>❌ Old Redux Problems:</h4>
        <ul>
          <li>Too much boilerplate (action types, action creators, reducers)</li>
          <li>Manual immutability with spread operators</li>
          <li>Need multiple packages (redux-thunk, immer, etc.)</li>
          <li>Complex store configuration</li>
          <li>Difficult async logic</li>
        </ul>
      </div>

      <div className="info-box">
        <h4>✅ Redux Toolkit Solutions:</h4>
        <ul>
          <li><strong>configureStore()</strong> - Simplified store setup with good defaults</li>
          <li><strong>createSlice()</strong> - Combines actions and reducers in one</li>
          <li><strong>createAsyncThunk()</strong> - Easy async operations</li>
          <li><strong>createEntityAdapter()</strong> - Normalized state utilities</li>
          <li><strong>RTK Query</strong> - Powerful data fetching & caching</li>
          <li><strong>Immer built-in</strong> - Write "mutating" logic that's actually immutable</li>
        </ul>
      </div>

      <div className="code-block">
        <h4>Installation:</h4>
        <pre>{`npm install @reduxjs/toolkit react-redux

# Includes:
# - Redux core
# - Redux Thunk (async middleware)
# - Immer (immutability helper)
# - Reselect (memoized selectors)
# - Redux DevTools Extension support`}</pre>
      </div>

      <div className="code-block">
        <h4>Redux vs Redux Toolkit Comparison:</h4>
        <pre>{`// Old Redux - Too much code!
// Action Types
const ADD_TODO = 'todos/add'
const TOGGLE_TODO = 'todos/toggle'

// Action Creators
const addTodo = (text) => ({ type: ADD_TODO, payload: text })
const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id })

// Reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: Date.now(), text: action.payload }]
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

// ----------------------------------------

// Redux Toolkit - Much simpler!
import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Direct mutation with Immer!
      state.push({ id: Date.now(), text: action.payload })
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    }
  }
})

// Actions auto-generated!
export const { addTodo, toggleTodo } = todosSlice.actions
export default todosSlice.reducer`}</pre>
      </div>
    </div>
  )
}

function SetupSection() {
  return (
    <div className="section">
      <h3>Redux Toolkit Setup</h3>

      <div className="code-block">
        <h4>1. Create Store (store.ts):</h4>
        <pre>{`import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import todosReducer from './features/todos/todosSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    user: userReducer
  },
  // Redux DevTools, Thunk middleware included by default!
  // Can add custom middleware:
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(logger)
})

// TypeScript types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Provide Store (main.tsx):</h4>
        <pre>{`import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)`}</pre>
      </div>

      <div className="code-block">
        <h4>3. TypeScript Hooks (hooks.ts):</h4>
        <pre>{`import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Benefits:
// - Type-safe selectors
// - Autocomplete for state
// - Compile-time errors`}</pre>
      </div>

      <div className="code-block">
        <h4>4. Folder Structure:</h4>
        <pre>{`src/
├── store.ts                 # Store configuration
├── hooks.ts                 # Typed hooks
├── features/
│   ├── counter/
│   │   ├── counterSlice.ts  # Slice (state + actions + reducers)
│   │   └── Counter.tsx      # Component
│   ├── todos/
│   │   ├── todosSlice.ts
│   │   ├── todosThunks.ts   # Async operations
│   │   └── TodoList.tsx
│   └── user/
│       ├── userSlice.ts
│       └── userAPI.ts       # API calls
└── App.tsx`}</pre>
      </div>
    </div>
  )
}

function SliceSection() {
  return (
    <div className="section">
      <h3>Creating Slices</h3>

      <div className="code-block">
        <h4>1. Basic Slice (counterSlice.ts):</h4>
        <pre>{`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  status: 'idle' | 'loading'
}

const initialState: CounterState = {
  value: 0,
  status: 'idle'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Action with no payload
    increment: (state) => {
      state.value += 1  // Direct mutation with Immer!
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Action with payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    // Prepare callback for complex action payloads
    addWithMetadata: {
      reducer: (state, action: PayloadAction<{ value: number; timestamp: number }>) => {
        state.value += action.payload.value
      },
      prepare: (value: number) => {
        return {
          payload: {
            value,
            timestamp: Date.now()
          }
        }
      }
    },
    reset: (state) => {
      state.value = 0
    }
  }
})

// Export actions
export const { 
  increment, 
  decrement, 
  incrementByAmount, 
  addWithMetadata,
  reset 
} = counterSlice.actions

// Export reducer
export default counterSlice.reducer`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Using in Component:</h4>
        <pre>{`import { useAppDispatch, useAppSelector } from '../../hooks'
import { increment, decrement, incrementByAmount } from './counterSlice'

function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Complex Slice Example (todosSlice.ts):</h4>
        <pre>{`import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodosState {
  items: Todo[]
  filter: 'all' | 'active' | 'completed'
}

const initialState: TodosState = {
  items: [],
  filter: 'all'
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload)
      },
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),  // Generate unique ID
          text,
          completed: false
        }
      })
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(t => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.items.find(t => t.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(t => !t.completed)
    }
  }
})

export const { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo, 
  setFilter,
  clearCompleted 
} = todosSlice.actions

export default todosSlice.reducer`}</pre>
      </div>
    </div>
  )
}

function AsyncThunkSection() {
  return (
    <div className="section">
      <h3>Async Operations with createAsyncThunk</h3>

      <div className="code-block">
        <h4>1. Create Async Thunk:</h4>
        <pre>{`import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface User {
  id: number
  name: string
  email: string
}

interface UserState {
  user: User | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

// Async thunk action
export const fetchUser = createAsyncThunk(
  'user/fetchUser',  // Action type prefix
  async (userId: number, thunkAPI) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`)
      if (!response.ok) throw new Error('Failed to fetch')
      return await response.json() as User
    } catch (error) {
      // Can access other state/dispatch via thunkAPI
      return thunkAPI.rejectWithValue('Failed to load user')
    }
  }
)

// Another async thunk with parameters
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }: { id: number; data: Partial<User> }) => {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return await response.json() as User
  }
)`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Handle in Slice with extraReducers:</h4>
        <pre>{`const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: 'idle',
    error: null
  } as UserState,
  reducers: {
    clearUser: (state) => {
      state.user = null
      state.loading = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // fetchUser lifecycle
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
      
    // updateUser lifecycle
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message || 'Update failed'
      })
  }
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Using Async Thunks in Components:</h4>
        <pre>{`import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchUser, updateUser } from './userSlice'

function UserProfile({ userId }: { userId: number }) {
  const dispatch = useAppDispatch()
  const { user, loading, error } = useAppSelector((state) => state.user)
  
  useEffect(() => {
    // Dispatch async thunk like regular action
    dispatch(fetchUser(userId))
  }, [dispatch, userId])
  
  const handleUpdate = async () => {
    // Can await thunk and handle result
    const result = await dispatch(updateUser({ 
      id: userId, 
      data: { name: 'New Name' }
    }))
    
    if (updateUser.fulfilled.match(result)) {
      console.log('Updated!', result.payload)
    } else {
      console.error('Failed:', result.error)
    }
  }
  
  if (loading === 'pending') return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user found</div>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={handleUpdate}>Update Name</button>
    </div>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>4. Thunk with thunkAPI Options:</h4>
        <pre>{`export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number, thunkAPI) => {
    // Access state
    const state = thunkAPI.getState() as RootState
    const currentUser = state.user.user
    
    // Dispatch other actions
    thunkAPI.dispatch(setLoading(true))
    
    // Check if already fetched
    if (state.posts.items.length > 0) {
      return thunkAPI.rejectWithValue('Already loaded')
    }
    
    try {
      const response = await fetch(\`/api/users/\${userId}/posts\`)
      return await response.json()
    } catch (error) {
      // Access signal for cancellation
      if (thunkAPI.signal.aborted) {
        return thunkAPI.rejectWithValue('Request cancelled')
      }
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// Cancel ongoing request
const promise = dispatch(fetchUserPosts(123))
promise.abort()  // Cancels the request`}</pre>
      </div>
    </div>
  )
}

function RTKQuerySection() {
  return (
    <div className="section">
      <h3>RTK Query - Data Fetching & Caching</h3>
      <p>
        RTK Query is a powerful data fetching and caching tool built into Redux Toolkit.
        It eliminates the need to write thunks, reducers, and state management for API calls.
      </p>

      <div className="code-block">
        <h4>1. Create API Service:</h4>
        <pre>{`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  email: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Post', 'User'],  // For cache invalidation
  endpoints: (builder) => ({
    // Query - GET request
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post']  // Cache tag
    }),
    
    getPost: builder.query<Post, number>({
      query: (id) => \`/posts/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'Post', id }]
    }),
    
    getUser: builder.query<User, number>({
      query: (id) => \`/users/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'User', id }]
    }),
    
    // Mutation - POST/PUT/DELETE request
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Post']  // Refetch all posts
    }),
    
    updatePost: builder.mutation<Post, { id: number; data: Partial<Post> }>({
      query: ({ id, data }) => ({
        url: \`/posts/\${id}\`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
    }),
    
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: \`/posts/\${id}\`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }]
    })
  })
})

// Auto-generated hooks!
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = api`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Add API to Store:</h4>
        <pre>{`import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // other reducers...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Using Query Hooks:</h4>
        <pre>{`import { useGetPostsQuery, useGetPostQuery } from './services/api'

function PostsList() {
  // Auto-fetches on mount, caches, refetches on focus
  const { data, error, isLoading, isFetching, refetch } = useGetPostsQuery()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.toString()}</div>
  
  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {isFetching && <span>Updating...</span>}
      
      {data?.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

function PostDetail({ postId }: { postId: number }) {
  // Pass parameters to query
  const { data: post, isLoading } = useGetPostQuery(postId)
  
  // Skip query conditionally
  const { data: user } = useGetUserQuery(post?.userId ?? 0, {
    skip: !post?.userId  // Don't fetch until we have userId
  })
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>By: {user?.name}</p>
      <p>{post?.body}</p>
    </div>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>4. Using Mutation Hooks:</h4>
        <pre>{`import { useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from './services/api'

function PostForm({ postId }: { postId?: number }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  
  // Mutation hooks
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
  
  const handleCreate = async () => {
    try {
      // Returns a promise with the result
      const result = await createPost({ title, body, userId: 1 }).unwrap()
      console.log('Created:', result)
      alert('Post created!')
    } catch (error) {
      console.error('Failed:', error)
    }
  }
  
  const handleUpdate = async () => {
    if (!postId) return
    await updatePost({ 
      id: postId, 
      data: { title, body } 
    }).unwrap()
  }
  
  const handleDelete = async () => {
    if (!postId) return
    if (confirm('Delete this post?')) {
      await deletePost(postId).unwrap()
    }
  }
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      
      <button type="submit" disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create Post'}
      </button>
      
      {postId && (
        <>
          <button onClick={handleUpdate} disabled={isUpdating}>
            Update
          </button>
          <button onClick={handleDelete} disabled={isDeleting}>
            Delete
          </button>
        </>
      )}
    </form>
  )
}`}</pre>
      </div>

      <div className="code-block">
        <h4>5. Advanced Query Options:</h4>
        <pre>{`function PostWithOptions() {
  const { data, error, isLoading } = useGetPostsQuery(undefined, {
    // Polling - refetch every 5 seconds
    pollingInterval: 5000,
    
    // Refetch on mount if data is older than 60s
    refetchOnMountOrArgChange: 60,
    
    // Refetch on window focus
    refetchOnFocus: true,
    
    // Refetch on network reconnect
    refetchOnReconnect: true,
    
    // Skip query
    skip: false,
    
    // Transform response
    selectFromResult: ({ data, ...other }) => ({
      data: data?.slice(0, 10), // Only first 10 posts
      ...other
    })
  })
  
  return <div>...</div>
}`}</pre>
      </div>

      <div className="info-box">
        <h4>💡 RTK Query Benefits:</h4>
        <ul>
          <li>Automatic caching and refetching</li>
          <li>Loading and error states handled automatically</li>
          <li>No need to write reducers/thunks for API calls</li>
          <li>Cache invalidation and refetching</li>
          <li>Polling and real-time updates</li>
          <li>Optimistic updates</li>
          <li>TypeScript support out of the box</li>
        </ul>
      </div>
    </div>
  )
}

function SelectorsSection() {
  return (
    <div className="section">
      <h3>Selectors & Memoization</h3>

      <div className="code-block">
        <h4>1. Basic Selectors:</h4>
        <pre>{`// In component
const todos = useAppSelector((state) => state.todos.items)
const filter = useAppSelector((state) => state.todos.filter)

// Better: Create selector functions
// selectors.ts
export const selectTodos = (state: RootState) => state.todos.items
export const selectFilter = (state: RootState) => state.todos.filter

// In component
const todos = useAppSelector(selectTodos)
const filter = useAppSelector(selectFilter)`}</pre>
      </div>

      <div className="code-block">
        <h4>2. createSelector - Memoized Selectors:</h4>
        <pre>{`import { createSelector } from '@reduxjs/toolkit'

// Input selectors
const selectTodos = (state: RootState) => state.todos.items
const selectFilter = (state: RootState) => state.todos.filter

// Memoized selector - only recalculates when inputs change
export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    console.log('Filtering...') // Only logs when todos or filter changes
    
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed)
      case 'completed':
        return todos.filter(t => t.completed)
      default:
        return todos
    }
  }
)

// Multiple memoized selectors
export const selectCompletedCount = createSelector(
  [selectTodos],
  (todos) => todos.filter(t => t.completed).length
)

export const selectActiveCount = createSelector(
  [selectTodos],
  (todos) => todos.filter(t => !t.completed).length
)

export const selectTodoById = createSelector(
  [selectTodos, (state: RootState, todoId: string) => todoId],
  (todos, todoId) => todos.find(t => t.id === todoId)
)

// Usage
function TodoList() {
  const filteredTodos = useAppSelector(selectFilteredTodos)
  const completedCount = useAppSelector(selectCompletedCount)
  const activeCount = useAppSelector(selectActiveCount)
  
  return <div>...</div>
}`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Parametric Selectors:</h4>
        <pre>{`// Selector that accepts parameters
export const selectTodoById = (todoId: string) =>
  createSelector(
    [selectTodos],
    (todos) => todos.find(t => t.id === todoId)
  )

// Usage
function TodoItem({ todoId }: { todoId: string }) {
  const todo = useAppSelector(selectTodoById(todoId))
  return <div>{todo?.text}</div>
}

// Alternative with inline parameter
export const selectTodoById2 = createSelector(
  [
    (state: RootState) => state.todos.items,
    (_: RootState, todoId: string) => todoId
  ],
  (todos, todoId) => todos.find(t => t.id === todoId)
)

// Usage
const todo = useAppSelector((state) => selectTodoById2(state, todoId))`}</pre>
      </div>

      <div className="code-block">
        <h4>4. Entity Adapter Selectors:</h4>
        <pre>{`import { createEntityAdapter } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>()

// Generated selectors
const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
)

// Available selectors:
// - selectIds: string[]
// - selectEntities: Record<string, User>
// - selectAll: User[]
// - selectTotal: number
// - selectById: (state, id) => User | undefined

function UserList() {
  const users = useAppSelector(usersSelectors.selectAll)
  const userIds = useAppSelector(usersSelectors.selectIds)
  const total = useAppSelector(usersSelectors.selectTotal)
  
  return <div>Total users: {total}</div>
}

function UserDetail({ userId }: { userId: string }) {
  const user = useAppSelector((state) => 
    usersSelectors.selectById(state, userId)
  )
  return <div>{user?.name}</div>
}`}</pre>
      </div>
    </div>
  )
}

function MiddlewareSection() {
  return (
    <div className="section">
      <h3>Middleware & DevTools</h3>

      <div className="code-block">
        <h4>1. Custom Middleware:</h4>
        <pre>{`import { Middleware } from '@reduxjs/toolkit'

// Logger middleware
const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action)
  const result = next(action)
  console.log('Next state:', storeAPI.getState())
  return result
}

// Analytics middleware
const analyticsMiddleware: Middleware = () => (next) => (action) => {
  if (action.type.startsWith('todos/')) {
    // Send to analytics
    analytics.track(action.type, action.payload)
  }
  return next(action)
}

// Add to store
export const store = configureStore({
  reducer: {...},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(analyticsMiddleware)
})`}</pre>
      </div>

      <div className="code-block">
        <h4>2. Listener Middleware (RTK 1.9+):</h4>
        <pre>{`import { createListenerMiddleware } from '@reduxjs/toolkit'

const listenerMiddleware = createListenerMiddleware()

// Listen for specific action
listenerMiddleware.startListening({
  actionCreator: todoAdded,
  effect: async (action, listenerApi) => {
    // Can cancel previous runs
    listenerApi.cancelActiveListeners()
    
    // Access state
    const state = listenerApi.getState()
    
    // Dispatch other actions
    listenerApi.dispatch(saveToLocalStorage(state.todos))
    
    // Async operations
    await delay(1000)
    listenerApi.dispatch(showNotification('Todo added!'))
  }
})

// Listen for pattern
listenerMiddleware.startListening({
  predicate: (action) => action.type.endsWith('/fulfilled'),
  effect: (action, listenerApi) => {
    console.log('Async action completed:', action)
  }
})

// Add to store
export const store = configureStore({
  reducer: {...},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
})`}</pre>
      </div>

      <div className="code-block">
        <h4>3. Redux DevTools:</h4>
        <pre>{`// Auto-enabled by configureStore!

// Custom configuration
export const store = configureStore({
  reducer: {...},
  devTools: {
    // Customize DevTools
    name: 'My App',
    maxAge: 50,  // Limit action history
    trace: true,  // Show stack traces
    traceLimit: 25
  }
})

// Disable in production
export const store = configureStore({
  reducer: {...},
  devTools: process.env.NODE_ENV !== 'production'
})`}</pre>
      </div>

      <div className="code-block">
        <h4>4. Immutability Middleware:</h4>
        <pre>{`// Detects mutations - enabled by default in development
export const store = configureStore({
  reducer: {...},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Immutability check options
      immutableCheck: {
        warnAfter: 128,  // Warn if check takes > 128ms
        ignoredPaths: ['ignoreThis.field']
      },
      // Serializability check options
      serializableCheck: {
        warnAfter: 128,
        // Ignore non-serializable values
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['items.date']
      }
    })
})`}</pre>
      </div>
    </div>
  )
}

function InterviewQASection() {
  return (
    <div className="section">
      <h3>🎯 Redux Toolkit Interview Questions</h3>

      <div className="qa-block">
        <h4>Q1: What is Redux Toolkit and why was it created?</h4>
        <p><strong>Answer:</strong></p>
        <p>
          Redux Toolkit (RTK) is the official, recommended way to write Redux logic.
          It was created to address three major concerns with Redux:
        </p>
        <ul>
          <li><strong>Too much boilerplate</strong> - Action types, action creators, switch statements</li>
          <li><strong>Configuration complexity</strong> - Setting up store with middleware, DevTools, etc.</li>
          <li><strong>Additional packages needed</strong> - Redux Thunk, Immer, Reselect, etc.</li>
        </ul>
        <p>
          RTK includes these packages and provides utilities that simplify the most common Redux use cases.
        </p>
      </div>

      <div className="qa-block">
        <h4>Q2: What's the difference between createSlice and createReducer?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// createSlice - Complete slice (actions + reducer)
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,  // Actions auto-generated!
    decrement: (state) => state - 1
  }
})
// Export: counterSlice.actions, counterSlice.reducer

// createReducer - Just the reducer
const counterReducer = createReducer(0, (builder) => {
  builder
    .addCase('counter/increment', (state) => state + 1)
    .addCase('counter/decrement', (state) => state - 1)
})
// Must define action types yourself`}</pre>
        <p>
          <strong>createSlice</strong> is the recommended approach - it generates action creators automatically
          and is less verbose. Use <strong>createReducer</strong> only if you need to handle actions from
          multiple slices.
        </p>
      </div>

      <div className="qa-block">
        <h4>Q3: How does Redux Toolkit handle immutability?</h4>
        <p><strong>Answer:</strong></p>
        <p>
          RTK uses <strong>Immer</strong> library internally. Immer allows you to write "mutating" logic
          in reducers, but it actually creates immutable updates behind the scenes using Proxies.
        </p>
        <pre>{`// With RTK - looks like mutation, but isn't!
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)  // Direct push!
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload)
      todo.completed = !todo.completed  // Direct mutation!
    }
  }
})

// Without RTK - manual immutability
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]  // Spread operator
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )
  }
}`}</pre>
        <p>
          You can either <strong>mutate</strong> the draft state directly, or <strong>return</strong> a new value.
          Don't do both!
        </p>
      </div>

      <div className="qa-block">
        <h4>Q4: Explain createAsyncThunk lifecycle</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: number) => {
    const response = await fetch(\`/api/users/\${userId}\`)
    return response.json()
  }
)

// Generates 3 action types:
// - 'user/fetchUser/pending'    - When promise starts
// - 'user/fetchUser/fulfilled'  - When promise resolves
// - 'user/fetchUser/rejected'   - When promise rejects

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q5: What is RTK Query and when to use it?</h4>
        <p><strong>Answer:</strong></p>
        <p>
          RTK Query is a data fetching and caching tool built into Redux Toolkit. It eliminates
          the need to write thunks, reducers, and state management for API calls.
        </p>
        <p><strong>Benefits:</strong></p>
        <ul>
          <li>Automatic caching and refetching</li>
          <li>No manual state management for loading/error states</li>
          <li>Cache invalidation and updates</li>
          <li>Optimistic updates</li>
          <li>Polling and real-time data</li>
          <li>Auto-generated React hooks</li>
        </ul>
        <p><strong>Use when:</strong> You have a REST/GraphQL API and want built-in caching</p>
        <p><strong>Don't use when:</strong> API is very complex or non-standard (use createAsyncThunk instead)</p>
      </div>

      <div className="qa-block">
        <h4>Q6: Difference between reducers and extraReducers?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  
  // reducers - Define actions for THIS slice
  // Actions are auto-generated: counter/increment, counter/decrement
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  },
  
  // extraReducers - Handle actions from OTHER slices or async thunks
  // No auto-generation, just respond to existing actions
  extraReducers: (builder) => {
    builder
      // Handle async thunk
      .addCase(fetchUser.fulfilled, (state) => {
        return 0  // Reset counter when user loads
      })
      // Handle action from another slice
      .addCase(userSlice.actions.logout, (state) => {
        return 0  // Reset on logout
      })
  }
})`}</pre>
        <p>
          <strong>reducers:</strong> For actions owned by this slice<br/>
          <strong>extraReducers:</strong> For actions from external sources (other slices, thunks, libraries)
        </p>
      </div>

      <div className="qa-block">
        <h4>Q7: How to handle optimistic updates in RTK?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`// With RTK Query
const api = createApi({
  endpoints: (builder) => ({
    updateTodo: builder.mutation<Todo, { id: string; data: Partial<Todo> }>({
      query: ({ id, data }) => ({
        url: \`/todos/\${id}\`,
        method: 'PATCH',
        body: data
      }),
      // Optimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Update cache immediately
        const patchResult = dispatch(
          api.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find(t => t.id === id)
            if (todo) Object.assign(todo, data)
          })
        )
        
        try {
          await queryFulfilled
        } catch {
          // Rollback on error
          patchResult.undo()
        }
      }
    })
  })
})`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q8: What are selectors and why use createSelector?</h4>
        <p><strong>Answer:</strong></p>
        <p>
          <strong>Selectors</strong> are functions that extract specific pieces of state from the store.
          <strong>createSelector</strong> creates memoized selectors that only recalculate when inputs change.
        </p>
        <pre>{`// Problem: Recalculates on EVERY render
function TodoList() {
  const filteredTodos = useAppSelector((state) => 
    state.todos.filter(t => !t.completed)  // Creates new array every time!
  )
}

// Solution: Memoized selector
const selectActiveTodos = createSelector(
  [(state: RootState) => state.todos],
  (todos) => todos.filter(t => !t.completed)  // Only recalc when todos change
)

function TodoList() {
  const filteredTodos = useAppSelector(selectActiveTodos)  // Same array reference
}`}</pre>
        <p>
          Without memoization, components re-render unnecessarily because the selector returns a
          new array reference even if the data didn't change.
        </p>
      </div>

      <div className="qa-block">
        <h4>Q9: How to cancel async thunks?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`const fetchData = createAsyncThunk(
  'data/fetch',
  async (arg, { signal }) => {
    const response = await fetch('/api/data', { signal })
    return response.json()
  }
)

function Component() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const promise = dispatch(fetchData())
    
    return () => {
      promise.abort()  // Cancel on unmount
    }
  }, [dispatch])
}`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q10: Explain prepare callback in createSlice</h4>
        <p><strong>Answer:</strong></p>
        <p>
          The <strong>prepare callback</strong> customizes action payload before it reaches the reducer.
          Use it to add extra fields or process the payload.
        </p>
        <pre>{`const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    // Without prepare - simple payload
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: Date.now(), text: action.payload })
    },
    
    // With prepare - custom payload
    addTodoWithPrepare: {
      reducer: (state, action: PayloadAction<{id: string, text: string, createdAt: number}>) => {
        state.push(action.payload)
      },
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),  // Generate ID here
          text,
          createdAt: Date.now()  // Add timestamp
        }
      })
    }
  }
})

// Usage
dispatch(addTodo('Simple'))
dispatch(addTodoWithPrepare('With metadata'))  // ID and timestamp added automatically`}</pre>
      </div>

      <div className="qa-block">
        <h4>Q11: How to structure large Redux apps?</h4>
        <p><strong>Answer:</strong></p>
        <pre>{`src/
├── store.ts                    # Store configuration
├── hooks.ts                    # Typed hooks
├── features/                   # Feature-based organization
│   ├── auth/
│   │   ├── authSlice.ts       # State + actions
│   │   ├── authThunks.ts      # Async operations
│   │   ├── authSelectors.ts   # Memoized selectors
│   │   ├── authAPI.ts         # API calls
│   │   └── components/        # Feature components
│   ├── todos/
│   │   ├── todosSlice.ts
│   │   ├── todosSelectors.ts
│   │   └── components/
│   └── users/
├── services/
│   └── api.ts                  # RTK Query API definition
└── middleware/
    └── analytics.ts            # Custom middleware

// Alternative: Domain-based structure
src/
├── domains/
│   ├── user/
│   ├── product/
│   └── order/`}</pre>
        <p>
          <strong>Feature-based</strong> - Group by feature (todos, users, etc.)<br/>
          <strong>Domain-based</strong> - Group by business domain (e-commerce, CRM, etc.)
        </p>
      </div>

      <div className="qa-block">
        <h4>Q12: Redux Toolkit vs Context API - when to use each?</h4>
        <p><strong>Answer:</strong></p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Redux Toolkit</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Context API</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Complex state logic</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Simple state sharing</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Frequent updates</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Infrequent updates</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Multiple consumers</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Few consumers</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Need DevTools</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>No debugging needed</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Time-travel debugging</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Simple prop drilling fix</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Middleware needed</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>No middleware</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Use Redux when:</strong> App-wide state, complex updates, many components need same data</p>
        <p><strong>Use Context when:</strong> Theme, auth, i18n, or other infrequently changing data</p>
      </div>

      <div className="info-box">
        <h4>💡 Key Takeaways:</h4>
        <ul>
          <li>Redux Toolkit is the modern, official way to write Redux</li>
          <li>createSlice combines actions and reducers with less boilerplate</li>
          <li>Immer allows "mutating" syntax for immutable updates</li>
          <li>createAsyncThunk handles async operations with lifecycle actions</li>
          <li>RTK Query eliminates manual data fetching state management</li>
          <li>createSelector memoizes computed values to prevent unnecessary recalculations</li>
          <li>Always use TypeScript for type-safe state management</li>
          <li>Redux DevTools built-in for debugging</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// LIVE DEMO 1: Counter with Redux Toolkit
// ============================================

import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'

// Counter Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, history: [] as number[] },
  reducers: {
    increment: (state) => {
      state.value += 1
      state.history.push(state.value)
    },
    decrement: (state) => {
      state.value -= 1
      state.history.push(state.value)
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
      state.history.push(state.value)
    },
    reset: (state) => {
      state.value = 0
      state.history = [0]
    }
  }
})

const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

// Store
const counterStore = configureStore({
  reducer: { counter: counterSlice.reducer }
})

type CounterRootState = ReturnType<typeof counterStore.getState>

function CounterComponent() {
  const count = useSelector((state: CounterRootState) => state.counter.value)
  const history = useSelector((state: CounterRootState) => state.counter.history)
  const dispatch = useDispatch()

  return (
    <div className="demo-box" style={{ padding: '1.5rem' }}>
      <h4>🎯 Live Counter Demo</h4>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
        Count: {count}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => dispatch(increment())}>
          + Increment
        </button>
        <button onClick={() => dispatch(decrement())}>
          - Decrement
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          +5
        </button>
        <button onClick={() => dispatch(incrementByAmount(10))}>
          +10
        </button>
        <button onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', color: '#333' }}>
        <strong style={{ color: '#333' }}>History:</strong> <span style={{ color: '#333' }}>{history.join(' → ')}</span>
      </div>
    </div>
  )
}

function LiveCounterDemo() {
  return (
    <div className="section">
      <h3>Live Demo: Counter with Redux Toolkit</h3>
      <Provider store={counterStore}>
        <CounterComponent />
      </Provider>

      <div className="code-block" style={{ marginTop: '1rem' }}>
        <h4>Code:</h4>
        <pre>{`import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'

// 1. Create Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, history: [] },
  reducers: {
    increment: (state) => {
      state.value += 1  // Direct mutation with Immer!
      state.history.push(state.value)
    },
    decrement: (state) => {
      state.value -= 1
      state.history.push(state.value)
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
      state.history.push(state.value)
    },
    reset: (state) => {
      state.value = 0
      state.history = [0]
    }
  }
})

// 2. Export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

// 3. Create store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
})

// 4. Use in component
function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

// 5. Wrap with Provider
<Provider store={store}>
  <Counter />
</Provider>`}</pre>
      </div>
    </div>
  )
}

// ============================================
// LIVE DEMO 2: Todos with Redux Toolkit
// ============================================

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodosState {
  items: Todo[]
  filter: 'all' | 'active' | 'completed'
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: { items: [], filter: 'all' } as TodosState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false
      })
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(t => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(t => !t.completed)
    }
  }
})

const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todosSlice.actions

const todosStore = configureStore({
  reducer: { todos: todosSlice.reducer }
})

type TodosRootState = ReturnType<typeof todosStore.getState>

function TodosComponent() {
  const todos = useSelector((state: TodosRootState) => state.todos.items)
  const filter = useSelector((state: TodosRootState) => state.todos.filter)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      dispatch(addTodo(input))
      setInput('')
    }
  }

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="demo-box" style={{ padding: '1.5rem' }}>
      <h4>📝 Live Todos Demo</h4>
      
      <form onSubmit={handleAdd} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
        />
        <button type="submit">Add Todo</button>
      </form>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => dispatch(setFilter('all'))}
          style={{ background: filter === 'all' ? '#4CAF50' : '' }}
        >
          All ({todos.length})
        </button>
        <button 
          onClick={() => dispatch(setFilter('active'))}
          style={{ background: filter === 'active' ? '#4CAF50' : '' }}
        >
          Active ({activeCount})
        </button>
        <button 
          onClick={() => dispatch(setFilter('completed'))}
          style={{ background: filter === 'completed' ? '#4CAF50' : '' }}
        >
          Completed ({completedCount})
        </button>
        {completedCount > 0 && (
          <button onClick={() => dispatch(clearCompleted())}>
            Clear Completed
          </button>
        )}
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredTodos.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No todos to display</p>
        ) : (
          filteredTodos.map(todo => (
            <div 
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                background: '#f9f9f9',
                marginBottom: '0.5rem',
                borderRadius: '4px',
                color: '#333'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#333'
              }}>
                {todo.text}
              </span>
              <button 
                onClick={() => dispatch(deleteTodo(todo.id))}
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function LiveTodosDemo() {
  return (
    <div className="section">
      <h3>Live Demo: Todos App with Redux Toolkit</h3>
      <Provider store={todosStore}>
        <TodosComponent />
      </Provider>

      <div className="code-block" style={{ marginTop: '1rem' }}>
        <h4>Key Features Demonstrated:</h4>
        <ul>
          <li>✅ <strong>createSlice</strong> - Single source for actions and reducers</li>
          <li>✅ <strong>Immer integration</strong> - Direct state mutation (state.items.push)</li>
          <li>✅ <strong>Multiple reducers</strong> - Add, toggle, delete, filter, clear</li>
          <li>✅ <strong>Derived state</strong> - Filtered todos based on filter state</li>
          <li>✅ <strong>useSelector</strong> - Subscribe to specific state slices</li>
          <li>✅ <strong>useDispatch</strong> - Dispatch actions to update state</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// LIVE DEMO 3: Async Users with Thunks
// ============================================

import { createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: number
  name: string
  email: string
  company: { name: string }
}

interface UsersState {
  users: User[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
  selectedUser: User | null
  loadingUserId: number | null
}

// Async thunk
const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return await response.json() as User[]
  }
)

const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    return await response.json() as User
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: 'idle',
    error: null,
    selectedUser: null,
    loadingUserId: null
  } as UsersState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message || 'Failed to fetch users'
      })
      // Fetch single user - track which card is loading
      .addCase(fetchUserById.pending, (state, action) => {
        state.loadingUserId = action.meta.arg
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.loadingUserId = null
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch user'
        state.loadingUserId = null
      })
  }
})

const { clearSelectedUser } = usersSlice.actions

const usersStore = configureStore({
  reducer: { users: usersSlice.reducer }
})

type UsersRootState = ReturnType<typeof usersStore.getState>

function UsersComponent() {
  const { users, loading, error, selectedUser, loadingUserId } = useSelector((state: UsersRootState) => state.users)
  const dispatch = useDispatch()

  return (
    <div className="demo-box" style={{ padding: '1.5rem' }}>
      <h4>👥 Live Async Users Demo</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => dispatch(fetchUsers() as any)}>
          Fetch Users from API
        </button>
        {loading === 'pending' && <span style={{ marginLeft: '1rem' }}>Loading...</span>}
      </div>

      {error && (
        <div style={{ padding: '1rem', background: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}

      {loading === 'succeeded' && users.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          {users.slice(0, 6).map(user => (
            <div 
              key={user.id}
              style={{
                padding: '1rem',
                background: '#f5f5f5',
                borderRadius: '4px',
                border: selectedUser?.id === user.id ? '2px solid #4CAF50' : '1px solid #ddd',
                color: '#333',
                position: 'relative',
                opacity: loadingUserId === user.id ? 0.6 : 1
              }}
            >
              {loadingUserId === user.id && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  width: '20px',
                  height: '20px',
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #4CAF50',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              )}
              <h5 style={{ margin: '0 0 0.5rem 0', color: '#1a1a1a' }}>{user.name}</h5>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#444' }}>{user.email}</p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>{user.company.name}</p>
              <button 
                onClick={() => dispatch(fetchUserById(user.id) as any)}
                disabled={loadingUserId === user.id}
                style={{ marginTop: '0.5rem', fontSize: '0.85rem', padding: '0.25rem 0.5rem' }}
              >
                {loadingUserId === user.id ? 'Loading...' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedUser && (
        <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '4px', border: '2px solid #4CAF50' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, color: '#1b5e20' }}>Selected User Details</h4>
            <button onClick={() => dispatch(clearSelectedUser())}>Close</button>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: '#1b5e20' }}><strong style={{ color: '#1b5e20' }}>Name:</strong> {selectedUser.name}</p>
            <p style={{ color: '#1b5e20' }}><strong style={{ color: '#1b5e20' }}>Email:</strong> {selectedUser.email}</p>
            <p style={{ color: '#1b5e20' }}><strong style={{ color: '#1b5e20' }}>Company:</strong> {selectedUser.company.name}</p>
            <p style={{ color: '#1b5e20' }}><strong style={{ color: '#1b5e20' }}>ID:</strong> {selectedUser.id}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function LiveUsersDemo() {
  return (
    <div className="section">
      <h3>Live Demo: Async Data Fetching with createAsyncThunk</h3>
      <Provider store={usersStore}>
        <UsersComponent />
      </Provider>

      <div className="code-block" style={{ marginTop: '1rem' }}>
        <h4>Code Highlights:</h4>
        <pre>{`// 1. Create async thunk
const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return await response.json()
  }
)

// 2. Handle in extraReducers
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.loading = 'pending'
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.users = action.payload
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error.message
    })
}

// 3. Dispatch from component
dispatch(fetchUsers())`}</pre>
      </div>

      <div className="info-box">
        <h4>💡 Features Demonstrated:</h4>
        <ul>
          <li>✅ <strong>createAsyncThunk</strong> - Handles async operations automatically</li>
          <li>✅ <strong>Lifecycle states</strong> - pending, fulfilled, rejected</li>
          <li>✅ <strong>Loading states</strong> - Shows loading indicator during fetch</li>
          <li>✅ <strong>Error handling</strong> - Catches and displays errors</li>
          <li>✅ <strong>Real API integration</strong> - JSONPlaceholder API</li>
          <li>✅ <strong>Multiple thunks</strong> - Fetch list and single item</li>
        </ul>
      </div>
    </div>
  )
}
