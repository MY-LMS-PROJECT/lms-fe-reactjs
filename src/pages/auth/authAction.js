import { getProfileApi, logInApi, signUpTeacherApi } from '@src/axios/api'
import { ACTION_TYPE } from '@src/contexts/stateReducer'
import { notification } from 'antd'

export const signUpTeacherAction = async ({ values, dispatch, navigate }) => {
  try {
    const { firstName, lastName, email, password } = values

    const res = await signUpTeacherApi({ firstName, lastName, email, password })
    dispatch({ type: ACTION_TYPE.LOG_IN, payload: res.metadata.user })
    localStorage.setItem('accessToken', res.metadata.tokens.accessToken)

    notification.success({
      message: 'Đăng ký thành công',
    })

    navigate('/')
  } catch (error) {
    let errMsg = error.response?.data?.message // string or array

    if (Array.isArray(errMsg) && errMsg.length > 0) {
      // errMsg = [{ field: '', error: '' }]
      console.log('message arr', errMsg)
      let _errMsg = errMsg.reduce((preValue, currentValue) => {
        return preValue + `${currentValue.field}: ${currentValue.error}, `
      }, '')
      errMsg = _errMsg
    }

    notification.error({
      message: 'Đăng ký thất bại',
      description: errMsg,
    })
  }
}

export const logInAction = async ({ values, dispatch, navigate }) => {
  try {
    const { email, password } = values

    const res = await logInApi({ email, password })
    dispatch({ type: ACTION_TYPE.LOG_IN, payload: res.metadata.user })
    localStorage.setItem('accessToken', res.metadata.tokens.accessToken)

    notification.success({
      message: 'Đăng nhập thành công',
    })

    // navigate('/')
  } catch (error) {
    let errMsg = error.response?.data?.message // string or array

    if (Array.isArray(errMsg) && errMsg.length > 0) {
      // errMsg = [{ field: '', error: '' }]
      console.log('message arr', errMsg)
      let _errMsg = errMsg.reduce((preValue, currentValue) => {
        return preValue + `${currentValue.field}: ${currentValue.error}, `
      }, '')
      errMsg = _errMsg
    }

    notification.error({
      message: 'Đăng nhập thất bại',
      description: errMsg,
    })
  }
}

export const getProfileAction = async ({ dispatch }) => {
  try {
    const res = await getProfileApi()
    console.log(res)
    dispatch({ type: ACTION_TYPE.LOG_IN, payload: res.metadata.user })
  } catch (error) {
    notification.error({
      message: 'Phiên đăng nhập đã hết hạn',
    })
  }
}
