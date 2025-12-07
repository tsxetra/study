import { FormEvent, useMemo, useState } from 'react'
import { useStudy } from '../context/useStudy'
import { FlashcardConfidence } from '../types/study'

export const FlashcardPanel = () => {
  const { state, addFlashcard, updateFlashcardConfidence } = useStudy()
  const [showAnswer, setShowAnswer] = useState(false)
  const [newCard, setNewCard] = useState({ prompt: '', answer: '', hint: '' })

  const sortedCards = useMemo(
    () => [...state.flashcards].sort((a, b) => a.confidence - b.confidence),
    [state.flashcards],
  )
  const activeCard = sortedCards[0]

  const handleConfidence = (confidenceDelta: number) => {
    if (!activeCard) {
      return
    }
    const newConfidence = clampConfidence(activeCard.confidence + confidenceDelta)
    updateFlashcardConfidence(activeCard.id, newConfidence)
    setShowAnswer(false)
  }

  const handleCardSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newCard.prompt.trim() || !newCard.answer.trim()) {
      return
    }

    addFlashcard({
      prompt: newCard.prompt.trim(),
      answer: newCard.answer.trim(),
      hint: newCard.hint.trim() || undefined,
    })
    setNewCard({ prompt: '', answer: '', hint: '' })
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Memory</p>
          <h2>Spaced repetition cards</h2>
        </div>
      </div>
      <div className="flashcard">
        {activeCard ? (
          <>
            <p className="eyebrow">Next card</p>
            <h3>{activeCard.prompt}</h3>
            {activeCard.hint && <p className="hint">Hint: {activeCard.hint}</p>}
            {showAnswer ? (
              <p className="answer">{activeCard.answer}</p>
            ) : (
              <button type="button" onClick={() => setShowAnswer(true)}>
                Show answer
              </button>
            )}
            <div className="confidence-row">
              <button type="button" onClick={() => handleConfidence(-1)}>
                Still learning
              </button>
              <button type="button" onClick={() => handleConfidence(1)}>
                Got it
              </button>
            </div>
          </>
        ) : (
          <p>Add a flashcard to start reviewing.</p>
        )}
      </div>
      <form className="flashcard-form" onSubmit={handleCardSubmit}>
        <h3>Add quick card</h3>
        <label>
          Prompt
          <input
            type="text"
            value={newCard.prompt}
            onChange={(event) => setNewCard({ ...newCard, prompt: event.target.value })}
          />
        </label>
        <label>
          Answer
          <textarea
            value={newCard.answer}
            onChange={(event) => setNewCard({ ...newCard, answer: event.target.value })}
          />
        </label>
        <label>
          Hint (optional)
          <input
            type="text"
            value={newCard.hint}
            onChange={(event) => setNewCard({ ...newCard, hint: event.target.value })}
          />
        </label>
        <button type="submit">Save card</button>
      </form>
    </section>
  )
}

const clampConfidence = (value: number): FlashcardConfidence => {
  if (value < 1) {
    return 1
  }
  if (value > 5) {
    return 5
  }
  return value as FlashcardConfidence
}
