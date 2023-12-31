import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol,
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CInputGroupText,
  CInputGroup,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spin } from 'antd'
import { API_BASE_URL } from 'src/constant'
import { format } from 'date-fns'

const Toasts = () => {
  const [posts, setPosts] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [postDetail, setPostDetail] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [spinning, setSpinning] = useState(false)

  const [statusOptions, setStatusOptions] = useState([
    { status: 'Pending', color: 'gray' },
    { status: 'Rejected', color: 'red' },
    { status: 'Approved', color: 'green' },
  ])
  const resetRow = () => {
    setSelectedRowId(null)
  }
  useEffect(() => {
    if (!isOrderModalOpen) {
      resetRow()
    }
  }, [isOrderModalOpen])

  const handleStatusChange = (selectedStatus) => {
    // Cập nhật trạng thái cho đơn hàng với ID tương ứng
    const updatedOrders = posts.map((post) =>
      post.id === selectedRowId ? { ...post, status: selectedStatus } : post,
    )
    setPosts(updatedOrders)
    updateOrderStatus(selectedRowId, selectedStatus)
  }
  const handleRowClick = (id) => {
    setSelectedRowId(id)
    console.log(id)
    setTimeout(() => handleShowPost(id), 0)
  }
  const handleShowPost = (id) => {
    setPostDetail(posts.find((post) => post.id === id))
    setIsOrderModalOpen(true)
  }
  //get post
  const fetchOrders = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const order = await response.json()
        const sortedOrders = [...order.data].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
        )
        setPosts(sortedOrders)
      } else {
        console.error('Error fetching orders:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setSpinning(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA')
  }
  //Upload status order
  const updateOrderStatus = async (id, newStatus) => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken

    try {
      setSpinning(true)
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        console.log(`Order ${id} status updated to ${newStatus}`)
        const data = await response.json()
        toast.success(data.message)
        fetchOrders()
      } else {
        console.error('Error updating order status:', response.statusText)
        const data = await response.json()
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error updating order status:', error)
    } finally {
      setSpinning(false)
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách bài viết</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">*</CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên người đăng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tiêu đề</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nội dung</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày đăng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {posts.map((post, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <CIcon
                        icon={icon.cilList}
                        size="xl"
                        onClick={() => handleRowClick(post.id)}
                      />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{post.postedBy ? post.postedBy.fullname : ''}</CTableDataCell>
                    <CTableDataCell>{post.title}</CTableDataCell>
                    <CTableDataCell>{post.content}</CTableDataCell>
                    <CTableDataCell>{formatDate(post.postedDate)}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown variant="btn-group" style={{ borderRadius: '12px' }}>
                        <CDropdownToggle
                          style={{
                            backgroundColor: statusOptions.find((opt) => opt.status === post.status)
                              ?.color,
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                          }}
                        >
                          {post.status}
                        </CDropdownToggle>
                        <CDropdownMenu style={{ borderRadius: '12px' }}>
                          {statusOptions.map((option, index) => (
                            <CDropdownItem
                              style={{ borderRadius: '12px' }}
                              key={index}
                              onClick={() => handleStatusChange(option.status)}
                            >
                              {option.status}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            {/* Modal xem chi tiết */}
            <CModal
              size="lg"
              alignment="center"
              visible={isOrderModalOpen}
              onClose={() => {
                setIsOrderModalOpen(false)
              }}
            >
              <CModalHeader closeButton>
                <CModalTitle>Chi tiết bài viết</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {/* Render product details here */}
                {postDetail && (
                  <>
                    <p>
                      Tên người đăng:
                      <CFormInput
                        aria-label="Tựa đề"
                        disabled
                        value={postDetail.postedBy ? postDetail.postedBy.fullname : ''}
                      />
                    </p>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="12" className="mb-3">
                          <CFormLabel htmlFor="orderDate">Ngày đăng</CFormLabel>
                          <CFormInput
                            disabled
                            type="date"
                            id="orderDate"
                            name="orderDate"
                            value={formatDate(postDetail.postedDate) || 0}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="12" className="mb-3">
                          <CFormLabel htmlFor="status">Trạng thái:</CFormLabel>
                          <CFormInput
                            disabled
                            type="text"
                            id="status"
                            name="status"
                            value={postDetail.status || ''}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div className="mb-3">
                      <CRow>
                        <CCol xs="12" className="mb-3">
                          <CFormLabel htmlFor="content">Nội dung bài viết:</CFormLabel>
                          <CFormTextarea
                            disabled
                            rows={10}
                            type="text"
                            id="content"
                            name="content"
                            value={postDetail.content}
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div>
                      <p>Bình luận:</p>
                      <CAccordion flush>
                        {postDetail &&
                          postDetail.comments &&
                          postDetail.comments.map((item, index) => (
                            <CAccordionItem key={index}>
                              <CAccordionHeader>
                                <strong>Tên Người bình luận: </strong> {item.user.fullname}
                              </CAccordionHeader>
                              <CAccordionBody>
                                <p>Mã bình luận. {item.id}</p>
                                <p>
                                  <strong>Nội dung:</strong> {item.comment}
                                </p>
                              </CAccordionBody>
                            </CAccordionItem>
                          ))}
                      </CAccordion>
                    </div>
                  </>
                )}
              </CModalBody>
              {/* <CModalFooter>
            </CModalFooter> */}
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default Toasts
