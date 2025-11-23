import React from 'react';
import heroBg from './images/hero-bg.jpg';
import '../styles/hero.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Radiant Skin Starts Here</h1>
        <p>Discover personalized skincare solutions tailored to your unique needs</p>
        <div className="hero-buttons">
          <button className="primary-btn">Book a Consultation</button>
          <button className="secondary-btn">Explore Products</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroBg} alt="Woman with glowing skin" />
      </div>
    </section>
  );
};

export default HeroSection;