// Nerima foto kiriman. Wajib bawa kode yang cocok sama UPLOAD_PASSWORD.
//
// Fotonya udah dikecilin + diubah ke webp di browser (lihat uploadphoto.jsx),
// jadi di sini ga perlu proses gambar sama sekali — tinggal simpen.

import { put } from "@vercel/blob";
import { json, checkPassword } from "./_auth.js";

// Runtime-nya Node (default), bukan Edge — lihat catatan di api/delete.js.

// Browser udah ngompres ke ~150 KB. 3 MB itu batas jaga-jaga kalau ada yang
// nembak endpoint-nya langsung tanpa lewat halaman kita.
const MAX_BYTES = 3 * 1024 * 1024;
const ALLOWED = new Set(["image/webp", "image/jpeg", "image/png"]);

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ error: "Method ga didukung." }, 405);
  }

  const denied = checkPassword(request, "UPLOAD_PASSWORD");
  if (denied) return denied;

  let file;
  try {
    const form = await request.formData();
    file = form.get("file");
  } catch {
    return json({ error: "Data kiriman rusak." }, 400);
  }

  if (!file || typeof file === "string") {
    return json({ error: "Fotonya ga kekirim." }, 400);
  }
  if (!ALLOWED.has(file.type)) {
    return json({ error: "Filenya harus gambar (webp/jpg/png)." }, 415);
  }
  if (file.size > MAX_BYTES) {
    return json({ error: "Fotonya kegedean." }, 413);
  }

  try {
    // addRandomSuffix bikin nama filenya unik, jadi dua orang yang ngirim
    // foto dengan nama sama ga saling nimpa.
    const blob = await put(`kiriman/foto.webp`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });

    return json({ url: blob.url, pathname: blob.pathname }, 201);
  } catch (err) {
    console.error("Gagal simpen foto:", err);
    return json({ error: "Gagal nyimpen di server." }, 500);
  }
}
