import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="auralisse-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Auralisse</h3>
          <p>Your journey to radiant skin begins here.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="/facial-treatments">Facial Treatments</a></li>
            <li><a href="/skin-analysis">Skin Analysis</a></li>
            <li><a href="/product-recommendations">Product Recommendations</a></li>
            <li><a href="/custom-routines">Custom Routines</a></li>
            <li><a href="/admin-signup">Admin</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>info@auralisse.com</p>
          <p>+1 (555) 123-4567</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Auralisse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;