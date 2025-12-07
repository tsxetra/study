import { useStudy } from '../context/useStudy'

export const AppHeader = () => {
  const { stats } = useStudy()
  const completionPercent = Math.round(stats.completionRate * 100)
  const weeklyProgress = Math.min(
    100,
    Math.round((stats.minutesThisWeek / stats.focusGoalMinutes) * 100) || 0,
  )

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Personal Study OS</p>
        <h1>Stay ahead with a plan you can trust.</h1>
        <p className="subtitle">
          Track focused sessions, break down work into confident tasks, and build a spaced repetition habit
          without leaving this page.
        </p>
      </div>
      <div className="header-metrics">
        <div className="header-card">
          <p>Weekly focus goal</p>
          <strong>{stats.focusGoalMinutes} min</strong>
          <span>{weeklyProgress}% logged</span>
        </div>
        <div className="header-card">
          <p>Tasks completed</p>
          <strong>{completionPercent}%</strong>
          <span>{stats.tasksDueSoon.length} due soon</span>
        </div>
      </div>
    </header>
  )
}
