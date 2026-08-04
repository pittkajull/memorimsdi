import { useEffect, useRef, useState } from "react";

// Nama filenya ada spasi & tanda kurung, jadi harus di-encode — kalau ditulis
// mentah, sebagian browser motong path-nya di spasi pertama.
const TRACK = encodeURI("/music/Phoebe Bridgers - Scott Street (Official Video).mp3");
const TITLE = "Scott Street";
const ARTIST = "Phoebe Bridgers";

const TARGET_VOLUME = 0.35;

// Jeda sebelum lagunya masuk, dihitung dari sentuhan pertama user.
// Dikasih jarak biar ga nabrak animasi masuk hero yang durasinya ~2.5 detik.
const START_DELAY_MS = 3500;

// Lama notif kecilnya nongol
const TOAST_MS = 5200;

export default function Music() {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const startTimerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState(false);

  // Kalau user udah pernah mencet tombolnya, jangan diputer otomatis lagi —
  // biar pilihan dia yang menang, bukan kodenya.
  const touchedRef = useRef(false);

  // Volume-nya dinaik-turunin halus, biar lagunya ga nyeplak/motong pas
  // dinyalain atau dimatiin.
  const fadeTo = (target, onDone) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);

    const step = (target - audio.volume) / 18;
    fadeRef.current = setInterval(() => {
      const next = audio.volume + step;
      const done = step > 0 ? next >= target : next <= target;
      audio.volume = done ? target : Math.min(1, Math.max(0, next));
      if (done) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
        onDone?.();
      }
    }, 25);
  };

  const start = ({ announce = false } = {}) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(TARGET_VOLUME);
        if (announce) {
          setToast(true);
          toastTimerRef.current = setTimeout(() => setToast(false), TOAST_MS);
        }
      })
      .catch(() => {});
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setToast(false);
    fadeTo(0, () => {
      audio.pause();
      setPlaying(false);
    });
  };

  const toggle = () => {
    touchedRef.current = true;
    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
    }
    playing ? stop() : start();
  };

  // Browser ngeblok audio yang jalan sendiri sebelum ada interaksi — jadi
  // "muter otomatis pas dibuka" itu ga mungkin apa adanya. Yang dilakuin di
  // sini: nunggu sentuhan pertama apa pun (scroll/klik/tombol), yang biasanya
  // kejadian dalam sedetik, baru lagunya masuk setelah jeda. Rasanya tetep
  // kaya jalan sendiri, tapi ga ditolak browser.
  useEffect(() => {
    const tryStart = () => {
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
      window.removeEventListener("wheel", tryStart);
      window.removeEventListener("touchstart", tryStart);
      if (touchedRef.current) return;

      startTimerRef.current = setTimeout(() => {
        if (!touchedRef.current) start({ announce: true });
      }, START_DELAY_MS);
    };

    window.addEventListener("pointerdown", tryStart, { once: true });
    window.addEventListener("keydown", tryStart, { once: true });
    window.addEventListener("wheel", tryStart, { once: true });
    window.addEventListener("touchstart", tryStart, { once: true });

    return () => {
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
      window.removeEventListener("wheel", tryStart);
      window.removeEventListener("touchstart", tryStart);
      if (fadeRef.current) clearInterval(fadeRef.current);
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={TRACK} loop preload="auto" />

      {/* Nempel di pojok kanan bawah, ngambang di atas semua section */}
      <div className="fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          aria-pressed={playing}
          className="group flex items-center gap-0 rounded-full border border-white/15 bg-black/60
                     py-2 pl-2 pr-2 backdrop-blur-md transition-all duration-500
                     hover:border-amber-400/50 hover:bg-black/80 hover:pr-4"
        >
          {/* Lingkaran ikon */}
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
            {/* Cincin muter — cuma jalan pas lagunya nyala */}
            <span
              className={`absolute inset-0 rounded-full border border-transparent
                          transition-opacity duration-500
                          ${playing ? "opacity-100" : "opacity-0"}`}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(251,191,36,0.75) 50%, transparent 75%)",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                animation: playing ? "spin 3.5s linear infinite" : "none",
              }}
            ></span>

            {playing ? (
              // Batang penyetara — ngasih tau lagunya jalan tanpa perlu tulisan
              <span className="flex items-end gap-[3px]">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-[2px] origin-bottom rounded-full bg-amber-300"
                    style={{
                      height: "13px",
                      animation: `eq 900ms ease-in-out ${i * 130}ms infinite`,
                    }}
                  ></span>
                ))}
              </span>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-[2px] h-4 w-4 text-white/70 transition-colors duration-300 group-hover:text-amber-300"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>

          {/* Judul lagunya — nyempil keluar pas disenggol kursor.
              grid-cols-[0fr] -> [1fr] bikin lebarnya bisa dianimasiin,
              yang ga bisa dilakuin cuma pakai width auto. */}
          <span
            className="grid grid-cols-[0fr] overflow-hidden transition-all duration-500 ease-out
                       group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]"
          >
            <span className="min-w-0 overflow-hidden whitespace-nowrap pl-0 text-left transition-all duration-500 group-hover:pl-3">
              <span className="block text-[11px] leading-tight text-white/90">{TITLE}</span>
              <span className="block text-[9px] uppercase tracking-[0.15em] text-white/40">
                {ARTIST}
              </span>
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
