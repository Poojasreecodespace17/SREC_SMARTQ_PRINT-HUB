import React from 'react'

const PrintPreview = ({ 
  isOpen, 
  onClose, 
  selectedFile, 
  printOptions, 
  onProceedToPayment 
}) => {
  if (!isOpen) return null

  // Calculate estimated cost based on print options
  const calculateCost = () => {
    if (!printOptions) return 0
    
    const baseCostPerPage = printOptions.colorMode === 'color' ? 5 : 2
    const totalPages = printOptions.pages || 1
    const totalCopies = printOptions.copies || 1
    
    let totalCost = baseCostPerPage * totalPages * totalCopies
    
    // Add premium for different paper sizes
    if (printOptions.paperSize === 'A3') {
      totalCost *= 1.5
    } else if (printOptions.paperSize === 'A5') {
      totalCost *= 0.8
    }
    
    // Add binding cost if selected
    if (printOptions.binding && printOptions.binding !== 'none') {
      totalCost += printOptions.binding === 'spiral' ? 20 : 10
    }
    
    return Math.round(totalCost)
  }

  const estimatedCost = calculateCost()

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    switch (extension) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        )
      case 'doc':
      case 'docx':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        )
      case 'ppt':
      case 'pptx':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Print Preview</h3>
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
          {/* File Information */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Document Details</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                {selectedFile && getFileIcon(selectedFile.name)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{selectedFile?.name || 'No file selected'}</p>
                  <p className="text-sm text-gray-500">
                    {selectedFile ? formatFileSize(selectedFile.size) : 'Unknown size'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Print Options Review */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Print Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Basic Options</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pages:</span>
                    <span className="font-medium">{printOptions?.pages || 'All'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Copies:</span>
                    <span className="font-medium">{printOptions?.copies || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color Mode:</span>
                    <span className="font-medium capitalize">{printOptions?.colorMode || 'Black & White'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paper Size:</span>
                    <span className="font-medium">{printOptions?.paperSize || 'A4'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Advanced Options</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Orientation:</span>
                    <span className="font-medium capitalize">{printOptions?.orientation || 'Portrait'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Print Quality:</span>
                    <span className="font-medium capitalize">{printOptions?.quality || 'Standard'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Binding:</span>
                    <span className="font-medium capitalize">{printOptions?.binding || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{printOptions?.location || 'Library'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {printOptions?.instructions && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Special Instructions</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">{printOptions.instructions}</p>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Cost Breakdown</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-800">Base Cost ({printOptions?.colorMode === 'color' ? 'Color' : 'B&W'}):</span>
                  <span className="font-medium text-blue-900">
                    ₹{(printOptions?.colorMode === 'color' ? 5 : 2)} per page
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Pages × Copies:</span>
                  <span className="font-medium text-blue-900">
                    {printOptions?.pages || 1} × {printOptions?.copies || 1}
                  </span>
                </div>
                {printOptions?.binding && printOptions.binding !== 'none' && (
                  <div className="flex justify-between">
                    <span className="text-blue-800">Binding ({printOptions.binding}):</span>
                    <span className="font-medium text-blue-900">
                      +₹{printOptions.binding === 'spiral' ? 20 : 10}
                    </span>
                  </div>
                )}
                <hr className="border-blue-300" />
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-blue-900">Total Estimated Cost:</span>
                  <span className="text-blue-900">₹{estimatedCost}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Please Note:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Final cost may vary based on actual page count</li>
                    <li>Payment will be processed after file verification</li>
                    <li>Estimated pickup time: 15-30 minutes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back to Edit
          </button>
          <button
            onClick={() => onProceedToPayment(estimatedCost)}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Proceed to Payment (₹{estimatedCost})
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrintPreview