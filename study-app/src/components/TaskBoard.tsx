import { useMemo } from 'react'
import { useStudy } from '../context/useStudy'
import { TaskCard } from './TaskCard'
import { TaskForm } from './TaskForm'

export const TaskBoard = () => {
  const { state, updateTaskStatus } = useStudy()

  const columns = useMemo(
    () => [
      { key: 'upcoming', title: 'Upcoming' },
      { key: 'in_progress', title: 'In progress' },
      { key: 'completed', title: 'Completed' },
    ],
    [],
  )

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Tasks</p>
          <h2>Break work into confident steps</h2>
        </div>
      </div>
      <TaskForm />
      <div className="task-board">
        {columns.map((column) => (
          <div key={column.key} className="task-column">
            <div className="column-heading">
              <h3>{column.title}</h3>
              <span>{state.tasks.filter((task) => task.status === column.key).length}</span>
            </div>
            <div className="column-body">
              {state.tasks
                .filter((task) => task.status === column.key)
                .map((task) => (
                  <TaskCard key={task.id} task={task} onStatusChange={(status) => updateTaskStatus(task.id, status)} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
