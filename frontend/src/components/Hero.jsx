import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const isLoggedIn = localStorage.getItem("basicToken") !== null;

  return (
    <div className='hero'>
      <div className="hero-content">
        <span className="hero-badge">Cloud Contact Management</span>
        <h1>Smart Contact Manager</h1>
        <p>Start collecting your contacts in a very smarter way. We provide a very efficient, secure, and cloud-based way of handling your personal and professional contacts.</p>
        
        <div className="hero-btns">
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="btn-primary">Get Started Free</Link>
              <Link to="/login" className="btn-secondary">Login</Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
