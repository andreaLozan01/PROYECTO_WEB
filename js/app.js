import * as THREE from 'http://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'http://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'http://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

// Configuración para el modelo (ram.glb)
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

const scene = new THREE.Scene();

const backgroundTexture = new THREE.TextureLoader().load('../img/fondo.jpg');
scene.background = backgroundTexture;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

let ram;
const loader = new GLTFLoader();
loader.load('../objetos/ram.glb', function (gltf) {
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

    scene.add(ram);
    console.log("Modelo ram cargado correctamente");
});

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('containerRam').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 4, 0);
controls.update();

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    controls.update();
    renderer.render(scene, camera);

    if (ram) {
        ram.rotation.y += 0.001; 
    }
};
reRender3D();

// Ajustar la cámara y el renderizador cuando se redimensione la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
