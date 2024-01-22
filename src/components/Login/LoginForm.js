import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginForm.css';
import logo from '../../assets/images/Login/logossh.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const loginResponse = await axios.post('http://localhost:4000/api/auth/login', loginData);
      console.log('Login response:', loginResponse.data);
      // If login is successful, you can redirect the user to another page
      navigate('/'); // Update this path accordingly
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle login error, e.g., display an error message to the user
      setError('Invalid username or password');
    }

    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = { username, email, password };

    try {
      const registerResponse = await axios.post('http://localhost:4000/api/auth/register', registerData);
      console.log('Register response:', registerResponse.data);
      // If registration is successful, you can redirect the user to another page
      navigate('/'); // Update this path accordingly
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle registration error, e.g., display an error message to the user
      setError('Registration failed');
    }

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password?');
  };

  const toggleRegisterMode = () => {
    setRegistering(!isRegistering);
    setError(''); // Clear any previous error messages
  };

  return (
    <div className="bodyLogin">
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div>
          <p className="log-in-text" style={{color:'black'}}>{isRegistering ? 'Register' : 'Log In'}</p>
        </div>
        <form style={{ color: 'black' }} onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary">
            {isRegistering ? 'Register' : 'Login'}
          </button>
          {!isRegistering && (
            <div className="register-link" onClick={toggleRegisterMode} style={{ color: 'blue', cursor: 'pointer' }}>
            Need an account? Register here
          </div>
          
          )}
          {isRegistering && (
            <div className="login-link" onClick={toggleRegisterMode}>
              Already have an account? Log In here
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;