// Off-main-thread builder: keeps the loading screen smooth while 180k stars are placed.
import { buildMain, buildLaptop } from './build-data.js';

self.onmessage = (e) => {
  const d = e.data;
  const main = buildMain(d);
  const laptop = buildLaptop({ N: d.NL });
  const out = { main, laptop };
  self.postMessage(out, [
    main.pos.buffer, main.scat.buffer, main.tun.buffer, main.lock.buffer, main.misc.buffer,
    laptop.pos.buffer, laptop.uvk.buffer, laptop.scat.buffer,
  ]);
};
