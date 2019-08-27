import React, { Component } from 'react';
// import STL from './components/stl';
import './App.css';
import ThreeContainer from './components/ThreeContainer';

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
        <header className="App-header" style={{ overflow: 'hidden' }}>
          {/* <div style={{ display: 'fixed', zIndex: '99', top: 0, left: 0, padding: '10px', marginBottom: '-240px' }}>
            <img src={logo} alt="logo" style={{ padding: '15px' }} />STL Viewer
          <br /><br />
            <button style={{ cursor: 'pointer', background: 'none', border: 'none' }} onClick={this.toggleRotate}>
              {this.state.rotate ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" fill="#ffffffcc" /></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z" fill="#ffffffcc" /></svg>
              }
            </button>
          </div> */}
          <ThreeContainer move={rotate} />
          {/* <STL rotate={rotate} /> */}
        </header>
      </div>
    );
  }
}

export default App;
