import * as THREE from 'three';

const scene = new THREE.Scene();
const aspect = 800 / 200;
const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer({ 
  antialias: true, 
});
renderer.setSize(800, 200);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Create canvas texture of text
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 200;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.font = 'bold 36px monospace';
ctx.fillText('Andrei-Marius Neacșu', 150, 80);
ctx.fillText('<amneacsu@gmail.com>', 150, 120);

const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

// Create particles based on alpha of text
const geometry = new THREE.BufferGeometry();
const positions = [];
const alphas = [];

for (let y = 0; y < canvas.height; y += 1) {
  for (let x = 0; x < canvas.width; x += 1) {
    const i = (y * canvas.width + x) * 4;
    const a = data[i + 3];
    if (a > 128) {
      positions.push(x - canvas.width / 2, canvas.height / 2 - y, 0);
      alphas.push(a / 255);
    }
  }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1));

// Shader material for smoke
const material = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  uniforms: {
    time: { value: 0.0 }
  },
  vertexShader: `
    attribute float alpha;
    uniform float time;
    varying float vAlpha;

    void main() {
      vec3 pos = position;
      pos.x += sin(time + position.y * 0.1) * 2.0;
      pos.y += cos(time + position.x * 0.1) * 2.0;
      vAlpha = alpha;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = 4.0;
    }
  `,
  fragmentShader: `
    varying float vAlpha;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      float alpha = smoothstep(0.5, 0.3, d) * vAlpha;
      gl_FragColor = vec4(vec3(1.0), alpha);
    }
  `
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animate
function animate(time) {
  requestAnimationFrame(animate);
  material.uniforms.time.value = time * 0.01;
  renderer.render(scene, camera);
}
console.log('start anim');
animate();
