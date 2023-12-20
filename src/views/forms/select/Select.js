import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CAlert, CRow } from '@coreui/react'
import { CFormInput, CInputGroup, CInputGroupText, CButton } from '@coreui/react'
const Select = () => {
  const [categoryName, setCategoryName] = useState('')
  const [alert, setAlert] = useState(null)
  const handleAddCategory = async () => {
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    const token = userInfo.data.accessToken
    try {
      const response = await fetch('http://localhost:3333/api/v1/categories/add', {
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
      } else {
        const errorData = await response.json()
        setAlert({ color: 'danger', message: errorData.message || 'Có lỗi xảy ra' })
      }
    } catch (error) {
      console.error('Error adding category:', error)
      setAlert({ color: 'danger', message: 'Lỗi kết nối' })
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
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
    </CRow>
  )
}

export default Select
