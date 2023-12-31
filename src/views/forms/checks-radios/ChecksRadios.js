import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormLabel,
  CImage,
  CFormTextarea,
} from '@coreui/react'
import Select from 'react-select'
import './ListBook.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_BASE_URL } from 'src/constant'
import { Spin, Tabs } from 'antd'

const Tables = () => {
  const [books, setBooks] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [visible, setVisible] = useState(false)
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  // Lấy category, author show/edit
  const [categoryOptions, setCategoryOptions] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [authorOptions, setAuthorOptions] = useState([])
  const [selectedAuthors, setSelectedAuthors] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState(null)
  const [spinning, setSpinning] = useState(false)
  //info book
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
  //Truyền data vào formData
  useEffect(() => {
    if (productDetails) {
      // const { title, categories, stock, authors, price, image } = productDetails
      // Tiếp tục với logic set giá trị cho formData
      setFormData({
        title: productDetails.title || '',
        categories: productDetails.categories || [],
        stock: productDetails.stock || 0,
        authors: productDetails.authors || [],
        price: productDetails.price || 0,
        isbn: productDetails.isbn || '',
        pageNumbers: productDetails.pageNumbers || '',
        publishedDate: productDetails.publishedDate || '',
        publisher: productDetails.publisher || '',
        language: productDetails.language || '',
        description: productDetails.description || '',
        image: productDetails.image || null,
      })
    }
  }, [productDetails])
  const resetProductDetails = () => {
    setSelectedCategories(null)
    setSelectedAuthors(null)
    //setSelectedRowId(null)
    setSelectedDeleteId(null)
  }
  useEffect(() => {
    if (!isProductModalOpen) {
      resetProductDetails()
      setIsEditMode(false)
      setSelectedRowId(null)
    }
  }, [isProductModalOpen])
  //get all  book
  const fetchBooks = async () => {
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/books`)
      if (response.ok) {
        const book = await response.json()
        setBooks(book.data)
        //console.log('Get data success', books)
      } else {
        console.error('Error fetching books:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setSpinning(false)
    }
  }
  useEffect(() => {
    fetchBooks()
  }, [])
  //get all categoiesy/authors
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setSpinning(true)
        const categoryResponse = await fetch(`${API_BASE_URL}/categories`)
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
        const authorResponse = await fetch(`${API_BASE_URL}/authors`)
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
      } finally {
        setSpinning(false)
      }
    }

    fetchOptions()
  }, [])

  useEffect(() => {
    setIsAllChecked(selectedItems.length === books.length)
  }, [selectedItems, books])
  const handleRowClick = (id) => {
    setSelectedRowId(id)
    console.log(id)
    //setIsPopupOpen(true)
    //handleShowProduct(selectedRowId)
  }
  // const handleCheckboxChange = (id) => {
  //   setSelectedItems((prevSelectedItems) => {
  //     if (prevSelectedItems.includes(id)) {
  //       return prevSelectedItems.filter((item) => item !== id)
  //     } else {
  //       return [...prevSelectedItems, id]
  //     }
  //   })
  //   setSelectedRowId(id)
  // }
  // const handleCheckAllChange = () => {
  //   if (isAllChecked) {
  //     setSelectedItems([]) // Uncheck all
  //   } else {
  //     // Check all by mapping books to get IDs
  //     const allIds = books.map((book) => book._id)
  //     setSelectedItems(allIds)
  //   }
  // }
  //Delect book
  const handleDelete = async (selectedRowId) => {
    // Display confirmation modal
    setSelectedDeleteId(selectedRowId)
    setVisible(true)
    console.log('Selected Row ID in handleDelete:', selectedRowId)
    console.log('Selected Row ID in handleDelete -delete:', selectedDeleteId)
  }
  //api xóa book
  const confirmDelete = async (selectedRowId) => {
    setVisible(false)
    console.log('Selected Row ID in confirmDelete:', selectedRowId)
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    // Loop through selectedItems and send DELETE requests
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/books/${selectedRowId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        console.log(`Book with ID ${selectedRowId} deleted successfully`)
        // Optionally, update the UI to remove the deleted items
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== selectedRowId))
        const data = await response.json()
        toast.success(data.message, {
          onClose: () => {
            setIsProductModalOpen(false)
            setSelectedDeleteId(null)
          },
        })
      } else {
        const data = await response.json()
        toast.error(data.message)
        console.error(`Error deleting book with ID ${selectedRowId}:`, response.statusText)
      }
    } catch (error) {
      toast.error(`Error deleting book with ID ${selectedRowId}:`, error)
    } finally {
      setSpinning(false)
    }
  }
  const cancelDelete = () => {
    // Close modal without performing deletion
    setVisible(false)
    setIsProductModalOpen(true)
    console.log('Selected Row ID in handleDelete:', selectedRowId)
  }
  //detail book
  const handleShowProduct = async (selectedItemId) => {
    try {
      setSpinning(true)
      console.log(selectedItemId)
      const response = await fetch(`${API_BASE_URL}/books/${selectedItemId}`)
      if (response.ok) {
        const Details = await response.json()
        setProductDetails(Details.data)
        //console.log(selectedCategories)
        //console.log(Details)
        setIsProductModalOpen(true)
      } else {
        console.error('Error fetching product details:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setSpinning(false)
    }
  }
  useEffect(() => {
    if (productDetails) {
      setSelectedCategories(
        productDetails.categories.map((category) => ({
          value: category.categoryName,
          label: category.categoryName,
        })) || [],
      )
      setSelectedAuthors(
        productDetails.authors.map((author) => ({
          value: author.authorName,
          label: author.authorName,
        })) || [],
      )
      setIsProductModalOpen(true)
    }
  }, [productDetails])
  useEffect(() => {
    if (selectedRowId) {
      handleShowProduct(selectedRowId)
    }
  }, [selectedRowId])
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions)

    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: Array.isArray(selectedOptions) ? selectedOptions : [],
    }))
  }
  const handleAuthorChange = (selectedOptions) => {
    setSelectedAuthors(selectedOptions)

    setFormData((prevFormData) => ({
      ...prevFormData,
      authors: Array.isArray(selectedOptions) ? selectedOptions : [],
    }))
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA')
  }
  //upload edit/show image
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Cập nhật state selectedFile
      setSelectedFile(file)
    }
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }))
  }
  const handleEditImage = () => {
    const fileInput = document.getElementById('image')
    fileInput.click()
  }
  const handleEditForm = () => {
    setIsEditMode(true)
  }
  //api upload book
  const handleUploadBook = async (selectedItemId) => {
    console.log(selectedItemId)
    console.log(formData)
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    const formDataToSend = new FormData()
    for (const key in formData) {
      if (key === 'categories') {
        // Lấy mảng các giá trị của categories và chỉ lấy thuộc tính value
        const categoryValues = selectedCategories.map((category) => category.value)
        formDataToSend.append(key, JSON.stringify(categoryValues))
      } else if (key === 'authors') {
        // Lấy mảng các giá trị của authors và chỉ lấy thuộc tính value
        const authorValues = selectedAuthors.map((author) => author.value)
        formDataToSend.append(key, JSON.stringify(authorValues))
      } else {
        formDataToSend.append(key, formData[key])
      }
    }
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/books/${selectedItemId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        console.log('Dữ liệu đã được gửi thành công.')
        const data = await response.json()
        toast.success(data.message, {
          onClose: () => {
            fetchBooks()
            setIsProductModalOpen(false)
          },
        })
      } else {
        const error = await response.json()
        toast.info(error.message)
      }
    } catch (error) {
      toast.error('Lỗi trong quá trình xử lý yêu cầu:', error)
    } finally {
      setSpinning(false)
    }
  }
  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: Array.isArray(prevState[fieldName]) ? prevState[fieldName] : value,
    }))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách sản phẩm</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tựa đề</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Thể loại</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tác giả</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số lượng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Giá tiền</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {books.map((book, index) => (
                  <CTableRow
                    key={index}
                    active={selectedRowId === book._id}
                    onClick={(e) => {
                      handleRowClick(book._id)
                    }}
                  >
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{book.title}</CTableDataCell>
                    <CTableDataCell>
                      {book.categories && book.categories.length > 0
                        ? book.categories[0].categoryName
                        : ''}
                    </CTableDataCell>
                    <CTableDataCell>
                      {book.authors && book.authors.length > 0 ? book.authors[0].authorName : ''}
                    </CTableDataCell>
                    <CTableDataCell>{book.stock}</CTableDataCell>
                    <CTableDataCell>{book.price}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            {selectedRowId && (
              <CModal visible={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <CModalHeader closeButton>
                  <CModalTitle>Chọn chức năng</CModalTitle>
                </CModalHeader>
                <CModalBody className="edit-buton">
                  <CButton
                    onClick={() => handleShowProduct(selectedRowId)}
                    className="edit-btn"
                    color="primary"
                  >
                    Chi tiết
                  </CButton>
                  {/* <CButton
                    onClick={() => handleAddProduct(selectedRowId)}
                    className="edit-btn"
                    color="primary"
                  >
                    Thêm
                  </CButton>
                  <CButton
                    onClick={() => handleEditProduct(selectedRowId)}
                    className="edit-btn"
                    color="primary"
                  >
                    Sửa
                  </CButton>
                  <CButton
                    onClick={() => handleDeleteProduct(selectedRowId)}
                    className="edit-btn"
                    color="primary"
                  >
                    Xóa
                  </CButton> */}
                </CModalBody>
              </CModal>
            )}
            {/* Thông báo xóa */}
            <CModal
              alignment="center"
              visible={visible}
              onClose={() => setVisible(false)}
              aria-labelledby="DeleteConfirmationModal"
            >
              <CModalHeader closeButton>
                <CModalTitle id="DeleteConfirmationModal">Xác nhận xóa</CModalTitle>
              </CModalHeader>
              <CModalBody>Bạn có chắc muốn xóa?</CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={cancelDelete}>
                  Hủy
                </CButton>
                <CButton
                  color="danger"
                  onClick={() => {
                    confirmDelete(selectedRowId)
                  }}
                >
                  Xóa
                </CButton>
              </CModalFooter>
            </CModal>
            {/* Modal xem chi tiết */}
            <CModal
              size="lg"
              alignment="center"
              visible={isProductModalOpen}
              onClose={() => {
                resetProductDetails()
                setIsProductModalOpen(false)
              }}
            >
              <CModalHeader closeButton>
                <CModalTitle>Chi tiết sản phẩm</CModalTitle>
                <div style={{ marginLeft: '450px' }}>
                  <CButton color="primary" onClick={handleEditForm}>
                    Sửa
                  </CButton>
                  <CButton
                    style={{ marginLeft: '10px' }}
                    color="danger"
                    onClick={() => {
                      handleDelete(selectedRowId)
                    }}
                  >
                    Xóa
                  </CButton>
                </div>
              </CModalHeader>
              <CModalBody>
                {/* Render product details here */}
                {productDetails && (
                  <>
                    <p>
                      Tựa đề:
                      <CFormInput
                        aria-label="Tựa đề"
                        disabled={!isEditMode}
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </p>
                    <p>
                      {' '}
                      Thể loại:
                      <Select
                        isDisabled={!isEditMode}
                        isMulti
                        isClearable
                        onChange={handleCategoryChange}
                        options={categoryOptions}
                        value={selectedCategories || []}
                      />
                    </p>
                    <p>
                      Tác giả:{' '}
                      <Select
                        isDisabled={!isEditMode}
                        isMulti
                        isClearable
                        onChange={handleAuthorChange}
                        options={authorOptions}
                        value={selectedAuthors || []}
                      />
                    </p>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="stock">Số Lượng:</CFormLabel>
                          <CFormInput
                            disabled={!isEditMode}
                            type="number"
                            id="stock"
                            name="stock"
                            placeholder="Nhập số lượng"
                            value={formData.stock || ''}
                            onChange={(e) => handleInputChange('stock', e.target.value)}
                          />
                        </CCol>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="price">Giá tiền:</CFormLabel>
                          <CFormInput
                            disabled={!isEditMode}
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Ngôn ngữ sách"
                            value={formData.price || 0}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="pageNumbers">Số trang:</CFormLabel>
                          <CFormInput
                            disabled={!isEditMode}
                            type="text"
                            id="pageNumbers"
                            name="pageNumbers"
                            placeholder="Nhập số trang"
                            value={formData.pageNumbers}
                            onChange={(e) => handleInputChange('pageNumbers', e.target.value)}
                          />
                        </CCol>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="publisher">Nhà xuất bản:</CFormLabel>
                          <CFormInput
                            disabled={!isEditMode}
                            type="text"
                            id="publisher"
                            name="publisher"
                            placeholder="Nhập nhà xuất bản"
                            value={formData.publisher}
                            onChange={(e) => handleInputChange('publisher', e.target.value)}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="publishDate">Ngày xuất bản:</CFormLabel>
                          <CFormInput
                            disabled={!isEditMode}
                            type="date"
                            id="publishedDate"
                            name="publishedDate "
                            placeholder="Nhập ngày xuất bản"
                            value={formatDate(formData.publishedDate)}
                            onChange={(e) => handleInputChange('publishedDate', e.target.value)}
                          />
                        </CCol>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="language">Ngôn ngữ:</CFormLabel>
                          <CFormInput
                            disabled={!isEditMode}
                            type="text"
                            id="language"
                            name="language"
                            placeholder="Nhập ngôn ngữ"
                            value={formData.language}
                            onChange={(e) => handleInputChange('language', e.target.value)}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    Mã định danh ISBN:{' '}
                    <CFormInput
                      disabled={!isEditMode}
                      type="text"
                      id="isbn"
                      name="isbn"
                      placeholder="Nhập mã isbn"
                      value={formData.isbn}
                      onChange={(e) => handleInputChange('isbn', e.target.value)}
                    />
                    <div>
                      Mô tả:
                      <CFormTextarea
                        disabled={!isEditMode}
                        rows={5}
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Mô tả sách"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="mb-3">
                      <CFormInput
                        type="file"
                        id="image"
                        name="image"
                        accept=".png, .jpg, .jpeg"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                    </div>
                    <p>Ảnh sản phẩm</p>
                    <div className="text-center position-relative">
                      <CImage
                        disabled={!isEditMode}
                        rounded
                        src={
                          selectedFile ? URL.createObjectURL(selectedFile) : productDetails.image
                        }
                        width={200}
                        height={200}
                        style={{
                          objectFit: 'cover',
                          border: '1px solid rgba(0, 0, 0, 0.5)',
                          borderRadius: '10px',
                        }}
                        onChange={handleImageChange}
                      />
                      <div
                        className="position-absolute bottom-0 start-50 translate-middle-x"
                        style={{ zIndex: 1 }}
                      >
                        <CButton
                          disabled={!isEditMode}
                          className="mb-0 text-white"
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            border: 'none',
                            borderRadius: '0 0 10px 10px',
                            width: '200px',
                            fontSize: '20px',
                          }}
                          onClick={handleEditImage}
                        >
                          Sửa
                        </CButton>
                      </div>
                    </div>
                  </>
                )}
              </CModalBody>
              <CModalFooter>
                <CButton
                  className="custom-button"
                  style={{ backgroundColor: 'green', border: 'none' }}
                  disabled={!isEditMode}
                  onClick={() => handleUploadBook(selectedRowId)}
                >
                  Lưu
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Spin spinning={spinning} fullscreen />
    </CRow>
  )
}

export default Tables
