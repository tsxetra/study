import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { Flashcard, FocusSession, StudyTask } from '../types/study'
import { createId } from '../utils/id'
import { getDaysUntil } from '../utils/dates'
import { loadInitialState, STUDY_STORAGE_KEY, studyReducer } from './studyState'
import { StudyContext, StudyContextValue } from './StudyContextStore'

export const StudyProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(studyReducer, undefined, loadInitialState)

  useEffect(() => {
    window.localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addTask = useCallback<StudyContextValue['addTask']>((input) => {
    const newTask: StudyTask = {
      ...input,
      id: createId(),
      status: input.status ?? 'upcoming',
      resources: input.resources ?? [],
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
  }, [])

  const updateTaskStatus = useCallback<StudyContextValue['updateTaskStatus']>((taskId, status) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { taskId, status } })
  }, [])

  const logSession = useCallback<StudyContextValue['logSession']>((input) => {
    const entry: FocusSession = {
      id: createId(),
      createdAt: new Date().toISOString(),
      ...input,
    }
    dispatch({ type: 'ADD_SESSION', payload: entry })
  }, [])

  const addFlashcard = useCallback<StudyContextValue['addFlashcard']>((input) => {
    const card: Flashcard = {
      id: createId(),
      confidence: input.confidence ?? 3,
      ...input,
    }
    dispatch({ type: 'ADD_FLASHCARD', payload: card })
  }, [])

  const updateFlashcardConfidence = useCallback<StudyContextValue['updateFlashcardConfidence']>(
    (id, confidence) => {
    dispatch({ type: 'UPDATE_FLASHCARD_CONFIDENCE', payload: { id, confidence } })
    },
    [],
  )

  const stats = useMemo(() => {
    const totalTasks = state.tasks.length || 1
    const completionRate =
      state.tasks.filter((task) => task.status === 'completed').length / totalTasks
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const minutesThisWeek = state.sessions
      .filter((session) => new Date(session.createdAt) >= sevenDaysAgo)
      .reduce((total, session) => total + session.minutes, 0)

    const tasksDueSoon = state.tasks
      .filter((task) => task.status !== 'completed' && getDaysUntil(task.dueDate) <= 3)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 4)

    return {
      completionRate,
      minutesThisWeek,
      focusGoalMinutes: state.focusGoalMinutes,
      tasksDueSoon,
    }
  }, [state.focusGoalMinutes, state.sessions, state.tasks])

  const value = useMemo<StudyContextValue>(
    () => ({
      state,
      stats,
      addTask,
      updateTaskStatus,
      logSession,
      addFlashcard,
      updateFlashcardConfidence,
    }),
    [addFlashcard, addTask, logSession, state, stats, updateFlashcardConfidence, updateTaskStatus],
  )

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
}
