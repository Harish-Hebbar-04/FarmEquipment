
// CreateBooking.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateBooking = () => {
    const [booking, setBooking] = useState({ equipmentId: '', farmerId: '', date: '' });

    const handleChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/bookings/create', booking);
            alert('Booking created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="component-container">
            <h2>Create Booking</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="equipmentId" placeholder="Equipment ID" onChange={handleChange} required />
                <input type="text" name="farmerId" placeholder="Farmer ID" onChange={handleChange} required />
                <input type="date" name="date" onChange={handleChange} required />
                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
};

export default CreateBooking;
