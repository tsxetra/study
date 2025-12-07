import { StudyTask, StudyTaskStatus } from '../types/study'
import { formatDate, getDaysUntil, isPastDue } from '../utils/dates'

interface TaskCardProps {
  task: StudyTask
  onStatusChange: (status: StudyTaskStatus) => void
}

const statusLabels: Record<StudyTaskStatus, string> = {
  upcoming: 'Upcoming',
  in_progress: 'In progress',
  completed: 'Completed',
}

export const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const daysUntil = getDaysUntil(task.dueDate)
  const overdue = isPastDue(task.dueDate) && task.status !== 'completed'

  return (
    <article className={`task-card task-${task.status}`}>
      <header>
        <p>{task.subject}</p>
        <span className={`badge badge-${task.difficulty}`}>{task.difficulty}</span>
      </header>
      <h3>{task.title}</h3>
      <p className="task-meta">
        {overdue ? 'Past due' : daysUntil === 0 ? 'Due today' : `Due ${formatDate(task.dueDate)}`}
        <span>• {task.estimatedMinutes} min</span>
      </p>
      {task.notes && <p className="task-notes">{task.notes}</p>}
      {task.resources.length > 0 && (
        <ul className="task-resources">
          {task.resources.map((resource) => (
            <li key={resource}>{resource}</li>
          ))}
        </ul>
      )}
      <div className="task-actions">
        <label>
          Status
          <select value={task.status} onChange={(event) => onStatusChange(event.target.value as StudyTaskStatus)}>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        {task.status !== 'completed' && (
          <button type="button" onClick={() => onStatusChange('completed')}>
            Mark done
          </button>
        )}
      </div>
    </article>
  )
}
