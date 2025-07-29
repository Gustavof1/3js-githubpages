import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/controls/PointerLockControls.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222233);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Carregar modelo GLB
const loader = new GLTFLoader();
loader.load('HellLand.glb', (gltf) => {
    scene.add(gltf.scene);
}, undefined, (error) => {
    console.error('Erro ao carregar GLB:', error);
});

// Controles PointerLock (WASD + mouse)
const controls = new PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

const instructions = document.createElement('div');
instructions.style.position = 'absolute';
instructions.style.top = '20px';
instructions.style.left = '50%';
instructions.style.transform = 'translateX(-50%)';
instructions.style.color = '#fff';
instructions.style.background = 'rgba(0,0,0,0.5)';
instructions.style.padding = '10px 20px';
instructions.style.borderRadius = '8px';
instructions.style.fontFamily = 'sans-serif';
instructions.innerHTML = 'Clique para ativar o controle. Use WASD para mover e o mouse para olhar ao redor.';
document.body.appendChild(instructions);

instructions.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    instructions.style.display = 'none';
});
controls.addEventListener('unlock', () => {
    instructions.style.display = '';
});

// Movimento WASD
const move = { forward: false, backward: false, left: false, right: false };
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 5.0;

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW': move.forward = true; break;
        case 'KeyA': move.left = true; break;
        case 'KeyS': move.backward = true; break;
        case 'KeyD': move.right = true; break;
    }
}
function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW': move.forward = false; break;
        case 'KeyA': move.left = false; break;
        case 'KeyS': move.backward = false; break;
        case 'KeyD': move.right = false; break;
    }
}
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let prevTime = performance.now();
function animate() {
    requestAnimationFrame(animate);
    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number(move.forward) - Number(move.backward);
    direction.x = Number(move.right) - Number(move.left);
    direction.normalize();

    if (move.forward || move.backward) velocity.z -= direction.z * speed * delta;
    if (move.left || move.right) velocity.x -= direction.x * speed * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    prevTime = time;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object

// const loader2 = new GLTFLoader();//funciona

loader2.load('HellLand.glb', function(gltf){
  scene.add(gltf.scene);
});



// Sizes
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

// Renderer gets updated each time window is resized
window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
})
