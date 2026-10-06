// v8 — the conductor. Maps scroll to a five-act flight:
//   portrait → dive into the eye → tunnel ride → through the sun → the vault
// and keeps every screen size, from a phone held upright to a wide desktop, composed.
import * as THREE from 'three';
import Lenis from 'lenis';
import { TUN, pathPos, pathBank } from './path.js';
import { TIERS, detectDevice, AdaptiveQuality } from './quality.js';
import { mulberry32, buildMain, buildLaptop } from './build-data.js';
import { createMainSystem, createLaptop, createOccluder } from './particles.js';
import { Sky } from './sky.js';
import { Solar } from './solar.js';
import { TunnelFX } from './fx.js';
import { Iris } from './iris.js';
import { Post } from './post.js';
import { Sound } from './audio.js';
import { computeLayout } from './layout.js';
import { PORTRAIT } from './portrait-meta.js';

THREE.ColorManagement.enabled = false;

const Q = new URLSearchParams(location.search);
const SHOT = Q.has('shot') && !Q.has('live');
const LIVE = Q.has('shot') && Q.has('live');
const EMBED = Q.has('embed'); // running inside devices.html
const device = detectDevice();
const REDUCED = device.reducedMotion;
const S0 = 2.3, REF_COUNT = 165000, K_SIZE = 0.24, L = TUN.L;

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const seg = (x, a, b) => clamp01((x - a) / (b - a));
const sm = (a, b, x) => { const t = seg(x, a, b); return t * t * (3 - 2 * t); };
const ease = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;
const $ = (id) => document.getElementById(id);

// ---------- renderer ----------
const canvas = $('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setClearColor(0x04060c, 1);
const gl = renderer.getContext();
const hdrType = gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float') ? THREE.HalfFloatType : THREE.UnsignedByteType;
const maxPointHW = (gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) || [1, 64])[1];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 1200);
const R = mulberry32(2026);
let tier = TIERS[device.start];
const sampleTier = TIERS[device.sample];

// ---------- world anchors ----------
const eye = new THREE.Vector3(PORTRAIT.eye[0] * S0, PORTRAIT.eye[1] * S0, -0.1);
const sunPos = eye.clone().add(new THREE.Vector3(0, 0, -(L + TUN.sunGap)));
const vaultCenter = eye.clone().add(new THREE.Vector3(0, 0, -(L + TUN.sunGap + TUN.vaultGap)));

// ---------- always-on layers (render behind the loading gate) ----------
const sky = new Sky(renderer, sampleTier, hdrType, R);
sky.addTo(scene);
sky.setDust(tier.dust);
const solar = new Solar(R);
scene.add(solar.group);
const fx = new TunnelFX(R, sampleTier.glyphs, eye);
fx.addTo(scene);
fx.setGlyphs(tier.glyphs);
const iris = new Iris(R, Math.round(sampleTier.count / 11));
scene.add(iris.points);
const post = new Post(renderer, hdrType);
post.u.uTaps.value = REDUCED ? 0 : tier.zoomTaps;
post.u.uGrain.value = device.coarse ? 0.028 : 0.035;
const sound = new Sound();
// the device lab passes the safe-area insets a real phone would report
if (EMBED && Q.get('safe')) Q.get('safe').split(',').forEach((v, i) => document.documentElement.style.setProperty(['--safe-t', '--safe-r', '--safe-b', '--safe-l'][i], (+v || 0) + 'px'));

let mainSys = null, laptopSys = null, occluder = null;

// ---------- sizing: stable on iOS (ignore the address bar sliding in and out) ----------
const lvh = $('lvh');
const heroEl = $('hero');
let W = 0, H = 0, dpr = 1, layout = null, dprCap = +Q.get('dpr') || 9;
function resize(force) {
  const w = innerWidth, h = Math.max(innerHeight, lvh.getBoundingClientRect().height || 0);
  if (!force && w === W && Math.abs(h - H) < 140) return;
  W = w; H = h;
  document.documentElement.style.setProperty('--vhs', innerHeight + 'px');
  dpr = Math.min(window.devicePixelRatio || 1, tier.dpr, dprCap);
  renderer.setPixelRatio(dpr);
  renderer.setSize(W, H, false);
  post.setSize(Math.round(W * dpr), Math.round(H * dpr), tier.bloom);
  camera.aspect = W / H;
  const eb = heroEl.querySelector('.eyebrow').getBoundingClientRect(), hb = document.querySelector('.chrome').getBoundingClientRect();
  layout = computeLayout(W, H, S0, vaultCenter, { textTop: eb.top - (parseFloat(heroEl.style.transform.split(',')[1]) || 0), headerBottom: hb.bottom + 8 });
  if (laptopSys) placeLaptop();
}
addEventListener('resize', () => resize(false));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => resize(true));
addEventListener('orientationchange', () => setTimeout(() => resize(true), 250));
resize(true);

