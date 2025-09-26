import React, { useState } from 'react'

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(150.75)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 'TXN-001',
      type: 'Top-Up',
      description: 'Wallet Top-Up via UPI',
      amount: '+₹500.00',
      date: '2024-01-15',
      time: '02:30 PM',
      status: 'Completed',
      balanceAfter: '₹650.75'
    },
    {
      id: 'TXN-002',
      type: 'Payment',
      description: 'Print Order #ORD-001',
      amount: '-₹25.00',
      date: '2024-01-15',
      time: '01:45 PM',
      status: 'Completed',
      balanceAfter: '₹150.75'
    },
    {
      id: 'TXN-003',
      type: 'Payment',
      description: 'Print Order #ORD-002',
      amount: '-₹30.00',
      date: '2024-01-14',
      time: '04:20 PM',
      status: 'Completed',
      balanceAfter: '₹175.75'
    },
    {
      id: 'TXN-004',
      type: 'Top-Up',
      description: 'Wallet Top-Up via Card',
      amount: '+₹200.00',
      date: '2024-01-12',
      time: '10:15 AM',
      status: 'Completed',
      balanceAfter: '₹205.75'
    },
    {
      id: 'TXN-005',
      type: 'Payment',
      description: 'Print Order #ORD-003',
      amount: '-₹15.00',
      date: '2024-01-12',
      time: '09:30 AM',
      status: 'Completed',
      balanceAfter: '₹5.75'
    }
  ])

  const handleTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const amount = parseFloat(topUpAmount)
      const newBalance = walletBalance + amount
      setWalletBalance(newBalance)
      
      // Add new transaction to history
      const newTransaction = {
        id: `TXN-${String(paymentHistory.length + 1).padStart(3, '0')}`,
        type: 'Top-Up',
        description: 'Wallet Top-Up',
        amount: `+₹${amount.toFixed(2)}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        balanceAfter: `₹${newBalance.toFixed(2)}`
      }
      
      setPaymentHistory([newTransaction, ...paymentHistory])
      setTopUpAmount('')
      setLoading(false)
      
      alert('Wallet topped up successfully!')
    }, 2000)
  }

  const getTransactionColor = (type) => {
    return type === 'Top-Up' ? 'text-green-600' : 'text-red-600'
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="mt-2 text-gray-600">Manage your wallet balance and view payment history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet Balance and Top-Up */}
          <div className="lg:col-span-1 space-y-6">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-blue-100">Current Balance</h3>
                  <p className="text-4xl font-bold">₹{walletBalance.toFixed(2)}</p>
                </div>
                <div className="bg-blue-500 bg-opacity-30 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center text-blue-200 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Active Wallet
              </div>
            </div>

            {/* Top-Up Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top-Up Wallet</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="topUpAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      id="topUpAmount"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                  </div>
                </div>
                
                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTopUpAmount(amount.toString())}
                      className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleTopUp}
                  disabled={loading || !topUpAmount}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                    loading || !topUpAmount
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Top-Up Wallet'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Payment History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Payment History</h3>
                <p className="mt-1 text-gray-600">Track all your wallet transactions</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance After
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                            <div className="text-sm text-gray-500">#{transaction.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.type === 'Top-Up' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.date}</div>
                          <div className="text-sm text-gray-500">{transaction.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{transaction.balanceAfter}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet