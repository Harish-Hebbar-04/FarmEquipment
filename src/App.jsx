import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import EquipmentList from './components/EquipmentList';
import AddEquipment from './components/AddEquipment';
import CreateBooking from './components/CreateBooking';
import FarmerBooking from './components/FarmerBookings';
import Carousel from './components/Carousel';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Farm Equipment Rental</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/equipment">Equipment</Link></li>
            <li><Link to="/add-equipment">Add Equipment</Link></li>
            <li><Link to="/create-booking">Book Equipment</Link></li>
            <li><Link to="/farmer-booking">My Bookings</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="hero">
                <img src='https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVxdWltZW50JTIwZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D' alt='not found'/>
                
                <h2>Find the Right Equipment for Your Farm Needs</h2>
                <p>Browse and rent equipment to suit your agricultural needs.</p>
                <Carousel/>
                <Link className="get-started" to="/equipment">Get Started</Link>
              </div>
            } 
          />
          <Route path="/equipment" element={<EquipmentList />} />
          <Route path="/add-equipment" element={<AddEquipment />} />
          <Route path="/create-booking" element={<CreateBooking />} />
          <Route path="/farmer-booking" element={<FarmerBooking />} />
        </Routes>
      </main>
      <footer>
        <p>© 2023 Farm Equipment Rental. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;