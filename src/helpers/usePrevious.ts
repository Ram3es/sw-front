import { useRef, useEffect } from 'react'

export const usePrevious = <T>(value: T): T | undefined => {
  const previousValueRef = useRef<T>()

  useEffect(() => {
    previousValueRef.current = value
  })

  return previousValueRef.current
}
