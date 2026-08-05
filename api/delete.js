// Hapus foto kiriman. Pakai ADMIN_PASSWORD — sengaja dibedain dari
// UPLOAD_PASSWORD, biar kode yang lu sebar ke temen-temen cuma bisa nambah,
// ga bisa ngapus.

import { del } from "@vercel/blob";
import { json, checkPassword } from "./_auth.js";

export const config = { runtime: "edge" };

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ error: "Method ga didukung." }, 405);
  }

  const denied = checkPassword(request, "ADMIN_PASSWORD");
  if (denied) return denied;

  let url;
  try {
    ({ url } = await request.json());
  } catch {
    return json({ error: "Data kiriman rusak." }, 400);
  }

  if (typeof url !== "string" || !url) {
    return json({ error: "URL fotonya ga ada." }, 400);
  }

  try {
    await del(url);
    return json({ ok: true });
  } catch (err) {
    console.error("Gagal hapus foto:", err);
    return json({ error: "Gagal ngapus." }, 500);
  }
}