function placeLaptop() {
  const l = layout.laptop;
  laptopSys.group.position.copy(l.pos);
  laptopSys.group.rotation.copy(l.rot);
  laptopSys.group.scale.setScalar(l.scale);
}

function applyTier(t) {
  tier = t;
  if (mainSys) { const n = Math.min(mainSys.total, t.count); mainSys.geometry.setDrawRange(0, n); mainSys.uniforms.uSizeK.value = Math.sqrt(REF_COUNT / n); }
  if (laptopSys) { const n = Math.min(laptopSys.total, t.laptop); laptopSys.geometry.setDrawRange(0, n); laptopSys.uniforms.uSizeK.value = Math.sqrt(26000 / n); }
  sky.setDust(Math.min(t.dust, sampleTier.dust));
  fx.setGlyphs(Math.min(t.glyphs, sampleTier.glyphs));
  post.u.uTaps.value = REDUCED ? 0 : t.zoomTaps;
  resize(true);
  $('q').textContent = t.name; if (Q.has('debug')) $('q').hidden = false;
}
const aq = new AdaptiveQuality(device, applyTier);

// ---------- smooth scroll on desktop; native momentum on touch ----------
let lenis = null;
if (!device.coarse && !REDUCED && !SHOT && !EMBED) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.stop();
}

// ---------- loading: fetch the portrait image with real progress, build in a worker ----------
const gateFill = $('gate-fill'), gatePct = $('gate-pct');
function progress(f) { const p = Math.round(f * 100); gateFill.style.transform = `scaleX(${f})`; gatePct.textContent = p + '%'; }

async function loadPortrait() {
  const res = await fetch('assets/portrait.png');
  const total = +res.headers.get('content-length') || 242000;
  const chunks = []; let got = 0;
  if (res.body && res.body.getReader) {
    const rd = res.body.getReader();
    for (;;) { const { done, value } = await rd.read(); if (done) break; chunks.push(value); got += value.length; progress(0.7 * Math.min(1, got / total)); }
  } else { chunks.push(new Uint8Array(await res.arrayBuffer())); }
  const blob = new Blob(chunks, { type: 'image/png' });
  let bmp;
  try { bmp = await createImageBitmap(blob, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' }); }
  catch (e) { bmp = await createImageBitmap(blob); }
  const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(bmp, 0, 0);
  return { pixels: x.getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height, canvas: c };
}

function buildData(pix) {
  const args = { pixels: pix.pixels, w: pix.w, h: pix.h, meta: PORTRAIT, N: sampleTier.count, NL: sampleTier.laptop, S0, Lt: L, seed: 7 };
  const inline = () => ({ main: buildMain(args), laptop: buildLaptop({ N: args.NL }) });
  if (SHOT || !window.Worker) return Promise.resolve(inline());
  return new Promise((resolve) => {
    let wk;
    try { wk = new Worker(new URL('./build-worker.js', import.meta.url), { type: 'module' }); }
    catch (e) { resolve(inline()); return; }
    let tick = 0.7;
    const iv = setInterval(() => { tick = Math.min(0.97, tick + 0.02); progress(tick); }, 60);
    wk.onmessage = (e) => { clearInterval(iv); wk.terminate(); resolve(e.data); };
    wk.onerror = () => { clearInterval(iv); wk.terminate(); resolve(inline()); };
    wk.postMessage(args);
  });
}

let ready = false;
(async () => {
  try {
    const pix = await loadPortrait();
    const data = await buildData(pix);
    mainSys = createMainSystem(data.main, Math.min(sampleTier.count, tier.count), eye);
    laptopSys = createLaptop(data.laptop, Math.min(sampleTier.laptop, tier.laptop));
    const tex = new THREE.CanvasTexture(pix.canvas); tex.flipY = false; tex.generateMipmaps = false; tex.minFilter = THREE.LinearFilter;
    occluder = createOccluder(tex, PORTRAIT, S0);
    scene.add(mainSys.points, laptopSys.group, occluder);
    placeLaptop();
    mainSys.uniforms.uHaloRot.value.setFromMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.42, 0, 0.22)));
    applyTier(tier);
    progress(1);
    ready = true;
    $('gate-text').textContent = 'CONSTELLATION READY';
    $('gate').classList.add('ready');
    if (((SHOT || LIVE) && !Q.has('gate')) || EMBED) enter(false);
  } catch (err) {
    console.error(err);
    $('gate-text').textContent = 'SIGNAL LOST — REFRESH TO RETRY';
  }
})();

