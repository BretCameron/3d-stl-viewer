import React, { Component } from 'react';
import ThreeEntryPoint from './threejs/ThreeEntryPoint';

export default class ThreeContainer extends Component {
  state = {};

  componentDidMount() {
    this.renderObject();
  };

  renderObject = () => {
    ThreeEntryPoint(this.scene, this.controls);
  }

  render() {
    return (
      <div>
        <div ref={element => this.controls = element} />
        <div ref={element => this.scene = element} />
      </div>
    );
  }
}