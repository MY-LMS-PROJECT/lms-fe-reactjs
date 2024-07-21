import { useEffect, useState } from 'react'
import { Button, List, notification } from 'antd'
import { enrollCourseApi, getCourseDetailApi } from '@src/axios/api'
import { useParams } from 'react-router-dom'
import { getImgCourseServer } from '@src/utils/showImgServer'

const data = Array(10)
  .fill(0)
  .map((item, index) => {
    return { title: `Bài giảng ${index + 1}` }
  })

export default function OverviewCourse() {
  const [course, setCourse] = useState([])
  const [teacher, setTeacher] = useState({})
  const params = useParams()

  useEffect(() => {
    const _ = async () => {
      try {
        const res = await getCourseDetailApi({ courseId: params.courseId })
        setCourse(res.metadata.course)
        setTeacher(res.metadata.teacher)
      } catch (error) {
        notification.error({ message: error?.response?.data?.message })
      }
    }
    _()
  }, [])

  const enrollCourse = async () => {
    try {
      const courseId = params.courseId
      const res = await enrollCourseApi({ courseId })
      console.log(res)
      notification.success({ message: res.message })
    } catch (error) {
      notification.error({ message: error?.response?.data?.message })
    }
  }

  return (
    <>
      <div className='mb-10 flex flex-col gap-7 md:flex-row'>
        <div className='flex w-full items-center justify-center overflow-hidden bg-gray-100 md:h-52 md:w-80'>
          <img src={getImgCourseServer(course.image)} alt='' className='w-full' />
        </div>
        <div className='flex flex-col'>
          <h2>{course.title}</h2>
          <p>Được tạo bởi {`${teacher.firstName} ${teacher.lastName}`}</p>
          <Button type='primary' className='mt-4' size='large' onClick={enrollCourse}>
            Đăng ký học
          </Button>
        </div>
      </div>

      <div className='mb-10'>
        <h2>Mô tả nội dung bài học</h2>
        <p className='md:w-1/2'>{course.description}</p>
      </div>

      <div>
        <h2>Bài giảng</h2>
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<b>{item.title}</b>}
                description='Ant Design, a design language for background applications, is refined by Ant UED Team'
              />
            </List.Item>
          )}
        />
      </div>
    </>
  )
}
