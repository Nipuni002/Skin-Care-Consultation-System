import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddItem/AddItem.css'; // You can reuse the same CSS

function Doctor() {
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    phone: '',
    address: '',
    itemDescription: ''
  });

  const [doctorImage, setDoctorImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8081/doctor');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      Swal.fire('Error', 'Failed to fetch doctors', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageName = '';
      if (doctorImage) {
        const imageFormData = new FormData();
        imageFormData.append('file', doctorImage);

        const imageResponse = await axios.post('http://localhost:8081/doctor/uploadImage', imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        imageName = imageResponse.data;
      }

      const doctorData = { ...formData, image: imageName };

      if (editingDoctor) {
        await axios.put(`http://localhost:8081/doctor/${editingDoctor.id}`, doctorData);
        Swal.fire('Success', 'Doctor updated successfully!', 'success');
      } else {
        await axios.post('http://localhost:8081/doctor', doctorData);
        Swal.fire('Success', 'Doctor added successfully!', 'success');
      }

      fetchDoctors();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error processing request. Please try again.', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      experience: '',
      phone: '',
      address: '',
      itemDescription: ''
    });
    setDoctorImage(null);
    setPreviewImage('');
    setEditingDoctor(null);
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      experience: doctor.experience,
      phone: doctor.phone,
      address: doctor.address,
      itemDescription: doctor.itemDescription
    });
    if (doctor.image) {
      setPreviewImage(`http://localhost:8081/uploads/${doctor.image}`);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8081/doctor/${id}`);
          Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
          fetchDoctors();
        } catch (error) {
          console.error('Error deleting doctor:', error);
          Swal.fire('Error', 'Error deleting doctor. Please try again.', 'error');
        }
      }
    });
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-header">
        {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
      </h2>

      {/* Form Section */}
      <div className="inventory-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-field">
              <label className="form-label">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-input" />
            </div>

            <div className="form-field">
              <label className="form-label">Experience:</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} required className="form-input" />
            </div>

            <div className="form-field">
              <label className="form-label">Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required className="form-input" />
            </div>

            <div className="form-field">
              <label className="form-label">Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="form-input" />
            </div>

            <div className="form-field">
              <label className="form-label">Description:</label>
              <textarea name="itemDescription" value={formData.itemDescription} onChange={handleInputChange} required className="form-input" rows="3" />
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label className="form-label">Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" className="preview-image" />
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <button type="submit" className="primary-btn">
              {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
            </button>

            {editingDoctor && (
              <button type="button" onClick={resetForm} className="secondary-btn">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Doctors Display Section */}
      <div className="items-display">
        <h3 className="items-header">Doctors</h3>

        {doctors.length > 0 ? (
          <div className="card-grid">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="card-item">
                <div className="card-image-container">
                  {doctor.image && (
                    <img src={`http://localhost:8081/uploads/${doctor.image}`} alt={doctor.name} className="card-image" />
                  )}
                </div>
                <h4 className="card-title">{doctor.name}</h4>
                <p className="card-detail"><span className="detail-label">Experience:</span> {doctor.experience}</p>
                <p className="card-detail"><span className="detail-label">Phone:</span> {doctor.phone}</p>
                <p className="card-detail"><span className="detail-label">Address:</span> {doctor.address}</p>
                <p className="card-detail"><span className="detail-label">Description:</span> {doctor.itemDescription}</p>

                <div className="card-actions">
                  <button onClick={() => handleEdit(doctor)} className="action-btn edit-btn">Edit</button>
                  <button onClick={() => handleDelete(doctor.id)} className="action-btn delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No doctors found. Add some doctors to get started!</p>
        )}
      </div>
    </div>
  );
}

export default Doctor;
