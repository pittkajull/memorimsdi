// Ngecilin foto di browser sebelum dikirim.
//
// Kenapa di browser, bukan di server: foto dari HP jaman sekarang 3-8 MB.
// Kalau dikirim mentah, uploadnya lama (apalagi kuota), dan server harus
// ngolah gambar — butuh library berat yang ga muat di serverless function.
// Canvas udah ada di semua browser dan gratis, jadi kerjaan beratnya
// dikasih ke HP yang ngirim.
//
// Hasilnya .webp lebar maks 900px — sama persis kaya setelan fotoenjoy di
// scripts/optimize-images.mjs, biar nyampur mulus sama foto bawaan.

const MAX_WIDTH = 900;
const QUALITY = 0.82;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read the photo. Try a different one."));
    };
    img.src = url;
  });
}

export async function compressImage(file) {
  // createImageBitmap ngurus rotasi EXIF sendiri, jadi foto potret dari HP
  // ga kebalik. Kalau browsernya jadul, balik ke <img> biasa.
  let source;
  try {
    source = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    source = await loadImage(file);
  }

  const scale = Math.min(1, MAX_WIDTH / source.width);
  const width = Math.round(source.width * scale);
  const height = Math.round(source.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, width, height);
  source.close?.();

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", QUALITY)
  );

  if (!blob) throw new Error("Could not compress the photo.");

  // Dikirim sebagai data URL (teks) biar bisa masuk ke body JSON biasa.
  // Multipart/form-data butuh parser tambahan di server dan gampang rusak.
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the photo."));
    reader.readAsDataURL(blob);
  });
}
