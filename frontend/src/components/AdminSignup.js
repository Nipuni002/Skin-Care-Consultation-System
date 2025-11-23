import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './AdminSignup.module.css';

export default function AdminSignup() {
    const [admin, setAdmin] = useState({ 
        username: '', 
        email: '', 
        password: '' 
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        try {
            const res = await axios.post('http://localhost:8081/admin/signup', admin);
            
            Swal.fire({
                title: 'Admin Account Created!',
                text: 'Your admin account has been successfully registered.',
                icon: 'success',
                confirmButtonColor: '#8b5a7d',
                background: '#faf5f8',
                color: '#5a3a4d'
            }).then(() => {
                navigate('/admin-login'); // Redirect to admin login
            });

            setAdmin({ username: '', email: '', password: '' });

        } catch (error) {
            console.error('Signup error:', error);
            
            Swal.fire({
                title: 'Registration Failed',
                text: error.response?.data || 'Please try again with valid credentials',
                icon: 'error',
                confirmButtonColor: '#d67d7d',
                background: '#faf5f8',
                color: '#5a3a4d'
            });

            setMessage({ 
                text: error.response?.data || 'Registration failed', 
                type: 'error' 
            });
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Admin Registration</h2>
            
            <form onSubmit={handleSignup} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Admin Username</label>
                    <input
                        type="text"
                        name="username"
                        value={admin.username}
                        placeholder="Enter admin username"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={admin.email}
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
                        value={admin.password}
                        placeholder="Create secure password"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                
                {message.text && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}
                
                <button type="submit" className={styles.button}>
                    Register Admin Account
                </button>
            </form>
            
            <div className={styles.loginLink}>
                Already have an account? <Link to="/admin-login">Login here</Link>
            </div>
            
            <div className={styles.adminNote}>
                <p>Note: Admin registration is restricted to authorized personnel only. 
                All admin activities are logged and monitored.</p>
            </div>
        </div>
    );
}