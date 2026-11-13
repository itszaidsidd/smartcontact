import React from 'react';
import { Link } from 'react-router-dom';
import { FiCloud, FiShield, FiSearch, FiSmartphone, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const isLoggedIn = localStorage.getItem("basicToken") !== null;

  return (
    <div className="about-page">
      <div className="about-hero">
        <span className="hero-badge">About The Platform</span>
        <h1>Smart Contact Manager</h1>
        <p>
          A modern, cloud-based solution designed to organize, secure, and manage your personal and professional connections effortlessly.
        </p>
      </div>

      <div className="about-container">
        
        <div className="about-overview">
          <h2>Why Smart Contact Manager?</h2>
          <p>
            Traditional phonebooks and local spreadsheets are easy to lose and hard to manage. 
            <strong> Smart Contact Manager</strong> gives you a dedicated, private workspace where every contact—along with their profile photo, work details, and notes—is safely stored in the cloud and accessible from anywhere.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FiCloud size={28} /></div>
            <h3>Cloud Storage</h3>
            <p>Never lose a contact again. All your data and contact images are safely stored on our backend server.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiShield size={28} /></div>
            <h3>Enterprise Security</h3>
            <p>Protected with Spring Security and BCrypt password encryption so only you can access your data.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiSearch size={28} /></div>
            <h3>Instant Search</h3>
            <p>Find any person in milliseconds by searching their name or phone number from your dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiSmartphone size={28} /></div>
            <h3>Fully Responsive</h3>
            <p>Seamless experience across desktop, tablet, and mobile devices with a clean, fast interface.</p>
          </div>
        </div>

        <div className="about-tech-card">
          <h2>Built With Modern Technologies</h2>
          <div className="tech-list">
            <span><FiCheckCircle /> React.js & React Router</span>
            <span><FiCheckCircle /> Spring Boot 4 & REST APIs</span>
            <span><FiCheckCircle /> Spring Security</span>
            <span><FiCheckCircle /> Spring Data JPA & Hibernate</span>
            <span><FiCheckCircle /> MySQL / Relational Database</span>
          </div>

          <div className="about-cta">
            {!isLoggedIn ? (
              <Link to="/signup" className="btn-link">Create Your Free Account</Link>
            ) : (
              <Link to="/dashboard" className="btn-link">Back to Dashboard</Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
