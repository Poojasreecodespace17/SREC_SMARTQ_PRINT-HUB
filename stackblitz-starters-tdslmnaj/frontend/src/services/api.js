import axios from 'axios'

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: 'https://stackblitzstarterscb5kmixs-1apz--3000--96435430.local-credentialless.webcontainer.io/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API functions
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Orders API functions
export const getOrders = async (location) => {
  try {
    const response = await api.get(`/orders?location=${location}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const createOrder = async (orderData) => {
  try {
    // Create FormData for multipart/form-data
    const formData = new FormData()
    
    // Append all order data fields
    Object.keys(orderData).forEach(key => {
      if (key === 'files' && orderData[key]) {
        // Handle multiple files
        if (Array.isArray(orderData[key])) {
          orderData[key].forEach(file => {
            formData.append('files', file)
          })
        } else {
          formData.append('files', orderData[key])
        }
      } else {
        formData.append(key, orderData[key])
      }
    })

    const response = await api.post('/orders/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}`, { status })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Payment API functions
export const createPayment = async (paymentData) => {
  try {
    const response = await api.post('/payment/create', paymentData)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const verifyPayment = async (paymentDetails) => {
  try {
    const response = await api.post('/payment/verify', paymentDetails)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export default api