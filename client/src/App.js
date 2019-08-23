import React from 'react';
import STL from './components/stl';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'fixed', zIndex: '99', top: 0, left: 0, padding: '10px', marginBottom: '-8rem' }}>
          STL File Reader
          <br />
          <button>Rotate</button>
          <button>Pause</button>
        </div>
        <STL />
      </header>
    </div>
  );
}

export default App;
