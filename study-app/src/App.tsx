import './App.css'
import { AppHeader } from './components/AppHeader'
import { FlashcardPanel } from './components/FlashcardPanel'
import { FocusTimer } from './components/FocusTimer'
import { ResourceList } from './components/ResourceList'
import { StudyOverview } from './components/StudyOverview'
import { TaskBoard } from './components/TaskBoard'

function App() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="content-grid">
        <div className="grid-stack">
          <StudyOverview />
          <FocusTimer />
        </div>
        <div className="grid-stack wide">
          <TaskBoard />
        </div>
        <div className="grid-stack">
          <FlashcardPanel />
          <ResourceList />
        </div>
      </main>
    </div>
  )
}

export default App
