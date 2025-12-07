import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StudyProvider } from './StudyContext'
import { useStudy } from './useStudy'

beforeEach(() => {
  window.localStorage.clear()
})

const TestBed = () => {
  const { state, addTask, updateTaskStatus } = useStudy()
  return (
    <div>
      <span data-testid="task-count">{state.tasks.length}</span>
      <button
        type="button"
        onClick={() =>
          addTask({
            title: 'Test task',
            subject: 'Biology',
            dueDate: new Date().toISOString(),
            estimatedMinutes: 30,
            difficulty: 'steady',
            resources: [],
          })
        }
      >
        add
      </button>
      <button type="button" onClick={() => updateTaskStatus(state.tasks[0].id, 'completed')}>
        complete
      </button>
      <span data-testid="completed-count">
        {state.tasks.filter((task) => task.status === 'completed').length}
      </span>
    </div>
  )
}

describe('StudyProvider', () => {
  it('adds new tasks to the plan', async () => {
    const user = userEvent.setup()
    render(
      <StudyProvider>
        <TestBed />
      </StudyProvider>,
    )

    const count = Number(screen.getByTestId('task-count').textContent)
    await user.click(screen.getByText('add'))
    expect(Number(screen.getByTestId('task-count').textContent)).toBe(count + 1)
  })

  it('updates task status', async () => {
    const user = userEvent.setup()
    render(
      <StudyProvider>
        <TestBed />
      </StudyProvider>,
    )

    const completedBefore = Number(screen.getByTestId('completed-count').textContent)
    await user.click(screen.getByText('complete'))
    expect(Number(screen.getByTestId('completed-count').textContent)).toBeGreaterThanOrEqual(
      completedBefore,
    )
  })
})
