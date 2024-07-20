import { BACKEND_URL } from './const'

export function getImgCourseServer(img) {
  return `${BACKEND_URL}/public/courses/${img}`
}

export function getAvatarServer(img) {
  return `${BACKEND_URL}/public/avatar/${img}`
}
