import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// TODO: ganti pesan & nama sesuai aslinya. Panjang pesan bebas —
// tinggi kartu ngikut isinya sendiri.
const notes = [
  { text: "Ga nyangka setahun bisa secepat ini. Makasih udah jadi bagian ceritanya.", from: "Rara" },
  { text: "Kalian tuh rumah kedua gw, seriusan.", from: "Fajar" },
  { text: "Yang paling gw kangenin nanti pasti ributnya kalian di grup.", from: "Dimas" },
  { text: "Dari yang awalnya ga kenal siapa-siapa, sekarang susah pisah.", from: "Nabila" },
  { text: "Capek sih, tapi ketawanya lebih banyak dari ngeluhnya.", from: "Rizky" },
  { text: "Makasih udah sabar sama gw yang suka telat mulu.", from: "Alya" },
  { text: "Satu tahun, satu angkatan, satu cerita. Cukup buat diinget lama.", from: "Bagas" },
  { text: "Semoga habis ini kita masih suka ngumpul ya.", from: "Sasa" },
  { text: "Kalau bisa diulang, gw mau ulang dari hari pertama.", from: "Yoga" },
];

// Semua nilai sebaran deterministik — biar ga geser-geser tiap re-render
const tilts = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5, -1];
const papers = ["#f6f3ec", "#f2ece0", "#efe9e4", "#f4f1e6", "#ede9de", "#f5efe6"];
const tapeTilts = [-14, 10, -7, 18, -11, 5];

function Note({ note, index }) {
  const tilt = tilts[index % tilts.length];
  const paper = papers[index % papers.length];
  const tapeTilt = tapeTilts[index % tapeTilts.length];

  return (
    // Layer luar: target GSAP + anti-pecah kolom. Jangan taruh class
    // transform/opacity di sini — GSAP nulis inline style yang nimpa class.
    <div className="note-card mb-6 break-inside-avoid md:mb-8">
      {/* Layer dalam: rotasi statis + hover. --untilt buat ngelurusin pas hover */}
      <div
        style={{
          backgroundColor: paper,
          transform: `rotate(${tilt}deg)`,
          "--untilt": "0deg",
        }}
        className="group relative px-6 pb-7 pt-9 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.9)]
                   transition-transform duration-500 ease-out
                   hover:z-20 hover:-translate-y-2 hover:scale-[1.03] hover:rotate-[var(--untilt)]"
      >
        {/* Washi tape, senada sama polaroid di atas */}
        <div
          className="absolute -top-3 left-1/2 -ml-9 h-6 w-[4.5rem] border-x border-amber-50/30
                     bg-amber-100/40 shadow-sm backdrop-blur-[1px]"
          style={{ transform: `rotate(${tapeTilt}deg)` }}
        ></div>

        {/* Tanda kutip samar di belakang teks */}
        <span className="pointer-events-none absolute left-3 top-4 font-serif text-6xl leading-none text-zinc-900/[0.07]">
          &ldquo;
        </span>

        <p className="relative font-['Caveat',_cursive] text-xl leading-snug text-zinc-800 md:text-2xl">
          {note.text}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <div className="h-px w-6 bg-zinc-900/25 transition-all duration-500 group-hover:w-10"></div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-900/45">{note.from}</p>
        </div>

        {/* Lipatan tipis di pojok bawah */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 bg-gradient-to-tl from-black/10 to-transparent"></div>
      </div>
    </div>
  );
}

export default function Moments() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".note-card", {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.85,
        ease: "power3.out",
        stagger: { each: 0.07, from: "random" },
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
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-400/5 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/40">Pesan &amp; Kesan</p>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Kata Mereka
          </h2>
        </div>

        {/* Kolom CSS — tinggi kartu ikut isinya, ga ada yang nyangkut nyendiri */}
        <div className="columns-1 gap-6 sm:columns-2 md:gap-8 lg:columns-3">
          {notes.map((n, i) => (
            <Note key={n.from + i} note={n} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
