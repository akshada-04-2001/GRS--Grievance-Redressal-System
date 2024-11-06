import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      alert('Please fix the errors before submitting the form.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8989/login', formData);

      console.log('Login successful:', response.data);
      alert('Login successful!'); // Alert for successful login
      setSubmitted(true);
      // Reset form data
      setFormData({ email: '', password: '' });
      navigate('/grievance-entry');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in. Please check your credentials and try again.'); // Alert for login failure
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };

  return (
    <div className="container"
    style={{width: '450px'}}>
      <h2>Login Form</h2>
      {submitted && <div className="success">Login successful!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button
              type="button"
              style={{width: '50px'}}
              className="password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="register-link">
        <p>Not registered yet? <a href="/sign-up">Click here to register</a></p>
      </div>
      <div className="forgot-password-link">
        <p><a href="/forgot-password">Forgot Password?</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
