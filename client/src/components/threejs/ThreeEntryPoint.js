import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import model from '../models/knot2.stl';

export default function ThreeEntryPoint(sceneRef, controlsRef) {

  let state = {
    isPlay: true,
    initialCamera: null,
  };

  // Controls Bar

  let controlsBar = document.createElement("div");
  controlsBar.style.padding = "12px 0 10px 0";
  controlsBar.style.borderBottom = "1px solid grey";
  controlsBar.style.background = "#00003399";
  controlsBar.style.position = "fixed";
  controlsBar.style.top = "0";
  controlsBar.style.left = "0";
  controlsBar.style.width = "100%";


  // Play Button

  let playIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  playIcon.setAttribute("id", "play-btn");
  playIcon.setAttribute("width", "24");
  playIcon.setAttribute("height", "24");
  playIcon.setAttribute("viewBox", "0 0 24 24");
  playIcon.setAttribute("tabindex", "0");
  playIcon.setAttribute("type", "button");
  playIcon.style.cursor = "pointer";
  playIcon.style.padding = "15px";

  let playTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
  playTitle.innerHTML = 'Pause';
  playIcon.appendChild(playTitle);

  let playPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  playPath.setAttributeNS(null, "d", "M3 22v-20l18 10-18 10z");
  playPath.setAttributeNS(null, "fill", "#ffffffcc");

  let pausePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pausePath.setAttributeNS(null, "d", "M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z");
  pausePath.setAttributeNS(null, "fill", "#ffffffcc");

  // Reset Button

  let resetIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  resetIcon.setAttribute("id", "reset-btn");
  resetIcon.setAttribute("width", "24");
  resetIcon.setAttribute("height", "24");
  resetIcon.setAttribute("viewBox", "0 0 24 24");
  resetIcon.setAttribute("tabindex", "0");
  resetIcon.setAttribute("type", "button");
  resetIcon.style.cursor = "pointer";
  resetIcon.style.padding = "15px";
  resetIcon.title = "Play";

  let resetTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
  resetTitle.innerHTML = 'Reset';
  resetIcon.appendChild(resetTitle);

  let resetPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  resetPath.setAttributeNS(null, "d", "M2.458 9.012c-.297.947-.458 1.955-.458 3 0 5.52 4.481 10 10 10 5.52 0 10-4.48 10-10 0-5.519-4.48-10-10-10-2.121 0-4.083.668-5.703 1.796l1.703 2.204h-6.58l1.935-6.012 1.718 2.223c1.958-1.389 4.346-2.211 6.927-2.211 6.623 0 12 5.377 12 12s-5.377 11.988-12 11.988-12-5.365-12-11.988c0-1.036.132-2.041.379-3h2.079zm10.35-3.012c.292.821.375 1.346 1.01 1.609.637.264 1.073-.052 1.854-.423l1.142 1.142c-.373.787-.687 1.218-.423 1.854.262.634.784.716 1.609 1.009v1.617c-.816.29-1.347.375-1.61 1.01-.264.636.052 1.071.424 1.853l-1.142 1.142c-.79-.375-1.219-.687-1.85-.424-.639.265-.723.793-1.014 1.611h-1.616c-.292-.821-.375-1.347-1.01-1.61-.637-.264-1.072.052-1.854.423l-1.142-1.142c.366-.771.689-1.212.423-1.854-.263-.635-.793-.719-1.609-1.009v-1.617c.817-.29 1.346-.373 1.609-1.009.264-.637-.051-1.07-.423-1.854l1.142-1.142c.788.374 1.218.687 1.854.423.635-.263.719-.792 1.01-1.609h1.616zm-.808 8c-1.105 0-2-.896-2-2 0-1.105.895-2.001 2-2.001 1.104 0 2 .896 2 2.001 0 1.104-.896 2-2 2z");
  resetPath.setAttributeNS(null, "fill-rule", "evenodd");
  resetPath.setAttributeNS(null, "clip-rule", "evenodd");
  resetPath.setAttributeNS(null, "fill", "#ffffffcc");

  playIcon.appendChild(pausePath);
  controlsBar.appendChild(playIcon);

  resetIcon.appendChild(resetPath);
  controlsBar.appendChild(resetIcon);

  controlsRef.appendChild(controlsBar);


  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x282c34);

  let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 100);

  let controls = new OrbitControls(camera, sceneRef);
  controls.target.set(0, 0, 0);
  controls.enableKeys = false;
  controls.rotateSpeed = 0.5;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    RIGHT: THREE.MOUSE.ROTATE
  }
  controls.update();


  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  let frontSpot = new THREE.SpotLight(0xeeeece);
  frontSpot.position.set(1000, 1000, 1000);
  scene.add(frontSpot);

  let frontSpot2 = new THREE.SpotLight(0xddddce);
  frontSpot2.position.set(500, -500, -500);
  scene.add(frontSpot2);

  let materials = {
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

  let material = materials.metal;

  let loader = new STLLoader();

  let mesh;

  loader.load(model, function (geometry) {
    mesh = new THREE.Mesh(geometry, material);

    geometry.computeBoundingBox();

    mesh.scale.x = 1;
    mesh.scale.y = 1;
    mesh.scale.z = 1;

    geometry.center()
    scene.add(mesh);

    fitCameraToObject(camera, mesh, 14, null, state);

  }, undefined, function (err) {
    console.error(err);
  });

  camera.position.z = 80;

  let animate = function () {

    requestAnimationFrame(animate);

    if (mesh) {
      state.isPlay ? play(mesh) : pause(mesh);
    }

    renderer.render(scene, camera);
  };

  animate();

  const fitCameraToObject = function (camera, object, offset, controls, state) {

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

    if (!state.initialCamera) {
      console.log('don');
      state.initialCamera = camera.clone();
    };

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


  // On click play button

  function addEventsListeners(query, eventListeners, callback) {
    eventListeners.forEach(event => {
      document.querySelector(query).addEventListener(event, callback);
    })
  }

  addEventsListeners('#play-btn', ['click', 'keydown'], (e) => {
    if (e.charCode !== 9 && e.keyCode !== 9) {
      if (state.isPlay) {
        playIcon.innerHTML = '';
        playTitle.innerHTML = 'Play';
        playIcon.appendChild(playTitle);
        playIcon.appendChild(playPath);
      } else {
        playIcon.innerHTML = '';
        playTitle.innerHTML = 'Pause';
        playIcon.appendChild(playTitle);
        playIcon.appendChild(pausePath);
      };
      state.isPlay = !state.isPlay;
    }
  });

  addEventsListeners('#reset-btn', ['click', 'keydown'], (e) => {
    if (e.charCode !== 9 && e.keyCode !== 9) {
      state.isPlay = false;
      reset(mesh);
      playIcon.innerHTML = '';
      playIcon.appendChild(playPath);
      resetCameraMatrix(camera, state.initialCamera)
    }
  });

}


function play(mesh, speed = 1) {
  mesh.rotation.x += 0.003 * speed;
  mesh.rotation.y += 0.003 * speed;
  mesh.rotation.z += 0.003 * speed;
}

function pause(mesh) {
  mesh.rotation.x += 0;
  mesh.rotation.y += 0;
  mesh.rotation.z += 0;
}

function reset(mesh) {
  mesh.rotation.x = 0;
  mesh.rotation.y = 0;
  mesh.rotation.z = 0;
}

function resetCameraMatrix(camera, initialCamera) {
  camera.copy(initialCamera);
}