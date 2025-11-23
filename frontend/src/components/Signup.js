import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user', formData);

      Swal.fire({
        icon: 'success',
        title: 'Welcome to Glow!',
        text: 'Your account has been created successfully!',
        confirmButtonColor: '#a28395',
        background: '#faf5f8',
        color: '#5a3a4d'
      }).then(() => {
        navigate('/'); // Navigate to home page after successful signup
      });

      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: ''
      });

    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#d4a5b5',
        background: '#faf5f8',
        color: '#5a3a4d'
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Create Your Account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Join Now</button>
      </form>
      <div className={styles.link}>
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </div>
  );
}

export default Signup;