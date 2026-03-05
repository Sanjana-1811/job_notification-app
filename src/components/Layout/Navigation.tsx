import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Saved', path: '/saved' },
    { name: 'Digest', path: '/digest' },
    { name: 'Settings', path: '/settings' },
    { name: 'Proof', path: '/proof' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <NavLink to="/" className="brand-link">
              JN
            </NavLink>
          </div>

          <div className="desktop-menu">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="mobile-menu-btn">
            <button onClick={toggleMenu} aria-label="Toggle menu" className="menu-toggle">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
