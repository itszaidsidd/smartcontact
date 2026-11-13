import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiAlignJustify, FiX } from "react-icons/fi"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useLocation(); // Route change par Navbar ko refresh karne ke liye

  const isLoggedIn = localStorage.getItem("basicToken") !== null;
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/"><h1>Smart Contact Manager</h1></Link>
        </div>
        
        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          
          {!isLoggedIn ? (
            <>
              <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>Hi, {userName}</Link></li>
              <li><button onClick={handleLogout} className="nav-logout-btn">Logout</button></li>
            </>
          )}
        </ul>
        
        <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiAlignJustify size={24} />}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
