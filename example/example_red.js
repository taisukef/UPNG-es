import { UPNG } from "../UPNG.js";

const w = 128;
const hgrad = 8;
const h = 256 * hgrad;

var im1 = new Uint16Array(new ArrayBuffer(w * h * 2 * 3));

const toLE = (n) => ((n << 8) & 0xff00) | ((n >> 8) & 0xff);

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    const n = i * 0x10000 / h;
    im1[(i * w + j) * 3] = toLE(n); ////toLE(j * w + Math.floor(i / hgrad));
  }
}
const img = UPNG.encodeLL([im1.buffer], w, h, 3, 0, 16, [0]);
await Deno.writeFile("test-16bit-red.png", img);
