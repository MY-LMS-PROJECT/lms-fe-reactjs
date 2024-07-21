import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { deleteCourseApi } from '@src/axios/api'
import { getImgCourseServer } from '@src/utils/showImgServer'
import { Button, Modal, notification } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CourseCard({
  courseId,
  courseTitle,
  courseTeacher,
  img,
  isManage = false,
}) {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModalDelete = () => {
    setIsModalOpen(true)
  }

  const handleOk = async ({ courseId }) => {
    try {
      const res = await deleteCourseApi({ courseId })
      setIsModalOpen(false)
      location.reload()
    } catch (error) {
      let errMsg = error.response?.data?.message // string or array

      if (Array.isArray(errMsg) && errMsg.length > 0) {
        let _errMsg = errMsg.reduce((preValue, currentValue) => {
          return preValue + `${currentValue.field}: ${currentValue.error}, `
        }, '')
        errMsg = _errMsg
      }

      notification.error({
        message: 'Chỉnh sửa khoá học thất bại',
        description: errMsg,
      })
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Link to={`/courses/${courseId}/overview`}>
      <div className='w-full shadow-course-card hover:opacity-80'>
        <div className='flex h-40 items-center overflow-hidden'>
          <img className='w-full' src={getImgCourseServer(img)} alt='img course' />
        </div>
        <div className='px-5 pb-3'>
          <h3 className='overflow-hidden truncate overflow-ellipsis whitespace-nowrap'>
            {courseTitle}
          </h3>
          <p className='overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-gray-500'>
            {courseTeacher}
          </p>
          {isManage && (
            <div className='flex gap-2'>
              <div>
                <Button type='primary' ghost onClick={() => navigate(`/courses/edit/${courseId}`)}>
                  <EditOutlined />
                </Button>
              </div>
              <div>
                <Button danger onClick={showModalDelete}>
                  <DeleteOutlined />
                </Button>
                <Modal
                  title='Bạn có muốn xoá lớp học này không'
                  open={isModalOpen}
                  onOk={() => handleOk({ courseId })}
                  onCancel={handleCancel}
                ></Modal>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
