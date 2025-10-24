import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Media from '../pages/Media';
import Courses from '../pages/Courses';

const PageTransition = ({ transitionDuration = 1000 }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [incomingActive, setIncomingActive] = useState(false);
  const [outgoingActive, setOutgoingActive] = useState(false);
  const [preparingTextures, setPreparingTextures] = useState(false);
  const [outgoingTexture, setOutgoingTexture] = useState(null);
  const [incomingTexture, setIncomingTexture] = useState(null);
  const previousPath = useRef(location.pathname);
  const offscreenOutgoingRef = useRef(null);
  const offscreenIncomingRef = useRef(null);

  const pageOrder = ['/', '/about', '/media', '/courses'];

  const getPageIndex = (path) => {
    return pageOrder.indexOf(path);
  };

  const getDirection = (fromPath, toPath) => {
    const fromIndex = getPageIndex(fromPath);
    const toIndex = getPageIndex(toPath);
    return toIndex > fromIndex ? 'left' : 'right';
  };

  useEffect(() => {
    let enterTimer;
    let exitTimer;
    let prepareTimer;

    const startTransition = async () => {
      try {
        // Prepare textures offscreen
        setPreparingTextures(true);
        // Wait a tick so offscreen DOM renders
        await new Promise(r => setTimeout(r, 0));

        // capture helper: serialize DOM to SVG, then rasterize to PNG via canvas for better Chrome support
        const capture = async (el, width, height) => {
          if (!el) return null;
          try {
            console.debug('[PageTransition] capture: serializing element', el);
            const serialized = new XMLSerializer().serializeToString(el);
            const svg = `<?xml version="1.0" encoding="UTF-8"?>` +
              `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>` +
              `<foreignObject width='100%' height='100%'>${serialized}</foreignObject></svg>`;

            // Create a blob and object URL so Chrome can load it as an image
            const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.crossOrigin = 'anonymous';

            console.debug('[PageTransition] capture: loading SVG image URL', url.slice(0, 120));
            const loaded = await new Promise((resolve, reject) => {
              img.onload = () => {
                console.debug('[PageTransition] capture: image loaded');
                resolve(true);
              };
              img.onerror = (e) => {
                console.debug('[PageTransition] capture: image failed to load', e);
                reject(new Error('Failed to load SVG image'));
              };
              img.src = url;
            }).catch((err) => {
              console.debug('[PageTransition] capture: image load error', err);
              return false;
            });

            // revoke object URL early if loaded or error
            try { URL.revokeObjectURL(url); } catch (e) {}

            if (!loaded) {
              console.debug('[PageTransition] capture: image not loaded, aborting capture');
              return null;
            }

            // draw into canvas to produce a PNG data URL
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              console.debug('[PageTransition] capture: canvas context unavailable');
              return null;
            }
            try {
              ctx.drawImage(img, 0, 0, width, height);
              const png = canvas.toDataURL('image/png');
              console.debug('[PageTransition] capture: rasterized PNG length', png ? png.length : 0);
              return png;
            } catch (err) {
              console.debug('[PageTransition] capture: drawImage/toDataURL failed', err);
              return null;
            }
          } catch (err) {
            console.debug('[PageTransition] capture: unexpected error', err);
            return null;
          }
        };

        const w = window.innerWidth || 1024;
        const h = window.innerHeight || 768;

        const outEl = offscreenOutgoingRef.current;
        const inEl = offscreenIncomingRef.current;

  console.debug('[PageTransition] startTransition: capturing outgoing/incoming...');
  const t0 = performance.now();
  const outData = await capture(outEl, w, h);
  const inData = await capture(inEl, w, h);
  const t1 = performance.now();
  console.debug('[PageTransition] capture timings (ms)', { duration: t1 - t0, outgoing: !!outData, incoming: !!inData });

  setOutgoingTexture(outData);
  setIncomingTexture(inData);
  console.debug('[PageTransition] textures set', { outgoingSize: outData ? outData.length : 0, incomingSize: inData ? inData.length : 0 });
      } finally {
        setPreparingTextures(false);
        // start visual transition
        setIsTransitioning(true);
        setIncomingActive(true);
        setOutgoingActive(true);
        // Animate incoming/outgoing after a tick
        enterTimer = setTimeout(() => {
          setIncomingActive(false);
          setOutgoingActive(false);
        }, 20); // short delay to trigger transition
        // Complete transition after duration
        exitTimer = setTimeout(() => {
          setDisplayLocation(location);
          setIsTransitioning(false);
          previousPath.current = location.pathname;
          // clear textures after finished
          setOutgoingTexture(null);
          setIncomingTexture(null);
        }, transitionDuration);
      }
    };

    if (location.pathname !== displayLocation.pathname) {
      startTransition();
    }

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(prepareTimer);
    };
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
      {/* Offscreen hidden renderers used to create textures */}
      <div
        ref={offscreenOutgoingRef}
        style={{ position: 'absolute', left: -9999, top: 0, width: '100vw', height: '100vh', overflow: 'hidden', visibility: preparingTextures ? 'visible' : 'hidden', pointerEvents: 'none' }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
      <div
        ref={offscreenIncomingRef}
        style={{ position: 'absolute', left: -9999, top: 0, width: '100vw', height: '100vh', overflow: 'hidden', visibility: preparingTextures ? 'visible' : 'hidden', pointerEvents: 'none' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>

      {/* During transition, render either textured images (if available) or live components */}
      {isTransitioning ? (
        <>
          {outgoingTexture ? (
            <div style={exitingPageStyle}>
              <img src={outgoingTexture} alt="outgoing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={exitingPageStyle}>
              <Routes location={displayLocation}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/media" element={<Media />} />
                <Route path="/courses" element={<Courses />} />
              </Routes>
            </div>
          )}

          {incomingTexture ? (
            <div style={incomingPageStyle}>
              <img src={incomingTexture} alt="incoming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={incomingPageStyle}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/media" element={<Media />} />
                <Route path="/courses" element={<Courses />} />
              </Routes>
            </div>
          )}
        </>
      ) : (
        // After transition, only render the new page
        <div style={{ width: '100%', minHeight: '100vh' }}>
          <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/media" element={<Media />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default PageTransition;
