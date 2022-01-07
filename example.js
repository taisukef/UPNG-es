import { UPNG } from "./UPNG.js";

const w = 128;
const hgrad = 8;
const h = 256 * hgrad;

var im1 = new Uint16Array(new ArrayBuffer(w * h * 2));
var im2 = new Uint8Array(new ArrayBuffer(w * h));

const toLE = (n) => ((n << 8) & 0xff00) | ((n >> 8) & 0xff);

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    const n = i * 0x10000 / h;
    im1[i * w + j] = toLE(n); ////toLE(j * w + Math.floor(i / hgrad));
    im2[i * w + j] = n >> 8; // (j * w + Math.floor(i / hgrad)) >> 8;
  }
}
const imgFile = UPNG.encodeLL([im1.buffer], w, h, 1, 0, 16, [0]);
await Deno.writeFile("test-16bit.png", new Uint8Array(imgFile));

const imgFile2 = UPNG.encodeLL([im2.buffer], w, h, 1, 0, 8, [0]);
await Deno.writeFile("test-8bit.png", new Uint8Array(imgFile2));
