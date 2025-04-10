import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students] = useState([
    { id: 1, name: "Sanjeev" },
    { id: 2, name: "Kumar" },
    { id: 3, name: "Chitra" },
    { id: 4, name: "Rithika" },
    { id: 5, name: "Bharathi" }
  ]);
  
  const [favoriteStudents, setFavoriteStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [animatedId, setAnimatedId] = useState(null);
  
  const addToFavorite = (student) => {
    // Check if student already exists in favorites
    if (!favoriteStudents.some(favStudent => favStudent.id === student.id)) {
      setFavoriteStudents([...favoriteStudents, student]);
      
      // Show notification
      setNotification({ 
        show: true, 
        message: `${student.name} added to favorites!` 
      });
      
      // Set animation for the student
      setAnimatedId(student.id);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      
      // Remove animation class after animation completes
      setTimeout(() => {
        setAnimatedId(null);
      }, 500);
    } else {
      // Show already added notification
      setNotification({ 
        show: true, 
        message: `${student.name} is already in favorites!` 
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
    }
  };
  
  const removeFromFavorite = (student) => {
    // Set animation before removing
    setAnimatedId(student.id);
    
    // Remove after animation completes
    setTimeout(() => {
      setFavoriteStudents(favoriteStudents.filter(s => s.id !== student.id));
      
      // Show notification
      setNotification({ 
        show: true, 
        message: `${student.name} removed from favorites!` 
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
    }, 300);
  };
  
  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteStudents', JSON.stringify(favoriteStudents));
  }, [favoriteStudents]);
  
  // Load favorites from localStorage on initial load
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteStudents');
    if (savedFavorites) {
      setFavoriteStudents(JSON.parse(savedFavorites));
    }
  }, []);
  
  return (
    <div className="app">
      {notification.show && (
        <div className="notification">
          {notification.message}
        </div>
      )}
      
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          List of Students
        </div>
        <div 
          className={`tab ${activeTab === 'favorite' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorite')}
        >
          Favourite Students
          {favoriteStudents.length > 0 && (
            <span className="badge">{favoriteStudents.length}</span>
          )}
        </div>
      </div>
      
      <div className="content">
        {activeTab === 'list' && (
          <div className="student-list">
            {students.map((student) => (
              <div 
                key={student.id} 
                className={`student-item ${animatedId === student.id ? 'pulse' : ''}`}
              >
                <span className="student-name">{student.id}. {student.name}</span>
                <button 
                  className={`add-button ${favoriteStudents.some(s => s.id === student.id) ? 'disabled' : ''}`}
                  onClick={() => addToFavorite(student)}
                  disabled={favoriteStudents.some(s => s.id === student.id)}
                >
                  {favoriteStudents.some(s => s.id === student.id) 
                    ? 'Added' 
                    : 'Add to Favourite'}
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'favorite' && (
          <div className="favorite-list">
            {favoriteStudents.length === 0 ? (
              <div className="empty-message">No favorite students added yet.</div>
            ) : (
              favoriteStudents.map((student) => (
                <div 
                  key={student.id} 
                  className={`student-item ${animatedId === student.id ? 'fade-out' : 'fade-in'}`}
                >
                  <span className="student-name">{student.id}. {student.name}</span>
                  <button 
                    className="remove-button"
                    onClick={() => removeFromFavorite(student)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      {/* <div className="footer">
        <p>Sanjeev P</p>
        <p>sanjeevchitra7744@gmail.com</p>
        <p>+918838798421</p>
      </div> */}
    </div>
  );
}

export default App;