// Mindahin foto asli dari public/images/ ke _originals/ — sekali jalan doang.
//
//   node scripts/move-originals.mjs          (lihat dulu, ga ngubah apa-apa)
//   node scripts/move-originals.mjs --apply  (beneran mindahin)
//
// Kenapa dipindah: yang dibaca kode cuma .webp. Selama aslinya masih di
// public/, dia ikut ke-deploy walau ga pernah dibuka — ukuran deploy jadi
// dobel buat file yang ga kepake. Di luar public/ dia tetep ke-commit ke git
// (jadi tetep aman ke-backup) tapi ga ikut ke-upload.
//
// Yang dipindah cuma .jpg/.jpeg/.png. File .webp dan .svg tetep di tempatnya.
// Pakai `git mv` kalau filenya ke-track, biar git ngerti ini pindahan bukan
// hapus + bikin baru — riwayatnya kejaga.

import { readdir, stat, mkdir, rename } from "node:fs/promises";
import { join, extname, relative, dirname } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

const SRC = "public/images";
const DST = "_originals";
const APPLY = process.argv.includes("--apply");

const MOVE_EXT = new Set([".jpg", ".jpeg", ".png"]);

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
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
    else if (MOVE_EXT.has(extname(entry.name).toLowerCase())) out.push(path);
  }
  return out;
}

if (!(await exists(SRC))) {
  console.log(`Folder ${SRC} ga ketemu.`);
  process.exit(1);
}

const files = await walk(SRC);

if (files.length === 0) {
  console.log(`\nGa ada file asli di ${SRC} — kayanya udah dipindah.\n`);
  process.exit(0);
}

let bytes = 0;
for (const f of files) bytes += (await stat(f)).size;

console.log(
  `\n${files.length} file asli (${mb(bytes)} MB) di ${SRC}\n` +
    `Tujuan: ${DST}\n`
);

if (!APPLY) {
  for (const f of files.slice(0, 8)) {
    console.log(`  ${relative(SRC, f)}`);
  }
  if (files.length > 8) console.log(`  ... dan ${files.length - 8} lagi`);
  console.log(
    `\nIni cuma pratinjau. Buat beneran mindahin:\n` +
      `  node scripts/move-originals.mjs --apply\n`
  );
  process.exit(0);
}

let viaGit = 0;
let viaFs = 0;
let skipped = 0;

for (const file of files) {
  const sub = relative(SRC, file);
  const target = join(DST, sub);

  if (await exists(target)) {
    console.log(`  ~ ${sub}  (udah ada di tujuan, dilewat)`);
    skipped++;
    continue;
  }

  await mkdir(dirname(target), { recursive: true });

  // git mv cuma jalan buat file yang ke-track. Yang belum ke-track dipindah
  // biasa — hasilnya sama, cuma ga ada riwayat buat dijaga.
  try {
    await run("git", ["mv", file, target]);
    viaGit++;
  } catch {
    await rename(file, target);
    viaFs++;
  }
}

console.log(
  [
    ``,
    `Selesai: ${viaGit} lewat git mv, ${viaFs} pindah biasa` +
      (skipped ? `, ${skipped} dilewat` : ``),
    ``,
    `Cek dulu sebelum commit:`,
    `  npm run build`,
    ``,
  ].join("\n")
);
