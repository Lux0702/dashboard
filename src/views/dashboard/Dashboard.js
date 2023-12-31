import React, { useState, useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
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
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const [statitic, setIsStatitic] = useState([])
  const [currentStats, setCurrentStats] = useState('daily')

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]
  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  //get statitic
  useEffect(() => {
    const fetchStatitic = async () => {
      const userInfoString = localStorage.getItem('userInfo')
      const userInfo = JSON.parse(userInfoString)
      const token = userInfo.data.accessToken
      try {
        const response = await fetch('http://localhost:3333/api/v1/admin/statistics', {
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
    <>
      <WidgetsDropdown />
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
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
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

      {/* <WidgetsBrand withCharts /> */}
    </>
  )
}

export default Dashboard
