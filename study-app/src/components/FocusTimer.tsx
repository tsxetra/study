import { FormEvent, useMemo, useState } from 'react'
import { useStudy } from '../context/useStudy'
import { usePomodoro } from '../hooks/usePomodoro'

export const FocusTimer = () => {
  const { state, logSession } = useStudy()
  const subjects = useMemo(() => Array.from(new Set(state.tasks.map((task) => task.subject))), [state.tasks])
  const [topic, setTopic] = useState('Independent study')
  const topics = useMemo(() => {
    const unique = new Set([topic, ...subjects, 'Independent study'])
    return Array.from(unique)
  }, [subjects, topic])
  const [quality, setQuality] = useState<'energized' | 'steady' | 'tired'>('steady')

  const pomodoro = usePomodoro({
    onFocusComplete: (minutes) => {
      logSession({ topic, minutes, quality })
    },
  })

  const handleDurationChange = (event: FormEvent<HTMLInputElement>, key: 'focus' | 'shortBreak' | 'longBreak') => {
    const value = Number((event.target as HTMLInputElement).value)
    pomodoro.updateDuration(key, value)
  }

  const minutes = Math.floor(pomodoro.secondsRemaining / 60)
  const seconds = pomodoro.secondsRemaining % 60

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Focus</p>
          <h2>Guided Pomodoro blocks</h2>
        </div>
      </div>
      <div className="timer-card">
        <div className="timer-display">
          <p>{pomodoro.mode === 'focus' ? 'Deep work' : pomodoro.mode === 'shortBreak' ? 'Short break' : 'Long break'}</p>
          <span>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="timer-actions">
          {pomodoro.isRunning ? (
            <button type="button" onClick={pomodoro.pause}>
              Pause
            </button>
          ) : (
            <button type="button" onClick={pomodoro.start}>
              Start
            </button>
          )}
          <button type="button" onClick={pomodoro.reset}>
            Reset
          </button>
          <button type="button" onClick={pomodoro.skip}>
            Skip
          </button>
        </div>
      </div>
      <form className="timer-form">
        <label>
          Topic
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topics.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <label>
          Energy check-in
          <select value={quality} onChange={(event) => setQuality(event.target.value as typeof quality)}>
            <option value="energized">Energized</option>
            <option value="steady">Steady</option>
            <option value="tired">Tired</option>
          </select>
        </label>
      </form>
      <div className="duration-grid">
        <label>
          Focus (min)
          <input
            type="number"
            min={15}
            max={60}
            value={pomodoro.durations.focus}
            onChange={(event) => handleDurationChange(event, 'focus')}
          />
        </label>
        <label>
          Short break
          <input
            type="number"
            min={3}
            max={15}
            value={pomodoro.durations.shortBreak}
            onChange={(event) => handleDurationChange(event, 'shortBreak')}
          />
        </label>
        <label>
          Long break
          <input
            type="number"
            min={10}
            max={30}
            value={pomodoro.durations.longBreak}
            onChange={(event) => handleDurationChange(event, 'longBreak')}
          />
        </label>
      </div>
    </section>
  )
}
