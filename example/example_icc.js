import { UPNG } from "../UPNG.js";
import { ICC } from "https://taisukef.github.io/ICC-es/ICC.js";

const bin = await Deno.readFile("png-color.png");
const img = UPNG.decode(bin);
console.log(img);
console.log(ICC.parse(img.icc));

const bin2 = UPNG.encodeLL(img);
console.log(bin2);
await Deno.writeFile("png-color-2.png", bin2);

const img2 = UPNG.decode(bin2);
console.log(img2);
console.log(ICC.parse(img2.icc));

img.icc = null;
const bin3 = UPNG.encodeLL(img);
await Deno.writeFile("png-color-3.png", bin3);

img.icc = new Uint8Array(await Deno.readFile("stress.jpg.icc"));
const bin4 = UPNG.encodeLL(img);
await Deno.writeFile("png-color-4.png", bin4);

{
  const img16 = UPNG.decode(await Deno.readFile("test-16bit.png"));
  console.log(img16);
  img16.icc = new Uint8Array(await Deno.readFile("stress.jpg.icc"));
  const bin16 = UPNG.encodeLL(img16);
  await Deno.writeFile("test-16bit-stress.png", bin16);
}
{
  const img16 = UPNG.decode(await Deno.readFile("test-16bit.png"));
  console.log(img16);
  img16.icc = new Uint8Array(await Deno.readFile("png.icc"));
  const bin16 = UPNG.encodeLL(img16);
  await Deno.writeFile("test-16bit-png.png", bin16);
}
{
  const img16 = UPNG.decode(await Deno.readFile("test-16bit-red.png"));
  console.log(img16);
  img16.icc = new Uint8Array(await Deno.readFile("png.icc"));
  const bin16 = UPNG.encodeLL(img16);
  await Deno.writeFile("test-16bit-red-png.png", bin16);
}
// https://github.com/saucecontrol/Compact-ICC-Profiles
{
  const img16 = UPNG.decode(await Deno.readFile("test-16bit-red.png"));
  console.log(img16);
  img16.icc = new Uint8Array(await Deno.readFile("Rec2020Compat-v4.icc"));
  const bin16 = UPNG.encodeLL(img16);
  await Deno.writeFile("test-16bit-red-rec2020.png", bin16);
}
{
  const img16 = UPNG.decode(await Deno.readFile("test-16bit.png"));
  console.log(img16);
  img16.icc = new Uint8Array(await Deno.readFile("Rec2020Compat-v4.icc"));
  const bin16 = UPNG.encodeLL(img16);
  await Deno.writeFile("test-16bit-rec2020.png", bin16);
}