// ---------- entering ----------
let entered = false, introStart = 0, T = 0;
function enableTilt() {
  const on = () => addEventListener('deviceorientation', (e) => {
    if (e.gamma == null) return;
    tilt.tx = Math.max(-1, Math.min(1, e.gamma / 28));
    tilt.ty = Math.max(-1, Math.min(1, (e.beta - 50) / 28));
  });
  try {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then((r) => { if (r === 'granted') on(); }).catch(() => {});
    } else on();
  } catch (e) { /* no tilt */ }
}
function enter(withSound) {
  if (entered || !ready) return;
  entered = true;
  if (device.coarse && !SHOT && !EMBED) enableTilt();
  if (withSound) sound.start().then((ok) => setSoundUI(ok)); else setSoundUI(false);
  $('gate').classList.add('gone');
  if (SHOT) $('gate').style.display = 'none';
  document.documentElement.classList.remove('locked');
  introStart = EMBED && Q.has('nointro') ? T - 10 : T;
  if (lenis) lenis.start();
}
$('enter-sound').addEventListener('click', () => enter(true));
$('enter-quiet').addEventListener('click', () => enter(false));
function setSoundUI(on) { const b = $('sound'); b.dataset.on = on ? '1' : '0'; b.setAttribute('aria-label', on ? 'Mute sound' : 'Turn sound on'); }
$('sound').addEventListener('click', async () => {
  if (!sound.on) { const ok = await sound.start(); setSoundUI(ok); return; }
  sound.setMuted(!sound.muted); setSoundUI(!sound.muted);
});

// ---------- your touch ----------
const pointer = { ndc: new THREE.Vector2(), has: false, last: -9, world: new THREE.Vector3(), strength: 0 };
const ripple = { world: new THREE.Vector3(), age: -1 };
const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
let interactPlane = 0;
function setPointer(x, y) { pointer.ndc.set((x / W) * 2 - 1, -((y / H) * 2 - 1)); pointer.has = true; pointer.last = T; }
function tap(target) {
  if (!entered || (target && target.closest && target.closest('a,button,#gate,.panel,.card,.shot'))) return;
  ripple.world.copy(pointerWorld(new THREE.Vector3()));
  ripple.age = 0;
  sound.blip();
}
addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;
  setPointer(e.clientX, e.clientY);
  if (EMBED && device.coarse) { tilt.tx = pointer.ndc.x; tilt.ty = -pointer.ndc.y; } // the lab's mouse stands in for tilting the phone
}, { passive: true });
if (EMBED) document.documentElement.addEventListener('pointerleave', () => { tilt.tx = tilt.ty = 0; });
addEventListener('pointerdown', (e) => { if (e.pointerType !== 'touch') { setPointer(e.clientX, e.clientY); tap(e.target); } }, { passive: true });
// a tap is short and still; a swipe that starts a scroll is neither
let touch0 = null;
addEventListener('touchstart', (e) => { const t = e.touches[0]; if (t) { setPointer(t.clientX, t.clientY); touch0 = { x: t.clientX, y: t.clientY, t: performance.now(), target: e.target }; } }, { passive: true });
addEventListener('touchend', (e) => {
  const t = e.changedTouches[0];
  if (t && touch0 && performance.now() - touch0.t < 350 && Math.hypot(t.clientX - touch0.x, t.clientY - touch0.y) < 12) tap(touch0.target);
  touch0 = null;
}, { passive: true });
addEventListener('touchmove', (e) => { const t = e.touches[0]; if (t) setPointer(t.clientX, t.clientY); }, { passive: true });
const _ray = new THREE.Vector3();
function pointerWorld(out) {
  _ray.set(pointer.ndc.x, pointer.ndc.y, 0.5).unproject(camera).sub(camera.position).normalize();
  const t = (interactPlane - camera.position.z) / (_ray.z || -1e-4);
  return out.copy(camera.position).addScaledVector(_ray, Math.max(0, t));
}

