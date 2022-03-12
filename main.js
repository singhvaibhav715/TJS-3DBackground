import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  45,
  30000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.set(-900, -200, -900);

renderer.setPixelRatio = window.devicePixelRatio;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//OrbitControles ================================================================
const controles =new OrbitControls( camera, renderer.domElement );
controles.addEventListener("change",renderer)
controles.minDistance=500
controles.maxDistance=1500

//Load Texture
const textureLoader = new THREE.TextureLoader();

const texture_ft = textureLoader.load("./textures/penguins/arid_ft.jpg");
const texture_bk = textureLoader.load("./textures/penguins/arid_bk.jpg");
const texture_up = textureLoader.load("./textures/penguins/arid_up.jpg");
const texture_dn = textureLoader.load("./textures/penguins/arid_dn.jpg");
const texture_rt = textureLoader.load("./textures/penguins/arid_rt.jpg");
const texture_lf = textureLoader.load("./textures/penguins/arid_lf.jpg");

let material = [];

material.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
material.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
material.push(new THREE.MeshBasicMaterial({ map: texture_up }));
material.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
material.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
material.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

material.map((val) => {
  val.side = THREE.BackSide;
});

const skybox = new THREE.BoxBufferGeometry(10000, 10000, 10000);

const sky = new THREE.Mesh(skybox, material);
scene.add(sky);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//For Animation Objects
function animate() {
  requestAnimationFrame(animate);
  onWindowResize();
  renderer.render(scene, camera);
}

animate();
