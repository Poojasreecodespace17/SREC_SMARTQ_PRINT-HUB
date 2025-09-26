import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Assuming you have an api service file

const LibraryDashboard = () => {
  const [orderQueue, setOrderQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders specifically for the 'library' location
        const response = await api.get('/orders?location=library');
        setOrderQueue(response.data);
      } catch (err) {
        setError('Failed to load orders.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Library - Live Order Queue</h1>
      {isLoading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {orderQueue.length > 0 ? (
          orderQueue.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-medium">Order ID: {order.id}</p>
                <a href={order.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Document
                </a>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Mark as Completed
              </button>
            </div>
          ))
        ) : (
          !isLoading && <p>No new orders in the queue.</p>
        )}
      </div>
    </div>
  );
};

export default LibraryDashboard;