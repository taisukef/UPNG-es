import { UPNG } from "../UPNG.js";

const bin = await Deno.readFile("png-color.png");
const img = UPNG.decode(bin);
console.log(img);

const img2 = UPNG.decode(new Uint8Array(bin));
console.log(img2); // it's OK, param Uint8Array
