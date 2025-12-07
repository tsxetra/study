import { FormEvent, useState } from 'react'
import { useStudy } from '../context/useStudy'
import { StudyTaskDifficulty } from '../types/study'

const defaultForm = {
  title: '',
  subject: '',
  dueDate: '',
  estimatedMinutes: 45,
  difficulty: 'steady' as StudyTaskDifficulty,
  notes: '',
  resources: '',
}

export const TaskForm = () => {
  const { addTask } = useStudy()
  const [form, setForm] = useState(defaultForm)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.title.trim() || !form.subject.trim() || !form.dueDate) {
      return
    }

    addTask({
      title: form.title.trim(),
      subject: form.subject.trim(),
      dueDate: new Date(form.dueDate).toISOString(),
      estimatedMinutes: Number(form.estimatedMinutes),
      difficulty: form.difficulty,
      status: 'upcoming',
      notes: form.notes.trim() || undefined,
      resources: form.resources
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    })

    setForm(defaultForm)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Task
          <input
            type="text"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="e.g. Write lab summary"
          />
        </label>
        <label>
          Subject
          <input
            type="text"
            value={form.subject}
            onChange={(event) => setForm({ ...form, subject: event.target.value })}
            placeholder="Course or focus area"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Due date
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
          />
        </label>
        <label>
          Minutes
          <input
            type="number"
            min={15}
            max={240}
            value={form.estimatedMinutes}
            onChange={(event) => setForm({ ...form, estimatedMinutes: Number(event.target.value) })}
          />
        </label>
        <label>
          Intensity
          <select
            value={form.difficulty}
            onChange={(event) => setForm({ ...form, difficulty: event.target.value as StudyTaskDifficulty })}
          >
            <option value="light">Light</option>
            <option value="steady">Steady</option>
            <option value="intense">Intense</option>
          </select>
        </label>
      </div>
      <label>
        Resources (comma separated)
        <input
          type="text"
          value={form.resources}
          onChange={(event) => setForm({ ...form, resources: event.target.value })}
          placeholder="Textbook, slides, mentor"
        />
      </label>
      <label>
        Notes
        <textarea
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          placeholder="Context, deliverable, rubric..."
        />
      </label>
      <button type="submit">Add task</button>
    </form>
  )
}
