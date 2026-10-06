// Pure data builders (no DOM, no three.js) — run inside a worker, or inline in shot mode.
// Every star gets four lives: portrait → tunnel → padlock, plus an intro scatter start.

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gaussFn(R) {
  return () => { let u = 0; while (!u) u = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.283185307 * R()); };
}

// ---------- tunnel targets: (s, theta, radius, kind) ----------
// 0/1 double helix · 2 outer dust wall · 3 data packets (flow toward you) · 4 axis sparkles · 5 light gates
function tunnelPoint(R, gauss, Lt, out, o) {
  const r = R();
  let s, th, rad, kind;
  if (r < 0.36) {
    kind = r < 0.18 ? 0 : 1;
    s = R() * Lt; th = (kind ? Math.PI : 0) + s * 0.21 + gauss() * 0.09; rad = 2.25 + gauss() * 0.1;
  } else if (r < 0.64) {
    kind = 2; s = R() * Lt; th = R() * 6.2832; rad = 3.2 + R() * 2.4;
  } else if (r < 0.82) {
    kind = 3;
    const packets = 26, lane = Math.floor(R() * 10), pk = Math.floor(R() * packets);
    s = (pk / packets) * Lt + (lane * 3.7) % 9 + R() * R() * 3.2;
    th = lane * 0.6283 + 0.31 + gauss() * 0.03; rad = 1.55 + gauss() * 0.05;
  } else if (r < 0.9) {
    kind = 4; s = R() * Lt; th = R() * 6.2832; rad = Math.sqrt(R()) * 1.25;
  } else {
    kind = 5;
    const G = Math.floor(Lt / 9) - 1;
    s = 9 + Math.floor(R() * G) * 9 + gauss() * 0.06; th = R() * 6.2832; rad = 3.0 + gauss() * 0.04;
  }
  out[o] = s; out[o + 1] = th; out[o + 2] = rad; out[o + 3] = kind;
}

