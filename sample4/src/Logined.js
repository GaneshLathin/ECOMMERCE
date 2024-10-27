import React, { useState } from 'react';
import '../styles/Loginpage.css'; // Adjust path as needed
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
    
    if (email === "ganu19052006@gmail.com" && password === "Ganesh@2006") {
      alert("You have signed in successfully");
      navigate('/');
    } else {
      setError("Entered email or password is incorrect. Please enter the valid email or password!");
    }
    setEmail('');
    setPassword('');
  };
  return (
    <div className="login-container">
   
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        
        </form>
      
    </div>
  );
};

export default LoginPage;
