import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import {
  CAlert,
  CAlertHeading,
  CAlertLink,
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { API_BASE_URL } from 'src/constant'
import { Spin } from 'antd'
const Alerts = () => {
  const [posts, setPosts] = useState([])
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
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
    fetchOrders()
  }, [])
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString)
  //   return date.toLocaleDateString('en-CA')
  // }
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy')
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thống kê bài viết</strong>
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
                      <CIcon icon={icon.cilList} size="xl" />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{post.postedBy ? post.postedBy.fullname : ''}</CTableDataCell>
                    <CTableDataCell>{post.title}</CTableDataCell>
                    <CTableDataCell>{post.content}</CTableDataCell>
                    <CTableDataCell>{formatDate(post.postedDate)}</CTableDataCell>
                    <CTableDataCell>{post.status}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <Spin spinning={spinning} fullscreen />
    </CRow>
  )
}

export default Alerts