// ---------- padlock (local units ×2.3) ----------
// group codes: 0 body (0 face · .2 side · .4 edge · .6 plate · .8 keyhole) · 1 shackle · 2 key · 3 halo ring · 4 drifting shell
const K = 2.3;
function inHole(x, y) {
  return Math.hypot(x, y + 0.3) < 0.155 || (y <= -0.42 && y >= -0.8 && Math.abs(x) < 0.055 + 0.09 * ((-0.42 - y) / 0.38));
}
function lockPoint(R, gauss, out, o) {
  const r = R();
  let x, y, z, g = 0;
  if (r < 0.26) {
    const back = R() < 0.42; let tr = 0;
    do { x = (R() * 2 - 1) * 0.8; y = -1.05 + R() * 1.15; tr++; } while (!back && tr < 24 && inHole(x, y));
    z = (back ? -1 : 1) * (0.4 + R() * 0.05); g = 0;
  } else if (r < 0.37) {
    const f = R();
    if (f < 0.5) { x = (R() < 0.5 ? -1 : 1) * (0.78 + R() * 0.05); y = -1.05 + R() * 1.15; z = (R() * 2 - 1) * 0.42; }
    else { y = f < 0.75 ? 0.08 + R() * 0.04 : -1.07 + R() * 0.04; x = (R() * 2 - 1) * 0.8; z = (R() * 2 - 1) * 0.42; }
    g = 0.2;
  } else if (r < 0.49) {
    const u = R(), e = Math.floor(R() * 12), ys = [-1.05, 0.1], xs = [-0.8, 0.8], zs = [-0.42, 0.42];
    if (e < 4) { x = -0.8 + u * 1.6; y = ys[e & 1]; z = zs[(e >> 1) & 1]; }
    else if (e < 8) { y = -1.05 + u * 1.15; x = xs[e & 1]; z = zs[(e >> 1) & 1]; }
    else { z = -0.42 + u * 0.84; x = xs[e & 1]; y = ys[(e >> 1) & 1]; }
    x += gauss() * 0.008; y += gauss() * 0.008; z += gauss() * 0.008; g = 0.4;
  } else if (r < 0.54) {
    if (R() < 0.8) {
      const u = R(), e = Math.floor(R() * 4), x0 = -0.68, x1 = 0.68, y0 = -0.95, y1 = -0.02;
      if (e === 0) { x = x0 + u * (x1 - x0); y = y0; } else if (e === 1) { x = x0 + u * (x1 - x0); y = y1; }
      else if (e === 2) { x = x0; y = y0 + u * (y1 - y0); } else { x = x1; y = y0 + u * (y1 - y0); }
      x += gauss() * 0.006; y += gauss() * 0.006;
    } else {
      const k = Math.floor(R() * 4), a = R() * 6.283, rr = Math.sqrt(R()) * 0.035;
      x = (k & 1 ? 0.6 : -0.6) + Math.cos(a) * rr; y = (k & 2 ? -0.12 : -0.86) + Math.sin(a) * rr;
    }
    z = 0.452 + R() * 0.01; g = 0.6;
  } else if (r < 0.6) {
    const f = R();
    if (f < 0.45) { const a = R() * 6.283, R2 = 0.165 + 0.016 * R(); x = Math.cos(a) * R2; y = -0.3 + Math.sin(a) * R2; }
    else if (f < 0.75) { const yy = -0.42 - R() * 0.38, w2 = 0.055 + 0.09 * ((-0.42 - yy) / 0.38); x = (R() < 0.5 ? -1 : 1) * (w2 + 0.012 + 0.012 * R()); y = yy; }
    else { const a = R() * 6.283; x = Math.cos(a) * 0.26; y = -0.5 + Math.sin(a) * 0.42; }
    z = 0.42 + R() * 0.05; g = 0.8;
  } else if (r < 0.63) {
    const a = R() * 6.283; x = Math.cos(a) * 0.15; y = -0.3 + Math.sin(a) * 0.15; z = 0.42 - R() * 0.6; g = 0.8;
  } else if (r < 0.81) {
    g = 1; const phi = R() * 6.283, tr2 = 0.07;
    if (R() < 0.74) {
      const t2 = Math.PI * R(), cv = Math.cos(t2), sv = Math.sin(t2);
      x = cv * 0.55 + Math.cos(phi) * cv * tr2; y = 0.1 + sv * 0.72 + Math.cos(phi) * sv * tr2; z = Math.sin(phi) * tr2;
    } else {
      x = (R() < 0.5 ? -0.55 : 0.55) + Math.cos(phi) * tr2; y = -0.16 + R() * 0.28; z = Math.sin(phi) * tr2;
    }
  } else if (r < 0.885) {
    // key, in its own frame: shaft along +z, keyhole plane at z=0, bit pointing +y
    g = 2; const kr = R();
    if (kr < 0.4) { const a = R() * 6.283; x = Math.cos(a) * 0.042; y = Math.sin(a) * 0.042; z = -0.28 + R() * 1.06; }
    else if (kr < 0.54) {
      z = -0.27 + R() * 0.27;
      const seg = Math.floor((z + 0.27) / 0.054), top = 0.155 - (seg % 2 ? 0.045 : 0) - (seg === 2 ? 0.03 : 0);
      x = (R() - 0.5) * 0.024; y = 0.042 + R() * (top - 0.042);
    } else if (kr < 0.6) { const a = R() * 6.283; x = Math.cos(a) * 0.07; y = Math.sin(a) * 0.07; z = 0.78 + R() * 0.04; }
    else {
      // flat bow: an oval loop standing in the shaft's plane, so a 90° turn is unmistakable
      const a = R() * 6.283, band = 0.78 + R() * 0.22;
      y = Math.cos(a) * 0.2 * band; z = 0.98 + Math.sin(a) * 0.17 * band; x = (R() - 0.5) * 0.026;
      if (R() < 0.22) { y *= 0.5; z = 0.98 + (z - 0.98) * 0.5; }
    }
  } else if (r < 0.95) {
    g = 3; const a = R() * 6.283, RR = 1.9 + gauss() * 0.1;
    x = Math.cos(a) * RR; y = gauss() * 0.025; z = Math.sin(a) * RR;
  } else {
    g = 4; const a = R() * 6.283, el = Math.acos(2 * R() - 1), r3 = 2.3 + R() * 1.6;
    x = Math.sin(el) * Math.cos(a) * r3; y = Math.sin(el) * Math.sin(a) * r3 * 0.8; z = Math.cos(el) * r3 * 0.6;
  }
  out[o] = x * K; out[o + 1] = y * K; out[o + 2] = z * K; out[o + 3] = g;
}

// ---------- the main system ----------
export function buildMain({ pixels, w, h, meta, N, S0, Lt, seed = 7 }) {
  const R = mulberry32(seed), gauss = gaussFn(R);
  const P = w * h, cdf = new Float32Array(P);
  let run = 0;
  for (let i = 0; i < P; i++) { const g = pixels[i * 4 + 1] / 255; run += g * g; cdf[i] = run; }

  const pos = new Float32Array(N * 3), scat = new Float32Array(N * 4), tun = new Float32Array(N * 4);
  const lock = new Float32Array(N * 4), misc = new Float32Array(N * 2);
  const sc = meta.scale * S0;
  for (let i = 0; i < N; i++) {
    const t = R() * run;
    let lo = 0, hi = P - 1;
    while (lo < hi) { const m = (lo + hi) >> 1; if (cdf[m] < t) lo = m + 1; else hi = m; }
    const px = (lo % w) + R(), py = ((lo / w) | 0) + R(), lum = pixels[lo * 4] / 255;
    pos[i * 3] = (px - meta.cx) * sc;
    pos[i * 3 + 1] = -(py - meta.cy) * sc;
    pos[i * 3 + 2] = ((lum - 0.5) * 0.3 + gauss() * 0.05) * S0;
    misc[i * 2] = lum; misc[i * 2 + 1] = R();

    // before you enter, the same stars are a three-armed spiral galaxy; entering condenses it into you
    if (R() < 0.16) {
      const rr = Math.abs(gauss()) * 1.4, a = R() * 6.2832;
      scat[i * 4] = Math.cos(a) * rr + 0.5; scat[i * 4 + 1] = Math.sin(a) * rr * 0.62; scat[i * 4 + 2] = -2 + gauss() * 0.35;
    } else {
      const arm = Math.floor(R() * 3), rr = 2.2 + Math.pow(R(), 0.75) * 9.5;
      const a = arm * 2.0944 + rr * 0.42 + gauss() * (0.22 + rr * 0.02);
      scat[i * 4] = Math.cos(a) * rr + 0.5; scat[i * 4 + 1] = Math.sin(a) * rr * 0.62; scat[i * 4 + 2] = -2 + gauss() * 0.5;
    }
    scat[i * 4 + 3] = R();

    tunnelPoint(R, gauss, Lt, tun, i * 4);
    lockPoint(R, gauss, lock, i * 4);
  }
  return { pos, scat, tun, lock, misc };
}

