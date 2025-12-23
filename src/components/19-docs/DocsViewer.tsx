import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function DocsViewer() {
  const [activeDoc, setActiveDoc] = useState<'interview' | 'quick-ref' | 'readme'>('interview')
  const [contents, setContents] = useState({
    interview: '',
    quickRef: '',
    readme: ''
  })
  const [loading, setLoading] = useState({
    interview: true,
    quickRef: true,
    readme: true
  })

  useEffect(() => {
    // Fetch all documents once on mount
    fetch('/INTERVIEW_QUESTIONS.md')
      .then(res => res.text())
      .then(text => {
        setContents(prev => ({ ...prev, interview: text }))
        setLoading(prev => ({ ...prev, interview: false }))
      })
      .catch(err => {
        console.error('Error loading interview questions:', err)
        setLoading(prev => ({ ...prev, interview: false }))
      })

    fetch('/QUICK_REFERENCE.md')
      .then(res => res.text())
      .then(text => {
        setContents(prev => ({ ...prev, quickRef: text }))
        setLoading(prev => ({ ...prev, quickRef: false }))
      })
      .catch(err => {
        console.error('Error loading quick reference:', err)
        setLoading(prev => ({ ...prev, quickRef: false }))
      })

    fetch('/README.md')
      .then(res => res.text())
      .then(text => {
        setContents(prev => ({ ...prev, readme: text }))
        setLoading(prev => ({ ...prev, readme: false }))
      })
      .catch(err => {
        console.error('Error loading README:', err)
        setLoading(prev => ({ ...prev, readme: false }))
      })
  }, [])

  const renderContent = (content: string, isLoading: boolean, loadingText: string) => {
    if (isLoading) {
      return (
        <div style={{ padding: '2rem', color: '#666' }}>
          <p>{loadingText}</p>
        </div>
      )
    }

    return (
      <div style={{ 
        background: '#ffffff', 
        color: '#24292e', 
        padding: '2rem', 
        borderRadius: '8px', 
        minHeight: '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: '15px',
        lineHeight: '1.6'
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 style={{ color: '#24292e', borderBottom: '1px solid #d0d7de', paddingBottom: '0.3em' }}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ color: '#24292e', borderBottom: '1px solid #d0d7de', paddingBottom: '0.3em' }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ color: '#24292e' }}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 style={{ color: '#24292e' }}>
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p style={{ color: '#24292e' }}>
                {children}
              </p>
            ),
            li: ({ children }) => (
              <li style={{ color: '#24292e' }}>
                {children}
              </li>
            ),
            a: ({ children, href }) => (
              <a href={href} style={{ color: '#0969da', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong style={{ color: '#24292e', fontWeight: 600 }}>
                {children}
              </strong>
            ),
            pre: ({ children }) => (
              <pre style={{
                background: '#f6f8fa',
                padding: '16px',
                borderRadius: '6px',
                overflow: 'auto',
                border: '1px solid #d0d7de',
                color: '#24292e'
              }}>
                {children}
              </pre>
            ),
            code: ({ inline, children, ...props }: any) => (
              inline ? (
                <code style={{
                  background: '#f6f8fa',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: "'Consolas', 'Monaco', monospace",
                  fontSize: '0.9em',
                  color: '#24292e'
                }} {...props}>
                  {children}
                </code>
              ) : (
                <code style={{
                  fontFamily: "'Consolas', 'Monaco', monospace",
                  fontSize: '14px',
                  color: '#24292e'
                }} {...props}>
                  {children}
                </code>
              )
            ),
            blockquote: ({ children }) => (
              <blockquote style={{
                borderLeft: '4px solid #d0d7de',
                padding: '0 1em',
                color: '#57606a',
                margin: '0'
              }}>
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <table style={{
                borderCollapse: 'collapse',
                width: '100%',
                color: '#24292e'
              }}>
                {children}
              </table>
            ),
            th: ({ children }) => (
              <th style={{
                border: '1px solid #d0d7de',
                padding: '8px',
                background: '#f6f8fa',
                color: '#24292e',
                fontWeight: 600
              }}>
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td style={{
                border: '1px solid #d0d7de',
                padding: '8px',
                color: '#24292e'
              }}>
                {children}
              </td>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="example-container">
      <h2>📚 Documentation</h2>
      <p className="subtitle">Interview questions, quick reference, and project documentation</p>

      <div className="demo-nav">
        <button
          onClick={() => setActiveDoc('interview')}
          className={activeDoc === 'interview' ? 'active' : ''}
        >
          Interview Questions
        </button>
        <button
          onClick={() => setActiveDoc('quick-ref')}
          className={activeDoc === 'quick-ref' ? 'active' : ''}
        >
          Quick Reference
        </button>
        <button
          onClick={() => setActiveDoc('readme')}
          className={activeDoc === 'readme' ? 'active' : ''}
        >
          README
        </button>
      </div>

      <div className="docs-content">
        {activeDoc === 'interview' && renderContent(contents.interview, loading.interview, 'Loading interview questions...')}
        {activeDoc === 'quick-ref' && renderContent(contents.quickRef, loading.quickRef, 'Loading quick reference...')}
        {activeDoc === 'readme' && renderContent(contents.readme, loading.readme, 'Loading README...')}
      </div>
    </div>
  )
}
