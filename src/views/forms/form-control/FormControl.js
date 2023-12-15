import React, { useState, useEffect, useCallback } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'
import CustomToast from 'src/views/notifications/toasts/NotificationToasts'

const FormControl = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedAuthors, setSelectedAuthors] = useState([])
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [inputAuthors, setInputAuthors] = useState('')
  const [inputCategories, setInputCategories] = useState('')
  const [categoryOptions, setCategoryOptions] = useState([])
  const [authorOptions, setAuthorOptions] = useState([])
  // const categoryOptions = [
  //   { value: 'Tiểu thuyết', label: 'Tiểu Thuyết' },
  //   { value: 'Lãng mạn', label: 'Lãng mạn' },
  //   { value: 'Option 3', label: 'Option 3' },
  //   { value: 'Option 4', label: 'Option 4' },
  //   { value: 'Option 5', label: 'Option 5' },
  // ]

  // const authorOptions = [
  //   { value: 'Author 1', label: 'Author 1' },
  //   { value: 'Author 2', label: 'Author 2' },
  //   { value: 'Author 3', label: 'Author 3' },
  // ]

  const [formData, setFormData] = useState({
    title: '',
    categories: [],
    stock: 0,
    authors: [],
    price: 0,
    isbn: '',
    pageNumbers: '',
    publishedDate: '',
    publisher: '',
    language: '',
    description: '',
    image: null,
  })
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categoryResponse = await fetch('http://localhost:3333/api/v1/categories')
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json()
          // In ra console để xem dữ liệu trả về từ API
          console.log('categoryData:', categoryData)
          // Kiểm tra xem categoryData có thuộc tính categories không
          if (categoryData && categoryData.data && Array.isArray(categoryData.data)) {
            setCategoryOptions(
              categoryData.data.map((category) => ({
                value: category.categoryName,
                label: category.categoryName,
              })),
            )
          } else {
            console.error('Dữ liệu từ API không đúng định dạng.')
          }
        } else {
          console.error('Không thể lấy dữ liệu từ API.')
        }
        const authorResponse = await fetch('http://localhost:3333/api/v1/authors')
        if (authorResponse.ok) {
          const authorData = await authorResponse.json()
          // In ra console để xem dữ liệu trả về từ API
          console.log('categoryData:', authorData)
          // Kiểm tra xem categoryData có thuộc tính categories không
          if (authorData && authorData.data && Array.isArray(authorData.data)) {
            setAuthorOptions(
              authorData.data.map((author) => ({
                value: author.authorName,
                label: author.authorName,
              })),
            )
          } else {
            console.error('Dữ liệu từ API không đúng định dạng.')
          }
        } else {
          console.error('Không thể lấy dữ liệu từ API.')
        }
      } catch (error) {
        console.error('Lỗi trong quá trình lấy dữ liệu từ API:', error)
      }
    }

    fetchOptions()
  }, [])

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]:
  //       name === 'authors' ? [value] : Array.isArray(prevState[name]) ? prevState[name] : value,
  //   }))
  // }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name === 'authors') {
      setInputAuthors(value)
      setFormData((prevState) => ({
        ...prevState,
        [name]: Array.isArray(prevState[name]) ? prevState[name] : value,
      }))
    } else if (name === 'categories') {
      setInputCategories(value)
      setFormData((prevState) => ({
        ...prevState,
        [name]: Array.isArray(prevState[name]) ? prevState[name] : value,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: Array.isArray(prevState[name]) ? prevState[name] : value,
      }))
    }
  }
  const handleSelectChange = (selectedOptions, field) => {
    const selectedValues = selectedOptions.map((option) => option.value).filter(Boolean)
    if (field === 'categories') {
      setSelectedCategories(selectedOptions)
      setFormData((prevState) => ({
        ...prevState,
        categories: inputCategories ? [inputCategories, ...selectedValues] : selectedValues,
      }))
    } else if (field === 'authorss') {
      setSelectedAuthors(selectedOptions)
      setFormData((prevState) => ({
        ...prevState,
        authors: inputAuthors ? [inputAuthors, ...selectedValues] : selectedValues,
      }))
    }
  }

  // const handleSelectChange = (selectedOptions, field) => {
  //   const selectedValues = selectedOptions.map((option) => option.value).filter(Boolean)
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [field.toString()]: selectedValues,
  //   }))
  // }
  //fix 2
  // const handleSelectChange = (selectedOptions, field) => {
  //   const selectedValues = selectedOptions.map((option) => option.value).filter(Boolean)
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [field.toString()]: selectedValues,
  //     authors: inputAuthors ? [inputAuthors, ...selectedValues] : selectedValues,
  //   }))
  //   setSelectedAuthors(selectedOptions)
  // }
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    //const userInfoString = localStorage.getItem('userInfo')
    //const token = userInfoString.accessToken
    const token = ''
    const formDataToSend = new FormData()

    // Gán giá trị từ state formData vào formDataToSend
    for (const key in formData) {
      if (key === 'categories' || key === 'authors') {
        // Chuyển đổi mảng thành chuỗi JSON nếu là categories hoặc authors
        formDataToSend.append(key, JSON.stringify(formData[key]))
        console.log(formData[key])
      } else if (key !== 'authorss') {
        formDataToSend.append(key, formData[key])
      }
    }
    // Gán file ảnh đã chọn vào formDataToSend
    //formDataToSend.append('image', selectedImage)
    try {
      const response = await fetch('http://localhost:3333/api/v1/books/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        console.log('Dữ liệu đã được gửi thành công.')
        setShowSuccessToast(true)
      } else {
        const error = await response.json()
        console.error(error.message)
        setShowSuccessToast(true)
      }
    } catch (error) {
      console.error('Lỗi trong quá trình xử lý yêu cầu:', error)
      setShowSuccessToast(true)
    }
  }
  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thông tin sách</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Tựa đề</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Tên sản phẩm"
                  value={formData.title}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="categories">Thể loại</CFormLabel>
                <Select
                  options={categoryOptions}
                  isMulti
                  onChange={(selectedOptions) => {
                    handleSelectChange(selectedOptions, 'categories')
                    setSelectedCategories(selectedOptions)
                  }}
                  value={selectedCategories}
                  placeholder="Chọn thể loại"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="stock">Tồn kho</CFormLabel>
                <CFormInput
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Số lượng sản phẩm"
                  value={formData.stock}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="authors">Tác giả</CFormLabel>
                <CFormInput
                  type="text"
                  id="authors"
                  name="authors"
                  placeholder="Nhập tên tác giả"
                  value={inputAuthors}
                  onChange={(e) => handleInputChange(e)}
                />
                <Select
                  id="authorss"
                  options={authorOptions}
                  isMulti
                  value={selectedAuthors}
                  onChange={(selectedOptions) => {
                    handleSelectChange(selectedOptions, 'authorss')
                    setSelectedAuthors(selectedOptions)
                  }}
                  placeholder="Chọn tác giả"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="price">Giá tiền</CFormLabel>
                <CFormInput
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Nhập giá tiền"
                  value={formData.price}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thông tin chi tiết</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="authors">ISBS</CFormLabel>
                <CFormInput
                  type="text"
                  id="isbn"
                  name="isbn"
                  placeholder="Mã ISBN"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Ảnh</CFormLabel>
                <CFormInput
                  type="file"
                  id="image"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  placeholder="Số lượng sản phẩm"
                  //value={formData.image}
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-3">
                <CRow>
                  <CCol xs="6" className="mb-3">
                    <CFormLabel htmlFor="pageNumbers">Số trang</CFormLabel>
                    <CFormInput
                      type="text"
                      id="pageNumbers"
                      name="pageNumbers"
                      placeholder="Nhập số trang"
                      value={formData.pageNumbers}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </CCol>
                  <CCol xs="6" className="mb-3">
                    <CFormLabel htmlFor="publishedDate">Ngày xuất bản</CFormLabel>
                    <CFormInput
                      type="date"
                      id="publishedDate"
                      name="publishedDate"
                      placeholder="Nhập số ngày sản xuất"
                      value={formData.publishedDate}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CRow>
                  <CCol xs="6" className="mb-3">
                    <CFormLabel htmlFor="publisher">Nhà xuất bản</CFormLabel>
                    <CFormInput
                      type="text"
                      id="publisher"
                      name="publisher"
                      placeholder="Nhập nhà xuất bản"
                      value={formData.publisher}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </CCol>
                  <CCol xs="6" className="mb-3">
                    <CFormLabel htmlFor="language">Ngôn ngữ</CFormLabel>
                    <CFormInput
                      type="text"
                      id="language"
                      name="language"
                      placeholder="Ngôn ngữ sách"
                      value={formData.language}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="description">Mô tả</CFormLabel>
                <CFormTextarea
                  rows={5}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Mô tả sách"
                  value={formData.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <CButton color="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      {/* Toast thông báo */}
      <CustomToast
        title="Success"
        body="Dữ liệu đã được gửi thành công."
        closeButton={true}
        timestamp={new Date().toLocaleTimeString()}
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
    </CRow>
  )
}

export default FormControl
