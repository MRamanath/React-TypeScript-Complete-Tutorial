import UseCallbackDemo from './UseCallbackDemo'
import UseMemoDemo from './UseMemoDemo'
import UseEffectVsLayoutEffect from './UseEffectVsLayoutEffect'
import UseStateVsReducer from './UseStateVsReducer'
import { useState } from 'react'

export default function HooksDeepDive() {
  const [activeDemo, setActiveDemo] = useState('callback')

  const demos = [
    { id: 'callback', label: 'useCallback', component: UseCallbackDemo },
    { id: 'memo', label: 'useMemo', component: UseMemoDemo },
    { id: 'effect-layout', label: 'useEffect vs useLayoutEffect', component: UseEffectVsLayoutEffect },
    { id: 'state-reducer', label: 'useState vs useReducer', component: UseStateVsReducer },
  ]

  const ActiveDemo = demos.find(d => d.id === activeDemo)?.component || UseCallbackDemo

  return (
    <div>
      <h1>Hooks Deep Dive</h1>
      <p className="subtitle">Advanced hook patterns and comparisons</p>

      <nav className="demo-nav">
        {demos.map(demo => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={activeDemo === demo.id ? 'active' : ''}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <ActiveDemo />
    </div>
  )
}
