import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'userInfo') {
        const userInfo = JSON.parse(event.newValue)
        console.log('UserInfo received from another app:', userInfo)
        // Xử lý dữ liệu userInfo ở đây
        const storedUserInfo = localStorage.getItem('userInfo')
        console.log('UserInfo stored in localStorage:', JSON.parse(storedUserInfo))
      }
    }
    // Thêm lắng nghe sự kiện storage khi component được mount
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