// ---------- the laptop, drawn in code ----------
// Local frame: deck on y=0, screen hinged at the back edge and leaning back 12°, facing +z.
// kind: 0 display · 1 bezel · 2 deck · 3 keys · 4 trackpad · 5 deck edge · 6 hinge
export function buildLaptop({ N, seed = 11 }) {
  const R = mulberry32(seed);
  const pos = new Float32Array(N * 3), uvk = new Float32Array(N * 4), scat = new Float32Array(N * 3);
  const tilt = (12 * Math.PI) / 180, SH = 0.95, SW = 1.5, ct = Math.cos(tilt), st = Math.sin(tilt);
  const scr = (u, v, lift) => [(u - 0.5) * SW, v * SH * ct + lift * st, -0.5 - v * SH * st + lift * ct];
  for (let i = 0; i < N; i++) {
    const r = R();
    let p, u = 0, v = 0, kind;
    if (r < 0.36) { kind = 0; u = 0.045 + R() * 0.91; v = 0.06 + R() * 0.89; p = scr(u, v, 0.006); }
    else if (r < 0.48) {
      kind = 1; const e = Math.floor(R() * 4), t = R(), inner = R() < 0.5, m = inner ? 0.035 : 0;
      if (e === 0) { u = m + t * (1 - 2 * m); v = m; } else if (e === 1) { u = m + t * (1 - 2 * m); v = 1 - m; }
      else if (e === 2) { u = m; v = m + t * (1 - 2 * m); } else { u = 1 - m; v = m + t * (1 - 2 * m); }
      p = scr(u, v, 0.008);
    } else if (r < 0.64) { kind = 2; u = R(); v = R(); p = [(u - 0.5) * SW, 0, (v - 0.5) * 1.0]; }
    else if (r < 0.8) {
      kind = 3;
      const kx = Math.floor(R() * 13), kz = Math.floor(R() * 5), ox = (kx + 0.12 + R() * 0.76) / 13, oz = (kz + 0.15 + R() * 0.7) / 5;
      u = ox; v = oz; p = [(ox - 0.5) * SW * 0.9, 0.006, -0.42 + oz * 0.47];
    } else if (r < 0.85) {
      kind = 4; const e = Math.floor(R() * 4), t = R();
      const x0 = -0.25, x1 = 0.25, z0 = 0.14, z1 = 0.42;
      p = e === 0 ? [x0 + t * 0.5, 0.004, z0] : e === 1 ? [x0 + t * 0.5, 0.004, z1] : e === 2 ? [x0, 0.004, z0 + t * 0.28] : [x1, 0.004, z0 + t * 0.28];
    } else if (r < 0.94) {
      kind = 5; const e = Math.floor(R() * 5), t = R();
      p = e === 0 ? [(t - 0.5) * SW, -R() * 0.03, 0.5] : e === 1 ? [-SW / 2, -R() * 0.03, t - 0.5] : e === 2 ? [SW / 2, -R() * 0.03, t - 0.5] : e === 3 ? [(t - 0.5) * SW, 0, -0.5] : [(t - 0.5) * SW, -0.03, 0.5 - R() * 0.02];
    } else { kind = 6; p = [(R() - 0.5) * SW * 0.96, R() * 0.02, -0.5 + R() * 0.02]; }
    pos[i * 3] = p[0]; pos[i * 3 + 1] = p[1]; pos[i * 3 + 2] = p[2];
    uvk[i * 4] = u; uvk[i * 4 + 1] = v; uvk[i * 4 + 2] = kind; uvk[i * 4 + 3] = R();
    const a = R() * 6.2832, rr = 4 + R() * 5;
    scat[i * 3] = Math.cos(a) * rr; scat[i * 3 + 1] = Math.sin(a) * rr * 0.6; scat[i * 3 + 2] = (R() - 0.5) * 6;
  }
  return { pos, uvk, scat };
}
