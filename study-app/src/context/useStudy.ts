import { useContext } from 'react'
import { StudyContext } from './StudyContextStore'

export const useStudy = () => {
  const context = useContext(StudyContext)
  if (!context) {
    throw new Error('useStudy must be used inside StudyProvider')
  }
  return context
}
