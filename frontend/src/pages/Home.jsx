import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import './Home.css'; 

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(true)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1001,
          background: '#667eea',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '18px'
        }}
      >
        ☰
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay show"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Calendar />
      </div>
    </div>
  );
}

export default Home;