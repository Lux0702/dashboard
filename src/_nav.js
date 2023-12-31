import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Quản lí khách hàng',
    to: '/customerManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách khách hàng',
        to: 'customerManager/customer-list',
      },
      {
        component: CNavItem,
        name: 'Đơn hàng',
        to: '/base/Order',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản lí sản phẩm',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Thêm sản phẩm',
        to: '/product/AddNew',
      },
      {
        component: CNavItem,
        name: 'Thể loại/ tác giả',
        to: '/Product/Category',
      },
      {
        component: CNavItem,
        name: 'Danh sách sản phẩm',
        to: '/Product/book-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản lí bài viết',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Duyệt bài viết',
        to: '/ManagePost/Post',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Thống kê',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Thống kê bán hàng',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Thống kê sản phẩm',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Thống kê bài viết',
        to: '/notifications/alerts',
      },
    ],
  },
]

export default _nav
