import React from 'react';
import Navigation from './components/Navigation';
import PageTransition from './components/PageTransition';
import './App.css'

function App() {
  return (
    <div className="App">
      <Navigation transitionDuration={1000} />
      <main>
        <PageTransition transitionDuration={1000} />
      </main>
    </div>
  )
}

export default App
