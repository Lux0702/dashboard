import React, { useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { Spin } from 'antd'
import { API_BASE_URL } from 'src/constant'
import { formatCurrency } from 'src/utils/formatCurrent'
const WidgetsDropdown = () => {
  const [statitic, setIsStatitic] = useState([])
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComment] = useState([])
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const [spinning, setSpinning] = useState(false)
  const [books, setBooks] = useState([])

  //get statitic
  useEffect(() => {
    const fetchStatitic = async () => {
      const userInfoString = localStorage.getItem('userInfo')
      const userInfo = JSON.parse(userInfoString)
      const token = userInfo.data.accessToken
      try {
        setSpinning(true)
        const response = await fetch(`${API_BASE_URL}/admin/statistics`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const stattitic = await response.json()
          setIsStatitic(stattitic)
          console.log('get oke :', stattitic)
        } else {
          console.error('Error fetching users:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setSpinning(false)
      }
    }
    fetchStatitic()
  }, [])
  // const yearlyRevenue = statitic.revenueStats?.yearly?.[currentYear] || 0
  // //get all user
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const userInfoString = localStorage.getItem('userInfo')
  //     const userInfo = JSON.parse(userInfoString)
  //     const token = userInfo.data.accessToken
  //     try {
  //       const response = await fetch('http://localhost:3333/api/v1/admin/dashboard/users', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const user = await response.json()
  //         setUsers(user)
  //       } else {
  //         console.error('Error fetching users:', response.statusText)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error)
  //     }
  //   }
  //   fetchUsers()
  // }, [])
  // const numberOfUsers = users.length
  // console.log(numberOfUsers)
  // //get all post
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const userInfoString = localStorage.getItem('userInfo')
  //     const userInfo = JSON.parse(userInfoString)
  //     const token = userInfo.data.accessToken
  //     try {
  //       const response = await fetch('http://localhost:3333/api/v1/posts', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const post = await response.json()
  //         setPosts(post.data)
  //       } else {
  //         console.error('Error fetching users:', response.statusText)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error)
  //     }
  //   }
  //   fetchPosts()
  // }, [])
  // const numberOfPosts = posts.length
  // //get all comment
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const userInfoString = localStorage.getItem('userInfo')
  //     const userInfo = JSON.parse(userInfoString)
  //     const token = userInfo.data.accessToken
  //     try {
  //       const response = await fetch('http://localhost:3333/api/v1/comment', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const post = await response.json()
  //         setComment(post.data)
  //       } else {
  //         console.error('Error fetching users:', response.statusText)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error)
  //     }
  //   }
  //   fetchPosts()
  // }, [])
  // const numberOfComment = comments ? comments.length : 0
  // //get category
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const userInfoString = localStorage.getItem('userInfo')
  //     const userInfo = JSON.parse(userInfoString)
  //     const token = userInfo.data.accessToken
  //     try {
  //       const response = await fetch('http://localhost:3333/api/v1/categories', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const post = await response.json()
  //         setCategories(post.data)
  //       } else {
  //         console.error('Error fetching users:', response.statusText)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error)
  //     }
  //   }
  //   fetchPosts()
  // }, [])
  // const numberOfCategory = categories ? categories.length : 0
  // //get authorr
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const userInfoString = localStorage.getItem('userInfo')
  //     const userInfo = JSON.parse(userInfoString)
  //     const token = userInfo.data.accessToken
  //     try {
  //       const response = await fetch('http://localhost:3333/api/v1/authors', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const post = await response.json()
  //         setAuthors(post.data)
  //       } else {
  //         console.error('Error fetching users:', response.statusText)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error)
  //     }
  //   }
  //   fetchPosts()
  // }, [])
  // const numberOfAuthor = authors ? authors.length : 0
  // //get all book
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       setSpinning(true)
  //       const response = await fetch('http://localhost:3333/api/v1/books')
  //       if (response.ok) {
  //         const book = await response.json()
  //         setBooks(book.data)
  //         //localStorage.setItem('bookData',JSON.stringify(book.data))
  //         //console.log('Get data success', books)
  //       } else {
  //         console.error('Error fetching books:', response.statusText)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching books:', error)
  //     } finally {
  //       setSpinning(false)
  //     }
  //   }

  //   fetchBooks()
  // }, [])

  // // const revenueChartData = {
  // //   labels: statitic.data.revenueByMonth ? Object.keys(statitic.data.revenueByMonth) : [],
  // //   datasets: [
  // //     {
  // //       label: 'Thống kê theo tháng',
  // //       backgroundColor: 'transparent',
  // //       borderColor: 'rgba(255,255,255,.55)',
  // //       pointBackgroundColor: getStyle('--cui-info'),
  // //       data: statitic.data?.revenueByMonth
  // //         ? Object.values(statitic.data.revenueByMonth).map((value) => {
  // //             console.log('Value:', value)
  // //             return value
  // //           })
  // //         : [],
  // //     },
  // //   ],
  // // }
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={`${statitic.data ? statitic.data.userCount : 0}`}
          title="Số lượng khách hàng"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        {/* Tổng doanh thu */}
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={`${statitic.data ? formatCurrency(statitic.data.totalRevenue) : 0}`}
          title="Tổng doanh thu"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={'8'}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* sô lượng bài viết */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={`${statitic.data ? statitic.data.postCount : 0}`}
          title="Số lượng bài viết"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* sô lượng  thể loại */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={`${statitic.data ? statitic.data.categoryCount : 0}`}
          title="Số lượng thể loại"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* sô lượng  sẳn phẩm */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={`${statitic.data ? statitic.data.bookCount : 0}`}
          title="Số sản phẩm"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        {/* Số đơn hàng */}
        <CWidgetStatsA
          className="mb-4"
          color="secondary"
          value={`${statitic.data ? statitic.data.orderCount : 0}`}
          title="Số đơn hàng"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={'8'}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* tươngtác */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={`${statitic.data ? statitic.data.commentCount : 0}`}
          title="Lượng tương tác "
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* Số lượng tác giả */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="dark"
          value={`${statitic.data ? statitic.data.authorCount : 0}`}
          title="Số lượng tác giả"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <Spin spinning={spinning} fullscreen />
    </CRow>
  )
}

export default WidgetsDropdown
