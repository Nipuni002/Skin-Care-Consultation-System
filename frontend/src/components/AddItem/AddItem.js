import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddItem.css';

function AddItem() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemCategory: '',
    itemDescription: '',
    itemDelete: 'false'
  });

  const [itemImage, setItemImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [submittedItems, setSubmittedItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8081/inventory');
      setSubmittedItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      Swal.fire('Error', 'Failed to fetch items', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemImage(file);
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
      if (itemImage) {
        const imageFormData = new FormData();
        imageFormData.append('file', itemImage);

        const imageResponse = await axios.post('http://localhost:8081/inventory/itemImg', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        imageName = imageResponse.data;
      }

      const inventoryData = {
        ...formData,
        itemImage: imageName
      };

      if (editingItem) {
        await axios.put(`http://localhost:8081/inventory/${editingItem.id}`, inventoryData);
        Swal.fire('Success', 'Item updated successfully!', 'success');
      } else {
        await axios.post('http://localhost:8081/inventory', inventoryData);
        Swal.fire('Success', 'Item added successfully!', 'success');
      }

      fetchItems();
      setFormData({
        itemName: '',
        itemCategory: '',
        itemDescription: '',
        itemDelete: 'false'
      });
      setItemImage(null);
      setPreviewImage('');
      setEditingItem(null);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', error.response?.data?.message || 'Error processing request. Please try again.', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      itemName: item.itemName,
      itemCategory: item.itemCategory,
      itemDescription: item.itemDescription,
      itemDelete: item.itemDelete
    });
    if (item.itemImage) {
      setPreviewImage(`http://localhost:8081/uploads/${item.itemImage}`);
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
          await axios.delete(`http://localhost:8081/inventory/${id}`);
          Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
          fetchItems();
        } catch (error) {
          console.error('Error deleting item:', error);
          Swal.fire('Error', 'Error deleting item. Please try again.', 'error');
        }
      }
    });
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-header">
        {editingItem ? 'Edit Inventory Item' : 'Add New Blogs'}
      </h2>

      {/* Form Section */}
      <div className="inventory-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-field">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Category:</label>
              <input
                type="text"
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Description:</label>
              <textarea
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
                required
                className="form-input"
                rows="3"
              />
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label className="form-label">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
            {previewImage && (
              <div className="image-preview">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <button
              type="submit"
              className="primary-btn"
            >
              {editingItem ? 'Update Item' : 'Add Blogs'}
            </button>

            {editingItem && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setFormData({
                    itemName: '',
                    itemCategory: '',
                    itemDescription: '',
                    itemDelete: 'false'
                  });
                  setPreviewImage('');
                }}
                className="secondary-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          onClick={() => setViewMode('table')}
          className={`view-btn ${viewMode === 'table' ? 'active' : 'inactive'}`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode('cards')}
          className={`view-btn ${viewMode === 'cards' ? 'active' : 'inactive'}`}
        >
          Card View
        </button>
      </div>

      {/* Items Display Section */}
      <div className="items-display">
        <h3 className="items-header">
          Blogs
        </h3>

        {submittedItems.length > 0 ? (
          viewMode === 'table' ? (
            <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
              <table className="items-table">
                <thead>
                  <tr className="table-header">
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedItems.map((item) => (
                    <tr key={item.id} className="table-row">
                      <td className="table-cell">{item.itemName}</td>
                      <td className="table-cell">{item.itemCategory}</td>
                      <td className="table-cell">{item.itemDescription}</td>
                      <td className="table-cell" style={{ textAlign: 'center' }}>
                        {item.itemImage && (
                          <img
                            src={`http://localhost:8081/uploads/${item.itemImage}`}
                            alt={item.itemName}
                            className="table-image"
                          />
                        )}
                      </td>
                      <td className="table-cell">
                        <button
                          onClick={() => handleEdit(item)}
                          className="action-btn edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="action-btn delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card-grid">
              {submittedItems.map((item) => (
                <div key={item.id} className="card-item">
                  <div className="card-image-container">
                    {item.itemImage && (
                      <img
                        src={`http://localhost:8081/uploads/${item.itemImage}`}
                        alt={item.itemName}
                        className="card-image"
                      />
                    )}
                  </div>
                  <h4 className="card-title">{item.itemName}</h4>
                  <p className="card-detail">
                    <span className="detail-label">Category:</span> {item.itemCategory}
                  </p>
                  <p className="card-detail">
                    <span className="detail-label">Description:</span> {item.itemDescription}
                  </p>
                  <div className="card-actions">
                    <button
                      onClick={() => handleEdit(item)}
                      className="action-btn edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="empty-message">
            No items found. Add some items to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default AddItem;
