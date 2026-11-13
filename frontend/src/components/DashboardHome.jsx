import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div className="dash-card text-center">
      <div className="welcome-banner">
        <h1>Welcome, {userName}!</h1>
        <p>Start adding your contacts on the cloud. Access them anytime, anywhere securely.</p>
        <div className="btns" style={{ marginTop: '25px' }}>
          <Link to="/dashboard/add-contact" className="btn-link">Add New Contact</Link>
          <Link to="/dashboard/contacts" className="btn-link secondary">View All Contacts</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
