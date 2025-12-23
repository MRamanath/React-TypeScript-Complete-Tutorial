import { useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

/**
 * Portals
 * Render children into a DOM node outside the parent hierarchy
 */

// Basic Modal Portal
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body
  )
}

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card">
      <h3>1. Modal Dialog</h3>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3>Modal Title</h3>
        <p>This modal is rendered outside the parent component's DOM hierarchy!</p>
        <p>It's appended to document.body using a Portal.</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
      <p className="info">✓ Rendered outside parent DOM, but React events work normally</p>
    </div>
  )
}

// Tooltip Portal
interface TooltipProps {
  content: string
  children: ReactNode
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
    setIsVisible(true)
  }

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        style={{ textDecoration: 'underline', cursor: 'help' }}
      >
        {children}
      </span>
      {isVisible && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%)',
            background: '#1a1a1a',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '1px solid #646cff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            zIndex: 10000,
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {content}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #646cff'
          }} />
        </div>,
        document.body
      )}
    </>
  )
}

function TooltipExample() {
  return (
    <div className="card">
      <h3>2. Tooltip</h3>
      <p>
        Hover over <Tooltip content="This is a tooltip!">this text</Tooltip> to see a tooltip.
      </p>
      <p>
        Or <Tooltip content="Portals prevent z-index issues">this one</Tooltip> for more info.
      </p>
      <p className="info">✓ Tooltip rendered at document.body to avoid overflow/z-index issues</p>
    </div>
  )
}

// Notification System
interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

let notificationId = 0

function NotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, type: Notification['type']) => {
    const id = notificationId++
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  return (
    <div className="card">
      <h3>3. Notification System</h3>
      <div className="button-group">
        <button onClick={() => addNotification('Success!', 'success')}>
          Success
        </button>
        <button onClick={() => addNotification('Error occurred', 'error')}>
          Error
        </button>
        <button onClick={() => addNotification('Just FYI', 'info')}>
          Info
        </button>
      </div>
      <p className="info">✓ Notifications appear in top-right corner via Portal</p>

      {createPortal(
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxWidth: '300px'
        }}>
          {notifications.map(notif => (
            <div
              key={notif.id}
              style={{
                padding: '1rem',
                borderRadius: '4px',
                background: notif.type === 'success' ? '#4caf50' 
                  : notif.type === 'error' ? '#f44336' 
                  : '#2196f3',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                animation: 'slideIn 0.3s ease-out'
              }}
            >
              {notif.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}

// Sidebar Portal (Different Root)
function SidebarExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card">
      <h3>4. Sidebar Drawer</h3>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'} Sidebar
      </button>
      {isOpen && createPortal(
        <>
          <div
            className="modal-overlay"
            onClick={() => setIsOpen(false)}
            style={{ background: 'rgba(0,0,0,0.5)' }}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '300px',
            height: '100vh',
            background: '#1a1a1a',
            boxShadow: '-4px 0 12px rgba(0,0,0,0.5)',
            zIndex: 10001,
            padding: '2rem',
            animation: 'slideInRight 0.3s ease-out',
            overflowY: 'auto'
          }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              ×
            </button>
            <h3>Sidebar Content</h3>
            <ul style={{ textAlign: 'left', marginTop: '2rem' }}>
              <li>Menu Item 1</li>
              <li>Menu Item 2</li>
              <li>Menu Item 3</li>
              <li>Menu Item 4</li>
              <li>Menu Item 5</li>
            </ul>
          </div>
        </>,
        document.body
      )}
      <p className="info">✓ Sidebar slides in from edge, rendered at document.body</p>
    </div>
  )
}

// Nested Portals
function NestedPortalExample() {
  const [showModal, setShowModal] = useState(false)
  const [showInnerModal, setShowInnerModal] = useState(false)

  return (
    <div className="card">
      <h3>5. Nested Portals</h3>
      <button onClick={() => setShowModal(true)}>Open Outer Modal</button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3>Outer Modal</h3>
        <p>This modal contains another modal!</p>
        <button onClick={() => setShowInnerModal(true)}>
          Open Inner Modal
        </button>

        <Modal isOpen={showInnerModal} onClose={() => setShowInnerModal(false)}>
          <h3>Inner Modal</h3>
          <p>Portals can be nested!</p>
          <button onClick={() => setShowInnerModal(false)}>Close</button>
        </Modal>
      </Modal>

      <p className="info">✓ Both modals rendered via separate Portals to document.body</p>
    </div>
  )
}

// Event Bubbling Demo
function EventBubblingDemo() {
  const [events, setEvents] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)

  const logEvent = (event: string) => {
    setEvents(prev => [...prev, event].slice(-5))
  }

  return (
    <div className="card">
      <h3>6. Event Bubbling</h3>
      <div
        onClick={() => logEvent('Parent clicked')}
        style={{
          padding: '1rem',
          border: '2px solid #646cff',
          borderRadius: '4px'
        }}
      >
        <p>Click anywhere in this box (parent)</p>
        <button onClick={() => setShowModal(true)}>Open Portal</button>
      </div>

      {showModal && createPortal(
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation()
              logEvent('Modal clicked')
            }}
          >
            <h4>Portal Modal</h4>
            <p>Click here or outside to test event bubbling</p>
            <button onClick={() => logEvent('Button clicked')}>
              Click Me
            </button>
          </div>
        </div>,
        document.body
      )}

      {events.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Events:</strong>
          <ul style={{ textAlign: 'left', fontSize: '0.9rem' }}>
            {events.map((event, i) => <li key={i}>{event}</li>)}
          </ul>
        </div>
      )}

      <p className="info">
        ✓ Events bubble through React tree, not DOM tree
      </p>
    </div>
  )
}

export default function PortalsDemo() {
  return (
    <div className="example-container">
      <h2>Portals</h2>
      <p className="subtitle">Render children into a DOM node outside the parent hierarchy</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <ModalExample />
        <TooltipExample />
        <NotificationManager />
        <SidebarExample />
        <NestedPortalExample />
        <EventBubblingDemo />
      </div>

      <div className="section">
        <h3>When to Use Portals</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <h4>✅ Perfect For:</h4>
            <ul>
              <li>Modal dialogs</li>
              <li>Tooltips</li>
              <li>Popovers and dropdowns</li>
              <li>Toast notifications</li>
              <li>Floating UI elements</li>
              <li>Sidebars and drawers</li>
            </ul>
          </div>
          <div className="card">
            <h4>🎯 Solves These Issues:</h4>
            <ul>
              <li>CSS overflow: hidden problems</li>
              <li>z-index stacking context issues</li>
              <li>Position constraints from parent</li>
              <li>Need to break out of DOM hierarchy</li>
              <li>Global positioning requirements</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="summary">
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>DOM Location:</strong> Portal renders to different DOM node (usually document.body)</li>
          <li><strong>React Tree:</strong> Portal remains in React component tree at original location</li>
          <li><strong>Event Bubbling:</strong> Events bubble through React tree, not DOM tree</li>
          <li><strong>Context:</strong> Portal has access to parent's context</li>
          <li><strong>Use Case:</strong> Breaking out of parent's styling/positioning constraints</li>
        </ul>
      </div>

      <div className="code-preview">
        <h4>Basic Usage:</h4>
        <pre>{`import { createPortal } from 'react-dom'

function Modal({ children, isOpen }) {
  if (!isOpen) return null
  
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body // Target DOM node
  )
}

// Usage
<Modal isOpen={isOpen}>
  <h2>Modal Content</h2>
</Modal>`}</pre>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
