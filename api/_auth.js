// Dipakai bareng-bareng sama api/upload.js, api/photos.js, api/delete.js.
//
// Password-nya ga pernah ada di kode. Dia diambil dari Environment Variables
// di dashboard Vercel, dan yang ngecek server — bukan browser. Jadi orang
// ga bisa nemu kodenya lewat Inspect Element / view-source.
//
// Semua handler di folder api/ pakai gaya Node (req, res) — bukan gaya Web
// (Request/Response). Gaya Web cuma jalan di runtime Edge, sedangkan
// @vercel/blob butuh Node. Salah campur = function-nya crash.

export const sendJson = (res, body, status = 200) => {
  res.status(status);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
};

// Dibandingin karakter per karakter sampe abis, ga berhenti pas ketemu beda.
// Kalau berhenti di karakter pertama yang salah, lama-ga-nya respon bisa
// dipake buat nebak kodenya satu-satu. Ini nutup celah itu.
function sameSecret(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Balikin true kalau lolos. Kalau ditolak, respon udah dikirim di sini —
// pemanggilnya tinggal `return`.
export function checkPassword(req, res, envName) {
  // Di-trim karena nge-paste nilai ke dashboard Vercel gampang kebawa spasi
  // atau enter di ujung — kalau ga dibuang, kode yang bener pun ketolak.
  const expected = process.env[envName]?.trim();

  if (!expected) {
    sendJson(res, { error: `Server is not configured (${envName}).` }, 500);
    return false;
  }

  // Nama header di Node selalu huruf kecil.
  const given = (req.headers["x-access-code"] ?? "").trim();
  if (!sameSecret(given, expected)) {
    sendJson(res, { error: "Wrong code." }, 401);
    return false;
  }

  return true;
}

// Vercel udah nge-parse body JSON sendiri, tapi kadang kekirim sebagai teks
// mentah. Dua-duanya diurus di sini biar aman.
export function readJsonBody(req) {
  const body = req.body;
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}
