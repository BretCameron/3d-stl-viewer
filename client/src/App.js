import React, { Component } from 'react';
import STL from './components/stl';
import './App.css';

class App extends Component {
  state = {
    rotate: false,
  };

  toggleRotate = () => {
    const { rotate } = this.state;
    this.setState({ rotate: !rotate });
  }

  render() {
    const { rotate } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ display: 'fixed', zIndex: '99', top: 0, left: 0, padding: '10px', marginBottom: '-8rem' }}>
            STL File Reader
          <br />
            <button onClick={this.toggleRotate}>Rotate</button>
          </div>
          <STL rotate={rotate} />
        </header>
      </div>
    );
  }
}

export default App;
