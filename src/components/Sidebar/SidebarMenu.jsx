import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({ route }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <div className="link_text">{route.name}</div>
        </div>
        <div>
          <FaAngleDown style={{ transform: isMenuOpen ? "rotate(-90deg)" : "rotate(0)" }} />
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="menu_container">
          {route.subRoutes.map((subRoute, i) => (
            <NavLink to={subRoute.path} className="link" key={i}>
              <div className="icon">{subRoute.icon}</div>
              <div className="link_text">{subRoute.name}</div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
