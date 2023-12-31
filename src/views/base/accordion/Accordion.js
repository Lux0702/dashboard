import React, { useState, useEffect, useRef } from 'react'
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import './style.css'
import { Spin, Tabs } from 'antd'
import { API_BASE_URL } from 'src/constant'
const Accordion = () => {
  const [users, setUsers] = useState([])
  const [blacklist, setBlacklist] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [visibleBlack, setVisibleBlack] = useState(false)
  const [visibleRestore, setVisibleRestore] = useState(false)
  const [selectedUser, setSelectUserr] = useState(null)
  const [reason, setReason] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const toggleTab = (tabIndex) => {
    setActiveTab(tabIndex)
  }
  //Get all user
  const fetchUsers = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/users`, {
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
    } finally {
      setSpinning(false)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  //Get blacklist
  const fetchBlacklist = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken

    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/admin/blacklist`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const blacklistData = await response.json()
        setBlacklist(blacklistData.data)
      } else {
        console.error('Error fetching blacklist:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching blacklist:', error)
    } finally {
      setSpinning(false)
    }
  }
  useEffect(() => {
    fetchBlacklist()
  }, [])
  useEffect(() => {
    if (!isUserModalOpen) {
      setSelectedRowId(null)
    }
  }, [isUserModalOpen])
  // //Get user detail
  // useEffect(() => {
  //   if (selectedRowId) {
  //     setIsUserModalOpen(true)
  //   }
  // }, [selectedRowId])
  const handleRowClick = (id) => {
    setSelectedRowId(id)
    console.log(id)
    setSelectUserr(users.find((user) => user.userId === id))
    setIsUserModalOpen(true)
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA')
  }
  //Delete user
  const handleDelete = (selectedRowId) => {
    // Display confirmation modal
    setSelectedDeleteId(selectedRowId)
    setVisible(true)
  }
  const handleAddBlacklist = (selectedRowId) => {
    // Display confirmation modal
    console.log('id blacklist:', selectedRowId)
    setSelectedDeleteId(selectedRowId)
    setVisibleBlack(true)
  }
  const handleRestore = (selectedRowId) => {
    // Display confirmation modal
    console.log('id blacklist:', selectedRowId)
    setSelectedDeleteId(selectedRowId)
    setVisibleRestore(true)
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
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/users/${selectedRowId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        console.log(`Book with ID ${selectedRowId} deleted successfully`)
        // Optionally, update the UI to remove the deleted items
        setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== selectedRowId))
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
    } finally {
      setSpinning(false)
    }
  }
  //api add Black user
  const confirmAddBlackList = async (selectedRowId) => {
    console.log('id cần adđ:', selectedRowId)
    console.log('reason:', reason)
    setVisible(false)
    console.log('Selected Row ID in confirmDelete:', selectedRowId)
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    // Loop through selectedItems and send DELETE requests
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/admin/blacklist/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedRowId,
          reason: reason,
        }),
      })
      if (response.ok) {
        console.log(`Book with ID ${selectedRowId} deleted successfully`)
        // Optionally, update the UI to remove the deleted items
        setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== selectedRowId))
        const data = await response.json()
        setVisibleBlack(false)
        toast.success(data.message, {
          onClose: () => {
            fetchBlacklist()
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
    } finally {
      setSpinning(false)
    }
  }
  //restore black
  const confirmRestore = async (selectedRowId) => {
    setVisible(false)
    console.log('Selected Row ID in confirmDelete:', selectedRowId)
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    // Loop through selectedItems and send DELETE requests
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/admin/blacklist/${selectedRowId}/restore`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        console.log(`Book with ID ${selectedRowId} deleted successfully`)
        // Optionally, update the UI to remove the deleted items
        setBlacklist((prevUsers) => prevUsers.filter((user) => user.id !== selectedRowId))
        const data = await response.json()
        setVisibleRestore(false)
        toast.success(data.message, {
          onClose: () => {
            fetchBlacklist()
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
    } finally {
      setSpinning(false)
    }
  }
  const cancelDelete = () => {
    // Close modal without performing deletion
    setVisible(false)
    console.log('Selected Row ID in handleDelete:', selectedRowId)
  }
  const cancelBlack = () => {
    // Close modal without performing deletion
    setVisibleBlack(false)
    console.log('Selected Row ID in handleDelete:', selectedRowId)
  }
  const cancelRestore = () => {
    // Close modal without performing deletion
    setVisibleRestore(false)
  }
  const handleInputReason = (e) => {
    // Handle changes in the input fields
    const { name, value } = e.target
    setReason(value)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách khách hàng</strong>
          </CCardHeader>
          <CCardBody>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size={'large'}
              items={[
                {
                  label: 'Danh sách người dùng',
                  key: '1',
                  children: (
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên người dùng</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Vai trò</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                          <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                            Tác vụ
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {users.map((user, index) => (
                          <CTableRow
                            key={index}
                            active={selectedRowId === user.userId}
                            // onClick={() => handleRowClick(user._id)}
                          >
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{user.fullName}</CTableDataCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>{user.role}</CTableDataCell>
                            <CTableDataCell>{user.phone}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                              <CIcon
                                icon={icon.cilPencil} // Sử dụng biểu tượng xóa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-danger cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  handleRowClick(user.userId)
                                }}
                              />
                              <CIcon
                                icon={icon.cilNotes} // Sử dụng biểu tượng sửa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-primary cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  handleAddBlacklist(user.userId)
                                }}
                              />
                              <CIcon
                                icon={icon.cilTrash} // Sử dụng biểu tượng sửa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-primary cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  handleDelete(user.userId)
                                  console.log(user.userId)
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
                  label: 'Danh sách blacklist',
                  key: '2',
                  children: (
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên người dùng</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Vai trò</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                          <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                            Tác vụ
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {blacklist.map((user, index) => (
                          <CTableRow
                            key={index}
                            active={selectedRowId === user.id}
                            // onClick={() => handleRowClick(user._id)}
                          >
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{user.userInfo.fullName}</CTableDataCell>
                            <CTableDataCell>{user.userInfo.email}</CTableDataCell>
                            <CTableDataCell>{user.userInfo.role}</CTableDataCell>
                            <CTableDataCell>{user.userInfo.phone}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                              <CIcon
                                icon={icon.cilShareBoxed} // Sử dụng biểu tượng xóa từ thư viện
                                size="lg" // Kích thước của biểu tượng (có thể là 'sm', 'md', 'lg', 'xl', ...)
                                className="text-danger cursor-pointer icon-access" // CSS classes khác (nếu cần)
                                onClick={() => {
                                  handleRestore(user.id)
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
            {/* Thông báo đưa vào blacklist */}
            <CModal
              alignment="center"
              visible={visibleBlack}
              onClose={() => setVisibleBlack(false)}
              aria-labelledby="DeleteConfirmationModal"
            >
              <CModalHeader closeButton>
                <CModalTitle id="DeleteConfirmationModal">Thêm vào blacklist</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Bạn có chắc muốn thêm vào blacklist ? <br />
                <CFormInput
                  aria-label="blacklist"
                  placeholder="Nhập lí do thêm vào blacklist"
                  type="text"
                  id="blacklist"
                  name="blacklist"
                  onChange={handleInputReason}
                />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={cancelBlack}>
                  Hủy
                </CButton>
                <CButton
                  color="danger"
                  onClick={() => {
                    confirmAddBlackList(selectedDeleteId)
                  }}
                >
                  Xóa
                </CButton>
              </CModalFooter>
            </CModal>
            {/* Thông báo restore */}
            <CModal
              alignment="center"
              visible={visibleRestore}
              onClose={() => setVisibleRestore(false)}
              aria-labelledby="DeleteConfirmationModal"
            >
              <CModalHeader closeButton>
                <CModalTitle id="DeleteConfirmationModal">Khôi phục người dùng</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Bạn có chắc muốn khôi phục người dùng ? <br />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={cancelRestore}>
                  Hủy
                </CButton>
                <CButton
                  color="success"
                  onClick={() => {
                    confirmRestore(selectedDeleteId)
                  }}
                >
                  Khôi phục
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

export default Accordion
