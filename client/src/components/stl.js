import React, { Component } from "react";
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import model from './models/puzzle1.stl';

class STL extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );

    var controls = new OrbitControls(camera);
    controls.target.set(0, 0, 0);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    var material = new THREE.MeshNormalMaterial({ color: 0x00ffff });
    // var material = new THREE.MeshStandardMaterial({
    //   metalness: 1,   // between 0 and 1
    //   roughness: 0.5, // between 0 and 1
    //   envMap: envMap,
    // });

    var loader = new STLLoader();

    let mesh;

    var stl = loader.load(model, function (geometry) {
      mesh = new THREE.Mesh(geometry, material);

      geometry.computeBoundingBox();

      mesh.scale.x = 1;
      mesh.scale.y = 1;
      mesh.scale.z = 1;

      geometry.center()
      scene.add(mesh);

      fitCameraToObject(camera, mesh, 14);

    }, undefined, function (err) {
      console.error(err);
    });

    // var geometry = new THREE.BoxGeometry(2, 2, 2);
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    camera.position.z = 80;

    var animate = function () {
      requestAnimationFrame(animate);

      if (mesh) {
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.003;
        mesh.rotation.z += 0.003;
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

const fitCameraToObject = function (camera, object, offset, controls) {

  offset = offset || 1.25;

  const boundingBox = new THREE.Box3();

  // get bounding box of object - this will be used to setup controls and camera
  boundingBox.setFromObject(object);

  const center = boundingBox.getCenter();

  const size = boundingBox.getSize();

  // get the max side of the bounding box (fits to width OR height as needed )
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));

  cameraZ *= offset; // zoom out a little so that objects don't fill the screen

  camera.position.z = cameraZ;

  const minZ = boundingBox.min.z;
  const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

  camera.far = cameraToFarEdge * 3;
  camera.updateProjectionMatrix();

  if (controls) {

    // set camera to rotate around center of loaded object
    controls.target = center;

    // prevent camera from zooming out far enough to create far plane cutoff
    controls.maxDistance = cameraToFarEdge * 2;

    controls.saveState();

  } else {

    camera.lookAt(center)

  }
}