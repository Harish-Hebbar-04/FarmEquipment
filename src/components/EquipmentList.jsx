// src/components/EquipmentList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBooking from './CreateBooking';
import 'bootstrap/dist/css/bootstrap.min.css';

function EquipmentList({ username }) {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null); // Track selected equipment for booking
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/equipment/available', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        console.log("Fetched Equipment:", response.data);
        setEquipmentList(response.data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        setError('Failed to load equipment. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [token]);

  if (loading) {
    return <p className="text-center">Loading equipment...</p>;
  }

  return (
    <div className="container equipment-container my-4">
      <h2 className="text-center mb-4">Available Equipment</h2>
      <div className="row">
        {error && <p className="text-danger text-center">{error}</p>}
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => (
            <div key={equipment.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {equipment.imageUrl ? (
                  <img src={equipment.imageUrl} alt={equipment.name} className="card-img-top" />
                ) : (
                  <img src="default-image-url.jpg" alt="Default Equipment" className="card-img-top" />
                )}
                <div className="card-body">
                  <h5 className="card-title">{equipment.name}</h5>
                  <p className="card-text"><strong>ID:</strong> {equipment.id}</p>
                  <p className="card-text">{equipment.description}</p>
                  <p className="card-text"><strong>Price:</strong> ${equipment.price}</p>
                  <p className="card-text"><strong>Available Until:</strong> {equipment.dateOfAvailability}</p>
                  <p className="card-text"><strong>Type:</strong> {equipment.equipmentType}</p>
                  <p className="card-text"><strong>Condition:</strong> {equipment.condition}</p>
                  <p className="card-text"><strong>Location:</strong> {equipment.location}</p>
                  <p className="card-text"><strong>Rental Duration:</strong> {equipment.rentalDuration} days</p>
                  <p className="card-text"><strong>Owner Details:</strong> {equipment.ownerDetails}</p>
                  <p className="card-text"><strong>Rental Status:</strong> {equipment.rentalStatus}</p>
                  <p className="card-text"><strong>Deposit Amount:</strong> ${equipment.depositAmount}</p>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => setSelectedEquipmentId(equipment.id)}
                  >
                    Book this Equipment
                  </button>
                  {selectedEquipmentId === equipment.id && (
                    <CreateBooking equipmentId={equipment.id} username={username} />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No equipment available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default EquipmentList;
