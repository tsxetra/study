import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak'

export interface PomodoroDurations {
  focus: number
  shortBreak: number
  longBreak: number
}

const defaultDurations: PomodoroDurations = {
  focus: 30,
  shortBreak: 5,
  longBreak: 15,
}

const nextMode = (currentMode: PomodoroMode, cycleCount: number): PomodoroMode => {
  if (currentMode === 'focus') {
    return (cycleCount + 1) % 4 === 0 ? 'longBreak' : 'shortBreak'
  }
  return 'focus'
}

export const usePomodoro = ({
  onFocusComplete,
}: {
  onFocusComplete?: (minutes: number) => void
} = {}) => {
  const [durations, setDurations] = useLocalStorage<PomodoroDurations>(
    'study-app/pomodoro-durations',
    defaultDurations,
  )
  const [mode, setMode] = useState<PomodoroMode>('focus')
  const [cycleCount, setCycleCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(durations.focus * 60)

  useEffect(() => {
    setSecondsRemaining(durations[mode] * 60)
  }, [durations, mode])

  const handleModeComplete = useCallback(() => {
    if (mode === 'focus') {
      onFocusComplete?.(durations.focus)
      setCycleCount((count) => count + 1)
      const upcomingMode = nextMode('focus', cycleCount)
      setMode(upcomingMode)
      setSecondsRemaining(durations[upcomingMode] * 60)
      setIsRunning(false)
      return
    }

    setMode('focus')
    setSecondsRemaining(durations.focus * 60)
    setIsRunning(false)
  }, [cycleCount, durations, mode, onFocusComplete])

  useEffect(() => {
    if (!isRunning) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setSecondsRemaining((seconds) => {
        if (seconds <= 1) {
          handleModeComplete()
          return durations[nextMode(mode, cycleCount)] * 60
        }
        return seconds - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [cycleCount, durations, handleModeComplete, isRunning, mode])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)

  const reset = () => {
    setIsRunning(false)
    setMode('focus')
    setSecondsRemaining(durations.focus * 60)
    setCycleCount(0)
  }

  const skip = () => {
    setIsRunning(false)
    const upcomingMode = nextMode(mode, cycleCount)
    setMode(upcomingMode)
    setSecondsRemaining(durations[upcomingMode] * 60)
  }

  const updateDuration = (key: keyof PomodoroDurations, minutes: number) => {
    setDurations({ ...durations, [key]: Math.max(1, minutes) })
  }

  const progress = useMemo(() => {
    const total = durations[mode] * 60
    return 1 - secondsRemaining / total
  }, [durations, mode, secondsRemaining])

  return {
    mode,
    isRunning,
    durations,
    secondsRemaining,
    progress,
    start,
    pause,
    reset,
    skip,
    updateDuration,
  }
}
