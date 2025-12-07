import { useMemo } from 'react'
import { useStudy } from '../context/useStudy'
import { formatDate } from '../utils/dates'

const habits = [
  'Preview tomorrow\'s class in 5 minutes',
  'Close all tabs for the first 10 focus minutes',
  'Write one reflection sentence after each session',
  'Stack a stretch or water break with long breaks',
]

const curatedLinks = [
  { label: 'Active recall checklist', url: 'https://www.coursera.org/articles/active-recall' },
  { label: 'Spacing effect explainer', url: 'https://www.learningscientists.org/blog/2016/7/14-1' },
  { label: 'Focus music (beta waves)', url: 'https://www.youtube.com/watch?v=WPni755-Krg' },
]

export const ResourceList = () => {
  const { state } = useStudy()
  const recentSessions = useMemo(() => state.sessions.slice(0, 4), [state.sessions])

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Playbook</p>
          <h2>Keep momentum between sessions</h2>
        </div>
      </div>
      <div className="resource-grid">
        <article>
          <h3>Recent focus logs</h3>
          <ul>
            {recentSessions.length === 0 && <li>No entries yet. Log a focus block to see it here.</li>}
            {recentSessions.map((session) => (
              <li key={session.id}>
                <strong>{session.topic}</strong>
                <p>
                  {session.minutes} min • {session.quality} • {formatDate(session.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Momentum habits</h3>
          <ul>
            {habits.map((habit) => (
              <li key={habit}>{habit}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Go-to resources</h3>
          <ul>
            {curatedLinks.map((item) => (
              <li key={item.url}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
