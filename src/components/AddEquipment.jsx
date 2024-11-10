import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddEquipment() {
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

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipment((prevEquipment) => ({
      ...prevEquipment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setErrorMessage("You must be logged in to add equipment.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/equipment/add', equipment, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in headers
          'Content-Type': 'application/json'
        },
      });
      console.log("Equipment added:", response.data);
      setSuccessMessage("Equipment added successfully!");
      setErrorMessage('');
      
      // Clear form fields after successful submission
      setEquipment({
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
    } catch (error) {
      console.error("Error adding equipment:", error);
      setErrorMessage("Failed to add equipment. Please try again.");
      setSuccessMessage('');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Add Equipment</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" value={equipment.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <input type="text" className="form-control" name="description" value={equipment.description} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number" className="form-control" name="price" value={equipment.price} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="dateOfAvailability" className="form-label">Date of Availability:</label>
            <input type="date" className="form-control" name="dateOfAvailability" value={equipment.dateOfAvailability} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="equipmentType" className="form-label">Equipment Type:</label>
            <input type="text" className="form-control" name="equipmentType" value={equipment.equipmentType} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="condition" className="form-label">Condition:</label>
            <input type="text" className="form-control" name="condition" value={equipment.condition} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="location" className="form-label">Location:</label>
            <input type="text" className="form-control" name="location" value={equipment.location} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="rentalDuration" className="form-label">Rental Duration (in days):</label>
            <input type="number" className="form-control" name="rentalDuration" value={equipment.rentalDuration} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="ownerDetails" className="form-label">Owner Details:</label>
            <input type="text" className="form-control" name="ownerDetails" value={equipment.ownerDetails} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="rentalStatus" className="form-label">Rental Status:</label>
            <input type="text" className="form-control" name="rentalStatus" value={equipment.rentalStatus} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL:</label>
            <input type="text" className="form-control" name="imageUrl" value={equipment.imageUrl} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="depositAmount" className="form-label">Deposit Amount:</label>
            <input type="number" className="form-control" name="depositAmount" value={equipment.depositAmount} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Equipment</button>
      </form>
    </div>
  );
}

export default AddEquipment;