// ---------- DOM bits ----------
const hintEl = $('hint'), grantedEl = $('granted');
const huds = [['hud1', 0.3], ['hud2', 0.44], ['hud3', 0.58]].map(([id, c]) => ({ el: $(id), c }));
const railDots = [...document.querySelectorAll('#rail [data-at]')].map((el) => ({ el, at: +el.dataset.at }));
const journeyEl = $('journey');
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---------- the flight ----------
let gateFade = SHOT ? 1 : 0, pS = 0, extra = 0, prevCam = new THREE.Vector3(), spd = 0, orbit = 0, shockAge = -1, granted = false;
const cues = { chime: false, boom: false, scrape: false, click: false, clunk: false, shock: false };
const camPos = new THREE.Vector3(), camTgt = new THREE.Vector3(), tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
const fwd = new THREE.Vector3(), upV = new THREE.Vector3(), par = new THREE.Vector2();
const m4 = new THREE.Matrix4(), eul = new THREE.Euler(0, 0, 0, 'YXZ');
const look = { tint: new THREE.Vector3(1, 1, 1), sky: 1, stars: 1, dust: 1, shooting: 1 };
const shot = { p: +(Q.get('p') || 0), x: +(Q.get('x') || 0), t: +(Q.get('t') || 12), intro: +(Q.get('intro') ?? 1) };

function frameOf(s, P, N, B) {
  pathPos(eye, s, P);
  pathPos(eye, s + 0.6, tmp); pathPos(eye, s - 0.6, tmp2);
  const Tn = tmp.sub(tmp2).normalize();
  N.crossVectors(Tn, THREE.Object3D.DEFAULT_UP).normalize();
  B.crossVectors(N, Tn);
}
const _P = new THREE.Vector3(), _N = new THREE.Vector3(), _B = new THREE.Vector3();

