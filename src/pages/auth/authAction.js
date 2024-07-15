import { signUpTeacher } from '@src/axios/api'
import { ACTION_TYPE } from '@src/contexts/stateReducer'
import { notification } from 'antd'

export const logInAction = async ({ values, dispatch, navigate }) => {
  try {
    const { firstName, lastName, email, password } = values

    const res = await signUpTeacher({ firstName, lastName, email, password })
    console.log(res)
    dispatch({ type: ACTION_TYPE.LOG_IN, payload: res.metadata.user })
    localStorage.setItem('accessToken', res.metadata.tokens.accessToken)

    notification.success({
      message: 'Đăng ký thành công',
    })

    navigate('/')
  } catch (error) {
    let errMsg = error.response?.data?.message

    if (Array.isArray(errMsg) && errMsg.length > 0) {
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
