// Nerima foto kiriman. Wajib bawa kode yang cocok sama UPLOAD_PASSWORD.
//
// Fotonya udah dikecilin + diubah ke webp di browser (lihat uploadphoto.jsx),
// jadi di sini ga perlu proses gambar sama sekali — tinggal simpen.
//
// Dikirimnya sebagai JSON berisi data URL, bukan multipart/form-data.
// Alasannya: parsing multipart di serverless function butuh library tambahan
// dan gampang rusak, sedangkan JSON udah diurus Vercel sendiri.

import { put } from "@vercel/blob";
import { sendJson, checkPassword, readJsonBody } from "./_auth.js";

// Base64 bikin data membengkak ~33%, jadi batasnya digedein dari ukuran asli.
// Browser udah ngompres ke ~150 KB, ini cuma jaring pengaman.
export const config = {
  api: { bodyParser: { sizeLimit: "6mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  if (!checkPassword(req, res, "UPLOAD_PASSWORD")) return;

  const { image } = readJsonBody(req);

  if (typeof image !== "string" || !image.startsWith("data:image/")) {
    return sendJson(res, { error: "No photo received." }, 400);
  }

  const comma = image.indexOf(",");
  if (comma < 0) {
    return sendJson(res, { error: "Malformed photo data." }, 400);
  }

  const mime = image.slice(5, image.indexOf(";"));
  const buffer = Buffer.from(image.slice(comma + 1), "base64");

  if (!buffer.length) {
    return sendJson(res, { error: "Photo is empty." }, 400);
  }
  if (buffer.length > 4 * 1024 * 1024) {
    return sendJson(res, { error: "Photo is too large." }, 413);
  }

  try {
    // addRandomSuffix bikin nama filenya unik, jadi dua orang yang ngirim
    // foto dengan nama sama ga saling nimpa.
    const blob = await put("kiriman/foto.webp", buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType: mime || "image/webp",
    });

    return sendJson(res, { url: blob.url, pathname: blob.pathname }, 201);
  } catch (err) {
    console.error("Gagal simpen foto:", err);
    return sendJson(res, { error: "Could not save the photo." }, 500);
  }
}
