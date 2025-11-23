import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './LoginForm.module.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8081/login', formData);

      // Store user ID
      localStorage.setItem('userId', response.data.id);

      // Show SweetAlert popup
      Swal.fire({
        title: 'Welcome Back!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#a28395',
        background: '#faf5f8',
        color: '#5a3a4d'
      }).then(() => {
        // Navigate after popup confirmation
        navigate('/userprofile');
      });

    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage(error.response.data.errorMessage || 'User not found.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Welcome to Glow</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <div className={styles.link}>
        New to Glow? <a href="/signup">Create an account</a>
      </div>
    </div>
  );
}

export default Login;