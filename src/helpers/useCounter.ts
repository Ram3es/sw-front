import { useRef, type MouseEvent, type Dispatch } from 'react'

export const useCounter = (handleFunction: Dispatch<React.SetStateAction<number>>, limit: number) => {
  const intervalRef = useRef<ReturnType< typeof setInterval>>()
  const timeoutRef = useRef<ReturnType< typeof setInterval>>()

  const increment = (e: MouseEvent<HTMLDivElement>) => {
    if (e.type === 'mousedown') {
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          handleFunction(prevCount => {
            if (prevCount >= limit) {
              clearInterval(intervalRef.current)
              return prevCount
            }
            return prevCount + 100
          })
        }, 50)
      }, 200)
    }
    if (e.type === 'click') {
      handleFunction(prevCount => {
        if (prevCount >= limit) {
          return prevCount
        }
        return prevCount + 100
      })
    }
  }

  const decrement = (e: MouseEvent<HTMLDivElement>) => {
    if (e.type === 'mousedown') {
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          handleFunction(prevCount => {
            if (prevCount <= 0) {
              clearInterval(intervalRef.current)
              return prevCount
            }
            return prevCount - 100
          })
        }, 50)
      }, 200)
    }
    if (e.type === 'click') {
      handleFunction(prevCount => {
        if (prevCount <= 0) {
          return prevCount
        }
        return prevCount - 100
      })
    }
  }
  const clearAutoCount = () => {
    clearTimeout(timeoutRef.current)
    clearInterval(intervalRef.current)
  }

  return {
    increment,
    decrement,
    clearAutoCount
  }
}
