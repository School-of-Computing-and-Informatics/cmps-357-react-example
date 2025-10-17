import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ transitionDuration = 1000 }) => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const linkRefs = useRef({});

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
    padding: 0,
    position: 'relative'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: 'white'
  };

  const selectionIndicatorStyle = {
    position: 'absolute',
    backgroundColor: '#3498db',
    borderRadius: '4px',
    transition: `all ${transitionDuration}ms ease-in-out`,
    zIndex: 1,
    ...indicatorStyle
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const updateIndicator = () => {
      const activePath = location.pathname;
      const activeLink = linkRefs.current[activePath];
      
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        const parentRect = activeLink.parentElement.parentElement.getBoundingClientRect();
        
        setIndicatorStyle({
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          left: `${rect.left - parentRect.left}px`,
          top: `${rect.top - parentRect.top}px`
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateIndicator, 0);
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname]);

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          TechSolutions
        </Link>
        <ul style={navLinksStyle}>
          <div style={selectionIndicatorStyle}></div>
          <li>
            <Link 
              to="/" 
              ref={(el) => linkRefs.current['/'] = el}
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
              ref={(el) => linkRefs.current['/about'] = el}
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
              ref={(el) => linkRefs.current['/media'] = el}
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