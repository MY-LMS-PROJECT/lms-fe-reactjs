import { useState } from 'react'
import { Button, Image, DatePicker, Form, Input, Upload, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { createCourseApi } from '@src/axios/api'
import { useNavigate } from 'react-router-dom'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default function CreateCourse() {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  const [datePicker, setDatepicker] = useState()

  const navigate = useNavigate()

  const onChangeDatePicker = (date) => {
    setDatepicker(date.$d)
  }
  const disabledDatePicker = (current) => {
    // Không cho phép chọn ngày trước ngày hiện tại
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Đặt thời gian về 00:00:00 để so sánh chỉ theo ngày
    return current && current.toDate() < today
  }

  //   call api khi bấm submit
  const onFinishForm = async (values) => {
    if (datePicker) values.startDate = datePicker
    values.image = fileList[0].originFileObj

    try {
      const formData = new FormData()
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })
      const res = await createCourseApi(formData)
      navigate('/courses/manage')
    } catch (error) {
      let errMsg = error.response?.data?.message // string or array

      if (Array.isArray(errMsg) && errMsg.length > 0) {
        let _errMsg = errMsg.reduce((preValue, currentValue) => {
          return preValue + `${currentValue.field}: ${currentValue.error}, `
        }, '')
        errMsg = _errMsg
      }

      notification.error({
        message: 'Tạo khoá học thất bại',
        description: errMsg,
      })
    }
  }

  // handle change avatar
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  return (
    <div className='mt-8 flex justify-center'>
      <div className='w-full md:w-2/3 lg:w-1/2'>
        <Form name='basic' onFinish={onFinishForm} autoComplete='off' layout='vertical'>
          <Form.Item>
            <h2>Tạo lớp học mới</h2>
          </Form.Item>

          <Form.Item
            label='Tên lớp học'
            name='title'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên lớp học!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Mô tả'
            name='description'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Chọn ngày bắt đầu'>
            <DatePicker onChange={onChangeDatePicker} disabledDate={disabledDatePicker} />
          </Form.Item>
          <Form.Item label='Chọn ảnh'>
            <Upload
              listType='picture-card'
              fileList={fileList}
              beforeUpload={() => false}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length > 0 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: 'none',
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Tạo khoá học
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
