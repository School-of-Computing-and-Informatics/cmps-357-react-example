import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Media from '../pages/Media';

const PageTransition = ({ transitionDuration = 1000 }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
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
      setTransitionStage('fadeOut');
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
        previousPath.current = location.pathname;
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation, transitionDuration]);

  const direction = getDirection(previousPath.current, location.pathname);

  const getTransform = () => {
    if (transitionStage === 'fadeOut') {
      return direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
    }
    return 'translateX(0)';
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden'
  };

  const contentStyle = {
    transform: getTransform(),
    transition: `transform ${transitionDuration}ms ease-in-out`,
    willChange: 'transform'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </div>
  );
};

export default PageTransition;
