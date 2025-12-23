import { useState, useReducer } from 'react'

/**
 * useState vs useReducer
 * Shows when to use simple state vs complex state management
 */

// Reducer for complex state
interface CounterState {
  count: number
  step: number
  history: number[]
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' }
  | { type: 'undo' }

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step]
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count - state.step]
      }
    case 'setStep':
      return { ...state, step: action.payload }
    case 'reset':
      return { count: 0, step: 1, history: [0] }
    case 'undo':
      if (state.history.length > 1) {
        const newHistory = state.history.slice(0, -1)
        return {
          ...state,
          count: newHistory[newHistory.length - 1],
          history: newHistory
        }
      }
      return state
    default:
      return state
  }
}

function UseStateVsReducer() {
  // Simple state with useState
  const [simpleCount, setSimpleCount] = useState(0)

  // Complex state with useReducer
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    step: 1,
    history: [0]
  })

  return (
    <div className="example-container">
      <h2>useState vs useReducer</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* useState Example */}
        <div className="section">
          <h3>useState - Simple State</h3>
          <div className="card">
            <h4>Count: {simpleCount}</h4>
            <div className="button-group">
              <button onClick={() => setSimpleCount(simpleCount + 1)}>
                +1
              </button>
              <button onClick={() => setSimpleCount(simpleCount - 1)}>
                -1
              </button>
              <button onClick={() => setSimpleCount(0)}>
                Reset
              </button>
            </div>
          </div>
          
          <div className="info-box">
            <h4>Good for:</h4>
            <ul>
              <li>✓ Single, independent values</li>
              <li>✓ Simple updates</li>
              <li>✓ No complex logic</li>
              <li>✓ Each state is separate</li>
            </ul>
          </div>

          <div className="code-preview">
            <pre>{`const [count, setCount] = useState(0)

// Direct updates
setCount(count + 1)
setCount(0)`}</pre>
          </div>
        </div>

        {/* useReducer Example */}
        <div className="section">
          <h3>useReducer - Complex State</h3>
          <div className="card">
            <h4>Count: {state.count}</h4>
            <div>
              <label>
                Step: 
                <input
                  type="number"
                  value={state.step}
                  onChange={(e) => dispatch({ 
                    type: 'setStep', 
                    payload: Number(e.target.value) 
                  })}
                  style={{ width: '60px', marginLeft: '0.5rem' }}
                />
              </label>
            </div>
            <div className="button-group">
              <button onClick={() => dispatch({ type: 'increment' })}>
                +{state.step}
              </button>
              <button onClick={() => dispatch({ type: 'decrement' })}>
                -{state.step}
              </button>
              <button onClick={() => dispatch({ type: 'reset' })}>
                Reset
              </button>
              <button 
                onClick={() => dispatch({ type: 'undo' })}
                disabled={state.history.length <= 1}
              >
                Undo
              </button>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.9em' }}>
              <strong>History:</strong> {state.history.join(' → ')}
            </div>
          </div>

          <div className="info-box">
            <h4>Good for:</h4>
            <ul>
              <li>✓ Multiple related values</li>
              <li>✓ Complex update logic</li>
              <li>✓ Next state depends on previous</li>
              <li>✓ Easier to test</li>
              <li>✓ Redux-like patterns</li>
            </ul>
          </div>

          <div className="code-preview">
            <pre>{`const [state, dispatch] = useReducer(
  reducer, 
  initialState
)

// Descriptive actions
dispatch({ type: 'increment' })
dispatch({ type: 'setStep', payload: 5 })`}</pre>
          </div>
        </div>
      </div>

      <div className="summary">
        <h4>Decision Guide:</h4>
        <table style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Use useState when...</th>
              <th>Use useReducer when...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State is a single value</td>
              <td>State has multiple sub-values</td>
            </tr>
            <tr>
              <td>Updates are simple</td>
              <td>Complex state transitions</td>
            </tr>
            <tr>
              <td>No related state logic</td>
              <td>Multiple state updates together</td>
            </tr>
            <tr>
              <td>Quick prototyping</td>
              <td>Need to test state logic separately</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UseStateVsReducer
