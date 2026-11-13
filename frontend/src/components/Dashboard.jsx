import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiUserPlus, FiUser, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Sidebar Toggle */}
      <button className="sidebar-mobile-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />} Menu
      </button>

      {/* Left Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-links">
          <NavLink to="/dashboard" end onClick={() => setSidebarOpen(false)}>
            <FiHome /> Home
          </NavLink>
          <NavLink to="/dashboard/contacts" onClick={() => setSidebarOpen(false)}>
            <FiUsers /> View Contacts
          </NavLink>
          <NavLink to="/dashboard/add-contact" onClick={() => setSidebarOpen(false)}>
            <FiUserPlus /> Add Contact
          </NavLink>
          <NavLink to="/dashboard/profile" onClick={() => setSidebarOpen(false)}>
            <FiUser /> Your Profile
          </NavLink>
          <NavLink to="/dashboard/settings" onClick={() => setSidebarOpen(false)}>
            <FiSettings /> Settings
          </NavLink>
          <button onClick={handleLogout} className="sidebar-logout">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Right Main Content Area */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
