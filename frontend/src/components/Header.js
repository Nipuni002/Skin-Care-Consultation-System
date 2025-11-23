import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="auralisse-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Auralisse</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/doctor">Appointment</Link></li>
            <li><Link to="/chatbot">Consultation</Link></li>
            <li><Link to="/itemlist">Our Blogs</Link></li>
            <li><Link to="/SkinProgressForm">Skin Tracker</Link></li>
            <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
            <li><Link to="/login" className="login-btn">Login</Link></li>
            <li><Link  to="/" className="Sign-out"> Sign out</Link></li>
          </ul>
        </nav>
        <div className="mobile-menu">
          <span className="menu-icon">☰</span>
        </div>
      </div>
    </header>
  );
};

export default Header;