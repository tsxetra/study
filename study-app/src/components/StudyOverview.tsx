import { useMemo } from 'react'
import { useStudy } from '../context/useStudy'
import { formatDate } from '../utils/dates'

export const StudyOverview = () => {
  const { stats } = useStudy()

  const insights = useMemo(
    () => [
      { label: 'Minutes logged (7d)', value: `${stats.minutesThisWeek} min` },
      { label: 'Focus goal', value: `${stats.focusGoalMinutes} min` },
      { label: 'Due soon', value: stats.tasksDueSoon.length || 'Clear' },
    ],
    [stats.focusGoalMinutes, stats.minutesThisWeek, stats.tasksDueSoon.length],
  )

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>One glance control center</h2>
        </div>
      </div>
      <div className="overview-grid">
        {insights.map((item) => (
          <article key={item.label} className="overview-card">
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
      <div className="due-list">
        <p className="eyebrow">Next up</p>
        {stats.tasksDueSoon.length === 0 && <p>Nothing urgent. Keep investing in deep work.</p>}
        {stats.tasksDueSoon.map((task) => (
          <div key={task.id} className="due-item">
            <div>
              <strong>{task.title}</strong>
              <p>
                {task.subject} • due {formatDate(task.dueDate)}
              </p>
            </div>
            <span className={`badge badge-${task.difficulty}`}>{task.difficulty}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
