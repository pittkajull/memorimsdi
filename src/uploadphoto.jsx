import { useState, useRef, useEffect } from "react";
import { compressImage } from "./compressimage";

// Tombol + modal buat nambahin foto ke galeri.
//
// Kode rahasianya ga disimpen di sini dan ga pernah dibandingin di browser —
// dia dikirim ke /api/upload dan yang mutusin bener/salah itu server.
// Jadi ngoprek JS di devtools ga bikin orang bisa lolos.

const MAX_FILES = 10;

export default function UploadPhoto({ onUploaded }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(0);
  const inputRef = useRef(null);

  // Esc buat nutup, dan matiin scroll di belakang modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !busy) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, busy]);

  const pickFiles = (list) => {
    const picked = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (!picked.length) {
      setError("Please pick image files.");
      return;
    }
    setError("");
    setFiles(picked.slice(0, MAX_FILES));
  };

  const reset = () => {
    setFiles([]);
    setDone(0);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return setError("Enter the code first.");
    if (!files.length) return setError("Pick some photos first.");

    setBusy(true);
    setError("");
    setDone(0);

    const urls = [];
    try {
      // Satu-satu, bukan sekaligus. Lebih pelan tapi ga bikin koneksi HP
      // keteteran, dan progresnya keliatan jelas.
      for (const file of files) {
        const image = await compressImage(file);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-access-code": code.trim(),
          },
          body: JSON.stringify({ image }),
        });

        // Kalau function-nya crash, yang balik itu halaman error HTML —
        // bukan JSON. Statusnya ditempel ke pesan biar ketauan bedanya.
        const data = await res.json().catch(() => null);
        if (!res.ok || !data) {
          throw new Error(data?.error || `Upload failed (${res.status}).`);
        }

        urls.push(data.url);
        setDone((n) => n + 1);
      }

      onUploaded?.(urls);
      setOpen(false);
      reset();
      setCode("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white/70 backdrop-blur-sm transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-white"
      >
        <span className="text-lg leading-none text-amber-500/70 transition group-hover:rotate-90 group-hover:text-amber-400">
          +
        </span>
        Add your photo
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => !busy && setOpen(false)}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white">Add your photo</h3>
            <p className="mt-1.5 text-sm text-white/40">
              You&apos;ll need the code from the admin. Photos are resized
              automatically, so big files are fine.
            </p>

            <label className="mt-5 block text-xs uppercase tracking-wider text-white/40">
              Code
            </label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
              disabled={busy}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition placeholder:text-white/25 focus:border-amber-500/50 disabled:opacity-50"
              placeholder="Enter the code"
            />

            <label className="mt-4 block text-xs uppercase tracking-wider text-white/40">
              Photos <span className="normal-case tracking-normal">(max {MAX_FILES})</span>
            </label>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              disabled={busy}
              onChange={(e) => pickFiles(e.target.files)}
              className="mt-1.5 w-full cursor-pointer rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white/60 outline-none transition file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white/80 hover:border-white/25 disabled:opacity-50"
            />

            {files.length > 0 && (
              <p className="mt-2 text-xs text-white/40">
                {files.length} photo{files.length > 1 ? "s" : ""} selected
                {busy && ` · ${done}/${files.length} uploaded`}
              </p>
            )}

            {error && (
              <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={busy}
                className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/5 disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:opacity-40"
              >
                {busy ? "Uploading…" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
