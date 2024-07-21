import { getCoursesByTeacher } from '@src/axios/api'
import CourseCard from '@src/components/CourseCard/CourseCard'
import { useEffect, useState } from 'react'

export default function ManageCourse() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const a = async () => {
      try {
        const res = await getCoursesByTeacher()
        setCourses(res?.metadata?.courses)
      } catch (error) {
        console.log(error)
      }
    }
    a()
  }, [])

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='underline'>Quản lý lớp học</h2>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
        {Array.isArray(courses) &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <div className='col-span-1' key={Math.random()}>
                <CourseCard
                  isManage
                  courseId={course.id}
                  img={course.image}
                  courseTitle={course.title}
                  courseTeacher={`${course?.teacher?.firstName} ${course?.teacher?.lastName}`}
                />
              </div>
            )
          })}
      </div>
    </>
  )
}
