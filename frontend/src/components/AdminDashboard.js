import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaBlog, FaBell, FaChartLine } from 'react-icons/fa';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Sample data - replace with real data from your backend
  const dashboardData = {
    doctors: { count: 12, description: "Manage your team of skincare specialists and doctors" },
    appointments: { count: 24, description: "View and manage upcoming patient appointments" },
    blogs: { count: 8, description: "Create and edit blog posts for your skincare website" }
  };

  const recentActivities = [
    { 
      type: 'appointment', 
      title: 'New appointment booked', 
      details: 'Dr. Smith - Acne Treatment', 
      time: '10 minutes ago' 
    },
    { 
      type: 'blog', 
      title: 'New blog post published', 
      details: '5 Winter Skincare Tips', 
      time: '2 hours ago' 
    },
    { 
      type: 'doctor', 
      title: 'New doctor added', 
      details: 'Dr. Johnson - Dermatologist', 
      time: 'Yesterday' 
    }
  ];

  const handleCardClick = (section) => {
    navigate(`/${section}`);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'appointment': return <FaCalendarAlt />;
      case 'blog': return <FaBlog />;
      case 'doctor': return <FaUserMd />;
      default: return <FaBell />;
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>AD</div>
          <span className={styles.userName}>Admin User</span>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div 
          className={`${styles.card} ${styles.doctors}`}
          onClick={() => handleCardClick('doctorForm')}
        >
          <div className={styles.cardTitle}>
            <div className={`${styles.icon} ${styles.doctors}`}>
              <FaUserMd size={20} />
            </div>
            <h3>Doctors</h3>
          </div>
          <p className={styles.cardContent}>{dashboardData.doctors.description}</p>
          <div className={styles.cardStats}>
            <span>Total Doctors</span>
            <span>{dashboardData.doctors.count}</span>
          </div>
        </div>

        <div 
          className={`${styles.card} ${styles.appointments}`}
          onClick={() => handleCardClick('adminAppoinments')}
        >
          <div className={styles.cardTitle}>
            <div className={`${styles.icon} ${styles.appointments}`}>
              <FaCalendarAlt size={20} />
            </div>
            <h3>Appointments</h3>
          </div>
          <p className={styles.cardContent}>{dashboardData.appointments.description}</p>
          <div className={styles.cardStats}>
            <span>Today's Appointments</span>
            <span>{dashboardData.appointments.count}</span>
          </div>
        </div>

        <div 
          className={`${styles.card} ${styles.blogs}`}
          onClick={() => handleCardClick('additem')}
        >
          <div className={styles.cardTitle}>
            <div className={`${styles.icon} ${styles.blogs}`}>
              <FaBlog size={20} />
            </div>
            <h3>Blog Posts</h3>
          </div>
          <p className={styles.cardContent}>{dashboardData.blogs.description}</p>
          <div className={styles.cardStats}>
            <span>Published Posts</span>
            <span>{dashboardData.blogs.count}</span>
          </div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h3 className={styles.sectionTitle}>Recent Activity</h3>
        {recentActivities.map((activity, index) => (
          <div key={index} className={styles.activityItem}>
            <div className={styles.activityIcon}>
              {getActivityIcon(activity.type)}
            </div>
            <div className={styles.activityDetails}>
              <h4>{activity.title}</h4>
              <p>{activity.details}</p>
              <span className={styles.activityTime}>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;