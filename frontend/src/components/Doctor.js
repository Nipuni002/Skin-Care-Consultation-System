import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Doctor.css';

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8081/doctor');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleBookAppointment = (doctor) => {
    navigate(`/appointments`, { state: { doctor } });
  };

  return (
    <div className="doctors-container">
      <h2 className="doctors-header">Our Skincare Specialists</h2>
      <p className="doctors-subheader">Meet our team of experienced dermatologists and skincare professionals</p>

      {doctors.length > 0 ? (
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-image-container">
                {doctor.image && (
                  <img 
                    src={`http://localhost:8081/uploads/${doctor.image}`} 
                    alt={doctor.name} 
                    className="doctor-image"
                  />
                )}
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.experience}</p>
                <button 
                  className="btn-view-profile"
                  onClick={() => handleBookAppointment(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No specialists available at the moment.</p>
      )}
    </div>
  );
}

export default Doctor;
