import axiosCustom from './instance'

export const signUpTeacherApi = async ({ firstName, lastName, email, password }) => {
  const apiUrl = '/api/v1/auth/signup/teacher'
  const data = { firstName, lastName, email, password }
  return await axiosCustom.post(apiUrl, data)
}

export const signUpStudentApi = async ({ firstName, lastName, email, password }) => {
  const apiUrl = '/api/v1/auth/signup/student'
  const data = { firstName, lastName, email, password }
  return await axiosCustom.post(apiUrl, data)
}

export const logInApi = async ({ email, password }) => {
  const apiUrl = '/api/v1/auth/signin'
  const data = { email, password }
  return await axiosCustom.post(apiUrl, data)
}

export const getProfileApi = async () => {
  const apiUrl = '/api/v1/users/profile'
  return await axiosCustom.get(apiUrl)
}
