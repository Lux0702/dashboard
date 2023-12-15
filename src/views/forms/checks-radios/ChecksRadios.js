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
} from '@coreui/react'
import './ListBook.css'
const Tables = () => {
  const [books, setBooks] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [visible, setVisible] = useState(false)
  const [isAllChecked, setIsAllChecked] = useState(false)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/v1/books')
        if (response.ok) {
          const book = await response.json()
          setBooks(book.data.data)
          //console.log('Get data success', books)
        } else {
          console.error('Error fetching books:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBooks()
  }, [])
  useEffect(() => {
    setIsAllChecked(selectedItems.length === books.length)
  }, [selectedItems, books])
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id)
      } else {
        return [...prevSelectedItems, id]
      }
    })
  }
  const handleCheckAllChange = () => {
    if (isAllChecked) {
      setSelectedItems([]) // Uncheck all
    } else {
      // Check all by mapping books to get IDs
      const allIds = books.map((book) => book._id)
      setSelectedItems(allIds)
    }
  }
  //Delect book
  const handleDelete = async () => {
    // Display confirmation modal
    setVisible(true)
  }
  const confirmDelete = async () => {
    setVisible(false)
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    // Loop through selectedItems and send DELETE requests
    for (const itemId of selectedItems) {
      try {
        const response = await fetch(`http://localhost:3333/api/v1/books/${itemId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          console.log(`Book with ID ${itemId} deleted successfully`)
          // Optionally, update the UI to remove the deleted items
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== itemId))
        } else {
          console.error(`Error deleting book with ID ${itemId}:`, response.statusText)
        }
      } catch (error) {
        console.error(`Error deleting book with ID ${itemId}:`, error)
      }
    }
    // Clear selectedItems after deletion
    setSelectedItems([])
  }
  const cancelDelete = () => {
    // Close modal without performing deletion
    setVisible(false)
    setSelectedItems([])
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách sản phẩm</strong> <small></small>
            <div className="change-btn">
              <CButton className="change-btn" color="primary">
                Sửa
              </CButton>
              <CButton className="change-btn" onClick={handleDelete} color="primary">
                Xóa
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <input
                      type="checkbox"
                      id="check-box-all"
                      checked={isAllChecked}
                      onChange={handleCheckAllChange}
                    />
                  </CTableHeaderCell>
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
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <input
                        type="checkbox"
                        id={book._id}
                        name={`checkbox-${index}`}
                        checked={selectedItems.includes(book._id)}
                        onChange={() => handleCheckboxChange(book._id)}
                      />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{book.title}</CTableDataCell>
                    <CTableDataCell>
                      {book.categories && book.categories[0] && book.categories[0].categoryName
                        ? book.categories[0].categoryName
                        : ''}
                    </CTableDataCell>
                    <CTableDataCell>
                      {book.authors && book.authors[0] && book.authors[0].authorName
                        ? book.authors[0].authorName
                        : ''}
                    </CTableDataCell>
                    <CTableDataCell>{book.stock}</CTableDataCell>
                    <CTableDataCell>{book.price}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
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
                <CButton color="danger" onClick={confirmDelete}>
                  Xóa
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
