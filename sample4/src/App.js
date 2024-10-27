import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage'; // Adjust path as needed
import LoginPage from './components/Loginpage'; // Adjust path as needed
import Signup from './components/Signup'; // Import the Signup component
import Cart from './components/Cart';
import Contact from './components/Contact';
import About from './components/About';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />  Add route for Signup 
        <Route path="/Cart" element={<Cart />} />  Add route for Signup 
        <Route path="/Contact" element={<Contact />} />  Add route for Signup 
        <Route path="/About" element={<About />} />  Add route for Signup 
      </Routes>
    </Router>
  );
};

export default App;

