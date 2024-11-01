// FarmerBookings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const farmerId = 1; // Placeholder ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/farmer/${farmerId}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="component-container">
            <h2>My Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <h3>Equipment ID: {booking.equipmentId}</h3>
                        <p>Date: {booking.date}</p>
                        <p>Status: {booking.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FarmerBookings;
