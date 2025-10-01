import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  };

  const logoStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '30px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#3498db',
    color: 'white'
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          TechSolutions
        </Link>
        <ul style={navLinksStyle}>
          <li>
            <Link 
              to="/" 
              style={isActive('/') ? activeLinkStyle : linkStyle}
              onMouseOver={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = '#34495e';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              style={isActive('/about') ? activeLinkStyle : linkStyle}
              onMouseOver={(e) => {
                if (!isActive('/about')) {
                  e.target.style.backgroundColor = '#34495e';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/about')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/media" 
              style={isActive('/media') ? activeLinkStyle : linkStyle}
              onMouseOver={(e) => {
                if (!isActive('/media')) {
                  e.target.style.backgroundColor = '#34495e';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/media')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Media
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;