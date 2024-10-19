import * as THREE from 'http://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'http://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'http://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';


const camera1 = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.set(0, 5, 20);

const scene1 = new THREE.Scene();

const backgroundTexture1 = new THREE.TextureLoader().load('../img/fondo.jpg');
scene1.background = backgroundTexture1;

const ambientLight1 = new THREE.AmbientLight(0xffffff, 1);
scene1.add(ambientLight1);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight1.position.set(10, 10, 10);
scene1.add(directionalLight1);

let bee;
const loader1 = new GLTFLoader();
loader1.load('../objetos/ram.glb', function (gltf) {
    bee = gltf.scene;

    bee.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 1.0;
            child.material.alphaTest = 0.5;
            child.material.side = THREE.DoubleSide;
        }
    });

    bee.position.set(0, 0, 0);
    bee.scale.set(0.5, 0.5, 0.5);

    bee.rotation.x = Math.PI / 8;
    bee.rotation.z = Math.PI / 8; 

    scene1.add(bee);
    console.log("Modelo Almacenamiento1 cargado correctamente");
});

const renderer1 = new THREE.WebGLRenderer({ alpha: true });
renderer1.setSize(window.innerWidth, window.innerHeight);
document.getElementById('containerRam').appendChild(renderer1.domElement);

const controls1 = new OrbitControls(camera1, renderer1.domElement);
controls1.target.set(0, 4, 0);
controls1.update();

const reRender3D1 = () => {
    requestAnimationFrame(reRender3D1);
    controls1.update();
    renderer1.render(scene1, camera1);

    if (bee) {
        bee.rotation.y += 0.001; 
    }
};
reRender3D1();

// Configuración para el segundo modelo (Ram.glb)
const camera2 = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(0, 5, 20);

const scene2 = new THREE.Scene();

const backgroundTexture2 = new THREE.TextureLoader().load('/fondo.jpg');
scene2.background = backgroundTexture2;

const ambientLight2 = new THREE.AmbientLight(0xffffff, 1);
scene2.add(ambientLight2);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight2.position.set(10, 10, 10);
scene2.add(directionalLight2);

let ram;
const loader2 = new GLTFLoader();
loader2.load('./objetos/ram.glb', function (gltf) {
    ram = gltf.scene;

    ram.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 1.0;
            child.material.alphaTest = 0.5;
            child.material.side = THREE.DoubleSide;
        }
    });

    ram.position.set(0, 0, 0);
    ram.scale.set(0.5, 0.5, 0.5);

    ram.rotation.x = Math.PI / 8;
    ram.rotation.z = Math.PI / 8; 

    scene2.add(ram);
    console.log("Modelo Ram cargado correctamente");
});

const renderer2 = new THREE.WebGLRenderer({ alpha: true });
renderer2.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container2_3D').appendChild(renderer2.domElement);

const controls2 = new OrbitControls(camera2, renderer2.domElement);
controls2.target.set(0, 4, 0);
controls2.update();

const reRender3D2 = () => {
    requestAnimationFrame(reRender3D2);
    controls2.update();
    renderer2.render(scene2, camera2);

    if (ram) {
        ram.rotation.y += 0.001; 
    }
};
reRender3D2();

window.addEventListener('resize', () => {

    renderer1.setSize(window.innerWidth / 2, window.innerHeight);
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();

    renderer2.setSize(window.innerWidth / 2, window.innerHeight);
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
});
