// Dipakai bareng-bareng sama api/upload.js, api/photos.js, api/delete.js.
//
// Password-nya ga pernah ada di kode. Dia diambil dari Environment Variables
// di dashboard Vercel, dan yang ngecek server — bukan browser. Jadi orang
// ga bisa nemu kodenya lewat Inspect Element / view-source.

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

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

// Balikin null kalau lolos, atau Response error kalau ditolak.
export function checkPassword(request, envName) {
  const expected = process.env[envName];

  if (!expected) {
    return json(
      { error: `Server is not configured (${envName} is missing).` },
      500
    );
  }

  const given = request.headers.get("x-access-code") ?? "";
  if (!sameSecret(given, expected)) {
    return json({ error: "Wrong code." }, 401);
  }

  return null;
}
