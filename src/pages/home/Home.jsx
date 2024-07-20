import { getListCourses } from '@src/axios/api'
import { Col, Row } from 'antd'
import { useEffect } from 'react'

const style = {
  background: '#0092ff',
  padding: '8px 0',
}

export default function Home() {
  useEffect(() => {
    const a = async () => {
      try {
        const res = await getListCourses()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    a()
  }, [])

  return (
    <Row gutter={16}>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className='gutter-row' span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
  )
}
