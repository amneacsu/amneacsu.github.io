import * as THREE from 'three';

export const heroAnim = (containerElement: HTMLDivElement) => {
  let scene = new THREE.Scene();
  let camera = new THREE.Camera();
  camera.position.z = 1;

  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  containerElement.appendChild(renderer.domElement);

  let uniforms = {
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  };

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float grid(vec2 uv, float zoom, float thickness) {
        uv *= zoom;
        vec2 gv = fract(uv) - 0.5;
        vec2 id = floor(uv);

        float line = min(abs(gv.x), abs(gv.y));
        float mask = smoothstep(thickness, 0.0, line);

        float flicker = 0.6 + 0.4 * sin(u_time * 4.0 + id.x * 0.5 + id.y * 0.3);
        return mask * flicker;
      }

      float plasma(vec2 uv) {
        float val = 0.0;
        val += sin(uv.x * 10.0 + u_time * 0.5);
        val += sin((uv.x + uv.y) * 10.0 + u_time * 0.7);
        val += sin(sqrt(uv.x * uv.x + uv.y * uv.y) * 20.0 - u_time);
        return val / 3.0;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        // --- Animate zoom in/out ---
        float zoom = 1.0 + 0.03 * sin(u_time * 0.3);

        // --- Animate movement (pan) ---
        vec2 offset = vec2(
          0.05 * sin(u_time * 0.1),
          0.03 * cos(u_time * 0.07)
        );

        // --- Animate rotation ---
        float angle = 0.03 * sin(u_time * 0.15);
        float c = cos(angle);
        float s = sin(angle);
        mat2 rot = mat2(c, -s, s, c);

        // Apply all transformations
        vec2 uvTransformed = rot * (uv * zoom + offset);

        // Infinite digital grid base
        float g1 = grid(uvTransformed, 25.0, 0.02);
        float g2 = grid(uvTransformed * vec2(0.5, 1.5), 15.0, 0.01);
        float p = plasma(uvTransformed);

        vec3 baseColor = vec3(0.0, 0.03, 0.05);
        vec3 glow = vec3(0.0, 0.6, 1.0) * g1 + vec3(1.0, 0.0, 1.0) * g2;
        vec3 plasmaColor = vec3(0.1, 0.5, 0.8) * p * 0.2;

        vec3 col = baseColor + glow + plasmaColor;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
    depthWrite: false,
  });

  let mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
