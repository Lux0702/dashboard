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
  CModalFooter,
  CFormInput,
  CFormLabel,
  CImage,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Accordion = () => {
  const [users, setUsers] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const selectedUser = users.find((user) => user._id === selectedRowId)
  const [selectedDeleteId, setSelectedDeleteId] = useState(null)
  const [visible, setVisible] = useState(false)

  //Get all user
  useEffect(() => {
    const fetchUsers = async () => {
      const userInfoString = localStorage.getItem('userInfo')
      const userInfo = JSON.parse(userInfoString)
      const token = userInfo.data.accessToken
      try {
        const response = await fetch('http://localhost:3333/api/v1/admin/dashboard/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const user = await response.json()
          setUsers(user.data)
        } else {
          console.error('Error fetching users:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])
  useEffect(() => {
    if (!isUserModalOpen) {
      setSelectedRowId(null)
    }
  }, [isUserModalOpen])
  //Get user detail
  useEffect(() => {
    if (selectedRowId) {
      setIsUserModalOpen(true)
    }
  }, [selectedRowId])
  const handleRowClick = (id) => {
    setSelectedRowId(id)
    console.log(id)
    //setIsPopupOpen(true)
    //handleShowProduct(selectedRowId)
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA')
  }
  //Delete user
  const handleDelete = async (selectedRowId) => {
    // Display confirmation modal
    setSelectedDeleteId(selectedRowId)
    setVisible(true)
  }
  //api xóa user
  const confirmDelete = async (selectedRowId) => {
    setVisible(false)
    console.log('Selected Row ID in confirmDelete:', selectedRowId)
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    // Loop through selectedItems and send DELETE requests
    try {
      const response = await fetch(
        `http://localhost:3333/api/v1/admin/dashboard/users/${selectedRowId}`,
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
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedRowId))
        const data = await response.json()
        toast.success(data.message, {
          onClose: () => {
            setIsUserModalOpen(false)
            setSelectedDeleteId(null)
          },
        })
      } else {
        const data = await response.json()
        toast.error(data.message)
        console.error(`Error deleting user with ID ${selectedRowId}:`, response.statusText)
      }
    } catch (error) {
      toast.error(`Error deleting user with ID ${selectedRowId}:`, error)
    }
  }
  const cancelDelete = () => {
    // Close modal without performing deletion
    setVisible(false)
    console.log('Selected Row ID in handleDelete:', selectedRowId)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách khách hàng</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên người dùng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Vai trò</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Điểm tích lũy</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user, index) => (
                  <CTableRow
                    key={index}
                    active={selectedRowId === user._id}
                    onClick={(e) => {
                      handleRowClick(user._id)
                    }}
                  >
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{user.fullName}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                    <CTableDataCell>{user.phone}</CTableDataCell>
                    <CTableDataCell>{user.points}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            {/* Thông tin chi tiết */}
            <CModal
              size="lg"
              alignment="center"
              visible={isUserModalOpen}
              onClose={() => {
                setIsUserModalOpen(false)
              }}
            >
              <CModalHeader closeButton>
                <CModalTitle>Thông tin chi tiết</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {/* Render product details here */}
                {selectedUser && (
                  <div>
                    <p>Ảnh cá nhân</p>
                    <div className="text-center position-relative">
                      <CImage
                        rounded
                        src={selectedUser.avatar}
                        width={200}
                        height={200}
                        style={{
                          objectFit: 'cover',
                          border: '1px solid rgba(0, 0, 0, 0.5)',
                          borderRadius: '10px',
                        }}
                      />
                      <div
                        className="position-absolute bottom-0 start-50 translate-middle-x"
                        style={{ zIndex: 1 }}
                      ></div>
                    </div>
                    <p>
                      Tên người dùng:
                      <CFormInput
                        aria-label="Tựa đề"
                        disabled
                        value={selectedUser.fullName || ''}
                      />
                    </p>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="phone">Email:</CFormLabel>
                          <CFormInput
                            disabled
                            type="text"
                            id="phone"
                            name="phone"
                            value={selectedUser.email || ''}
                          />
                        </CCol>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="price">Vai trò:</CFormLabel>
                          <CFormInput
                            disabled
                            type="text"
                            id="birthday"
                            name="birthday"
                            value={selectedUser.role || ''}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="phone">Số điện thoại:</CFormLabel>
                          <CFormInput
                            disabled
                            type="text"
                            id="phone"
                            name="phone"
                            value={selectedUser.phone || ''}
                          />
                        </CCol>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="price">Ngày sinh:</CFormLabel>
                          <CFormInput
                            disabled
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={formatDate(selectedUser.birthday)}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="pageNumbers">Giới tính:</CFormLabel>
                          <CFormInput
                            disabled
                            type="text"
                            id="gender"
                            name="gender"
                            value={selectedUser.gender}
                          />
                        </CCol>
                        <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="publisher">Điểm tích lũy:</CFormLabel>
                          <CFormInput
                            disabled
                            type="number"
                            id="points"
                            name="points"
                            value={selectedUser.points}
                          />
                        </CCol>
                      </CRow>
                    </div>
                  </div>
                )}
              </CModalBody>

              <CModalFooter>
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
    </CRow>
  )
}

export default Accordion
