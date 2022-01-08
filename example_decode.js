import { UPNG } from "./UPNG.js";

const bin = await Deno.readFile("png-color.png");
const img = UPNG.decode(bin);
console.log(img);
