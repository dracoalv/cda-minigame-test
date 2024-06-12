import { useEffect } from 'react'

export const useKeyPress = (handler: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handler])
}
