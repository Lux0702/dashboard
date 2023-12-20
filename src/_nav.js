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
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách khách hàng',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Đơn hàng',
        to: '/base/breadcrumbs',
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
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Thêm thể loại',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Danh sách sản phẩm',
        to: '/forms/checks-radios',
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
    ],
  },
]

export default _nav
