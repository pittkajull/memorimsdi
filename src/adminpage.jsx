import { useState, useEffect, useCallback } from "react";

// Halaman buat ngapus foto kiriman.
//
// Kode adminnya ga pernah disimpen di browser (ga ada localStorage) —
// cuma nempel di state selama tab kebuka. Tutup tab, kelar, harus ngetik lagi.
// Yang mutusin bener/salah tetep server, sama kaya di uploadphoto.jsx.

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      setPhotos(data.photos || []);
    } catch {
      setError("Could not load the photos.");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (!code.trim()) return setError("Enter the code first.");

    setChecking(true);
    setError("");
    try {
      // Ngetes kode tanpa endpoint tambahan: /api/delete ngecek password
      // duluan, baru ngecek isi body. Jadi body kosong ngasih dua jawaban
      // yang beda — 401 kalau kodenya salah, 400 kalau kodenya bener.
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-access-code": code.trim(),
        },
        body: JSON.stringify({}),
      });

      if (res.status === 401) throw new Error("Wrong code.");
      if (res.status >= 500) throw new Error(`Server error (${res.status}).`);

      setAuthed(true);
      loadPhotos();
    } catch (err) {
      setError(err.message);
    } finally {
      setChecking(false);
    }
  };

  const remove = async (url) => {
    if (!window.confirm("Delete this photo? This cannot be undone.")) return;

    setDeleting(url);
    setError("");
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-access-code": code.trim(),
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || `Delete failed (${res.status}).`);

      setPhotos((prev) => prev.filter((p) => p.url !== url));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    document.title = "Admin · MEMORI MSDI";
  }, []);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <h1 className="text-xl font-bold text-white">Admin</h1>
          <p className="mt-1.5 text-sm text-white/40">
            Enter the admin code to manage uploaded photos.
          </p>

          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            autoFocus
            disabled={checking}
            placeholder="Admin code"
            className="mt-5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition placeholder:text-white/25 focus:border-amber-500/50 disabled:opacity-50"
          />

          {error && (
            <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={checking}
            className="mt-4 w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:opacity-40"
          >
            {checking ? "Checking…" : "Enter"}
          </button>

          <a
            href="/"
            className="mt-4 block text-center text-xs text-white/30 transition hover:text-white/60"
          >
            ← Back to the site
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Uploaded photos</h1>
            <p className="mt-1 text-sm text-white/40">
              {loading
                ? "Loading…"
                : `${photos.length} photo${photos.length === 1 ? "" : "s"} · only uploads appear here, not the original gallery`}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadPhotos}
              disabled={loading}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 disabled:opacity-40"
            >
              Refresh
            </button>
            <a
              href="/"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5"
            >
              Back to site
            </a>
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {error}
          </p>
        )}

        {!loading && photos.length === 0 && (
          <p className="mt-16 text-center text-sm text-white/30">
            No uploaded photos yet.
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <div
              key={p.url}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <img
                src={p.url}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover"
              />

              <button
                onClick={() => remove(p.url)}
                disabled={deleting === p.url}
                className="absolute inset-x-0 bottom-0 bg-black/70 py-2 text-xs font-medium text-red-300 opacity-0 backdrop-blur-sm transition hover:bg-red-500/25 hover:text-red-200 group-hover:opacity-100 disabled:opacity-100 max-sm:opacity-100"
              >
                {deleting === p.url ? "Deleting…" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
