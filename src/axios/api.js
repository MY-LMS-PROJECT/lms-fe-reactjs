import { data } from 'autoprefixer'
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

export const updateProfile = async ({ firstName, lastName }) => {
  const apiUrl = '/api/v1/users/profile/update'
  const data = { firstName, lastName }
  return await axiosCustom.patch(apiUrl, data)
}

export const changeAvatarApi = async (formData) => {
  const apiUrl = '/api/v1/users/profile/change-avatar'
  return await axiosCustom.patch(apiUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const changePasswordApi = async ({ password, newPassword }) => {
  const data = { password, newPassword }
  const apiUrl = '/api/v1/users/profile/change-password'
  return await axiosCustom.patch(apiUrl, data)
}

export const getListCourses = async ({ page = 1, limit = 10 } = {}) => {
  const apiUrl = `/api/v1/courses/find?page=${page}&limit=${limit}`
  return await axiosCustom.get(apiUrl)
}

export const createCourseApi = async (formData) => {
  const apiUrl = '/api/v1/courses/create'
  // const data = { title, description, image, startDate }
  return await axiosCustom.post(apiUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
