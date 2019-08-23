import React, { Component } from "react";
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import model from './models/puzzle2.stl';

class STL extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    var material = new THREE.MeshNormalMaterial({ color: 0x00ffff });

    var loader = new STLLoader();

    let mesh;

    var stl = loader.load(model, function (geometry) {
      mesh = new THREE.Mesh(geometry, material);

      mesh.scale.set(1, 1, 1);
      const vector = new THREE.Vector3();
      const boundingBox = new THREE.Box3().setFromObject(mesh);
      boundingBox.getCenter(vector);
      boundingBox.center(mesh.position);
      camera.lookAt(vector);
      boundingBox.center();
      scene.add(mesh);

    }, undefined, function (err) {
      console.error(err);
    });

    // var geometry = new THREE.BoxGeometry(2, 2, 2);
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    camera.position.z = 100;

    var animate = function () {
      requestAnimationFrame(animate);

      if (mesh) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

export default STL;