import { useEffect, useReducer } from 'react'
import { usePrevious } from './usePrevious'
import deepEqual from 'fast-deep-equal/es6'

const isCookieEnabled = () => window.navigator.cookieEnabled

export const usePersistedReducer = <State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  storageKey: string
) => {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  const prevState = usePrevious(state)

  function init(): State {
    if (typeof window === 'undefined') {
      return initialState
    }

    if (!isCookieEnabled()) {
      return initialState
    }

    const stringState = sessionStorage.getItem(storageKey)
    if (stringState) {
      try {
        return JSON.parse(stringState)
      } catch (error) {
        return initialState
      }
    } else {
      return initialState
    }
  }

  useEffect(() => {
    if (isCookieEnabled()) {
      const stateEqual = deepEqual(prevState, state)
      if (!stateEqual) {
        const stringifiedState = JSON.stringify(state)
        sessionStorage.setItem(storageKey, stringifiedState)
      }
    }
  }, [state])

  return { state, dispatch }
}