function update(dt) {
  // --- progress
  const journeyPx = journeyEl.offsetHeight, vh = innerHeight, span = Math.max(1, journeyPx - vh);
  const y = window.scrollY;
  let p = clamp01(y / span), ex = Math.max(0, y - span) / vh;
  if (SHOT) { p = shot.p; ex = shot.x; pS = p; extra = ex; }
  else { const k = 1 - Math.exp(-dt * (lenis ? 11 : 7)); pS += (p - pS) * k; extra += (ex - extra) * k; }
  if (!isFinite(pS)) pS = p;

  const introT = SHOT && entered ? shot.intro : entered ? clamp01((T - introStart) / 3.2) : 0;
  const introE = ease(introT);
  const dive = seg(pS, 0.05, 0.22), tun = seg(pS, 0.22, 0.66), sunA = seg(pS, 0.66, 0.72);
  const rev = seg(pS, 0.72, 0.79), key = seg(pS, 0.79, 0.92), pay = seg(pS, 0.92, 1);
  const lockP = sm(0.795, 0.915, pS);
  const act = pS < 0.22 ? 'hero' : pS < 0.72 ? 'tunnel' : 'vault';
  const tunnelGate = seg(pS, 0.21, 0.25) * (1 - seg(pS, 0.68, 0.72));

  // --- pointer & tilt
  interactPlane = act === 'vault' ? vaultCenter.z : 0;
  const recent = pointer.has && T - pointer.last < 1.4;
  pointer.strength += ((recent ? 1 : 0) - pointer.strength) * (1 - Math.exp(-dt * 5));
  if (pointer.has) pointerWorld(tmp), pointer.world.lerp(tmp, 1 - Math.exp(-dt * 12));
  if (ripple.age >= 0) { ripple.age += dt; if (ripple.age > 2.6) ripple.age = -1; }
  tilt.x += (tilt.tx - tilt.x) * (1 - Math.exp(-dt * 4)); tilt.y += (tilt.ty - tilt.y) * (1 - Math.exp(-dt * 4));
  if (device.coarse) par.set(tilt.x, -tilt.y); else if (pointer.has) par.lerp(pointer.ndc, 1 - Math.exp(-dt * 3));
  const parK = REDUCED ? 0.3 : 1;

  // --- camera
  const Hc = layout.hero;
  let fov = layout.fov, bank = 0, sCam = -1e4;
  upV.set(0, 1, 0);
  if (pS < 0.22) {
    const k = dive, dH = Hc.pos.distanceTo(eye);
    const fovH = layout.fov, tH = Math.tan((fovH * Math.PI) / 360);
    let dist;
    if (k < 0.55) dist = dH * (1 - 0.62 * ease(k / 0.55));
    else dist = lerp(dH * 0.38, 0.32, ease((k - 0.55) / 0.45));
    tmp.copy(Hc.pos).sub(eye).normalize();
    camPos.copy(eye).addScaledVector(tmp, dist);
    tmp2.set(eye.x, eye.y, eye.z + dist);
    camPos.lerp(tmp2, ease(seg(k, 0.25, 0.9)));
    camTgt.copy(Hc.target).lerp(eye, ease(clamp01(k * 1.8)));
    if (REDUCED) fov = lerp(fovH, 64, ease(k));
    else if (k < 0.55) fov = Math.min(98, (2 * Math.atan((dH * tH) / dist) * 180) / Math.PI);
    else fov = lerp(Math.min(98, (2 * Math.atan(tH / 0.38) * 180) / Math.PI), 64, ease((k - 0.55) / 0.45));
    const w = 0.42 * (1 - dive) * parK;
    camPos.x += par.x * w; camPos.y += par.y * w * 0.6;
  } else if (pS < 0.72) {
    sCam = pS < 0.66 ? -0.32 + tun * (L + 0.32) : L + sunA * 26;
    if (sCam <= L) pathPos(eye, Math.max(0, sCam), camPos); else camPos.set(eye.x, eye.y, eye.z - sCam);
    if (sCam < 0) camPos.set(eye.x, eye.y, eye.z - sCam);
    const sT = sCam + 9;
    if (sT <= L) pathPos(eye, sT, camTgt); else camTgt.set(eye.x, eye.y, eye.z - sT);
    bank = REDUCED ? 0 : pathBank(eye, Math.max(0, Math.min(L, sCam))) * seg(sCam, 2, 20);
    fov = 64 + (REDUCED ? 0 : Math.min(9, spd * 6));
    camPos.x += par.x * 0.22 * parK; camPos.y += par.y * 0.14 * parK;
  } else {
    const VC = layout.vaultCentered, VA = layout.vaultAside;
    const startS = L + 26;
    tmp.set(eye.x, eye.y, eye.z - startS);
    camPos.copy(tmp).lerp(VC.pos, easeOut(rev));
    tmp2.copy(tmp); tmp2.z -= 9;
    camTgt.copy(tmp2).lerp(VC.target, easeOut(rev));
    fov = lerp(64, layout.fov, ease(rev));
    camPos.z -= 0.7 * ease(key) - 0.5 * ease(pay);
    const aside = ease(seg(extra, 0, 0.8));
    if (aside > 0) { tmp.copy(VA.pos); tmp.z -= 0.2; camPos.lerp(tmp, aside); camTgt.lerp(VA.target, aside); }
    const w = 0.4 * seg(pS, 0.75, 0.8) * parK;
    camPos.x += par.x * w; camPos.y += par.y * w * 0.6;
    if (shockAge >= 0 && shockAge < 0.8 && !REDUCED) {
      const a = 0.09 * Math.exp(-shockAge * 6);
      camPos.x += (Math.random() - 0.5) * a; camPos.y += (Math.random() - 0.5) * a;
    }
  }
  camera.position.copy(camPos);
  if (bank) { fwd.copy(camTgt).sub(camPos).normalize(); upV.applyAxisAngle(fwd, bank); }
  camera.up.copy(upV);
  camera.lookAt(camTgt);
  camera.fov = fov;
  camera.updateProjectionMatrix();

  const camSpeed = dt > 0 ? camPos.distanceTo(prevCam) / dt : 0;
  prevCam.copy(camPos);
  spd += (Math.min(1.6, camSpeed / 45) - spd) * (1 - Math.exp(-dt * 6));
  if (SHOT) spd = 0;

  const pxScale = ((H * dpr) / (2 * Math.tan((fov * Math.PI) / 360))) * K_SIZE;
  const maxPt = Math.min(64 * dpr, maxPointHW);

  // --- the stars that are you
  const t1 = sm(0.165, 0.25, pS), t2 = sm(0.675, 0.77, pS);
  const dil = sm(0.84, 1.0, dive);
  if (mainSys) {
    const U = mainSys.uniforms;
    U.uTime.value = T; U.uIntro.value = introT; U.uIris.value = dil; U.uT1.value = t1; U.uT2.value = t2; U.uLock.value = lockP;
    gateFade += ((ready ? 1 : 0) - gateFade) * (1 - Math.exp(-dt * 1.5));
    U.uOp.value = (entered ? 1 : 0.42 * gateFade) * (1 - 0.78 * sm(0.15, 0.8, extra) * (1 - layout.t));
    U.uSpin.value = -T * 0.05;
    const tg = tunnelGate;
    U.uFogNear.value = lerp(40, 16, tg); U.uFogFar.value = lerp(85, 48, tg);
    U.uScreenGlow.value = 0.85 + 0.15 * Math.sin(T * 7.1) * Math.sin(T * 2.3);
    U.uSheen.value = -3 + ((T % 4) / 4) * 8;
    U.uInteract.value = REDUCED ? 0.4 : 1;
    if (lockP >= 0.999) orbit += dt * 0.07;
    const yaw = 0.45 + Math.sin(T * 0.35) * 0.09 * (1 - lockP * 0.4) + orbit + extra * 0.35;
    eul.set(-0.1, yaw, 0, 'YXZ');
    U.uLockRot.value.setFromMatrix4(m4.makeRotationFromEuler(eul));
    const dip = -0.16 * Math.sin(seg(lockP, 0.9, 1) * Math.PI) + Math.sin(T * 0.7) * 0.06;
    U.uV.value.set(vaultCenter.x, vaultCenter.y + dip, vaultCenter.z);
    U.uLockFlash.value = shockAge >= 0 ? 1.2 * Math.exp(-shockAge * 4) : 0;
    U.uMouse.value.set(pointer.world.x, pointer.world.y, pointer.world.z, pointer.strength);
    U.uRipple.value.set(ripple.world.x, ripple.world.y, ripple.world.z, ripple.age);
    U.uPxScale.value = pxScale; U.uMaxPt.value = maxPt;
  }
  if (laptopSys) {
    const U = laptopSys.uniforms;
    U.uTime.value = T; U.uIntro.value = introT; U.uOp.value = (entered ? 1 : 0) * (1 - seg(pS, 0.05, 0.13));
    U.uPxScale.value = pxScale; U.uMaxPt.value = maxPt;
    laptopSys.glowU.uOp.value = U.uOp.value * sm(0.6, 1, introT); laptopSys.glowU.uTime.value = T;
    laptopSys.group.visible = pS < 0.15;
  }
  if (occluder) {
    occluder.material.uniforms.uOp.value = 0.9 * sm(0.55, 1, introT) * (1 - seg(pS, 0.09, 0.17));
    occluder.visible = pS < 0.2;
  }

  // --- the sun: a small system on the landing screen, then the light at the end of the tunnel
  let sunOp, heat = 0;
  if (pS < 0.22) {
    const s = layout.solarHero;
    solar.group.position.copy(s.pos); solar.group.scale.setScalar(s.scale); solar.group.rotation.set(1.15, 0, 0.15);
    solar.coronaU.uSize.value = 0.5 * s.scale * 9;
    sunOp = introE * (1 - seg(pS, 0.05, 0.12));
  } else {
    solar.group.position.copy(sunPos); solar.group.scale.setScalar(2.3); solar.group.rotation.set(Math.PI / 2 - 0.35, 0, 0);
    heat = sm(0.45, 0.71, pS);
    solar.coronaU.uSize.value = 0.5 * 2.3 * (9 + heat * 8);
    sunOp = seg(pS, 0.23, 0.32) * (1 - seg(pS, 0.712, 0.73));
  }
  solar.update(T, sunOp, heat * 2);
  solar.setScale(pxScale, maxPt);
  solar.group.visible = sunOp > 0.001;
  solar.group.updateMatrixWorld();
  tmp.setFromMatrixPosition(solar.sun.matrixWorld);
  const inFront = tmp2.copy(tmp).sub(camera.position).dot(fwd.set(0, 0, -1).applyQuaternion(camera.quaternion)) > 0;
  tmp.project(camera);
  const onScreen = inFront && Math.abs(tmp.x) < 1.3 && Math.abs(tmp.y) < 1.3;
  post.u.uSun.value.set(tmp.x * 0.5 + 0.5, tmp.y * 0.5 + 0.5, onScreen ? sunOp * (pS < 0.22 ? 0.25 : 0.35 + 1.4 * heat) : 0);

  // --- the iris kindles in your eye, then opens like an aperture
  iris.points.position.set(eye.x, eye.y, eye.z + 0.06);
  iris.u.uTime.value = T; iris.u.uDil.value = dil;
  iris.u.uOp.value = sm(0.45, 0.78, dive) * (1 - sm(0.985, 1, dive)) * (pS < 0.222 ? 1 : 0);
  iris.u.uPxScale.value = pxScale; iris.u.uMaxPt.value = maxPt;
  iris.points.visible = iris.u.uOp.value > 0.001;

  // --- tunnel effects
  fx.glyphU.uTime.value = T;
  fx.glyphU.uOp.value = seg(pS, 0.215, 0.26) * (1 - seg(pS, 0.66, 0.71));
  for (const tr of fx.trills) {
    const sT = tr.s * L, ahead = sT - sCam;
    frameOf(sT, _P, _N, _B);
    const a = tr.a0 + (sCam - sT) * 0.045 + T * 0.05;
    tr.o.position.copy(_P).addScaledVector(_N, Math.cos(a) * 2.5).addScaledVector(_B, Math.sin(a) * 2.5);
    tr.o.rotation.set(Math.sin(T * 0.6 + tr.ph) * 0.7, Math.cos(T * 0.5 + tr.ph) * 0.9, T * tr.spin);
    tr.u.uTime.value = T;
    tr.u.uBloom.value = sm(40, 12, ahead);
    tr.u.uAsm.value = sm(58, 30, ahead);
    tr.u.uOp.value = tunnelGate * sm(-8, 2, ahead) * (1 - sm(46, 62, ahead));
    tr.u.uPxScale.value = pxScale; tr.u.uMaxPt.value = maxPt;
    tr.o.visible = tr.u.uOp.value > 0.001;
  }
  fx.setScale(pxScale, maxPt);

  // --- the vault ceremony
  if (lockP > 0.2 && !cues.scrape) { cues.scrape = true; sound.scrape(); }
  if (lockP > 0.68 && !cues.click) { cues.click = true; sound.click(); }
  if (lockP > 0.93 && !cues.clunk) { cues.clunk = true; sound.clunk(); }
  if (lockP > 0.97 && !cues.shock) { cues.shock = true; shockAge = 0; granted = true; sound.granted(); }
  if (lockP < 0.15) { cues.scrape = cues.click = cues.clunk = cues.shock = false; granted = false; }
  if (shockAge >= 0) { shockAge += dt; if (shockAge > 3) shockAge = -1; }
  fx.shock.position.set(vaultCenter.x, vaultCenter.y + 0.3, vaultCenter.z + 1.6);
  fx.shockU.uAge.value = shockAge >= 0 && shockAge < 1.6 ? shockAge : 0;
  fx.shock.visible = shockAge >= 0 && shockAge < 1.6;
  if (pS > 0.69 && !cues.boom) { cues.boom = true; sound.boom(); }
  if (pS < 0.66) cues.boom = false;

  // --- the look of each act
  const warm = sm(0.3, 0.7, pS) * (1 - sm(0.72, 0.78, pS));
  const violet = sm(0.74, 0.82, pS);
  look.tint.set(1, 1, 1).lerp(tmp.set(1.18, 1.0, 0.82), warm).lerp(tmp.set(0.95, 0.85, 1.22), violet);
  look.sky = pS < 0.72 ? lerp(1, 0.55, sm(0.2, 0.3, pS)) : lerp(0.55, 0.95, sm(0.72, 0.8, pS));
  look.stars = lerp(1, 0.6, tunnelGate);
  look.dust = 1;
  look.shooting = act === 'tunnel' ? 0 : 1;
  sky.update(camera, T, dt, look);
  sky.setScale(dpr, pxScale);

  const white = sm(0.687, 0.697, pS) * (1 - sm(0.7, 0.728, pS));
  post.u.uTime.value = T;
  post.u.uBloom.value = act === 'hero' ? 0.85 : act === 'tunnel' ? 1.0 : 0.95;
  post.u.uZoom.value = REDUCED ? 0 : Math.min(0.09, spd * 0.055) * (act === 'vault' ? 0 : 1);
  post.u.uCA.value = REDUCED ? 0 : 0.0016 + Math.min(0.008, spd * 0.004);
  post.u.uWhite.value = white;
  post.u.uFlash.value = shockAge >= 0 ? 0.35 * Math.exp(-shockAge * 5) : 0;
  post.u.uGain.value.set(1, 1, 1).lerp(tmp.set(1.06, 1.0, 0.9), warm).lerp(tmp.set(1.0, 0.95, 1.08), violet);
  post.u.uLift.value.set(0, 0.004, 0.012).lerp(tmp.set(0.012, 0.0, 0.026), violet);
  if (shockAge >= 0 && shockAge < 1.4) {
    tmp.copy(vaultCenter).project(camera);
    post.u.uRip.value.set(tmp.x * 0.5 + 0.5, tmp.y * 0.5 + 0.5, shockAge * 0.75, (1 - shockAge / 1.4) * (REDUCED ? 0.3 : 1));
  } else post.u.uRip.value.w = 0;

  // --- sound follows the flight
  if (entered && introT > 0.85 && !cues.chime) { cues.chime = true; sound.chime(); }
  sound.update({ act, speed: spd, tunnel: tunnelGate, sun: heat });

  // --- words on screen
  const heroOp = sm(0.55, 1, introT) * (1 - sm(0.02, 0.075, pS));
  heroEl.style.opacity = heroOp.toFixed(3);
  heroEl.style.transform = `translate3d(0,${(-50 * sm(0.02, 0.075, pS)).toFixed(1)}px,0)`;
  heroEl.style.visibility = heroOp > 0.001 ? 'visible' : 'hidden';
  hintEl.style.opacity = (entered ? sm(0.9, 1, introT) * (1 - sm(0.0, 0.02, pS)) : 0).toFixed(3);
  for (const h of huds) {
    const q = Math.max(0, 1 - Math.abs(pS - h.c) / 0.05);
    h.el.style.opacity = (q * q).toFixed(3);
    h.el.style.transform = `translate3d(0,${((1 - q) * 14).toFixed(1)}px,0)`;
  }
  let active = 0;
  railDots.forEach((d, i) => { if (pS >= d.at - 0.001) active = i; });
  railDots.forEach((d, i) => d.el.classList.toggle('on', i === active));
  grantedEl.classList.toggle('show', granted && extra < 0.35 && pS > 0.9);
  document.documentElement.classList.toggle('in-vault', pS > 0.985 || extra > 0.02);
}

