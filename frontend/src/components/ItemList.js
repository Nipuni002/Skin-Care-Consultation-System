import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BlogView.css'; // We'll create this CSS file

function BlogView() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8081/inventory');
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="blog-view-container">
      <header className="blog-header">
        <div className="header-content">
          <h1>Our Blogs</h1>
          <p className="header-subtitle">Insights, stories and ideas from our team</p>
        </div>
        <button onClick={handleBack} className="back-button">
          &larr; Back
        </button>
      </header>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading blogs...</p>
        </div>
      ) : blogs.length > 0 ? (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="card-image-container">
                {blog.itemImage && (
                  <img
                    src={`http://localhost:8081/uploads/${blog.itemImage}`}
                    alt={blog.itemName}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Blog+Image';
                    }}
                  />
                )}
              </div>
              <div className="card-content">
                <span className="blog-category">{blog.itemCategory}</span>
                <h3 className="blog-title">{blog.itemName}</h3>
                <p className="blog-excerpt">{blog.itemDescription}</p>
                <div className="read-more-link">
                  <span>Read more</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <img src="https://via.placeholder.com/150" alt="No blogs" className="empty-icon" />
          <h3>No Blogs Available</h3>
          <p>We haven't published any blogs yet. Check back soon!</p>
        </div>
      )}

      <footer className="blog-footer">
        <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BlogView;