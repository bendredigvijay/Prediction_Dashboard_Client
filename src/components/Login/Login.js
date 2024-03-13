import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginForm.css';
import logo from '../../assets/images/Login/logossh.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setRegistering] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', loginResponse.data.token);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleRegisterMode = () => {
    setRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="bodyLogin">
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div>
          <p className="log-in-text" style={{ color: 'black' }}>
            {isRegistering ? 'Register' : 'Login'}
          </p>
        </div>
        <form style={{ color: 'black' }} onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
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
          )}
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
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Loading...' : isRegistering ? 'Register' : 'Login'}
          </button>
          {!isRegistering && (
            <div
              className="register-link"
              onClick={toggleRegisterMode}
              style={{ color: '#f5891e', cursor: 'pointer' }}
            >
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
