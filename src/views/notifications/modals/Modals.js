import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
} from '@coreui/react'
const Modals = () => {
  const [visible, setVisible] = useState(false)
  const [revenueData, setRevenueData] = useState({
    daily: {},
    monthly: {},
    yearly: {},
  })
  //get static data
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const userInfoString = localStorage.getItem('userInfo')
        const userInfo = JSON.parse(userInfoString)
        const token = userInfo.data.accessToken
        const response = await fetch('http://localhost:3333/api/v1/admin/dashboard/statistic', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setRevenueData(data.revenueStats)
        } else {
          console.error('Error fetching data:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const transformDataForChart = (data) => {
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: Object.values(data),
        },
      ],
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thống kê bán hàng</strong>
          </CCardHeader>
          <CCardBody>
            <CModal
              alignment="center"
              visible={visible}
              onClose={() => setVisible(false)}
              aria-labelledby="VerticallyCenteredExample"
            >
              <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>Bạn có chắc muốn xóa ?</CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Đóng
                </CButton>
                <CButton color="primary">Có</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals
