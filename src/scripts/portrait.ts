/* ASCII portrait in 3D.
   Every character of /ascii-art.txt becomes an instanced glyph; its depth comes from the
   (blurred) character density, and the portrait tilts toward the pointer. The flat <pre>
   stays as the fallback when WebGL is unavailable. */

const RAMP = ' .:-=+*#%@';          // low → high density; space is the background
const CELL_H = 1.83;                // monospace cell height relative to its width
const RELIEF = 60;                  // depth range in cell widths
const FAR = [0xb0, 0x1b, 0x15];     // deep glyphs fade toward a lighter red than the field
const NEAR = [0x00, 0x00, 0x00];    // raised glyphs are pure black

export async function initPortrait(reduce: boolean): Promise<void> {
  const pre = document.getElementById('hero-ascii');
  if (!pre) return;

  const res = await fetch('/ascii-art.txt');
  if (!res.ok) return;
  const text = await res.text();
  pre.textContent = text; // fallback content

  try {
    await build(pre, text, reduce);
  } catch (err) {
    console.warn('3D portrait unavailable, keeping flat ASCII:', err);
    document.querySelector('.hero__canvas')?.remove();
    pre.classList.remove('is-3d');
  }
}

async function build(pre: HTMLElement, text: string, reduce: boolean) {
  const THREE = await import('three');

  // phones render the portrait ~350px wide: every other row/column is plenty
  const step = window.innerWidth < 900 ? 2 : 1;
  const raw = text.replace(/\r/g, '').split('\n');
  while (raw.length && !raw[raw.length - 1].trim()) raw.pop();
  const lines = raw
    .filter((_, r) => r % step === 0)
    .map((l) => (step === 1 ? l : [...l].filter((_, c) => c % step === 0).join('')));
  const rows = lines.length;
  const cols = Math.max(...lines.map((l) => l.length));
  const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r(null)));

  let dens = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      const i = RAMP.indexOf(lines[r][c] ?? ' ');
      return i < 0 ? 0.5 : i / (RAMP.length - 1);
    }),
  );
  for (let pass = 0; pass < 2; pass++) {
    const src = dens;
    dens = src.map((row, r) =>
      row.map((_, c) => {
        let sum = 0, n = 0;
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
          const v = src[r + dr]?.[c + dc];
          if (v !== undefined) { sum += v; n++; }
        }
        return sum / n;
      }),
    );
  }
  await nextFrame();
  let lo = Infinity, hi = -Infinity;
  dens.forEach((row) => row.forEach((v) => { lo = Math.min(lo, v); hi = Math.max(hi, v); }));
  const norm = (v: number) => (hi > lo ? (v - lo) / (hi - lo) : 0.5);

  await document.fonts.load('700 96px "JetBrains Mono"').catch(() => {});
  const glyph = (ch: string) => {
    const cv = document.createElement('canvas');
    cv.width = 64;
    cv.height = Math.round(64 * CELL_H);
    const ctx = cv.getContext('2d')!;
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

  const canvas = document.createElement('canvas');
  canvas.className = 'hero__canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Interactive 3D ASCII portrait of Igor Marcel');
  canvas.style.aspectRatio = `${cols} / ${rows * CELL_H}`;
  pre.parentElement!.insertBefore(canvas, pre);

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
  const chars = [...new Set(lines.join('').replace(/ /g, ''))];
  for (const ch of chars) {
    const cells: [number, number][] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (lines[r][c] === ch) cells.push([r, c]);
    const mat = new THREE.MeshBasicMaterial({ map: glyph(ch), alphaTest: 0.12, side: THREE.DoubleSide });
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
        THREE.SRGBColorSpace,
      );
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    world.add(mesh);
    await nextFrame();
  }

  let targetYaw = 0, targetPitch = 0, lastMove = -Infinity;
  let gyro = false; // once the device's tilt drives the portrait, touch and idle sway step aside
  window.addEventListener(
    'pointermove',
    (e) => {
      if (gyro && e.pointerType !== 'mouse') return;
      targetYaw = (e.clientX / window.innerWidth - 0.5) * 2 * 0.55;
      targetPitch = (e.clientY / window.innerHeight - 0.5) * 2 * 0.3;
      lastMove = performance.now();
    },
    { passive: true },
  );
  // touch: once the finger lifts (or the touch turns into a page scroll), ease back to rest
  const release = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || gyro) return;
    targetYaw = 0;
    targetPitch = 0;
    lastMove = performance.now();
  };
  window.addEventListener('pointerup', release, { passive: true });
  window.addEventListener('pointercancel', release, { passive: true });

  if (!reduce && matchMedia('(pointer: coarse)').matches && 'DeviceOrientationEvent' in window) followDeviceTilt();

  // phones: the portrait follows how the device is tilted. The first reading is "straight",
  // and that neutral slowly drifts toward the current grip so it re-centres on its own.
  function followDeviceTilt() {
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    let x0: number | null = null, y0 = 0;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return; // no sensor
      const angle = screen.orientation?.angle ?? 0;
      let x = e.gamma, y = e.beta; // portrait
      if (angle === 90) { x = e.beta; y = -e.gamma; }
      else if (angle === 270 || angle === -90) { x = -e.beta; y = e.gamma; }
      if (x0 === null) { x0 = x; y0 = y; }
      x0 += (x - x0) * 0.008;
      y0 += (y - y0) * 0.008;
      gyro = true;
      targetYaw = clamp((x - x0) / 25) * 0.55;
      targetPitch = clamp((y - y0) / 25) * 0.3;
      lastMove = performance.now();
    };
    window.addEventListener('deviceorientation', onTilt, { passive: true });

    // Android sends readings right away. iOS stays silent until a tap + system prompt, so only
    // when nothing has arrived after a second (and the permission API exists) offer the button.
    const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<PermissionState> };
    if (typeof DOE.requestPermission !== 'function') return;
    setTimeout(() => {
      if (gyro) return;
      const btn = document.querySelector<HTMLButtonElement>('[data-tilt]');
      if (!btn) return;
      btn.hidden = false;
      // the button or a tap on the portrait itself: either counts as the gesture iOS wants
      const portrait = canvas.closest('.hero__portrait');
      let asked = false;
      const ask = async () => {
        if (asked) return;
        asked = true;
        portrait?.removeEventListener('click', ask);
        try { await DOE.requestPermission!(); } catch {}
        btn.hidden = true; // the listener above is already attached; readings start once granted
      };
      btn.addEventListener('click', ask);
      portrait?.addEventListener('click', ask);
    }, 1000);
  }

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const tan = Math.tan(THREE.MathUtils.degToRad(fov / 2));
    const dist = Math.max((rows * CELL_H * 1.08) / 2 / tan, (cols * 1.08) / 2 / (tan * camera.aspect));
    camera.position.set(0, 0, dist);
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  const start = performance.now();
  const tick = () => {
    const t = (performance.now() - start) / 1000;
    let yaw = targetYaw, pitch = targetPitch;
    if (!reduce && !gyro && performance.now() - lastMove > 3000) {
      yaw = Math.sin(t * 0.45) * 0.32;
      pitch = Math.sin(t * 0.3) * 0.08;
    }
    world.rotation.y += (yaw - world.rotation.y) * 0.06;
    world.rotation.x += (pitch - world.rotation.x) * 0.06;
    renderer.render(scene, camera);
  };
  new IntersectionObserver(([entry]) => renderer.setAnimationLoop(entry.isIntersecting ? tick : null), { threshold: 0.02 }).observe(canvas);

  pre.classList.add('is-3d');
}
