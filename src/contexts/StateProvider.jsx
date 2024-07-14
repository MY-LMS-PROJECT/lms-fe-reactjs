import { createContext } from 'react'

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>
}
