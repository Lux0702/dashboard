import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CBadge,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { formatCurrency } from 'src/utils/formatCurrent'
import { Spin } from 'antd'
import { API_BASE_URL } from 'src/constant'

const Badges = () => {
  const [books, setBooks] = useState([])
  const [spinning, setSpinning] = useState(false)

  //get all  book
  useEffect(() => {
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
    fetchBooks()
  }, [])
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thống kê sản phẩm</strong> <small>Mặc định</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tựa đề</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Giá tiền</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Sô lượng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tồn kho</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Đã bán</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {books.map((book, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{book.title}</CTableDataCell>
                    <CTableDataCell>{formatCurrency(book.price) || 0}</CTableDataCell>
                    <CTableDataCell>{book.stock + book.soldQuantity}</CTableDataCell>
                    <CTableDataCell>{book.stock}</CTableDataCell>
                    <CTableDataCell>{book.soldQuantity}</CTableDataCell>
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

export default Badges
