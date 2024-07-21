import { getListCourses } from '@src/axios/api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from '@src/components/CourseCard/CourseCard'

export default function Home() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const a = async () => {
      try {
        const res = await getListCourses()
        setCourses((pre) => {
          return [...pre, ...(res?.metadata?.courses ?? [])]
        })
      } catch (error) {
        console.log(error)
      }
    }
    a()
  }, [])

  return (
    <>
      <>
        <div className='flex items-center justify-between'>
          <h2 className='underline'>Bắt đầu học</h2>
          <Link to={'#'} className='cursor-pointer'>
            Tất cả
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
          {Array.isArray(courses) &&
            courses.length > 0 &&
            courses.slice(0, 10).map((course) => {
              return (
                <div className='col-span-1' key={Math.random()}>
                  <CourseCard
                    img={course.image}
                    courseId={course.id}
                    courseTitle={course.title}
                    courseTeacher={`${course?.teacher?.firstName} ${course?.teacher?.lastName}`}
                  />
                </div>
              )
            })}
        </div>
      </>
      <div className='pt-5'>
        <h2 className='underline'>Lớp học có thể đăng ký</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
          {Array.isArray(courses) &&
            courses.length > 0 &&
            courses.map((course) => {
              return (
                <div className='col-span-1' key={Math.random()}>
                  <CourseCard
                    img={course.image}
                    courseId={course.id}
                    courseTitle={course.title}
                    courseTeacher={`${course?.teacher?.firstName} ${course?.teacher?.lastName}`}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
