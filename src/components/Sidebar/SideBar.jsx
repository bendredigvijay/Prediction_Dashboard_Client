import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import logoImage from '../../assets/images/Sidebar/logossh-removebg-preview (1).png';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <FaHome />,
  },
  {
    path: '/login',  // Assuming this is your logout route
    name: 'Logout',
    icon: <FaSignOutAlt />,
  }
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to log out?');

    if (isConfirmed) {
      console.log('Clicked Logout');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div style={{ width: '163px' }}>
      <div className={`sidebar`}>
        <div className="top_section">
          {isOpen && (
            <img
              src={logoImage}
              alt="Logo"
              className="logo-image"
              style={{ width: '150px', height: '39px', marginTop: '5px' }}
            />
          )}
        </div>

        <section className="routes">
          {routes.map((route, index) => (
            <NavLink
              to={route.path}
              key={index}
              className="link"
              activeClassName="active"
              onClick={route.name === 'Logout' ? handleLogout : null} // Add this line
            >
              <div className="icon">{route.icon}</div>
              {isOpen && (
                <div className="link_text">
                  {route.name}
                </div>
              )}
            </NavLink>
          ))}
        </section>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
