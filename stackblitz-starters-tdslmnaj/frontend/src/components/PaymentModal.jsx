import React, { useState } from 'react'

const PaymentModal = ({ isOpen, onClose, totalAmount, orderDetails = {} }) => {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  // Placeholder function for Razorpay checkout
  const initiateRazorpayCheckout = async () => {
    setLoading(true)
    
    // Simulate Razorpay checkout process
    console.log('Initiating Razorpay checkout...')
    console.log('Payment Details:', {
      amount: totalAmount,
      orderDetails,
      paymentMethod
    })
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false)
      alert(`Payment of ₹${totalAmount.toFixed(2)} initiated successfully!`)
      onClose()
    }, 2000)
  }

  const handleProceedToPay = () => {
    initiateRazorpayCheckout()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Complete Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Order Summary</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {orderDetails.fileName && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Document:</span>
                  <span className="font-medium">{orderDetails.fileName}</span>
                </div>
              )}
              {orderDetails.pages && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium">{orderDetails.pages}</span>
                </div>
              )}
              {orderDetails.copies && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Copies:</span>
                  <span className="font-medium">{orderDetails.copies}</span>
                </div>
              )}
              {orderDetails.location && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{orderDetails.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Total Amount Display */}
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-900">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h4>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="font-medium text-gray-900">Razorpay</span>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium text-gray-900">Wallet Balance</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Security Note */}
          <div className="mb-6">
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-green-800">
                <p className="font-medium">Secure Payment</p>
                <p>Your payment information is encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleProceedToPay}
            disabled={loading}
            className={`px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              `Proceed to Pay ₹${totalAmount.toFixed(2)}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal