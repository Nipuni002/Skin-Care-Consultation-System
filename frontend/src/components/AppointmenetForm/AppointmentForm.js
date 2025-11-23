import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AppointmentForm.css';

function AppointmentForm() {
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        doctorname: '',
        name: '',
        appointmentDate: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post('http://localhost:8081/appointments', appointment);

            Swal.fire({
                title: 'Appointment Booked!',
                text: 'Your appointment has been successfully booked.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/doctor'); // Redirect to Doctor page after popup confirmation
            });

            setAppointment({ name: '', yname: '', appointmentDate: '' });

        } catch (error) {
            console.error('Error saving appointment:', error);

            Swal.fire({
                title: 'Error!',
                text: 'There was a problem booking your appointment. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="appointment-container">
            <div className="appointment-card">
                <h2 className="appointment-title">Book Your Consultation</h2>
                <p className="appointment-subtitle">Schedule your personalized skincare appointment</p>

                <form onSubmit={handleSubmit} className="appointment-form">
                    <div className="form-group">
                        <label className="form-label">Doctor Name</label>
                        <input
                            type="text"
                            name="doctorname"
                            value={appointment.doctorname}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter Doctor Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Patient Name</label>
                        <input
                            type="text"
                            name="name"
                            value={appointment.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter Patient Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Appointment Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={appointment.appointmentDate}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Booking...' : 'Book Appointment'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AppointmentForm;
