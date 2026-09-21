/* ─── 3D APP SHOWCASE ─────────────────────────────────────────
   Six app icons as physical tiles: drag to orbit, hover to identify.
   Three.js is loaded through the import map in index.html; if WebGL or
   the CDN is unavailable the whole panel hides itself. */

const panel = document.getElementById('apps3d');
const canvas = document.getElementById('apps3d-canvas');
const stage = canvas && canvas.parentElement;
const label = document.getElementById('apps3d-label');

const APPS = [
  { src: 'icons/chamar-192.webp',       name: 'CHAMAR 192' },
  { src: 'icons/true-saph-movel.png',   name: 'SAPH Móvel' },
  { src: 'icons/true-pcr.webp',         name: 'TRUE PCR' },
  { src: 'icons/true-checklist.webp',   name: 'TRUE Checklist' },
  { src: 'icons/true-saph-gestao.webp', name: 'TRUE SAPH Gestão' },
  { src: 'icons/sos-unimed-poa.webp',   name: 'Unimed POA Chamar SOS' },
];

async function init() {
  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);

  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0xff4438, 70, 22);
  rim.position.set(-5, -1, 3);
  scene.add(rim);

  // tile geometry: a rounded-rect slab; RADIUS is the outer corner radius.
  // (RoundedBoxGeometry can't be used: it caps the radius at half the thickness.)
  const SIZE = 1.5, RADIUS = 0.46, DEPTH = 0.16, BEVEL = 0.03, INSET = 0.07;
  const FACE = SIZE - INSET * 2;
  const FACE_RADIUS = RADIUS - INSET;

  // rounded-corner alpha mask so each flat icon reads as an app tile
  const mask = document.createElement('canvas');
  mask.width = mask.height = 256;
  const mctx = mask.getContext('2d');
  mctx.fillStyle = '#000';
  mctx.fillRect(0, 0, 256, 256);
  mctx.fillStyle = '#fff';
  mctx.beginPath();
  mctx.roundRect(0, 0, 256, 256, (FACE_RADIUS / FACE) * 256);
  mctx.fill();
  const alphaMap = new THREE.CanvasTexture(mask);

  const loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const h = SIZE / 2;
  const outline = new THREE.Shape();
  outline.moveTo(-h + RADIUS, -h);
  outline.lineTo(h - RADIUS, -h);
  outline.absarc(h - RADIUS, -h + RADIUS, RADIUS, -Math.PI / 2, 0);
  outline.lineTo(h, h - RADIUS);
  outline.absarc(h - RADIUS, h - RADIUS, RADIUS, 0, Math.PI / 2);
  outline.lineTo(-h + RADIUS, h);
  outline.absarc(-h + RADIUS, h - RADIUS, RADIUS, Math.PI / 2, Math.PI);
  outline.lineTo(-h, -h + RADIUS);
  outline.absarc(-h + RADIUS, -h + RADIUS, RADIUS, Math.PI, Math.PI * 1.5);
  const bodyGeo = new THREE.ExtrudeGeometry(outline, {
    depth: DEPTH, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: 0, bevelSegments: 3, curveSegments: 24,
  });
  bodyGeo.translate(0, 0, -DEPTH / 2);
  const surfaceZ = DEPTH / 2 + BEVEL + 0.002;
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, metalness: 0.55, roughness: 0.32 });
  const faceGeo = new THREE.PlaneGeometry(FACE, FACE);

  const group = new THREE.Group();
  scene.add(group);
  const tiles = [];

  const textures = await Promise.all(APPS.map(app => new Promise((resolve, reject) => {
    loader.load(app.src, tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso;
      resolve(tex);
    }, undefined, reject);
  })));

  APPS.forEach((app, i) => {
    const tile = new THREE.Group();
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    const faceMat = new THREE.MeshBasicMaterial({ map: textures[i], alphaMap, alphaTest: 0.5 });
    const front = new THREE.Mesh(faceGeo, faceMat);
    front.position.z = surfaceZ;
    const back = new THREE.Mesh(faceGeo, faceMat);
    back.position.z = -surfaceZ;
    back.rotation.y = Math.PI;
    tile.add(body, front, back);

    const col = i % 3;
    const row = Math.floor(i / 3);
    tile.position.set((col - 1) * 1.95, (0.5 - row) * 1.95, 0);
    tile.userData = { name: app.name, phase: i * 1.3, base: tile.position.clone(), scale: 1, targetScale: 1 };
    body.userData.tile = tile;
    group.add(tile);
    tiles.push(tile);
  });

  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.8;
  controls.minPolarAngle = Math.PI / 2 - 0.55;
  controls.maxPolarAngle = Math.PI / 2 + 0.55;
  canvas.style.touchAction = 'pan-y'; // keep vertical page scroll on touch

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dist = Math.max(6.6, 3.3 / (tanHalf * camera.aspect));
    camera.position.set(0, 0.6, dist).setLength(dist);
    camera.updateProjectionMatrix();
    controls.update();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  // hover: raycast the tile bodies, enlarge the hit tile, show its name
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  let dragging = false;
  const bodies = tiles.map(t => t.children[0]);

  function setHover(tile, x, y) {
    if (hovered && hovered !== tile) hovered.userData.targetScale = 1;
    hovered = tile;
    if (tile) {
      tile.userData.targetScale = 1.14;
      label.textContent = tile.userData.name;
      label.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
      label.hidden = false;
      canvas.style.cursor = dragging ? 'grabbing' : 'pointer';
    } else {
      label.hidden = true;
      canvas.style.cursor = '';
    }
  }

  canvas.addEventListener('pointermove', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointer.set((x / rect.width) * 2 - 1, -(y / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(bodies, false)[0];
    setHover(hit ? hit.object.userData.tile : null, x, y);
  });
  canvas.addEventListener('pointerleave', () => setHover(null));
  canvas.addEventListener('pointerdown', () => { dragging = true; });
  window.addEventListener('pointerup', () => { dragging = false; });

  // only spend GPU time while the panel is on screen
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    tiles.forEach(tile => {
      const d = tile.userData;
      d.scale += (d.targetScale - d.scale) * 0.14;
      tile.scale.setScalar(d.scale);
      if (!reduceMotion) {
        tile.position.y = d.base.y + Math.sin(t * 0.9 + d.phase) * 0.07;
        tile.rotation.x = Math.sin(t * 0.6 + d.phase) * 0.05;
        tile.rotation.z = Math.cos(t * 0.5 + d.phase) * 0.03;
      }
    });
    if (!reduceMotion && !dragging) group.rotation.y = Math.sin(t * 0.35) * 0.18;
    controls.update();
    renderer.render(scene, camera);
  }
  new IntersectionObserver(([entry]) => {
    renderer.setAnimationLoop(entry.isIntersecting ? tick : null);
  }, { threshold: 0.05 }).observe(stage);

  canvas.classList.add('is-ready');
}

if (panel && canvas) {
  init().catch(err => {
    console.warn('3D showcase unavailable:', err);
    panel.classList.add('is-unavailable');
  });
}
