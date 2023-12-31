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
  CButtonGroup,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { Radio, Tabs } from 'antd'
const Modals = () => {
  const [visible, setVisible] = useState(false)
  const [statitic, setIsStatitic] = useState([])
  const [currentStats, setCurrentStats] = useState('daily')
  const [activeTab, setActiveTab] = useState(0)
  const toggleTab = (tabIndex) => {
    setActiveTab(tabIndex)
  }
  //get statitic
  useEffect(() => {
    const fetchStatitic = async () => {
      const userInfoString = localStorage.getItem('userInfo')
      const userInfo = JSON.parse(userInfoString)
      const token = userInfo.data.accessToken
      try {
        const response = await fetch('http://localhost:3333/api/v1/admin/dashboard/statistic', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const stattitic = await response.json()
          setIsStatitic(stattitic)
          console.log(stattitic)
        } else {
          console.error('Error fetching users:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchStatitic()
  }, [])
  const data = {
    daily: {
      labels: statitic.revenueStats?.daily ? Object.keys(statitic.revenueStats.daily) : [],
      datasets: [
        {
          label: 'Daily Revenue',
          backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: statitic.revenueStats?.daily
            ? Object.entries(statitic.revenueStats.daily).map(([day, value]) => {
                console.log('Day:', day, 'Value:', value)
                return value // Chỉ cần thêm giá trị vào mảng data
              })
            : [],
          fill: true,
        },
      ],
    },
    monthly: {
      labels: statitic.revenueStats?.monthly ? Object.keys(statitic.revenueStats.monthly) : [],
      datasets: [
        {
          label: 'Monthly Revenue',
          backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: statitic.revenueStats?.monthly
            ? Object.entries(statitic.revenueStats.monthly).map(([month, value]) => {
                console.log('Month:', month, 'Value:', value)
                return value // Chỉ cần thêm giá trị vào mảng data
              })
            : [],
          fill: true,
        },
      ],
    },
    yearly: {
      labels: statitic.revenueStats?.yearly ? Object.keys(statitic.revenueStats.yearly) : [],
      datasets: [
        {
          label: 'Yearly Revenue',
          backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: statitic.revenueStats?.yearly
            ? Object.entries(statitic.revenueStats.yearly).map(([year, value]) => {
                console.log('Year:', year, 'Value:', value)
                return value // Chỉ cần thêm giá trị vào mảng data
              })
            : [],
          fill: true,
        },
      ],
    },
  }
  const statsOptions = [
    { value: 'daily', label: 'Ngày' },
    { value: 'monthly', label: 'Tháng' },
    { value: 'yearly', label: 'Năm' },
  ]
  const handleDateRangeChange = (newDateRange) => {}
  return (
    <CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Thống kê bán hàng
              </h4>
              <div className="small text-medium-emphasis"></div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {statsOptions.map((option) => (
                  <CButton
                    color="outline-secondary"
                    key={option.value}
                    className="mx-0"
                    active={currentStats === option.value}
                    onClick={() => {
                      setCurrentStats(option.value)
                      handleDateRangeChange(option.value)
                    }}
                  >
                    {option.label}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartBar
            style={{ height: '300px', marginTop: '40px' }}
            data={data[currentStats]}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                datalabels: {
                  anchor: 'end',
                  align: 'top',
                  offset: 8,
                  font: {
                    weight: 'bold',
                  },
                  formatter: (value) => value.toLocaleString(),
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Thống kê chi tiết
              </h4>
              <br />
            </CCol>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size={'large'}
              items={[
                {
                  label: 'Ngày',
                  key: '1',
                  children: (
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thống kê theo ngày</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Doanh thu</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {statitic.revenueStats &&
                          Object.entries(statitic.revenueStats.daily).map(
                            ([date, value], index) => (
                              <CTableRow key={index}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{date}</CTableDataCell>
                                <CTableDataCell>{value} VNĐ</CTableDataCell>
                              </CTableRow>
                            ),
                          )}
                      </CTableBody>
                    </CTable>
                  ),
                },
                {
                  label: 'Tháng',
                  key: '2',
                  children: (
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thống kê theo tháng</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Doanh thu</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {statitic.revenueStats &&
                          Object.entries(statitic.revenueStats.monthly).map(
                            ([date, value], index) => (
                              <CTableRow key={index}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{date}</CTableDataCell>
                                <CTableDataCell>{value} VNĐ</CTableDataCell>
                              </CTableRow>
                            ),
                          )}
                      </CTableBody>
                    </CTable>
                  ),
                },
                {
                  label: 'Năm',
                  key: '3',
                  children: (
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Thống kê theo năm</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Doanh thu</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {statitic.revenueStats &&
                          Object.entries(statitic.revenueStats.yearly).map(
                            ([date, value], index) => (
                              <CTableRow key={index}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{date}</CTableDataCell>
                                <CTableDataCell>{value} VNĐ</CTableDataCell>
                              </CTableRow>
                            ),
                          )}
                      </CTableBody>
                    </CTable>
                  ),
                },
              ]}
            />
          </CRow>
        </CCardBody>
      </CCard>
    </CRow>
  )
}

export default Modals
