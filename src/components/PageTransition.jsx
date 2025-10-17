import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Media from '../pages/Media';

const PageTransition = ({ transitionDuration = 1000 }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [incomingActive, setIncomingActive] = useState(false);
  const [outgoingActive, setOutgoingActive] = useState(false);
  const previousPath = useRef(location.pathname);

  const pageOrder = ['/', '/about', '/media'];

  const getPageIndex = (path) => {
    return pageOrder.indexOf(path);
  };

  const getDirection = (fromPath, toPath) => {
    const fromIndex = getPageIndex(fromPath);
    const toIndex = getPageIndex(toPath);
    return toIndex > fromIndex ? 'left' : 'right';
  };

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      setIncomingActive(true);
      setOutgoingActive(true);
      // Animate incoming/outgoing after a tick
      const enterTimer = setTimeout(() => {
        setIncomingActive(false);
        setOutgoingActive(false);
      }, 20); // short delay to trigger transition
      // Complete transition after duration
      const exitTimer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
        previousPath.current = location.pathname;
      }, transitionDuration);
      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [location, displayLocation, transitionDuration]);

  const direction = getDirection(previousPath.current, location.pathname);

  const containerStyle = {
    position: 'relative',
    width: '100vw', // Ensure full viewport width during transition
    overflow: 'hidden',
    minHeight: '100vh'
  };

  const exitingPageStyle = {
    position: isTransitioning ? 'absolute' : 'relative',
    width: '100%',
    top: 0,
    left: 0,
    transform:
      isTransitioning
        ? (outgoingActive
            ? 'translateX(0)'
            : (direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)'))
        : 'translateX(0)',
    transition: `transform ${transitionDuration}ms ease-in-out`,
    willChange: 'transform',
    opacity: 1,
    pointerEvents: isTransitioning ? 'none' : 'auto'
  };

  const incomingPageStyle = {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    transform:
      isTransitioning
        ? (incomingActive
            ? (direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)')
            : 'translateX(0)')
        : (direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)'),
    transition: `transform ${transitionDuration}ms ease-in-out`,
    willChange: 'transform',
    pointerEvents: isTransitioning ? 'none' : 'auto'
  };

  return (
    <div style={containerStyle}>
      {/* Outgoing page always rendered, animates out during transition */}
      <div style={exitingPageStyle}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
      {/* Incoming page only rendered during transition */}
      {isTransitioning && (
        <div style={incomingPageStyle}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default PageTransition;
