import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { API_BASE_URL } from 'src/constant'

const DefaultLayout = () => {
  useEffect(() => {
    // Define user credentials
    const credentials = {
      email: 'lakln1602@gmail.com', // Replace with the actual email
      passWord: '12345678', // Replace with the actual password
    }

    const login = async () => {
      try {
        // Make a POST request to the login API
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
        if (response.ok) {
          // Parse the response data
          const data = await response.json()

          // Store user information in local storage
          localStorage.setItem('userInfo', JSON.stringify(data))
          console.log('Login successful:', data)
        } else {
          console.error('Login failed:', response.statusText)
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    }
    // Call the login function
    login()
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
