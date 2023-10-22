import { useEffect, useReducer } from 'react'
import { usePrevious } from './usePrevious'
import deepEqual from 'fast-deep-equal/es6'

export const usePersistedReducer = <State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  storageKey: string
) => {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  const prevState = usePrevious(state)

  function isCookieEnabled() {
    return window.navigator.cookieEnabled
  }

  function init(): State {
    if (typeof window === 'undefined') {
      return initialState
    }

    if (!isCookieEnabled()) {
      return initialState
    }

    const stringState = sessionStorage.getItem(storageKey)

    if (!stringState) {
      return initialState
    }

    return JSON.parse(stringState)
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
