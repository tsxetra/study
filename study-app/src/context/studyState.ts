import { defaultStudyData } from '../data/defaultStudyData'
import {
  Flashcard,
  FlashcardConfidence,
  FocusSession,
  StudyPlanState,
  StudyTask,
  StudyTaskStatus,
} from '../types/study'

export const STUDY_STORAGE_KEY = 'study-app/state/v1'

const cloneState = (state: StudyPlanState): StudyPlanState => JSON.parse(JSON.stringify(state))

export const loadInitialState = (): StudyPlanState => {
  const fallback = cloneState(defaultStudyData)

  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const stored = window.localStorage.getItem(STUDY_STORAGE_KEY)
    if (!stored) {
      return fallback
    }

    const parsed = JSON.parse(stored) as Partial<StudyPlanState>
    return {
      ...fallback,
      ...parsed,
      tasks: parsed.tasks ?? fallback.tasks,
      sessions: parsed.sessions ?? fallback.sessions,
      flashcards: parsed.flashcards ?? fallback.flashcards,
      focusGoalMinutes: parsed.focusGoalMinutes ?? fallback.focusGoalMinutes,
    }
  } catch (error) {
    console.warn('[StudyContext] Failed to load cached state', error)
    return fallback
  }
}

export type StudyAction =
  | { type: 'ADD_TASK'; payload: StudyTask }
  | { type: 'UPDATE_TASK_STATUS'; payload: { taskId: string; status: StudyTaskStatus } }
  | { type: 'ADD_SESSION'; payload: FocusSession }
  | { type: 'ADD_FLASHCARD'; payload: Flashcard }
  | { type: 'UPDATE_FLASHCARD_CONFIDENCE'; payload: { id: string; confidence: FlashcardConfidence } }

export const studyReducer = (state: StudyPlanState, action: StudyAction): StudyPlanState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] }
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, status: action.payload.status } : task,
        ),
      }
    case 'ADD_SESSION':
      return { ...state, sessions: [action.payload, ...state.sessions] }
    case 'ADD_FLASHCARD':
      return { ...state, flashcards: [action.payload, ...state.flashcards] }
    case 'UPDATE_FLASHCARD_CONFIDENCE':
      return {
        ...state,
        flashcards: state.flashcards.map((card) =>
          card.id === action.payload.id ? { ...card, confidence: action.payload.confidence } : card,
        ),
      }
    default:
      return state
  }
}
