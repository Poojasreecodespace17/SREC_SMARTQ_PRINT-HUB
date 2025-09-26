import React, { useState, useEffect } from 'react';
import { Upload, FileText, Settings, User, LogOut } from 'lucide-react';
import PrintPreview from '../components/PrintPreview'; // Your detailed print modal
import GPaySimulator from '../components/GPaySimulator'; // The fake GPay screen

const StudentDashboard = () => {
  // State for the modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSimulatingGPay, setIsSimulatingGPay] = useState(false); // GPay simulator state

  // State for the order
  const [selectedFile, setSelectedFile] = useState(null);
  const [printOptions, setPrintOptions] = useState({
    copies: 1,
    colorMode: 'color',
    pageSize: 'A4',
    location: 'library' // Default pickup location
  });

  // GPay Simulation Logic
  useEffect(() => {
    if (isSimulatingGPay) {
      const timer = setTimeout(() => {
        setIsSimulatingGPay(false);
        alert(`Payment Successful! Your order has been sent to the ${printOptions.location}.`);
      }, 3000); // 3-second delay
      
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isSimulatingGPay, printOptions.location]);


  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleOptionsChange = (e) => {
    setPrintOptions({ ...printOptions, [e.target.name]: e.target.value });
  };
  
  const handleOpenModal = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // This function now starts the GPay simulation
  const handleConfirmPrint = () => {
    handleCloseModal(); // Close the print preview modal
    setIsSimulatingGPay(true); // Start the GPay simulation
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header and other UI... */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Print Service</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <label htmlFor="file-upload" className="cursor-pointer mt-4 block text-sm font-medium text-gray-900">
                {selectedFile ? selectedFile.name : "Upload a file to print"}
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
              </label>
              <p className="mt-2 text-sm text-gray-500">PDF, DOC, DOCX files up to 10MB</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Copies</label>
                <input type="number" name="copies" min="1" defaultValue="1" onChange={handleOptionsChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color Mode</label>
                <select name="colorMode" onChange={handleOptionsChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="color">Color</option>
                  <option value="grayscale">Grayscale</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Size</label>
                <select name="pageSize" onChange={handleOptionsChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <select name="location" onChange={handleOptionsChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="library">Library</option>
                  <option value="food court">Food Court</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button onClick={handleOpenModal} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                Preview & Pay
              </button>
            </div>
          </div>
          {/* Sidebar can go here */}
        </div>
      </main>

      {isModalOpen && (
        <PrintPreview
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onProceedToPayment={handleConfirmPrint}
          selectedFile={selectedFile}
          printOptions={printOptions}
        />
      )}
      
      {/* Conditionally render the GPay Simulator */}
      {isSimulatingGPay && <GPaySimulator />}
    </div>
  );
};

export default StudentDashboard;