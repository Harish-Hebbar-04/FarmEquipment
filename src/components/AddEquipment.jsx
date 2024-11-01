// AddEquipment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddEquipment = () => {
    const [equipment, setEquipment] = useState({
        name: '',
        description: '',
        price: '',
        dateOfAvailability: '',
        equipmentType: '',
        condition: '',
        location: '',
        rentalDuration: '',
        ownerDetails: '',
        rentalStatus: '',
        imageUrl: '',
        depositAmount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipment({ ...equipment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/equipment/add', equipment);
            alert('Equipment added successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding equipment:', error);
        }
    };

    return (
        <div className="component-container">
            <h2>Add Equipment</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Equipment Name" onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" step="0.01" onChange={handleChange} required />
                <input type="date" name="dateOfAvailability" onChange={handleChange} required />
                <input type="text" name="equipmentType" placeholder="Equipment Type" onChange={handleChange} required />
                <input type="text" name="condition" placeholder="Condition" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <input type="number" name="rentalDuration" placeholder="Rental Duration (days/weeks)" onChange={handleChange} required />
                <input type="text" name="ownerDetails" placeholder="Owner Details" onChange={handleChange} required />
                <input type="text" name="rentalStatus" placeholder="Rental Status (available, rented, maintenance)" onChange={handleChange} required />
                <input type="url" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
                <input type="number" name="depositAmount" placeholder="Deposit Amount" step="0.01" onChange={handleChange} required />
                <button type="submit">Add Equipment</button>
            </form>
        </div>
    );
};

export default AddEquipment;
