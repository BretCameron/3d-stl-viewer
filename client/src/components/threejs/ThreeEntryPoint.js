import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import model from '../models/knot2.stl';

export default function ThreeEntryPoint(sceneRef, controlsRef) {

  var controlsNode = document.createElement("div");
  controlsNode.innerHTML = `<button id="play-btn">Play</button>`

  let isPlay = true;

  controlsRef.appendChild(controlsNode);


  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x282c34);

  var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 100);

  var controls = new OrbitControls(camera, sceneRef);
  controls.target.set(0, 0, 0);
  controls.enableKeys = false;
  controls.rotateSpeed = 0.5;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    RIGHT: THREE.MOUSE.ROTATE
  }
  controls.update();


  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  var frontSpot = new THREE.SpotLight(0xeeeece);
  frontSpot.position.set(1000, 1000, 1000);
  scene.add(frontSpot);

  var frontSpot2 = new THREE.SpotLight(0xddddce);
  frontSpot2.position.set(500, -500, -500);
  scene.add(frontSpot2);

  var materials = {
    lambert: new THREE.MeshLambertMaterial({
      color: 0x9a9a9a,
      emissive: 0x474747,
    }),
    metal: new THREE.MeshStandardMaterial({
      color: 0xefefef,
      emissive: 0x222222,
      metalness: 0.85,
      roughness: 0.45,
    }),
  }

  var material = materials.metal;

  var loader = new STLLoader();

  let mesh;

  loader.load(model, function (geometry) {
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

  camera.position.z = 80;

  var animate = function () {

    requestAnimationFrame(animate);

    if (mesh) {
      isPlay ? play(mesh) : pause(mesh);
    }

    renderer.render(scene, camera);
  };

  animate();

  const fitCameraToObject = function (camera, object, offset, controls) {

    offset = offset || 1.25;

    const boundingBox = new THREE.Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject(object);

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    boundingBox.getCenter(center);
    boundingBox.getSize(size);

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

  sceneRef.appendChild(renderer.domElement);

  if (document.getElementById('play-btn')) {
    document.getElementById('play-btn').addEventListener('click', () => {
      isPlay = !isPlay;
      console.log('click')
    });
  }

}


function play(mesh) {
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.003;
  mesh.rotation.z += 0.003;
}

function pause(mesh) {
  mesh.rotation.x += 0;
  mesh.rotation.y += 0;
  mesh.rotation.z += 0;
}