// Notification.js
import React, { useRef, useState } from 'react'
import { CToaster, CToast, CToastHeader, CToastBody } from '@coreui/react'

export const useNotification = () => {
  const toaster = useRef()

  const showToast = (message, isSuccess) => {
    if (toaster.current) {
      toaster.current.showToast(message, isSuccess)
    }
  }

  return { showToast }
}