// ---------- loop ----------
let last = performance.now(), frames = 0, paused = false;
function loop(now) {
  if (paused) { last = now; requestAnimationFrame(loop); return; }
  const dt = SHOT ? 1 / 60 : Math.min(0.05, (now - last) / 1000);
  last = now;
  T = SHOT ? shot.t : T + dt;
  if (lenis) lenis.raf(now);
  if (entered && !SHOT) aq.frame(dt);
  update(dt);
  post.render(scene, camera);
  frames++;
  if (SHOT && ready && (entered || Q.has('gate')) && frames > 6) { document.documentElement.dataset.ready = '1'; return; }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
if (SHOT) {
  // put the page where the shot is, so the DOM layer matches the 3D layer
  const place = () => { const span = journeyEl.offsetHeight - innerHeight; window.scrollTo(0, shot.p * span + shot.x * innerHeight); };
  if (!Q.has('gate')) document.documentElement.classList.remove('locked');
  addEventListener('load', place); setTimeout(place, 50);
}
document.addEventListener('visibilitychange', () => { last = performance.now(); });

// hooks for the device lab: read and set the flight position, pause, and match render resolution to the frame's on-screen size
function rawProgress() { const span = Math.max(1, journeyEl.offsetHeight - innerHeight); return { p: clamp01(scrollY / span), ex: Math.max(0, scrollY - span) / innerHeight }; }
function seek(p, ex = 0) {
  const span = Math.max(1, journeyEl.offsetHeight - innerHeight), max = document.documentElement.scrollHeight - innerHeight;
  const y = Math.round(Math.max(0, Math.min(max, p * span + ex * innerHeight)));
  scrollTo(0, y);
  return y;
}
window.__v8 = { get state() { return { pS, extra, T, tier: tier.name, entered, ready, W, H, dpr }; }, raw: rawProgress, seek, pause: (b) => { paused = !!b; }, setDprCap: (c) => { dprCap = c || 9; resize(true); }, camera, renderer, post, layout: () => layout, applyTier, TIERS, sound, fx, iris, solar, sky, scene };
