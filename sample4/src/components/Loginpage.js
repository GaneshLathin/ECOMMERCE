import React, { createContext, useContext, useState } from 'react';
import '../styles/Loginpage.css'; // Adjust path as needed
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

const ContextApi = createContext();

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  return (
    <ContextApi.Provider value={{ email, setEmail, password, setPassword, error, setError, forgotPassword, setForgotPassword, resetEmail, setResetEmail }}>
      <div className="login-background">
        <App1 />
      </div>
    </ContextApi.Provider>
  );
}

const App1 = () => {
  const { email, setEmail, password, setPassword, error, setError, forgotPassword, setForgotPassword, resetEmail, setResetEmail } = useContext(ContextApi);
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

    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setError('Please enter your email address');
      return;
    }

    // Simulate sending a reset link
    alert(`A password reset link has been sent to ${resetEmail}`);
    setForgotPassword(false);
    setResetEmail('');
  };

  return (
    <div className="login-container">
      <h1>{forgotPassword ? 'Forgot Password' : 'Login'}</h1>
      {error && <p className="error-message">{error}</p>}
      {forgotPassword ? (
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="reset-email">Email:</label>
            <input
              type="email"
              id="reset-email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete='off'
            />
          </div>
          <Button variant='contained' className="submit-button">Send Reset Link</Button>
          <a
            href="#"
            onClick={() => setForgotPassword(false)}
            className="back-to-login-link"
          >
            Back to Login
          </a>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete='off'
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
              autoComplete='off'
            />
          </div>
          <Button variant='contained' className="submit-button" onClick={handleSubmit}>Login</Button>
          <a
            href="#"
            onClick={() => setForgotPassword(true)}
            className="forgot-password-link"
          >
            Forgot Password?
          </a>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
