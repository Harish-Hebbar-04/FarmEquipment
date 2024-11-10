// src/components/CreateBooking.jsx

import React, { useState } from 'react';
import axios from 'axios';

const CreateBooking = ({ equipmentId, username }) => {
  const [booking, setBooking] = useState({
    bookingStart: '',
    bookingEnd: '',
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/bookings/create?username=${username}&equipmentId=${equipmentId}`,
        {
          bookingStart: booking.bookingStart,
          bookingEnd: booking.bookingEnd,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add token to headers
          },
        }
      );
      setMessage('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
      if (error.response && error.response.status === 403) {
        setMessage('Booking failed: Access forbidden. Please check your permissions.');
      } else {
        setMessage('Failed to create booking');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <h5>Book Equipment ID: {equipmentId}</h5>
      <div className="form-group">
        <label>Booking Start Date</label>
        <input
          type="date"
          name="bookingStart"
          value={booking.bookingStart}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Booking End Date</label>
        <input
          type="date"
          name="bookingEnd"
          value={booking.bookingEnd}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-success mt-3">Confirm Booking</button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default CreateBooking;
