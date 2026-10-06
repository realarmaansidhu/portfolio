// Composition for any screen. Instead of fixed coordinates, every key element is given a
// target rectangle on screen and the camera is solved to put it there.
// Upright phones/tablets: face up top, words below. Landscape: words left, face right.
import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * t;
const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// Solve a camera looking straight down -z so a world box lands on a target NDC rectangle.
function fit({ cx, cy, hx, hy, planeZ }, { nx, ny, nh, maxW }, fov, aspect) {
  const tH = Math.tan((fov * Math.PI) / 360);
  let d = hy / (nh * tH);
  if (hx / (d * tH * aspect) > maxW) d = hx / (maxW * tH * aspect);
  const pos = new THREE.Vector3(cx - nx * d * tH * aspect, cy - ny * d * tH, planeZ + d);
  return { pos, target: new THREE.Vector3(pos.x, pos.y, planeZ), dist: d };
}

export function computeLayout(w, h, S0, vault, measured = {}) {
  const aspect = w / h;
  const t = sm(0.8, 1.3, aspect);                 // 0 = upright, 1 = landscape
  const phoneLand = aspect > 1.3 && h < 520;      // phone on its side: short and wide
  const fov = lerp(56, 50, t);
  const tH = Math.tan((fov * Math.PI) / 360);

  // the head-and-shoulders box that must always be fully in frame
  const face = { cx: 0.19 * S0, cy: 0.0, hx: 0.81 * S0, hy: 0.8 * S0, planeZ: 0 };
  const heroTarget = {
    nx: lerp(0.06, phoneLand ? 0.46 : 0.4, t),
    ny: lerp(0.36, phoneLand ? 0.0 : 0.06, t),
    nh: lerp(0.27, phoneLand ? 0.62 : 0.5, t),
    maxW: lerp(0.84, 0.5, t),
  };
  // upright screens: fit the face into the real space between the top bar and the name block
  if (measured.textTop && t < 0.999) {
    const top = measured.headerBottom || 64, bot = measured.textTop - 18;
    const nhU = Math.min(0.34, Math.max(0.16, ((bot - top) / h) * 0.9));
    const nyU = 1 - (top + bot) / h;
    heroTarget.nh = lerp(nhU, heroTarget.nh, t);
    heroTarget.ny = lerp(nyU, heroTarget.ny, t);
  }
  const hero = fit(face, heroTarget, fov, aspect);

  // laptop: lower-left of the face, where your gaze lands
  const laptop = {
    pos: new THREE.Vector3(lerp(-0.86, -1.02, t) * S0, lerp(-1.0, -1.12, t) * S0, 0.5),
    rot: new THREE.Euler(0.32, 0.85, 0, 'YXZ'),
    scale: lerp(1.0, 1.1, t),
  };

  // the little solar system on the landing screen, kept off your name
  const solarDepth = -7;
  const sd = hero.dist - solarDepth;
  const sN = { nx: lerp(-0.5, -0.1, t), ny: lerp(0.79, 0.74, t) };
  const solarHero = {
    pos: new THREE.Vector3(hero.pos.x + sN.nx * sd * tH * aspect, hero.pos.y + sN.ny * sd * tH, solarDepth),
    scale: (lerp(0.09, 0.16, t) * sd * tH * Math.min(1, aspect * 1.6)) / 4.05,
  };

  // the vault: centred for the key ceremony, moved aside when the words arrive
  const box = { cx: vault.x, cy: vault.y + 0.5, hx: 1.9, hy: 2.7, planeZ: vault.z };
  const vaultCentered = fit(box, { nx: 0, ny: lerp(0.06, 0.0, t), nh: lerp(0.38, 0.52, t), maxW: lerp(0.9, 0.8, t) }, fov, aspect);
  const vaultAside = fit(box, { nx: lerp(0, 0.5, t), ny: lerp(0.68, 0.0, t), nh: lerp(0.14, 0.36, t), maxW: lerp(0.5, 0.42, t) }, fov, aspect);

  return { aspect, t, fov, hero, laptop, solarHero, vaultCentered, vaultAside, upright: t < 0.5 };
}
