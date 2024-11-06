import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    occupation: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the specific field
    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors }));
  };

  const validateField = (name, value) => {
    const newErrors = {};
    const namePattern = /^[A-Za-z]+$/;

    switch (name) {
      case 'firstName':
        if (!value) {
          newErrors.firstName = 'First Name is required';
        } else if (!namePattern.test(value)) {
          newErrors.firstName = 'First Name can only contain letters';
        } else if (value.length > 60) {
          newErrors.firstName = 'First Name must not exceed 60 characters';
        }
        break;

      case 'lastName':
        if (!value) {
          newErrors.lastName = 'Last Name is required';
        } else if (!namePattern.test(value)) {
          newErrors.lastName = 'Last Name can only contain letters';
        } else if (value.length > 60) {
          newErrors.lastName = 'Last Name must not exceed 60 characters';
        }
        break;

        case 'email':
          if (!value) {
            newErrors.email = 'Email is required';
          } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            newErrors.email = 'Email is invalid';
          }
          break;

      case 'mobile':
        if (!value) {
          newErrors.mobile = 'Mobile Number is required';
        } else if (!/^[1-9][0-9]{9}$/.test(value)) {
          newErrors.mobile = 'Mobile Number must be 10 digits and cannot start with 0';
        }
        break;

      case 'password':
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (!passwordPattern.test(value)) {
          newErrors.password = 'Password must be at least 12 characters, and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirm Password is required';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords must match';
        }
        break;

        case 'occupation':
          if (!value.trim()) {
            newErrors.occupation = 'Occupation is required and cannot be just spaces';
          } else if (value.length > 60) {
            newErrors.occupation = 'Occupation must not exceed 60 characters';
          } else if (!/^[a-zA-Z\s]*$/.test(value)) {
            newErrors.occupation = 'Occupation can only contain letters and spaces';
          }
          break;

      default:
        break;
    }

    return newErrors[name];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Object.keys(formData).reduce((acc, field) => {
      const fieldError = validateField(field, formData[field]);
      if (fieldError) {
        acc[field] = fieldError;
      }
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post('http://localhost:8989/register', formData);
      console.log('Registration successful:', response.data);
      alert('Registration successful!'); // Alert for successful registration
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        gender: 'male',
        occupation: '',
      });

      navigate('/user-login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Account already exists with this email.'); 
        setErrors({ email: 'Account already exists with this email.' });
      } else {
        console.error('Error registering user:', error);
        setErrors({ api: 'Failed to register user. Please try again.' });
        alert('Failed to register user. Please try again.'); 
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  return (
    <div className="container"
    
    style={{width: '500px'}}>
      <h2>Registration Form</h2>
      {errors.api && <div className="error">{errors.api}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName ? 'error' : ''}`}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName ? 'error' : ''}`}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`form-control ${errors.mobile ? 'error' : ''}`}
          />
          {errors.mobile && <div className="error">{errors.mobile}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? 'error' : ''}`}
              placeholder="Enter Password"
            />
            <button
                type="button"
                style={{width: '50px', height: '50px', marginTop: '5px', backgroundColor: 'white'}}
                
                className="input-group-append eye-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4C7.2 4 4.7 6.1 3 8c-1.6 1.8-1.6 4.2 0 6 1.7 1.9 4.2 3 7 3s5.3-1.1 7-3c1.6-1.8 1.6-4.2 0-6-1.7-1.9-4.2-3-7-3z" stroke="currentColor" />
                    <path d="M10 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" stroke="currentColor" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4C7.2 4 4.7 6.1 3 8c-1.6 1.8-1.6 4.2 0 6 1.7 1.9 4.2 3 7 3s5.3-1.1 7-3c1.6-1.8 1.6-4.2 0-6-1.7-1.9-4.2-3-7-3z" stroke="currentColor" />
                    <path d="M10 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" stroke="currentColor" />
                    <path d="M1 1l18 18" stroke="currentColor" />
                  </svg>
                )}
              </button>
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              style={{width: '50px', height: '50px', marginTop: '5px', backgroundColor: 'white'}}
                
              className="input-group-append eye-button"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4C7.2 4 4.7 6.1 3 8c-1.6 1.8-1.6 4.2 0 6 1.7 1.9 4.2 3 7 3s5.3-1.1 7-3c1.6-1.8 1.6-4.2 0-6-1.7-1.9-4.2-3-7-3z" stroke="currentColor" />
                  <path d="M10 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" stroke="currentColor" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4C7.2 4 4.7 6.1 3 8c-1.6 1.8-1.6 4.2 0 6 1.7 1.9 4.2 3 7 3s5.3-1.1 7-3c1.6-1.8 1.6-4.2 0-6-1.7-1.9-4.2-3-7-3z" stroke="currentColor" />
                  <path d="M10 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" stroke="currentColor" />
                  <path d="M1 1l18 18" stroke="currentColor" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              /> Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`form-control ${errors.occupation ? 'error' : ''}`}
          />
          {errors.occupation && <div className="error">{errors.occupation}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="form-group">
        <p>You are already registered? <a href="/user-login">Click here for login</a></p>
      </div>
    </div>
  );
};

export default RegistrationForm;
