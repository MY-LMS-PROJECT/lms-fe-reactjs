import { StateContext } from '@src/contexts/StateProvider'
import { useContext } from 'react'

export const useStateContext = () => {
  const { state, dispatch } = useContext(StateContext)
  return { state, dispatch }
}
