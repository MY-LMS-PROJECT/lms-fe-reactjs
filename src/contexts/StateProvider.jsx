import { createContext, useReducer } from 'react'
import { initState, reducer } from './stateReducer'

export const StateContext = createContext({
  state: initState,
  dispatch: () => {},
})

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}
