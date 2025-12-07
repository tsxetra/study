import { useEffect, useRef, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const hasHydrated = useRef(false)
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch (error) {
      console.warn('[useLocalStorage] Failed to parse value', error)
      return initialValue
    }
  })

  useEffect(() => {
    if (!hasHydrated.current) {
      hasHydrated.current = true
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('[useLocalStorage] Failed to persist value', error)
    }
  }, [key, value])

  return [value, setValue] as const
}
