import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const polaroids = [
  { src: "/images/potostudio/IMG_0003.webp", alt: "hari pertama, masih pada kaku" },
  { src: "/images/potostudio/IMG_0007.webp", alt: "satu frame satu angkatan" },
  { src: "/images/potostudio/IMG_0011.webp", alt: "senyum paksaan tapi tulus" },
  { src: "/images/potostudio/IMG_0015.webp", alt: "jangan kedip, satu lagi" },
  { src: "/images/potostudio/IMG_0019.webp", alt: "hitam-hitam tapi rame" },
  { src: "/images/potostudio/IMG_0022.webp", alt: "yang paling belakang paling ribut" },
  { src: "/images/potostudio/IMG_0026.webp", alt: "kompak walau kepanasan" },
  { src: "/images/potostudio/IMG_0030.webp", alt: "sekali lagi ya, terakhir" },
  { src: "/images/potostudio/IMG_0055.webp", alt: "ketawa yang ga direncanain" },
  { src: "/images/potostudio/IMG_0059.webp", alt: "MSDI, katanya" },
  { src: "/images/potostudio/IMG_0063.webp", alt: "berdiri rapi 3 detik doang" },
  { src: "/images/potostudio/IMG_0067.webp", alt: "ada yang merem, biarin" },
  { src: "/images/potostudio/IMG_0071.webp", alt: "studio jadi rumah sebentar" },
  { src: "/images/potostudio/IMG_0075.webp", alt: "abis ini makan bareng" },
  { src: "/images/potostudio/IMG_0079.webp", alt: "yang penting semua kefoto" },
  { src: "/images/potostudio/IMG_0085.webp", alt: "candid paling jujur" },
  { src: "/images/potostudio/IMG_0090.webp", alt: "satu, dua, tiga, cheese" },
  { src: "/images/potostudio/IMG_0098.webp", alt: "sampai ketemu lagi ya" },
];

// Semua nilai sebaran deterministik — biar ga jumpy tiap re-render
const tilts = [-7, 4, -3, 6, -5, 3, 7, -4, 2, -6, 5, -2];
const offsets = [-70, 50, -20, 80, 10, -100, 40, 60, -50, 25, 90, -35];
const widths = [320, 250, 360, 270, 330, 240, 300, 380];
const tapeTilts = [-18, 12, -8, 22, -14, 6];

function Polaroid({ src, alt, index }) {
  const tilt = tilts[index % tilts.length];
  const offset = offsets[index % offsets.length];
  const width = widths[index % widths.length];
  const tapeTilt = tapeTilts[index % tapeTilts.length];
  const isSquare = index % 3 === 1;

  return (
    // Wrapper: sebaran vertikal + rotasi statis (bukan target GSAP)
    <div
      className="shrink-0"
      style={{
        width: `${width}px`,
        transform: `translateY(${offset}px) rotate(${tilt}deg)`,
      }}
    >
      {/* Kartu: hover-nya di sini. --untilt buat ngelurusin pas hover */}
      <div
        style={{ "--untilt": `${-tilt}deg` }}
        className="group relative bg-[#f6f3ec] p-3 pb-8 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)]
                   transition-transform duration-500 ease-out
                   hover:-translate-y-4 hover:scale-[1.08] hover:rotate-[var(--untilt)] hover:z-30"
      >
        {/* Washi tape */}
        <div
          className="absolute -top-3 left-1/2 -ml-10 h-6 w-20 border-x border-amber-50/20
                     bg-amber-100/25 shadow-sm backdrop-blur-[1px]"
          style={{ transform: `rotate(${tapeTilt}deg)` }}
        ></div>

        <div className={`relative overflow-hidden bg-black ${isSquare ? "aspect-square" : "aspect-[4/3]"}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[0.4] contrast-105
                       transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
          {/* Kilau kaca tipis */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

export default function Filmstrip() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: section di-pin, foto jalan ke samping ngikut scroll
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile: ga di-pin, tinggal swipe horizontal manual
      mm.add("(max-width: 767px)", () => {
        gsap.set(trackRef.current, { clearProps: "x" });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col justify-center overflow-hidden bg-black"
    >
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      {/* Cahaya hangat */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl"></div>

      {/* Header — overlay biar ga makan tinggi section */}
      <div className="pointer-events-none absolute left-6 top-16 z-20 md:left-12 md:top-20">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">Scrapbook</p>
      </div>

      {/* Track horizontal */}
      <div className="relative z-10 overflow-x-auto md:overflow-visible">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-8 px-6 py-24 md:gap-12 md:px-12"
        >
          {polaroids.map((p, i) => (
            <Polaroid key={p.src} src={p.src} alt={p.alt} index={i} />
          ))}

          {/* Ruang kosong di ujung biar foto terakhir ga nempel tepi */}
          <div className="shrink-0 pr-6 md:pr-24"></div>
        </div>
      </div>

      {/* Fade di kiri-kanan */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-black to-transparent md:w-40"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-black to-transparent md:w-40"></div>

      {/* Hint */}
      <div className="absolute bottom-10 left-1/2 z-20 -ml-24 w-48 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Scroll <span className="ml-1">&rarr;</span>
        </p>
      </div>
    </section>
  );
}
