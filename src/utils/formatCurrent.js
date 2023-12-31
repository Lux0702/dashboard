import { format } from 'date-fns'
export const formatCurrency = (value) => {
  const formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
  return formattedValue
}
export const formatDateV2 = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-CA')
}

export const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd-MM-yyyy')
}
