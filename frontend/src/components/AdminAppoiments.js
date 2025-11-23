import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminAppoinments.css';

function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8081/appointments');
            setAppointments(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:8081/appointments/${id}`, { status: newStatus });
            fetchAppointments(); // Refresh the list
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="admin-appointments-container">
            <h2>Appointment Requests</h2>
            
            {isLoading ? (
                <p>Loading appointments...</p>
            ) : (
                <div className="appointments-table-container">
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>patient Name</th>
    
                                <th>Appointment Date</th>
                                
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{appointment.doctorname}</td>
                                        <td>{appointment.name}</td>
                                        <td>{formatDate(appointment.appointmentDate)}</td>
                                        <td>
                                            <span className={`status-badge ${appointment.status ? appointment.status.toLowerCase() : 'pending'}`}>
                                                {appointment.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            {(!appointment.status || appointment.status === 'Pending') && (
                                                <>
                                                    <button 
                                                        onClick={() => handleStatusChange(appointment._id, 'Approved')}
                                                        className="btn-approve"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusChange(appointment._id, 'Rejected')}
                                                        className="btn-reject"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="no-appointments">
                                        No appointment requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminAppointments;