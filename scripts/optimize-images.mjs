// Ngubah foto asli jadi WebP yang dipakai web.
//
// Jalanin: node scripts/optimize-images.mjs
//
//   _originals/fotoenjoy/foto.JPG  ->  public/images/fotoenjoy/foto.webp
//
// Aslinya ditaro di _originals/ (di luar public/) supaya ga ikut ke-deploy —
// yang naik ke server cuma .webp-nya, jadi ukurannya ga dobel. Aslinya tetep
// ke-commit ke git, jadi tetep ke-backup dan bisa dipakai ulang kapan aja
// (webp itu hasil kompres, ga bisa dibalikin ke aslinya).
//
// Nambah foto baru: taro filenya di _originals/<folder>/, jalanin script ini.
// File yang .webp-nya udah ada bakal dilewat, jadi aman dijalanin berkali-kali.
//
// Setelan per folder beda-beda sesuai jenis gambarnya. Foto biasa aman
// dikompres lossy; kartun (bidang warna rata + garis tegas + transparan)
// gampang keliatan kotor kalau lossy, jadi dipakein lossless.

import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import { join, extname, basename, dirname, relative } from "node:path";

const SRC = "_originals";
const OUT = "public/images";

// Kalau dikasih --force, file yang .webp-nya udah ada tetep dibikin ulang.
// Kepake kalau setelan di bawah diubah dan mau nerapin ke semua foto.
const FORCE = process.argv.includes("--force");

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

    // Foto ini dipakai dua kali dengan ukuran yang jauh beda: sebagai kotak
    // kecil di globe, dan sebagai foto besar pas kotaknya diklik. Kotaknya
    // cuma sekitar 75px, tapi kalau yang dipasang file 900px, browser tetap
    // ngedekode semuanya — sekitar 4 MB di memori PER FOTO, dikali 61 foto.
    // HP ga punya jatah segitu buat satu tab, jadi gambarnya dibuang lalu
    // didekode ulang terus-terusan. Itu yang bikin globe-nya nyendat-nyendat.
    //
    // Jadi dibikin satu set kecil khusus globe. Yang gede tetap dipakai buat
    // tampilan besarnya, jadi kualitasnya ga berubah dari sisi yang keliatan.
    thumb: {
      dir: "thumb",
      maxWidth: 220,
      webp: { quality: 72, effort: 6 },
    },
  },
];

const DEFAULT_RULE = {
  label: "lain-lain",
  maxWidth: 1400,
  webp: { quality: 84, effort: 6 },
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
const exists = (p) =>
  stat(p).then(
    () => true,
    () => false
  );

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) out.push(path);
  }
  return out;
}

const ruleFor = (path) =>
  RULES.find((r) => path.includes(r.match)) ?? DEFAULT_RULE;

if (!(await exists(SRC))) {
  console.log(
    [
      ``,
      `Folder ${SRC}/ ga ketemu.`,
      ``,
      `Foto aslinya taro di situ, ikutin nama foldernya:`,
      `  ${SRC}/fotoenjoy/   ${SRC}/potostudio/`,
      `  ${SRC}/fotokakaks/  ${SRC}/fotokartun/`,
      ``,
    ].join("\n")
  );
  process.exit(1);
}

const files = await walk(SRC);
if (files.length === 0) {
  console.log(`Ga ada gambar di ${SRC}/`);
  process.exit(0);
}

let before = 0;
let after = 0;
let skipped = 0;
let done = 0;

console.log(`\nNgecek ${files.length} gambar di ${SRC}/...\n`);

for (const file of files) {
  const rule = ruleFor(file);

  // Struktur foldernya ditiru apa adanya ke public/images/
  const sub = relative(SRC, file);
  const stem = basename(sub, extname(sub));
  const target = join(OUT, dirname(sub), `${stem}.webp`);

  // Versi kecil ditaro di subfolder sendiri, nama filenya sama persis —
  // jadi path-nya bisa ditebak dari path aslinya tanpa daftar terpisah.
  const thumbTarget = rule.thumb
    ? join(OUT, dirname(sub), rule.thumb.dir, `${stem}.webp`)
    : null;

  const needMain = FORCE || !(await exists(target));
  const needThumb = thumbTarget && (FORCE || !(await exists(thumbTarget)));

  // Dicek terpisah: yang gede boleh udah ada sementara yang kecil belum
  // (misalnya pas aturan thumb-nya baru ditambahin kaya sekarang).
  if (!needMain && !needThumb) {
    skipped++;
    continue;
  }

  const srcSize = (await stat(file)).size;

  try {
    if (needMain) {
      await mkdir(dirname(target), { recursive: true });
      await sharp(file)
        .rotate() // hormatin EXIF orientation, biar foto HP ga kebalik
        .resize({ width: rule.maxWidth, withoutEnlargement: true })
        .webp(rule.webp)
        .toFile(target);

      const outSize = (await stat(target)).size;
      before += srcSize;
      after += outSize;
      done++;

      const cut = Math.round((1 - outSize / srcSize) * 100);
      console.log(`  ✓ ${sub}  ${mb(srcSize)} → ${mb(outSize)} MB  (-${cut}%)`);
    }

    if (needThumb) {
      await mkdir(dirname(thumbTarget), { recursive: true });
      await sharp(file)
        .rotate()
        .resize({ width: rule.thumb.maxWidth, withoutEnlargement: true })
        .webp(rule.thumb.webp)
        .toFile(thumbTarget);

      done++;
      console.log(`  ✓ ${relative(OUT, thumbTarget)}  (versi kecil buat globe)`);
    }
  } catch (err) {
    console.log(`  ! ${sub}  gagal: ${err.message}`);
  }
}

console.log(
  [
    "",
    done ? `Dibikin : ${done} file` : "Ga ada file baru.",
    // Cuma masuk akal dilaporin kalau ada file gede yang dibikin. Kalau yang
    // dibikin cuma versi kecilnya, ga ada pembanding ukuran aslinya.
    before ? `Hemat   : ${mb(before)} MB jadi ${mb(after)} MB (${Math.round((1 - after / before) * 100)}%)` : "",
    skipped ? `Dilewat : ${skipped} file (udah ada)` : "",
    "",
    `Hasilnya di ${OUT}/. Aslinya di ${SRC}/ ga disentuh.`,
    "",
  ]
    .filter(Boolean)
    .join("\n")
);
