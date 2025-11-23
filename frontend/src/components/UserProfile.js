import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './UserProfile.module.css'; // We'll create this CSS module

function UserProfile() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user ID from localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [userId, navigate]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setErrorMessage('Failed to load user profile.');
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a28395',
      cancelButtonColor: '#d4a5b5',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8081/user/${userId}`);
        localStorage.removeItem('userId');
        Swal.fire({
          title: 'Deleted!',
          text: 'Your account has been deleted.',
          icon: 'success',
          confirmButtonColor: '#a28395'
        });
        navigate('/login');
      } catch (error) {
        console.error('Error deleting user:', error);
        setErrorMessage('Failed to delete account.');
      }
    }
  };

  const handleUpdate = () => {
    navigate('/update-profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>My Profile</h2>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={styles.profileCard}>
        <div className={styles.profileField}>
          <span className={styles.label}>First Name:</span>
          <p className={styles.value}>{user.firstname}</p>
        </div>

        <div className={styles.profileField}>
          <span className={styles.label}>Last Name:</span>
          <p className={styles.value}>{user.lastname}</p>
        </div>

        <div className={styles.profileField}>
          <span className={styles.label}>Email:</span>
          <p className={styles.value}>{user.email}</p>
        </div>

        <div className={styles.profileField}>
          <span className={styles.label}>Phone:</span>
          <p className={styles.value}>{user.phone}</p>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className={`${styles.button} ${styles.update}`} onClick={handleUpdate}>
          Update Profile
        </button>
        <button className={`${styles.button} ${styles.home}`} onClick={() => navigate('/')}>
          Back to Home
        </button>
        <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>
          Logout
        </button>
        <button className={`${styles.button} ${styles.delete}`} onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserProfile;