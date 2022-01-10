import { UPNG } from "../UPNG.js";

const w = 256;
const hgrad = 1;
const h = 256 * hgrad;

var im1 = new Uint16Array(new ArrayBuffer(w * h * 2 * 3));

const toLE = (n) => ((n << 8) & 0xff00) | ((n >> 8) & 0xff);

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    const n = i * 0x10000 / h;
    im1[(i * w + j) * 3 + 0] = toLE(n);
    im1[(i * w + j) * 3 + 1] = toLE(0xffff - n);
    im1[(i * w + j) * 3 + 2] = toLE(j << 8);
  }
}
const img = UPNG.encodeLL([im1.buffer], w, h, 3, 0, 16, [0]);
await Deno.writeFile("test-16bit-color-srgb.png", img);

// https://github.com/saucecontrol/Compact-ICC-Profiles
const icc = await Deno.readFile("DisplayP3Compat-v4.icc");
const img2 = UPNG.encodeLL([im1.buffer], w, h, 3, 0, 16, [0], null, icc);
await Deno.writeFile("test-16bit-color-displayp3.png", img2);

// https://github.com/saucecontrol/Compact-ICC-Profiles
const icc3 = await Deno.readFile("Rec2020Compat-v4.icc");
const img3 = UPNG.encodeLL([im1.buffer], w, h, 3, 0, 16, [0], null, icc3);
await Deno.writeFile("test-16bit-color-rec2020.png", img3);
