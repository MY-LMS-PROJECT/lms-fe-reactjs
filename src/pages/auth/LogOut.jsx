import { ACTION_TYPE } from '@src/contexts/stateReducer'
import { useStateContext } from '@src/hooks'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { logOutAction } from './authAction'

export default function LogOut() {
  const { state, dispatch } = useStateContext()

  useEffect(() => {
    logOutAction({ dispatch })
  }, [dispatch])

  if (!state?.auth?.isAuth) return <Navigate to={'/'} />

  return (
    <div className='flex h-screen items-center justify-center'>
      <Spin size='large' tip='Loading'>
        <div className='p-12' />
      </Spin>
    </div>
  )
}
