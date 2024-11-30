// utils/convertFontToBase64.ts
import fs from "fs";
import path from "path";

const fontPath = path.resolve(
  process.cwd(),
  "public",
  "fonts",
  "Literata-Regular.ttf",
);
const font = fs.readFileSync(fontPath);
const base64Font = font.toString("base64");

console.log(base64Font);
