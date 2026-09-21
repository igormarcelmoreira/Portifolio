/* ─── ASCII PORTRAIT IN 3D ────────────────────────────────────
   Every character of ascii-art.txt becomes a real glyph in 3D space.
   Its depth comes from the character's density (blurred so the relief is
   soft), and the whole portrait tilts toward the pointer.
   Falls back to the plain <pre> if WebGL / the CDN is unavailable. */

const pre = document.getElementById('hero-ascii');
const RAMP = ' .:-=+*#%@';       // low → high density
const CELL_H = 1.83;             // monospace cell height relative to its width
const RELIEF = 60;               // total depth range in cell-widths
const FAR = [0x72, 0x13, 0x0d];  // dim red (deep)
const NEAR = [0xff, 0x8a, 0x7e]; // bright coral (raised)

async function init() {
  const THREE = await import('three');

  const res = await fetch('ascii-art.txt');
  if (!res.ok) throw new Error('ascii-art.txt ' + res.status);
  const lines = (await res.text()).replace(/\r/g, '').split('\n');
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const rows = lines.length;
  const cols = Math.max(...lines.map(l => l.length));

  // density grid, then two box-blur passes for a soft relief
  let dens = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      const ch = lines[r][c] || ' ';
      const i = RAMP.indexOf(ch);
      return ch === ' ' ? 0.5 : (i < 0 ? 0.5 : i / (RAMP.length - 1));
    }));
  for (let pass = 0; pass < 2; pass++) {
    dens = dens.map((row, r) => row.map((_, c) => {
      let sum = 0, n = 0;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const v = dens[r + dr]?.[c + dc];
        if (v !== undefined) { sum += v; n++; }
      }
      return sum / n;
    }));
  }
  let lo = Infinity, hi = -Infinity;
  dens.forEach(row => row.forEach(v => { lo = Math.min(lo, v); hi = Math.max(hi, v); }));
  const norm = v => (hi > lo ? (v - lo) / (hi - lo) : 0.5);

  // one glyph texture per distinct character
  if (document.fonts?.load) await document.fonts.load('96px "JetBrains Mono"').catch(() => {});
  const glyphTexture = ch => {
    const cv = document.createElement('canvas');
    cv.width = 64; cv.height = Math.round(64 * CELL_H);
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.font = '700 104px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ch, cv.width / 2, cv.height / 2);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  };

  const chars = [...new Set(lines.join('').replace(/ /g, ''))];
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-ascii3d';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Interactive 3D ASCII portrait of Igor Marcel');
  canvas.style.aspectRatio = `${cols} / ${rows * CELL_H}`;
  pre.parentElement.insertBefore(canvas, pre);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const fov = 36;
  const camera = new THREE.PerspectiveCamera(fov, cols / (rows * CELL_H), 1, 2000);
  const world = new THREE.Group();
  scene.add(world);

  const geo = new THREE.PlaneGeometry(1, CELL_H);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  chars.forEach(ch => {
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (lines[r][c] === ch) cells.push([r, c]);
    const mat = new THREE.MeshBasicMaterial({ map: glyphTexture(ch), alphaTest: 0.12, side: THREE.DoubleSide });
    const mesh = new THREE.InstancedMesh(geo, mat, cells.length);
    cells.forEach(([r, c], i) => {
      const t = norm(dens[r][c]);
      dummy.position.set(c - cols / 2 + 0.5, -(r - rows / 2 + 0.5) * CELL_H, (t - 0.5) * RELIEF);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.setRGB(
        (FAR[0] + (NEAR[0] - FAR[0]) * t) / 255,
        (FAR[1] + (NEAR[1] - FAR[1]) * t) / 255,
        (FAR[2] + (NEAR[2] - FAR[2]) * t) / 255,
        THREE.SRGBColorSpace);
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
    world.add(mesh);
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let targetYaw = 0, targetPitch = 0, lastMove = -Infinity;
  window.addEventListener('pointermove', e => {
    targetYaw = (e.clientX / window.innerWidth - 0.5) * 2 * 0.55;
    targetPitch = (e.clientY / window.innerHeight - 0.5) * 2 * 0.3;
    lastMove = performance.now();
  }, { passive: true });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const artH = rows * CELL_H * 1.12;
    const artW = cols * 1.12;
    const tan = Math.tan(THREE.MathUtils.degToRad(fov / 2));
    const dist = Math.max(artH / 2 / tan, artW / 2 / (tan * camera.aspect));
    camera.position.set(0, 0, dist);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    let yaw = targetYaw, pitch = targetPitch;
    if (!reduceMotion && performance.now() - lastMove > 3000) {
      yaw = Math.sin(t * 0.45) * 0.32;
      pitch = Math.sin(t * 0.3) * 0.08;
    }
    world.rotation.y += (yaw - world.rotation.y) * 0.06;
    world.rotation.x += (pitch - world.rotation.x) * 0.06;
    renderer.render(scene, camera);
  }
  new IntersectionObserver(([entry]) => {
    renderer.setAnimationLoop(entry.isIntersecting ? tick : null);
  }, { threshold: 0.05 }).observe(canvas);

  pre.classList.add('is-3d'); // the flat <pre> stays only as the fallback
}

if (pre) {
  init().catch(err => {
    console.warn('3D portrait unavailable, keeping flat ASCII:', err);
    document.querySelector('.hero-ascii3d')?.remove();
  });
}
