import { createContext } from 'react'
import { Flashcard, FlashcardConfidence, FocusSession, StudyPlanState, StudyTask, StudyTaskStatus } from '../types/study'

export interface StudyContextValue {
  state: StudyPlanState
  stats: {
    completionRate: number
    minutesThisWeek: number
    focusGoalMinutes: number
    tasksDueSoon: StudyTask[]
  }
  addTask: (input: Omit<StudyTask, 'id' | 'status'> & { status?: StudyTaskStatus }) => void
  updateTaskStatus: (taskId: string, status: StudyTaskStatus) => void
  logSession: (input: Omit<FocusSession, 'id' | 'createdAt'>) => void
  addFlashcard: (input: Omit<Flashcard, 'id' | 'confidence'> & { confidence?: FlashcardConfidence }) => void
  updateFlashcardConfidence: (id: string, confidence: FlashcardConfidence) => void
}

export const StudyContext = createContext<StudyContextValue | undefined>(undefined)
