import { findCousesEnrolledApi } from '@src/axios/api'
import CourseCard from '@src/components/CourseCard/CourseCard'
import errApiRes from '@src/utils/errApiRes'
import { notification } from 'antd'
import { useEffect, useState } from 'react'

export default function EnrollmentCourse() {
  const [enrollments, setEnrollments] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const _ = async () => {
      try {
        const res = await findCousesEnrolledApi()
        setEnrollments(res?.metadata?.enrollments)
      } catch (error) {
        notification.error({ message: errApiRes(error) })
      }
    }
    _()
  }, [])

  return (
    <div className='pt-5'>
      <h2 className='underline'>Lớp học đã tham gia</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
        {Array.isArray(enrollments) &&
          enrollments.length > 0 &&
          enrollments.map((enrollment) => {
            return (
              <div className='col-span-1' key={Math.random()}>
                <CourseCard
                  courseId={enrollment.course.id}
                  img={enrollment.course.image}
                  courseTitle={enrollment.course.title}
                  courseTeacher={`${enrollment.course?.teacher?.firstName} ${enrollment.course?.teacher?.lastName}`}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
