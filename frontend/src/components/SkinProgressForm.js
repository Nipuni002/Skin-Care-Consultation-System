import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './SkinProgress.css'; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

// Register required chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const SkinProgressTracker = ({ userId }) => {
  const [formData, setFormData] = useState({
    week: 1,
    acneLevel: 0,
    hydrationLevel: 0,
    rednessLevel: 0,
    notes: ''
  });
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const dataToSend = {
        ...formData,
        userId: userId,
        recordDate: new Date().toISOString()
      };
      await axios.post('http://localhost:8081/api/skin-progress', dataToSend);
      setShowChart(true);
      
      // Reset form for next week (keep week number)
      setFormData(prev => ({
        ...prev,
        week: prev.week + 1,
        acneLevel: 0,
        hydrationLevel: 0,
        rednessLevel: 0,
        notes: ''
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'week' || name === 'acneLevel' || name === 'hydrationLevel' || name === 'rednessLevel' 
        ? parseInt(value) 
        : value
    }));
  };

  // Prepare pie chart data
  const pieChartData = {
    labels: ['Acne Level', 'Hydration Level', 'Redness Level'],
    datasets: [
      {
        data: [formData.acneLevel, formData.hydrationLevel, formData.rednessLevel],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `Week ${formData.week - 1} Skin Analysis`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}/10`;
          }
        }
      }
    },
  };

  return (
    <div className="skin-progress-container">
      <h2>Track Your Skin Progress</h2>
      
      <div className="tracker-content">
        {/* Form on the left */}
        <div className="progress-form">
          <h3>Add Weekly Progress</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Week:</label>
              <input
                type="number"
                name="week"
                value={formData.week}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Acne Level (0-10):</label>
              <div className="slider-container">
                <input
                  type="range"
                  name="acneLevel"
                  value={formData.acneLevel}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                />
                <span className="slider-value">{formData.acneLevel}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label>Hydration Level (0-10):</label>
              <div className="slider-container">
                <input
                  type="range"
                  name="hydrationLevel"
                  value={formData.hydrationLevel}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                />
                <span className="slider-value">{formData.hydrationLevel}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label>Redness Level (0-10):</label>
              <div className="slider-container">
                <input
                  type="range"
                  name="rednessLevel"
                  value={formData.rednessLevel}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                />
                <span className="slider-value">{formData.rednessLevel}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label>Notes:</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <button className= "pbutton" type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Progress'}
            </button>
          </form>
        </div>
        
        {/* Pie Chart on the right */}
        <div className="pie-chart-section">
          {showChart ? (
            <div className="pie-chart-container">
              <h3>Current Skin Analysis</h3>
              <div className="pie-chart-wrapper">
                <Pie 
                  data={pieChartData} 
                  options={pieChartOptions} 
                />
              </div>
              <div className="chart-summary">
                <p><strong>Week {formData.week - 1} Results:</strong></p>
                <ul>
                  <li>Acne: {formData.acneLevel}/10</li>
                  <li>Hydration: {formData.hydrationLevel}/10</li>
                  <li>Redness: {formData.rednessLevel}/10</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="no-data-message">
              <p>Submit your skin data to see the analysis</p>
              <div className="placeholder-chart"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinProgressTracker;