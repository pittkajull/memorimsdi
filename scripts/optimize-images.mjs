// Ngecilin gambar di public/images jadi WebP.
//
// Jalanin: node scripts/optimize-images.mjs
//
// File aslinya GA disentuh sama sekali — hasilnya ditulis sebagai file .webp
// di sebelah aslinya. Jadi kalau ada yang hasilnya jelek, tinggal hapus
// .webp-nya dan aslinya masih utuh.
//
// Setelan per folder beda-beda sesuai jenis gambarnya. Foto biasa aman
// dikompres lossy; kartun (bidang warna rata + garis tegas + transparan)
// gampang keliatan kotor kalau lossy, jadi dipakein lossless.

import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";

const ROOT = "public/images";

// maxWidth = batas lebar. Gambar yang lebih lebar dari ini dikecilin, yang
// udah lebih kecil dibiarin (withoutEnlargement). Angkanya diambil dari
// ukuran tampil terbesar di web, dikali 2 buat layar retina.
const RULES = [
  {
    match: "fotokartun",
    label: "kartun (lossless, transparan)",
    maxWidth: 500,
    webp: { lossless: true, effort: 6 },
  },
  {
    match: "potostudio",
    label: "hero & studio (tampil sepenuh layar)",
    maxWidth: 2200,
    webp: { quality: 88, effort: 6 },
  },
  {
    match: "fotokakaks",
    label: "mentor",
    maxWidth: 1100,
    webp: { quality: 85, effort: 6 },
  },
  {
    match: "fotoenjoy",
    label: "scrapbook",
    maxWidth: 900,
    webp: { quality: 82, effort: 6 },
  },
];

const DEFAULT_RULE = {
  label: "lain-lain",
  maxWidth: 1400,
  webp: { quality: 84, effort: 6 },
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else if (IMAGE_EXT.has(extname(entry.name))) out.push(path);
  }
  return out;
}

const ruleFor = (path) =>
  RULES.find((r) => path.includes(r.match)) ?? DEFAULT_RULE;

const files = await walk(ROOT);
if (files.length === 0) {
  console.log(`Ga ada gambar di ${ROOT}`);
  process.exit(0);
}

let before = 0;
let after = 0;
let skipped = 0;

console.log(`\nNgolah ${files.length} gambar...\n`);

for (const file of files) {
  const rule = ruleFor(file);
  const target = join(dirname(file), `${basename(file, extname(file))}.webp`);

  const srcSize = (await stat(file)).size;
  before += srcSize;

  try {
    await sharp(file)
      .rotate() // hormatin EXIF orientation, biar foto HP ga kebalik
      .resize({ width: rule.maxWidth, withoutEnlargement: true })
      .webp(rule.webp)
      .toFile(target);

    const outSize = (await stat(target)).size;

    // Kalau hasilnya malah lebih gede (bisa kejadian di PNG kecil), file
    // aslinya yang dipakai — .webp-nya tetep ditulis tapi dihitung sebagai
    // "dilewat" biar angka ringkasannya jujur.
    if (outSize >= srcSize) {
      after += srcSize;
      skipped++;
      console.log(`  ~ ${file}  (aslinya udah lebih kecil, dilewat)`);
      continue;
    }

    after += outSize;
    const cut = Math.round((1 - outSize / srcSize) * 100);
    console.log(`  ✓ ${file}  ${mb(srcSize)} → ${mb(outSize)} MB  (-${cut}%)`);
  } catch (err) {
    after += srcSize;
    skipped++;
    console.log(`  ! ${file}  gagal: ${err.message}`);
  }
}

console.log(
  [
    "",
    `Sebelum : ${mb(before)} MB`,
    `Sesudah : ${mb(after)} MB`,
    `Hemat   : ${mb(before - after)} MB (${Math.round((1 - after / before) * 100)}%)`,
    skipped ? `Dilewat : ${skipped} file` : "",
    "",
    "File aslinya masih utuh. Cek hasilnya dulu, kalau udah oke baru",
    "aslinya dihapus (atau dibiarin — yang kepakai cuma yang .webp).",
    "",
  ]
    .filter(Boolean)
    .join("\n")
);
