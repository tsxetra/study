export type StudyTaskStatus = 'upcoming' | 'in_progress' | 'completed'

export type StudyTaskDifficulty = 'light' | 'steady' | 'intense'

export interface StudyTask {
  id: string
  title: string
  subject: string
  status: StudyTaskStatus
  dueDate: string
  estimatedMinutes: number
  difficulty: StudyTaskDifficulty
  resources: string[]
  notes?: string
}

export interface FocusSession {
  id: string
  topic: string
  minutes: number
  quality: 'energized' | 'steady' | 'tired'
  createdAt: string
}

export type FlashcardConfidence = 1 | 2 | 3 | 4 | 5

export interface Flashcard {
  id: string
  prompt: string
  answer: string
  hint?: string
  confidence: FlashcardConfidence
  lastReviewed?: string
}

export interface StudyPlanState {
  tasks: StudyTask[]
  sessions: FocusSession[]
  flashcards: Flashcard[]
  focusGoalMinutes: number
}
