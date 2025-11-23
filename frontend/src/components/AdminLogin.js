import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
    const [admin, setAdmin] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const res = await axios.post('http://localhost:8081/admin/login', admin);
            
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back, Admin!',
                icon: 'success',
                confirmButtonColor: '#8b5a7d',
                background: '#faf5f8',
                color: '#5a3a4d'
            }).then(() => {
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            });
            
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data || 'Login failed. Please try again.');
            
            Swal.fire({
                title: 'Login Failed',
                text: error.response?.data || 'Invalid credentials',
                icon: 'error',
                confirmButtonColor: '#d67d7d',
                background: '#faf5f8',
                color: '#5a3a4d'
            });
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Admin Portal</h2>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="admin@example.com"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                
                {error && <p className={styles.error}>{error}</p>}
                
                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
}