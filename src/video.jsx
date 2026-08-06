import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Ganti ID-nya aja kalau videonya diganti — ambil dari youtu.be/<ID>
const YT_ID = "rwx7HoWWXjA";

// nocookie: YouTube ga nanem cookie tracking sebelum videonya diputer.
// rel=0 nekan video rekomendasi, modestbranding nyusutin logo YouTube-nya.
const embedUrl =
  `https://www.youtube-nocookie.com/embed/${YT_ID}` +
  `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export default function Video() {
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // maxres ga selalu ada; kalau gagal turun ke hq yang pasti ada
  const [thumb, setThumb] = useState(`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`);

  useGSAP(
    () => {
      gsap.from(".video-frame", {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-6 py-28 md:px-12">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      {/* Cahaya hangat */}
      <div className="glow-orb pointer-events-none absolute left-1/2 top-16 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header — pola sama kaya section lain: label, Caveat, tebal kapital */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/40">One Last Thing</p>
          <h2 className="leading-[1.1]">
            <span className="block font-['Caveat',_cursive] text-5xl text-white/80 md:text-7xl">
              The Whole Year
            </span>
            <span className="mt-1 block text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
              In One Video
            </span>
          </h2>
        </div>

        {/* Layer luar: target GSAP. Jangan taruh class transform di sini. */}
        <div className="video-frame relative">
          {/* Bingkai tipis berlapis di belakang, senada kartu mentor */}
          <div className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full border border-white/10"></div>

          <div className="relative aspect-video overflow-hidden bg-zinc-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,1)]">
            {playing ? (
              <iframe
                src={embedUrl}
                title="Memori MSDI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              ></iframe>
            ) : (
              // Facade: cuma gambar + tombol. Iframe YouTube baru dimuat
              // pas diklik, biar halaman ga kebebanan skrip YouTube di awal.
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Putar video"
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                <img
                  src={thumb}
                  alt=""
                  onError={() => setThumb(`https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`)}
                  className="h-full w-full object-cover brightness-[0.8] grayscale-[0.35]
                             transition-all duration-[900ms] ease-out
                             group-hover:scale-[1.04] group-hover:brightness-100 group-hover:grayscale-0"
                />

                {/* Vignette biar tombolnya kebaca */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

                {/* Tombol play */}
                <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-400/40 bg-black/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-amber-400/80 group-hover:bg-black/60 md:h-24 md:w-24">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-7 w-7 text-white/90 transition-colors duration-500 group-hover:text-amber-300 md:h-9 md:w-9"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                {/* Keterangan di pojok bawah */}
                <span className="pointer-events-none absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.3em] text-white/50 md:bottom-7 md:left-7">
                  Tap to play
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
