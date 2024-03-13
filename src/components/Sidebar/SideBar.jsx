import React, { useState } from 'react';  
import { NavLink, useNavigate } from 'react-router-dom';    
import { FaHome } from 'react-icons/fa';  
import { AnimatePresence, motion } from 'framer-motion';  
import { RiLogoutBoxRLine } from "react-icons/ri";  
import SidebarMenu from './SidebarMenu';  
import logoImage from '../../assets/images/Sidebar/logossh-removebg-preview (1).png'; 

const routes = [
  {
    path: '/',  
    name: 'Dashboard',  
    icon: <FaHome />, 
  }
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    localStorage.removeItem('token');

    if (isConfirmed) {
      console.log('Clicked Logout');
      navigate('/login'); 
    }
  };



  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div style={{ width: '163px' }} >
      <motion.div
        animate={{
          transition: {
            duration: 0.5,
            type: 'spring',
            damping: 10,
          },
        }}
        className={`sidebar`}
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.img
                variants={logoVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                src={logoImage}
                alt="Logo"
                className="logo-image"
                style={{ width: '150px', height: '39px', marginTop: '5px' }}
              />
            )}
          </AnimatePresence>
        </div>

        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  route={route}
                  isOpen={isOpen}
                  key={index}
                />
              );
            }

            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeClassName="active"
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={logoVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>

        {/* Logout button */}
        <div
          className="logout-button"
          style={{ position: 'absolute', bottom: '10px', width: '98%' }}
        >
          {isOpen && (
            <button
              onClick={handleLogout}
            >
             <RiLogoutBoxRLine />
            </button>
          )}
        </div>
      </motion.div>

      <main>{children}</main>
    </div>
  );
};

export default SideBar;
