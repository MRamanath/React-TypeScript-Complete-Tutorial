import { useState, useRef } from 'react'

/**
 * Controlled vs Uncontrolled Components
 * Shows different approaches to form handling
 */

// Controlled Component - React controls the value
function ControlledForm() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    bio: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Controlled form submitted:', values)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="card">
      <h3>Controlled Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          <small>Characters: {values.username.length}</small>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <small>{values.email.includes('@') ? '✓ Valid format' : '⚠️ Need @'}</small>
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <small>Strength: {values.password.length < 6 ? 'Weak' : 'Strong'}</small>
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={values.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>

        <button type="submit">Submit Controlled</button>
        {submitted && <span className="success">✓ Submitted!</span>}
      </form>

      <div className="info-box">
        <h4>Current Values (Real-time):</h4>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>

      <div className="summary">
        <h4>Controlled Component Features:</h4>
        <ul>
          <li>✓ React controls the value via state</li>
          <li>✓ Single source of truth</li>
          <li>✓ Easy to validate on every keystroke</li>
          <li>✓ Can manipulate value before display</li>
          <li>✓ Easy to sync with other components</li>
        </ul>
      </div>
    </div>
  )
}

// Uncontrolled Component - DOM controls the value
function UncontrolledForm() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Read values only when needed (on submit)
    const formValues = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      bio: bioRef.current?.value,
      file: fileRef.current?.files?.[0]?.name
    }
    
    console.log('Uncontrolled form submitted:', formValues)
    setValues(formValues)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="card">
      <h3>Uncontrolled Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            defaultValue="JohnDoe"
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            defaultValue="john@example.com"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            defaultValue="password123"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            ref={bioRef}
            name="bio"
            defaultValue="Hello world"
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>File Upload:</label>
          <input
            ref={fileRef}
            type="file"
            name="file"
          />
          <small>⚠️ File inputs are always uncontrolled</small>
        </div>

        <button type="submit">Submit Uncontrolled</button>
        {submitted && <span className="success">✓ Submitted!</span>}
      </form>

      {values && (
        <div className="info-box">
          <h4>Submitted Values:</h4>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}

      <div className="summary">
        <h4>Uncontrolled Component Features:</h4>
        <ul>
          <li>✓ DOM controls the value</li>
          <li>✓ Less code, simpler</li>
          <li>✓ Better performance (no re-renders on change)</li>
          <li>✓ Easier integration with non-React code</li>
          <li>✓ Must use refs to access values</li>
        </ul>
      </div>
    </div>
  )
}

export default function ControlledVsUncontrolled() {
  return (
    <div className="example-container">
      <h2>Controlled vs Uncontrolled Components</h2>

      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <ControlledForm />
          <UncontrolledForm />
        </div>
      </div>

      <div className="section">
        <h3>Comparison</h3>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Controlled</th>
              <th>Uncontrolled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Value Source</strong></td>
              <td>React state</td>
              <td>DOM</td>
            </tr>
            <tr>
              <td><strong>Access Value</strong></td>
              <td>Always available in state</td>
              <td>Via ref when needed</td>
            </tr>
            <tr>
              <td><strong>Validation</strong></td>
              <td>Real-time, on every change</td>
              <td>On submit or specific events</td>
            </tr>
            <tr>
              <td><strong>Re-renders</strong></td>
              <td>On every keystroke</td>
              <td>Only on submit or manual trigger</td>
            </tr>
            <tr>
              <td><strong>Code Complexity</strong></td>
              <td>More code (state, handlers)</td>
              <td>Less code (just refs)</td>
            </tr>
            <tr>
              <td><strong>Performance</strong></td>
              <td>Slower for large forms</td>
              <td>Faster (fewer re-renders)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>When to Use Each</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>Use Controlled When:</h4>
            <ul>
              <li>Need instant validation</li>
              <li>Conditional field enabling</li>
              <li>Format input on the fly</li>
              <li>Sync with other components</li>
              <li>Dynamic form fields</li>
              <li>Need to enforce input format</li>
            </ul>
          </div>
          <div className="card">
            <h4>Use Uncontrolled When:</h4>
            <ul>
              <li>Simple forms</li>
              <li>File inputs (required)</li>
              <li>Integration with non-React code</li>
              <li>Performance is critical</li>
              <li>Large forms (many fields)</li>
              <li>Don't need instant validation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="code-preview">
        <h4>Code Comparison:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <pre>{`// Controlled
const [value, setValue] = useState('')

<input
  value={value}
  onChange={e => setValue(e.target.value)}
/>

// Access anytime
console.log(value)`}</pre>
          <pre>{`// Uncontrolled
const inputRef = useRef(null)

<input
  ref={inputRef}
  defaultValue="initial"
/>

// Access when needed
console.log(inputRef.current.value)`}</pre>
        </div>
      </div>
    </div>
  )
}
