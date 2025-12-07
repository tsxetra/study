import { StudyPlanState } from '../types/study'

const createDueDate = (daysFromNow: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setMinutes(0, 0, 0)
  return date.toISOString()
}

export const defaultStudyData: StudyPlanState = {
  focusGoalMinutes: 900,
  tasks: [
    {
      id: 'task-chem-equilibrium',
      title: 'Summarize chemical equilibrium lecture',
      subject: 'Chemistry',
      status: 'upcoming',
      dueDate: createDueDate(2),
      estimatedMinutes: 60,
      difficulty: 'steady',
      resources: ['Lecture slides', 'Chang chapters 13-14'],
      notes: 'Use Cornell notes, highlight the Le Chatelier practice problems.',
    },
    {
      id: 'task-calc-derivatives',
      title: 'Derivatives drill set B',
      subject: 'Calculus',
      status: 'in_progress',
      dueDate: createDueDate(1),
      estimatedMinutes: 45,
      difficulty: 'intense',
      resources: ['Briggs calc ch. 3', 'Paul\'s Online Notes'],
    },
    {
      id: 'task-history-outline',
      title: 'Outline WWI causes essay',
      subject: 'History',
      status: 'upcoming',
      dueDate: createDueDate(4),
      estimatedMinutes: 90,
      difficulty: 'steady',
      resources: ['Class readings week 6'],
      notes: 'Need thesis + 3 supporting claims.',
    },
    {
      id: 'task-physics-lab',
      title: 'Finish kinematics lab discussion',
      subject: 'Physics',
      status: 'completed',
      dueDate: createDueDate(-1),
      estimatedMinutes: 70,
      difficulty: 'light',
      resources: ['Lab data sheet'],
    },
  ],
  sessions: [
    {
      id: 'session-focus-calc',
      topic: 'Calculus drill',
      minutes: 50,
      quality: 'steady',
      createdAt: createDueDate(-2),
    },
    {
      id: 'session-focus-chem',
      topic: 'Chem concepts',
      minutes: 40,
      quality: 'energized',
      createdAt: createDueDate(-1),
    },
  ],
  flashcards: [
    {
      id: 'flashcard-chem-1',
      prompt: 'State Le Chatelier\'s principle.',
      answer: 'A system at equilibrium shifts to counteract imposed stresses (concentration, temperature, pressure).',
      hint: 'How equilibrium restores balance.',
      confidence: 3,
    },
    {
      id: 'flashcard-history-1',
      prompt: 'List the MAIN causes of WWI.',
      answer: 'Militarism, Alliances, Imperialism, Nationalism.',
      confidence: 4,
    },
    {
      id: 'flashcard-physics-1',
      prompt: 'What does the slope of a velocity-time graph represent?',
      answer: 'Acceleration.',
      confidence: 2,
      hint: 'Derivative of velocity.',
    },
  ],
}
