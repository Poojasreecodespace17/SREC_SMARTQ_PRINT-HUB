import React from 'react';

const GPaySimulator = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* GPay Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7 7.6L9.4 4.3c-.2-.2-.5-.2-.7 0L5.3 7.6c-.2.2-.2.5 0 .7l3.4 3.4c.2.2.5.2.7 0l3.3-3.4c.2-.2.2-.5 0-.7z"
                fill="#4285F4"
              />
              <path
                d="M18.7 7.6l-3.3-3.3c-.2-.2-.5-.2-.7 0l-3.4 3.3c-.2.2-.2.5 0 .7l3.4 3.4c.2.2.5.2.7 0l3.3-3.4c.2-.2.2-.5 0-.7z"
                fill="#34A853"
              />
              <path
                d="M12.7 13.6L9.4 10.3c-.2-.2-.5-.2-.7 0l-3.4 3.3c-.2.2-.2.5 0 .7l3.4 3.4c.2.2.5.2.7 0l3.3-3.4c.2-.2.2-.5 0-.7z"
                fill="#FBBC04"
              />
              <path
                d="M18.7 13.6l-3.3-3.3c-.2-.2-.5-.2-.7 0l-3.4 3.3c-.2.2-.2.5 0 .7l3.4 3.4c.2.2.5.2.7 0l3.3-3.4c.2-.2.2-.5 0-.7z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <span className="text-white text-3xl font-medium">Pay</span>
        </div>

        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Processing Text */}
        <div className="text-center">
          <p className="text-white text-lg font-medium">Processing payment with GPay...</p>
          <p className="text-gray-300 text-sm mt-2">Please wait while we complete your transaction</p>
        </div>

        {/* Pulse animation dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default GPaySimulator;