import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const TILE = "#211B1C";
const INK = "#E8733F";

const PAW = '<rect x="106" y="196" width="56" height="56"/><rect x="182" y="138" width="66" height="66"/><rect x="264" y="138" width="66" height="66"/><rect x="350" y="196" width="56" height="56"/><polygon points="198,266 314,266 338,384 174,384"/>';
const RULE = '<rect x="56" y="412" width="400" height="18"/>';

const full = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="${TILE}"/><g fill="${INK}">${PAW}${RULE}</g></svg>`;

const small = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="${TILE}"/><g fill="${INK}"><rect x="6.5" y="12" width="3.5" height="3.5"/><rect x="11.5" y="8.5" width="4" height="4"/><rect x="16.5" y="8.5" width="4" height="4"/><rect x="22" y="12" width="3.5" height="3.5"/><polygon points="12.5,16.5 19.5,16.5 21,24 11,24"/><rect x="4" y="26.5" width="24" height="1.5"/></g></svg>`;

const tiny = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="${TILE}"/><g fill="${INK}"><rect x="2.5" y="5.5" width="2.5" height="2.5"/><rect x="6" y="3.5" width="3" height="3"/><rect x="10" y="3.5" width="3" height="3"/><polygon points="5.5,9 10.5,9 11.5,13.5 4.5,13.5"/></g></svg>`;

const targets = [
  { size: 16, name: "favicon-16x16.png", source: tiny },
  { size: 32, name: "favicon-32x32.png", source: small },
  { size: 180, name: "apple-touch-icon.png", source: full },
  { size: 192, name: "android-chrome-192x192.png", source: full },
  { size: 512, name: "android-chrome-512x512.png", source: full },
];

async function render(source, size) {
  return sharp(Buffer.from(source), { density: Math.max(72, Math.ceil((72 * size) / 32)) })
    .resize(size, size)
    .png()
    .toBuffer();
}

for (const { size, name, source } of targets) {
  await writeFile(join(publicDir, name), await render(source, size));
  console.log("Generated", name);
}

const icoImages = [
  { size: 16, data: await render(tiny, 16) },
  { size: 32, data: await render(small, 32) },
  { size: 48, data: await render(small, 48) },
];

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);

let offset = 6 + icoImages.length * 16;
const entries = icoImages.map(({ size, data }) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += data.length;
  return entry;
});

await writeFile(join(publicDir, "favicon.ico"), Buffer.concat([header, ...entries, ...icoImages.map((i) => i.data)]));
console.log("Generated favicon.ico (16, 32, 48)");
