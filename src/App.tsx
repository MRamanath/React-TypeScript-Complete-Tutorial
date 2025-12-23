import { useState } from 'react'
import './App.css'

// Import all tutorial components
import FundamentalConcepts from './components/01-fundamentals/FundamentalConcepts'
import HooksExamples from './components/02-hooks/HooksExamples'
import AdvancedConcepts from './components/03-advanced/AdvancedConcepts'
import PatternsAndBestPractices from './components/04-patterns/PatternsAndBestPractices'
import StateManagement from './components/05-state-management'
import HooksDeepDive from './components/06-hooks-deep-dive'
import ContextPatterns from './components/07-context-patterns'
import PerformanceOptimization from './components/08-performance'
import FormHandling from './components/09-forms'
import CustomHooks from './components/10-custom-hooks'
import RefsAndDOM from './components/11-refs-and-dom'
import ErrorBoundaries from './components/12-error-handling'
import PortalsDemo from './components/13-portals'
import CodeSplittingDemo from './components/14-code-splitting'
import AdvancedPatternsDemo from './components/15-advanced-patterns'
import React18Features from './components/16-react-18'
import { ReactRouterConcepts } from './components/17-routing'
import { ReduxToolkitConcepts } from './components/18-redux-toolkit'
import DocsViewer from './components/19-docs'

function App() {
  const [activeSection, setActiveSection] = useState<string>('fundamentals')

  const sections = [
    { id: 'fundamentals', label: '1. ⚛️ Fundamentals', component: FundamentalConcepts },
    { id: 'hooks', label: '2. 🪝 Hooks Basics', component: HooksExamples },
    { id: 'advanced', label: '3. 🚀 Advanced Concepts', component: AdvancedConcepts },
    { id: 'patterns', label: '4. 🎯 Patterns & Best Practices', component: PatternsAndBestPractices },
    { id: 'state', label: '5. 📦 State Management', component: StateManagement },
    { id: 'hooks-deep', label: '6. 🔍 Hooks Deep Dive', component: HooksDeepDive },
    { id: 'context', label: '7. 🔗 Context Patterns', component: ContextPatterns },
    { id: 'performance', label: '8. ⚡ Performance', component: PerformanceOptimization },
    { id: 'forms', label: '9. 📝 Form Handling', component: FormHandling },
    { id: 'custom-hooks', label: '10. 🔧 Custom Hooks', component: CustomHooks },
    { id: 'refs', label: '11. 🎯 Refs & DOM', component: RefsAndDOM },
    { id: 'errors', label: '12. 🛡️ Error Boundaries', component: ErrorBoundaries },
    { id: 'portals', label: '13. 🌀 Portals', component: PortalsDemo },
    { id: 'splitting', label: '14. ✂️ Code Splitting', component: CodeSplittingDemo },
    { id: 'patterns-adv', label: '15. 🎨 HOC & Render Props', component: AdvancedPatternsDemo },
    { id: 'react18', label: '16. 🆕 React 18 Features', component: React18Features },
    { id: 'routing', label: '17. 🧭 React Router', component: ReactRouterConcepts },
    { id: 'redux', label: '18. 🔴 Redux Toolkit', component: ReduxToolkitConcepts },
    { id: 'docs', label: '19. 📚 Documentation', component: DocsViewer },
  ]

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || FundamentalConcepts

  return (
    <div className="app">
      <header className="app-header">
        <h1>React TypeScript Complete Tutorial</h1>
        <p>Comprehensive guide for interview preparation</p>
      </header>

      <nav className="navigation">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={activeSection === section.id ? 'active' : ''}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <main className="container">
        <ActiveComponent />
      </main>

      <footer className="app-footer">
        <p>React 18.3+ with TypeScript 5.6+ | Built with Vite</p>
      </footer>
    </div>
  )
}

export default App
