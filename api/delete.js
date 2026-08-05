// Hapus foto kiriman. Pakai ADMIN_PASSWORD — sengaja dibedain dari
// UPLOAD_PASSWORD, biar kode yang lu sebar ke temen-temen cuma bisa nambah,
// ga bisa ngapus.

import { del } from "@vercel/blob";
import { sendJson, checkPassword, readJsonBody } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  if (!checkPassword(req, res, "ADMIN_PASSWORD")) return;

  const { url } = readJsonBody(req);

  if (typeof url !== "string" || !url) {
    return sendJson(res, { error: "Missing photo URL." }, 400);
  }

  try {
    await del(url);
    return sendJson(res, { ok: true });
  } catch (err) {
    console.error("Gagal hapus foto:", err);
    return sendJson(res, { error: "Could not delete." }, 500);
  }
}
