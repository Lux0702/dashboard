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
const Toasts = () => {
  const [books, setBooks] = useState([])
  const [orders, setOrders] = useState([])
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedBook, setSelectedBook] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [orderDetail, setOrderDetail] = useState(null)
  const [postDetail, setPostDetail] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
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
  //get all user
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
          console.log('get user success')
        } else {
          console.error('Error fetching users:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])
  //get all  book
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/v1/books')
        if (response.ok) {
          const book = await response.json()
          setBooks(book.data.data)
          console.log('Get data success', books)
        } else {
          console.error('Error fetching books:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    fetchBooks()
  }, [])
  //detail post
  const handleShowOrderDetail = async (selectedItemId) => {
    console.log(selectedItemId)
    try {
      // const userInfoString = localStorage.getItem('userInfo')
      // const userInfo = JSON.parse(userInfoString)
      // const token = userInfo.data.accessToken
      console.log(selectedItemId)
      const response = await fetch(`http://localhost:3333/api/v1/posts/${selectedItemId}`, {
        method: 'GET',
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      if (response.ok) {
        const Details = await response.json()
        setOrderDetail(Details.data)
        setPostDetail(Details.data)
        const foundUser = users.find(
          (user) => user._id && posts.postedBy && user._id === posts.postedBy._id,
        )
        // const foundBooks = orderDetail.orderItems.map((orderItem) => {
        //   return books.find((book) => book._id === orderItem.book)
        // })
        console.log(orderDetail)
        setSelectedUser(foundUser)
        console.log(selectedBook)
        setIsOrderModalOpen(true)
        console.log('get detail success')
      } else {
        console.error('Error fetching product details:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    }
  }
  const handleStatusChange = (selectedStatus) => {
    // Cập nhật trạng thái cho đơn hàng với ID tương ứng
    const updatedOrders = posts.map((post) =>
      post._id === selectedRowId ? { ...post, status: selectedStatus } : post,
    )
    setOrders(updatedOrders)
    setPosts(updatedOrders)
    updateOrderStatus(selectedRowId, selectedStatus)
  }
  const handleRowClick = (id) => {
    setSelectedRowId(id)
    console.log(id)
    //setIsPopupOpen(true)
    //handleShowProduct(selectedRowId)
  }
  //Get all orders
  useEffect(() => {
    const fetchOrders = async () => {
      const userInfoString = localStorage.getItem('userInfo')
      const userInfo = JSON.parse(userInfoString)
      const token = userInfo.data.accessToken
      try {
        const response = await fetch('http://localhost:3333/api/v1/posts', {
          method: 'GET',
        })
        if (response.ok) {
          const order = await response.json()
          const sortedOrders = [...order.data].sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
          )
          setOrders(sortedOrders)
          setPosts(sortedOrders)
        } else {
          console.error('Error fetching orders:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [])
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA')
  }
  //custom dropdown
  const vars = {
    '--cui-dropdown-border': 'none',
    '--cui-dropdown-border-radius': '8px',
    '--cui-btn-hover-border-color': 'none',
  }
  //Upload status order
  const updateOrderStatus = async (orderId, newStatus) => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken

    try {
      const response = await fetch(`http://localhost:3333/api/v1/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        console.log(`Order ${orderId} status updated to ${newStatus}`)
        const data = await response.json()
        toast.success(data.message)
      } else {
        console.error('Error updating order status:', response.statusText)
        const data = await response.json()
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error updating order status:', error)
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
                  <CTableRow
                    key={index}
                    active={selectedRowId === post._id}
                    onClick={(e) => {
                      handleRowClick(post._id)
                    }}
                  >
                    <CTableDataCell>
                      <CIcon
                        icon={icon.cilList}
                        size="xl"
                        onClick={() => handleShowOrderDetail(selectedRowId)}
                      />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{post.postedBy.fullName}</CTableDataCell>
                    <CTableDataCell>{post.title}</CTableDataCell>
                    <CTableDataCell>{post.content}</CTableDataCell>
                    <CTableDataCell>{formatDate(post.postDate)}</CTableDataCell>
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
                <CModalTitle>Chi tiết đơn hàng</CModalTitle>
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
                        value={postDetail.postedBy ? postDetail.postedBy.fullName : ''}
                      />
                    </p>
                    <div className="mb-3">
                      <CRow>
                        {/* <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="totalAmount">Tổng đơn hàng:</CFormLabel>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              disabled
                              type="text"
                              id="totalAmount"
                              name="totalAmount"
                              value={orderDetail.totalAmount || ''}
                            />
                            <CInputGroupText>VNĐ</CInputGroupText>
                          </CInputGroup>
                        </CCol> */}
                        <CCol xs="12" className="mb-3">
                          <CFormLabel htmlFor="orderDate">Ngày đăng</CFormLabel>
                          <CFormInput
                            disabled
                            type="date"
                            id="orderDate"
                            name="orderDate"
                            value={formatDate(postDetail.postDate)}
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
                        {/* <CCol xs="6" className="mb-3">
                          <CFormLabel htmlFor="phone">Số điện thoại người nhận</CFormLabel>
                          <CFormInput
                            disabled
                            type="text"
                            id="phone"
                            name="phone"
                            value={orderDetail.phone || 0}
                          />
                        </CCol> */}
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
                          postDetail.items &&
                          postDetail.items.map((item, index) => (
                            <CAccordionItem key={index}>
                              <CAccordionHeader>
                                {index + 1}. {item.book._id}
                              </CAccordionHeader>
                              <CAccordionBody>
                                <p>
                                  <strong>Tên Người bình luận:</strong> {item.book._id}
                                </p>
                                <p>
                                  <strong>Nội dung:</strong> {item.quantity}
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
    </CRow>
  )
}

export default Toasts
