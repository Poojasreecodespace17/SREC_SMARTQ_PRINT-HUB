import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FacultyDashboard = () => {
  const navigate = useNavigate()
  const [autoDelete, setAutoDelete] = useState(false)

  // Static data for placeholders
  const activeOrders = [
    {
      id: 'ORD-F001',
      fileName: 'Exam_Papers_Confidential.pdf',
      status: 'Processing',
      location: 'Library',
      submittedAt: '2024-01-15 10:30 AM',
      estimatedCompletion: '2024-01-15 11:00 AM',
      autoDelete: true
    },
    {
      id: 'ORD-F002',
      fileName: 'Assignment_Solutions.docx',
      status: 'Ready for Pickup',
      location: 'Food Court',
      submittedAt: '2024-01-14 02:15 PM',
      estimatedCompletion: '2024-01-14 02:45 PM',
      autoDelete: false
    }
  ]

  const orderHistory = [
    {
      id: 'ORD-F003',
      fileName: 'Grade_Sheets.pdf',
      status: 'Completed',
      location: 'Library',
      submittedAt: '2024-01-12 09:20 AM',
      completedAt: '2024-01-12 09:45 AM',
      amount: '₹20',
      autoDelete: true,
      deleted: true
    },
    {
      id: 'ORD-F004',
      fileName: 'Course_Materials.pptx',
      status: 'Completed',
      location: 'Food Court',
      submittedAt: '2024-01-10 03:30 PM',
      completedAt: '2024-01-10 04:00 PM',
      amount: '₹35',
      autoDelete: false,
      deleted: false
    },
    {
      id: 'ORD-F005',
      fileName: 'Research_Proposal.pdf',
      status: 'Completed',
      location: 'Library',
      submittedAt: '2024-01-08 11:15 AM',
      completedAt: '2024-01-08 11:40 AM',
      amount: '₹15',
      autoDelete: true,
      deleted: true
    }
  ]

  const handleUploadClick = () => {
    // Navigate to upload page or open upload modal
    console.log('Navigate to confidential upload page', { autoDelete })
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'ready for pickup':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your confidential documents and printing orders</p>
        </div>

        {/* Upload Confidential Document Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Confidential Document</h2>
              <p className="text-gray-600">Securely upload your confidential documents for printing with enhanced security</p>
            </div>
            
            {/* Auto-delete checkbox */}
            <div className="mb-6">
              <label className="flex items-center justify-center space-x-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={autoDelete}
                  onChange={(e) => setAutoDelete(e.target.checked)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Auto-delete file after 24 hours
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Recommended for sensitive documents to ensure data security
              </p>
            </div>

            <button
              onClick={handleUploadClick}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Upload Confidential Document
            </button>
          </div>
        </div>

        {/* Track Active Orders */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Track Active Orders</h3>
            <p className="mt-1 text-gray-600">Monitor the status of your current printing orders</p>
          </div>
          <div className="p-6">
            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{order.fileName}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        {order.autoDelete && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Auto-Delete
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">Order #{order.id}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Location:</span> {order.location}
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span> {order.submittedAt}
                      </div>
                      <div>
                        <span className="font-medium">Est. Completion:</span> {order.estimatedCompletion}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500">No active orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Order History</h3>
            <p className="mt-1 text-gray-600">View your previous printing orders</p>
          </div>
          <div className="p-6">
            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`font-medium ${order.deleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {order.fileName}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        {order.autoDelete && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Auto-Delete
                          </span>
                        )}
                        {order.deleted && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Deleted
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Order #{order.id}</span>
                        {order.amount && <div className="text-sm font-medium text-green-600">{order.amount}</div>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Location:</span> {order.location}
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span> {order.submittedAt}
                      </div>
                      <div>
                        <span className="font-medium">Completed:</span> {order.completedAt}
                      </div>
                      <div className="text-right">
                        <button 
                          className={`font-medium ${order.deleted ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                          disabled={order.deleted}
                        >
                          {order.deleted ? 'File Deleted' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-500">No order history</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboard