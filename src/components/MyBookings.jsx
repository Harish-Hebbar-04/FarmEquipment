// src/components/MyBookings.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token'); // Retrieve JWT token

      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/bookings/my-bookings', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send JWT token in the headers
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Equipment: {booking.equipment.name}</h5>
              <p className="card-text">Description: {booking.equipment.description}</p>
              <p className="card-text">Booking Start: {booking.bookingStart}</p>
              <p className="card-text">Booking End: {booking.bookingEnd}</p>
              <p className="card-text">Location: {booking.equipment.location}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
