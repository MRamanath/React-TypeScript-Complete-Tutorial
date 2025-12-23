import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'

/**
 * Refs and DOM Access
 * Demonstrates various use cases for refs
 */

// 1. Focus Management
function FocusExample() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  return (
    <div className="card">
      <h3>1. Focus Management</h3>
      <button onClick={() => setShowInput(!showInput)}>
        {showInput ? 'Hide' : 'Show'} Input
      </button>
      {showInput && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Auto-focused on mount"
          style={{ marginTop: '1rem', width: '100%' }}
        />
      )}
      <p className="info">✓ Input automatically receives focus when shown</p>
    </div>
  )
}

// 2. Measuring DOM Elements
function MeasureExample() {
  const divRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const measure = () => {
    if (divRef.current) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight
      })
    }
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div className="card">
      <h3>2. Measuring DOM Elements</h3>
      <div
        ref={divRef}
        style={{
          padding: '2rem',
          background: 'rgba(100, 108, 255, 0.1)',
          border: '2px solid #646cff',
          borderRadius: '8px',
          marginTop: '1rem'
        }}
      >
        <p>This div's dimensions are being measured</p>
        <p><strong>Width:</strong> {dimensions.width}px</p>
        <p><strong>Height:</strong> {dimensions.height}px</p>
      </div>
      <button onClick={measure} style={{ marginTop: '1rem' }}>
        Re-measure
      </button>
      <p className="info">✓ Reads DOM properties directly</p>
    </div>
  )
}

// 3. Integrating Third-Party Libraries (Video Player)
function VideoPlayerExample() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const play = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  const pause = () => {
    videoRef.current?.pause()
    setIsPlaying(false)
  }

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  return (
    <div className="card">
      <h3>3. Video Player Control</h3>
      <video
        ref={videoRef}
        width="100%"
        style={{ maxWidth: '400px', background: '#000', borderRadius: '4px' }}
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="button-group" style={{ marginTop: '1rem' }}>
        <button onClick={play} disabled={isPlaying}>Play</button>
        <button onClick={pause} disabled={!isPlaying}>Pause</button>
        <button onClick={() => skip(-5)}>-5s</button>
        <button onClick={() => skip(5)}>+5s</button>
      </div>
      <p>Time: {currentTime.toFixed(2)}s</p>
      <p className="info">✓ Direct DOM API access for media control</p>
    </div>
  )
}

// 4. Storing Mutable Values (doesn't trigger re-render)
function TimerExample() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const start = () => {
    if (intervalRef.current !== null) return
    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setCount(c => c + 1)
    }, 100)
  }

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    }
  }

  const reset = () => {
    stop()
    setCount(0)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="card">
      <h3>4. Storing Mutable Values</h3>
      <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>{(count / 10).toFixed(1)}s</h2>
      <div className="button-group">
        <button onClick={start} disabled={isRunning}>Start</button>
        <button onClick={stop} disabled={!isRunning}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p className="info">
        ✓ Interval ID stored in ref (doesn't cause re-render)<br />
        ⚠️ Storing in state would cause unnecessary re-renders
      </p>
    </div>
  )
}

// 5. Ref Forwarding
interface FancyInputProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FancyInput = forwardRef<HTMLInputElement, FancyInputProps>(
  ({ placeholder, value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '2px solid #646cff',
          borderRadius: '4px',
          background: '#2a2a2a',
          color: 'white'
        }}
      />
    )
  }
)

function ForwardRefExample() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const selectAll = () => {
    inputRef.current?.select()
  }

  return (
    <div className="card">
      <h3>5. Ref Forwarding</h3>
      <FancyInput
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <div className="button-group" style={{ marginTop: '1rem' }}>
        <button onClick={focusInput}>Focus Input</button>
        <button onClick={selectAll}>Select All</button>
      </div>
      <p className="info">✓ Parent can control child's DOM element via forwardRef</p>
    </div>
  )
}

// 6. useImperativeHandle - Exposing Custom API
interface CustomInputHandle {
  focus: () => void
  clear: () => void
  getValue: () => string
}

interface CustomInputProps {
  defaultValue?: string
}

const CustomInput = forwardRef<CustomInputHandle, CustomInputProps>(
  ({ defaultValue = '' }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState(defaultValue)

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      clear: () => {
        setValue('')
        inputRef.current?.focus()
      },
      getValue: () => {
        return value
      }
    }))

    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '2px solid #646cff',
          borderRadius: '4px',
          background: '#2a2a2a',
          color: 'white'
        }}
      />
    )
  }
)

function ImperativeHandleExample() {
  const customInputRef = useRef<CustomInputHandle>(null)
  const [message, setMessage] = useState('')

  const handleFocus = () => {
    customInputRef.current?.focus()
  }

  const handleClear = () => {
    customInputRef.current?.clear()
  }

  const handleGetValue = () => {
    const value = customInputRef.current?.getValue()
    setMessage(`Current value: "${value}"`)
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="card">
      <h3>6. useImperativeHandle - Custom API</h3>
      <CustomInput ref={customInputRef} defaultValue="Edit me!" />
      <div className="button-group" style={{ marginTop: '1rem' }}>
        <button onClick={handleFocus}>Focus</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleGetValue}>Get Value</button>
      </div>
      {message && <p className="success">{message}</p>}
      <p className="info">
        ✓ Exposes custom imperative API instead of raw DOM<br />
        ✓ More control over what parent can access
      </p>
    </div>
  )
}

export default function RefsAndDOM() {
  return (
    <div className="example-container">
      <h2>Refs and DOM Access</h2>
      <p className="subtitle">Direct access to DOM elements and imperative operations</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <FocusExample />
        <MeasureExample />
        <VideoPlayerExample />
        <TimerExample />
        <ForwardRefExample />
        <ImperativeHandleExample />
      </div>

      <div className="section">
        <h3>When to Use Refs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>✅ Good Use Cases:</h4>
            <ul>
              <li>Managing focus, text selection</li>
              <li>Triggering animations</li>
              <li>Integrating with DOM libraries</li>
              <li>Measuring DOM elements</li>
              <li>Storing mutable values (timers, subscriptions)</li>
              <li>Accessing media elements (video, audio)</li>
            </ul>
          </div>
          <div className="card">
            <h4>❌ Avoid Using Refs For:</h4>
            <ul>
              <li>Things that can be done declaratively</li>
              <li>Data that should trigger re-renders</li>
              <li>Exposing DOM nodes from components</li>
              <li>Anything during render phase</li>
              <li>State management (use useState instead)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="summary">
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>useRef:</strong> Creates a mutable ref object that persists across renders</li>
          <li><strong>ref.current:</strong> Contains the actual value/DOM element</li>
          <li><strong>forwardRef:</strong> Allows parent to access child's DOM element</li>
          <li><strong>useImperativeHandle:</strong> Customizes the ref value exposed to parent</li>
          <li>Changing ref.current does NOT trigger re-render</li>
          <li>Refs are perfect for "escape hatches" to access DOM imperatively</li>
        </ul>
      </div>

      <div className="code-preview">
        <h4>Basic Usage:</h4>
        <pre>{`// 1. Create ref
const inputRef = useRef<HTMLInputElement>(null)

// 2. Attach to element
<input ref={inputRef} />

// 3. Access DOM node
inputRef.current?.focus()

// 4. Forward ref to child
const Child = forwardRef((props, ref) => {
  return <input ref={ref} />
})

// 5. Custom imperative API
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  clear: () => setValue('')
}))`}</pre>
      </div>
    </div>
  )
}
