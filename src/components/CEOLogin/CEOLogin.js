import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CEOLogin.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CEOLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8989/api/users/login`, {
        username,
        password,
        role: 'CEO',
      });

      if (response.status === 200) {

        sessionStorage.setItem('user', JSON.stringify(response.data));
        alert('CEO logged in successfully');
        navigate('/ceo-dashboard');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid username or password');
      } else {
        console.error('Error logging in:', error);
        alert('Error logging in: ' + error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <form className={styles.login} onSubmit={handleSubmit}>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user`}></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={styles.login__input}
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-lock`}></i>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.login__input}
              />
              <button
                type="button"
                style={{width: '50px'}}
                onClick={handleTogglePassword}
                className={styles.passwordToggleIcon}
              >
                {passwordVisible ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>
            <button className={`${styles.button} ${styles.login__submit}`}>
              <span className={styles.button__text}>Log In</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          {/* Social Login Section */}
          <div className={styles.socialLogin}>
           <h3>CEO Log In</h3>
          </div>
        </div>
        <div className={styles.screen__background}>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
        </div>
      </div>
    </div>
  );
};

export default CEOLogin;