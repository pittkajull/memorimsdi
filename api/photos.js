// Daftar foto hasil upload. Ga perlu kode — ini yang dibaca galeri buat
// nampilin foto tambahan di samping foto bawaan.

import { list } from "@vercel/blob";
import { json } from "./_auth.js";

// Runtime-nya Node (default), bukan Edge — lihat catatan di api/delete.js.

export default async function handler() {
  try {
    const { blobs } = await list({ prefix: "kiriman/", limit: 1000 });

    // Yang paling baru ditaro paling depan biar keliatan duluan.
    const photos = blobs
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .map((b) => ({
        url: b.url,
        pathname: b.pathname,
        uploadedAt: b.uploadedAt,
      }));

    return json({ photos });
  } catch (err) {
    // Kalau Blob store belum dibikin, jangan bikin galeri ikut mati —
    // balikin kosong aja, foto bawaan tetep tampil.
    console.error("Gagal baca daftar foto:", err);
    return json({ photos: [] });
  }
}
