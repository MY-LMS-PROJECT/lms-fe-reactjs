import { PlusOutlined } from '@ant-design/icons'
import { getCourseDetailApi, updateCourseApi } from '@src/axios/api'
import { getImgCourseServer } from '@src/utils/showImgServer'
import { Button, Form, Image, Input, notification, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default function EditCourse() {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  const [courseDetail, setCourseDetail] = useState({})
  const [initForm] = useForm()

  const params = useParams()

  const navigate = useNavigate()

  //   call api khi bấm submit
  const onFinishForm = async (values) => {
    if (fileList.length > 0) values.image = fileList[0].originFileObj

    try {
      const formData = new FormData()
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })

      const res = await updateCourseApi({ formData, courseId: courseDetail.id })
      notification.success({ message: res?.message })
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
        message: 'Chỉnh sửa khoá học thất bại',
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
      <div className='mt-2'>Upload</div>
    </button>
  )

  // useEffect
  // call api course detail
  useEffect(() => {
    const a = async () => {
      const res = await getCourseDetailApi({ courseId: params.courseId })
      const course = res?.metadata?.course
      setCourseDetail(course)
      // set init form value
      initForm.setFieldsValue({ title: course.title, description: course.description })
    }
    a()
  }, [])

  return (
    <div className='mt-8 flex justify-center'>
      <div className='w-full md:w-2/3 lg:w-1/2'>
        <Form
          name='basic'
          onFinish={onFinishForm}
          autoComplete='off'
          layout='vertical'
          form={initForm}
        >
          <Form.Item>
            <h2>Chỉnh sửa thông tin lớp học</h2>
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

          {/* <Form.Item>
            <p>{new Date(courseDetail?.startDate).toString()}</p>
          </Form.Item> */}

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

          <Form.Item>
            <img src={getImgCourseServer(courseDetail.image)} alt='' />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
