// Three gadgets drawn in stars, floating around the portrait: Meta Ray-Ban Display glasses, a DJI Osmo Pocket 3
// and a DJI Mini 4 Pro. After the vault opens they come back and drift past behind the content.
import * as THREE from 'three';

const SPRITE_FRAG = /* glsl */`
varying vec3 vColor;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  if (d > 1.) discard;
  float core = smoothstep(.42, 0., d);
  float glow = pow(1. - d, 2.4);
  gl_FragColor = vec4(vColor * (glow * .8 + core * 1.7), 1.);
}`;

const GADGET_VERT = /* glsl */`
attribute vec4 aPart;
attribute vec4 aPivot;
attribute vec3 aScat;
uniform float uTime, uIntro, uOp, uSizeK, uPxScale, uMaxPt, uObjScale, uStyle;
varying vec3 vColor;
mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
float h1(float n){ return fract(sin(n) * 43758.5453); }

// what the screens show: a heads-up card in the glasses, a live viewfinder on the Pocket 3
vec3 screen(float u, float v){
  if (uStyle < .5) {
    float row = floor((1. - v) * 5.), fr = fract((1. - v) * 5.);
    float len = row < .5 ? .34 : .25 + .55 * h1(row * 3.7 + floor(uTime * .4));
    float on = step(.12, u) * step(u, .12 + len) * step(.3, fr) * step(fr, .72) * step(.5, row);
    float clock = (1. - step(.5, row)) * step(.12, u) * step(u, .46) * step(.25, fr) * step(fr, .8);
    float dot = 1. - smoothstep(.06, .1, length(vec2(u - .84, (v - .82) * .62)));
    return vec3(.2, .45, .5) * .35 + vec3(.75, 1., .92) * 1.6 * max(on, clock) + vec3(.55, 1., .8) * 1.4 * dot;
  }
  float horizon = .42 + .04 * sin(u * 9. + uTime * .3);
  vec3 sky = mix(vec3(.45, .7, 1.), vec3(.75, .6, 1.), v), ground = vec3(.25, .3, .55) * .7;
  vec3 c = (v > horizon ? sky : ground) * 1.05;
  float grid = max(step(abs(u - .333), .006), step(abs(u - .667), .006)) + max(step(abs(v - .333), .006), step(abs(v - .667), .006));
  c += vec3(.5) * grid * .35;
  float rec = 1. - smoothstep(.035, .055, length(vec2(u - .1, (v - .9) * 1.5)));
  return c + vec3(1.8, .2, .25) * rec * (.6 + .4 * step(.5, fract(uTime)));
}

void main(){
  float kind = aPart.x, hs = aPart.y, u = aPart.z, v = aPart.w;
  vec3 p = position;
  if (aPivot.w > .5) {
    vec3 q = p - aPivot.xyz;
    float ang = aPivot.w < 1.5 ? uTime * 11. : aPivot.w < 2.5 ? -uTime * 11. : sin(uTime * .55) * .7;
    q.xz = rot2(ang) * q.xz;
    p = aPivot.xyz + q;
  }
  float ui = clamp(uIntro * 1.5 - hs * .3 - .2, 0., 1.); ui = 1. - pow(1. - ui, 3.);   // every point lands by the end of the intro
  p = mix(aScat, p, ui);

  vec3 col; float sz;
  if (kind < .5)      { col = vec3(.55, .7, .9) * .62; sz = .032; }
  else if (kind < 1.5){ col = vec3(.8, .92, 1.) * 1.45; sz = .036; }
  else if (kind < 2.5){ col = vec3(.4, .45, .78) * .36; sz = .03; }
  else if (kind < 3.5){ col = screen(u, v) * 1.15; sz = .034; }
  else if (kind < 4.5){ col = vec3(.72, .86, 1.) * 1.9; sz = .038; }
  else if (kind < 5.5){
    vec3 lc = u < .5 ? vec3(1., .28, .32) : u < 1.5 ? vec3(.35, 1., .6) : vec3(1., .95, .9);
    float blink = .5 + .5 * pow(max(0., sin(uTime * 3. + h1(u * 7.1) * 6.)), 6.);
    col = lc * (1.1 + 1.3 * blink); sz = .03;
  }
  else if (kind < 6.5){ col = vec3(.82, .9, 1.) * 1.15; sz = .032; }
  else if (kind < 7.5){ col = vec3(.6, .75, 1.) * .2; sz = .036; }
  else                { col = vec3(.36, .79, .65) * 1.3; sz = .032; }
  col *= mix(1.5, 1., ui);

  vec4 mv = modelViewMatrix * vec4(p, 1.);
  float z = max(.05, -mv.z);
  gl_PointSize = min(sz * uObjScale * uSizeK * (.85 + .3 * sin(uTime * 2.1 + hs * 6.28)) * uPxScale / z, uMaxPt);
  vColor = col * uOp * smoothstep(.12, .6, z);
  gl_Position = projectionMatrix * mv;
}`;

function makeOne(d, style, radius) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(d.pos, 3));
  g.setAttribute('aPart', new THREE.BufferAttribute(d.part, 4));
  g.setAttribute('aPivot', new THREE.BufferAttribute(d.pivot, 4));
  g.setAttribute('aScat', new THREE.BufferAttribute(d.scat, 3));
  const u = {
    uTime: { value: 0 }, uIntro: { value: 0 }, uOp: { value: 0 }, uSizeK: { value: 1 }, uPxScale: { value: 100 },
    uMaxPt: { value: 64 }, uObjScale: { value: 1 }, uStyle: { value: style },
  };
  const pts = new THREE.Points(g, new THREE.ShaderMaterial({
    vertexShader: GADGET_VERT, fragmentShader: SPRITE_FRAG, uniforms: u,
    transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  pts.frustumCulled = false;
  pts.renderOrder = 12;
  const group = new THREE.Group();
  group.add(pts);
  return { group, points: pts, u, geometry: g, total: d.pos.length / 3, radius };
}

export function createGadgets(data) {
  // the glasses are drawn from the front hinge line backwards, so shift them to rotate about their middle
  const glasses = makeOne(data.glasses, 0, 0.8);
  glasses.points.position.z = 0.55;
  return { glasses, pocket: makeOne(data.pocket, 1, 0.72), drone: makeOne(data.drone, 2, 0.95) };
}

// Draw only a share of each gadget's points (tiers) and keep their brightness steady.
export function setGadgetBudget(gadgets, frac) {
  for (const k of ['glasses', 'pocket', 'drone']) {
    const o = gadgets[k], n = Math.max(600, Math.round(o.total * frac));
    o.geometry.setDrawRange(0, n);
    o.u.uSizeK.value = Math.sqrt(o.total / n);
  }
}
