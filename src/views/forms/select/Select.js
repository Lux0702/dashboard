import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CAlert, CRow } from '@coreui/react'
import { CFormInput, CInputGroup, CInputGroupText, CButton } from '@coreui/react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModalFooter,
  CFormLabel,
  CImage,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Spin, Tabs } from 'antd'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_BASE_URL } from 'src/constant'

const Select = () => {
  const [categoryName, setCategoryName] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [alert, setAlert] = useState(null)
  const [alert2, setAlert2] = useState(null)
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [Content, setContent] = useState(null)
  const [selectedContent, setSelectedContent] = useState(null)
  const [isCategory, setIsCategory] = useState(false)
  const [editedContent, setEditedContent] = useState({})
  const toggleTab = (tabIndex) => {
    setActiveTab(tabIndex)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContent(value)
  }
  const handleAddCategory = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    try {
      const response = await fetch(`${API_BASE_URL}/categories/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryName: categoryName,
        }),
      })
      if (response.ok) {
        setAlert({ color: 'success', message: 'Thêm thể loại thành công' })
        setCategoryName('')
        setTimeout(() => setAlert(null), 1000)
        fetchCategory()
      } else {
        const errorData = await response.json()
        setAlert({ color: 'danger', message: errorData.message || 'Có lỗi xảy ra' })
        setTimeout(() => setAlert(null), 2000)
      }
    } catch (error) {
      console.error('Error adding category:', error)
      setAlert({ color: 'danger', message: 'Lỗi kết nối' })
      setTimeout(() => setAlert(null), 2000)
    }
  }
  const handleAddAuthor = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    try {
      const response = await fetch(`${API_BASE_URL}/authors/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          authorName: authorName,
        }),
      })
      if (response.ok) {
        setAlert2({ color: 'success', message: 'Thêm tác giả thành công' })
        setAuthorName('')
        setTimeout(() => setAlert2(null), 1000)
        fetchAuthor()
      } else {
        const errorData = await response.json()
        setAlert2({ color: 'danger', message: errorData.message || 'Có lỗi xảy ra' })
        setTimeout(() => setAlert2(null), 1000)
      }
    } catch (error) {
      console.error('Error adding category:', error)
      setAlert2({ color: 'danger', message: 'Lỗi kết nối' })
      setTimeout(() => setAlert2(null), 2000)
    }
  }
  //upload category/author
  const handleUpload = async (id) => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    console.log('cate/au', Content)
    try {
      setSpinning(true)
      const response = await fetch(
        `${API_BASE_URL}/${isCategory ? 'categories' : 'authors'}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            categoryName: Content,
            authorName: Content,
          }),
        },
      )
      if (response.ok) {
        const Data = await response.json()
        setIsUserModalOpen(false)
        toast.success(Data.message)
        setAuthorName('')
        setCategoryName('')
        setIsCategory(false)
        fetchAuthor()
        fetchCategory()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message)
      }
    } catch (error) {
      console.error('Error adding category:', error)
      toast.error('Lỗi kết nối :', error)
    } finally {
      setSpinning(false)
    }
  }
  //get category
  const fetchCategory = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const post = await response.json()
        setCategories(post.data)
      } else {
        console.error('Error fetching users:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setSpinning(false)
    }
  }
  useEffect(() => {
    fetchCategory()
  }, [])
  //get authorr
  const fetchAuthor = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/authors`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const post = await response.json()
        setAuthors(post.data)
      } else {
        console.error('Error fetching users:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setSpinning(false)
    }
  }
  useEffect(() => {
    fetchAuthor()
  }, [])
  useEffect(() => {
    if (!isUserModalOpen) {
      setSelectedRowId(null)
      setIsCategory(false)
      setCategoryName('')
      setAuthorName('')
    }
  }, [isUserModalOpen])

  const handleRowClickAuthor = (id) => {
    setSelectedRowId(id)
    console.log(id)
    setSelectedContent(authors.find((author) => author.id === id))
    setIsUserModalOpen(true)
  }
  const handleRowClicCategory = (id) => {
    setSelectedRowId(id)
    console.log(id)
    setSelectedContent(categories.find((category) => category.id === id))
    setIsUserModalOpen(true)
  }
  const cancelDelete = () => {
    // Close modal without performing deletion
    setVisible(false)
    console.log('Selected Row ID in handleDelete:', selectedRowId)
  }
  const confirmDelete = async (selectedRowId) => {
    setVisible(false)
    console.log('Selected Row ID in confirmDelete:', selectedRowId)
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    // Loop through selectedItems and send DELETE requests
    try {
      setSpinning(true)
      const response = await fetch(
        `${API_BASE_URL}/${isCategory ? 'categories' : 'authors'}/${selectedRowId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.ok) {
        console.log(`Book with ID ${selectedRowId} deleted successfully`)
        // Optionally, update the UI to remove the deleted items
        setCategories((prev) => prev.filter((category) => category.id !== selectedRowId))
        setAuthors((prev) => prev.filter((author) => author.id !== selectedRowId))
        const data = await response.json()
        toast.success(data.message, {
          onClose: () => {
            setIsUserModalOpen(false)
            setSelectedDeleteId(null)
            setIsCategory(false)
          },
        })
      } else {
        const data = await response.json()
        toast.error(data.message)
        console.error(`Error deleting user with ID ${selectedRowId}:`, response.statusText)
      }
    } catch (error) {
      toast.error(`Error deleting user with ID ${selectedRowId}:`, error)
    } finally {
      setSpinning(false)
    }
  }
  const handleDelete = (selectedRowId) => {
    // Display confirmation modal
    setSelectedDeleteId(selectedRowId)
    setVisible(true)
  }
  useEffect(() => {
    setEditedContent(selectedContent || {})
  }, [selectedContent])
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm thể loại</strong> <small>Mặc định</small>
          </CCardHeader>
          <CCardBody>
            {alert && <CAlert color={alert.color}>{alert.message}</CAlert>}
            <CInputGroup className="profile-input">
              <CInputGroupText>Thể loại</CInputGroupText>
              <CFormInput
                aria-label="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </CInputGroup>
            <br />
            <CButton color="primary" onClick={handleAddCategory}>
              Thêm
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm tác giả</strong> <small>Mặc định</small>
          </CCardHeader>
          <CCardBody>
            {alert2 && <CAlert color={alert2.color}>{alert2.message}</CAlert>}
            <CInputGroup className="profile-input">
              <CInputGroupText>Tác giả</CInputGroupText>
              <CFormInput
                aria-label="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </CInputGroup>
            <br />
            <CButton color="primary" onClick={handleAddAuthor}>
              Thêm
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách</strong> <small>Mặc định</small>
          </CCardHeader>
          <CCardBody>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size={'large'}
              // activeKey={activeTab.toString()}
              // onChange={(key) => toggleTab(parseInt(key, 10))}
              items={[
                {
                  label: 'Danh sách thể loại',
                  key: '1',
                  children: (
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thể loại</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Số lượng sách</CTableHeaderCell>
                          <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                            Tác vụ
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {categories.map((category, index) => (
                          <CTableRow
                            key={index}
                            active={selectedRowId === category.id}
                            // onClick={() => handleRowClick(user._id)}
                          >
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{category.categoryName}</CTableDataCell>
                            <CTableDataCell>{category.books.length}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                              <CIcon
                                style={{ marginRight: '10px' }}
                                icon={icon.cilPencil} // Sử dụng biểu tượng xóa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-danger cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  setIsCategory(true)
                                  handleRowClicCategory(category.id)
                                }}
                              />
                              <CIcon
                                icon={icon.cilTrash} // Sử dụng biểu tượng sửa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-primary cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  setIsCategory(true)
                                  handleDelete(category.id)
                                  console.log(category.id)
                                }}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  ),
                },
                {
                  label: 'Danh sách tác giả',
                  key: '2',
                  children: (
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tác giả</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Số lượng sách</CTableHeaderCell>
                          <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                            Tác vụ
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {authors.map((auhtor, index) => (
                          <CTableRow
                            key={index}
                            active={selectedRowId === auhtor.id}
                            // onClick={() => handleRowClick(user._id)}
                          >
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{auhtor.authorName}</CTableDataCell>
                            <CTableDataCell>{auhtor.books.length}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                              <CIcon
                                style={{ marginRight: '10px' }}
                                icon={icon.cilPencil} // Sử dụng biểu tượng xóa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-danger cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  setIsCategory(false)
                                  handleRowClickAuthor(auhtor.id)
                                }}
                              />
                              <CIcon
                                icon={icon.cilTrash} // Sử dụng biểu tượng sửa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-primary cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  setIsCategory(true)
                                  handleDelete(auhtor.id)
                                  console.log(auhtor.id)
                                }}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  ),
                },
              ]}
            />
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
      <CModal
        size="lg"
        alignment="center"
        visible={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false)
          setIsCategory(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>{isCategory ? 'Sửa thể loại' : 'Sửa tác giả'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Render product details here */}
          {console.log(selectedContent)}
          {selectedContent && (
            <div>
              <p>
                {isCategory ? 'Thể loại' : 'Tác giả:'}
                <CFormInput
                  aria-label={isCategory ? 'categoryName' : 'authorName'}
                  name={isCategory ? 'categoryName' : 'authorName'}
                  value={editedContent[isCategory ? 'categoryName' : 'authorName'] || ''}
                  onChange={(e) => {
                    const { name, value } = e.target
                    setEditedContent((prevContent) => ({
                      ...prevContent,
                      [name]: value,
                    }))
                    setContent(value)
                  }}
                />
              </p>
            </div>
          )}
        </CModalBody>

        <CModalFooter>
          <CButton
            color="success"
            onClick={() => {
              handleUpload(selectedRowId)
            }}
          >
            Lưu
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              handleDelete(selectedRowId)
            }}
          >
            Xóa
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Thông báo xóa */}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setIsCategory(false)
        }}
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
              confirmDelete(selectedDeleteId)
            }}
          >
            Xóa
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Select
