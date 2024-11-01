import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Adjusted import statement

function EquipmentList() {
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/equipment/available');
        setEquipmentList(response.data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <div className="equipment-container">
      <h2>Available Equipment</h2>
      <div className="equipment-list">
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => (
            <div key={equipment.id} className="equipment-item">
              <h3>{equipment.name}</h3>
              <p>{equipment.description}</p>
              <p><strong>Price:</strong> ${equipment.price}</p>
              <p><strong>Available until:</strong> {equipment.availableDate}</p>
            </div>
          ))
        ) : (
          <p>No equipment available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default EquipmentList;
