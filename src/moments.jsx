import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// TODO: 34 nama + pesan di bawah masih placeholder — ganti sesuai aslinya.
// Jumlahnya bebas ditambah/dikurangin, pembagian barisnya otomatis.
const notes = [
  { text: "Ga nyangka setahun bisa secepat ini.", from: "Rara" },
  { text: "Kalian tuh rumah kedua gw, seriusan.", from: "Fajar" },
  { text: "Yang paling gw kangenin nanti pasti ributnya kalian.", from: "Dimas" },
  { text: "Dari yang awalnya ga kenal siapa-siapa, sekarang susah pisah.", from: "Nabila" },
  { text: "Capek sih, tapi ketawanya jauh lebih banyak.", from: "Rizky" },
  { text: "Makasih udah sabar sama gw yang telat mulu.", from: "Alya" },
  { text: "Satu tahun, satu angkatan, satu cerita.", from: "Bagas" },
  { text: "Semoga habis ini kita masih suka ngumpul.", from: "Sasa" },
  { text: "Kalau bisa diulang, gw mau ulang dari hari pertama.", from: "Yoga" },
  { text: "Rapat yang ga pernah kelar tepat waktu, tapi kangen juga.", from: "Intan" },
  { text: "Makasih udah nerima gw yang aneh ini.", from: "Farhan" },
  { text: "Tiap foto yang keambil ada ceritanya masing-masing.", from: "Gita" },
  { text: "Banyak yang berubah, tapi kalian tetep sama.", from: "Adit" },
  { text: "Ternyata bisa senyaman ini sama orang yang dulu asing.", from: "Kayla" },
  { text: "Sampai ketemu di versi kita yang lebih gede nanti.", from: "Bima" },
  { text: "Deadline bareng-bareng ternyata lebih ringan.", from: "Zahra" },
  { text: "Yang bikin betah bukan kegiatannya, tapi orangnya.", from: "Reza" },
  { text: "Makasih udah nemenin dari pagi sampe malem.", from: "Tsania" },
  { text: "Ga ada yang sempurna, tapi semuanya berkesan.", from: "Ilham" },
  { text: "Kalau lagi capek, gw inget-inget ketawa kalian.", from: "Mira" },
  { text: "Sedih, tapi bangga pernah jadi bagian dari ini.", from: "Daffa" },
  { text: "Semua drama kecil itu sekarang jadi lucu.", from: "Nayla" },
  { text: "Makasih ilmunya, makasih ketawanya.", from: "Arif" },
  { text: "Pengen bilang makasih ke semuanya satu-satu.", from: "Selma" },
  { text: "Yang penting kita pernah usaha bareng.", from: "Galih" },
  { text: "Tempat paling rame yang malah bikin tenang.", from: "Dinda" },
  { text: "Ga banyak kata, cuma makasih banyak.", from: "Rafi" },
  { text: "Semoga kita ketemu lagi di jalan masing-masing.", from: "Anisa" },
  { text: "Satu-satunya grup yang notifnya ga gw mute.", from: "Hafiz" },
  { text: "Makasih udah bikin tahun ini ga sepi.", from: "Putri" },
  { text: "Kerja keras kalian keliatan, semuanya.", from: "Sultan" },
  { text: "Yang terbaik bukan hasilnya, tapi prosesnya bareng kalian.", from: "Laras" },
  { text: "Nanti kalau ketemu di jalan, jangan lupa nyapa ya.", from: "Fikri" },
  { text: "Terima kasih buat semua yang ga bisa gw tulis di sini.", from: "Cinta" },
];

// Semua nilai sebaran deterministik — biar ga geser-geser tiap re-render
const tilts = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5, -1, 2, -2.5, 1];
const papers = ["#f6f3ec", "#f2ece0", "#efe9e4", "#f4f1e6", "#ede9de", "#f5efe6"];
const tapeTilts = [-14, 10, -7, 18, -11, 5];

function Note({ note, index }) {
  const tilt = tilts[index % tilts.length];
  const paper = papers[index % papers.length];
  const tapeTilt = tapeTilts[index % tapeTilts.length];

  return (
    // Lebar dipatok biar tinggi barisnya rata dan jalannya mulus
    <div
      style={{
        backgroundColor: paper,
        transform: `rotate(${tilt}deg)`,
        "--untilt": "0deg",
      }}
      className="group relative w-[16rem] shrink-0 px-6 pb-6 pt-9 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.9)]
                 transition-transform duration-500 ease-out md:w-[19rem]
                 hover:z-20 hover:-translate-y-2 hover:scale-[1.04] hover:rotate-[var(--untilt)]"
    >
      {/* Washi tape, senada sama polaroid di section scrapbook */}
      <div
        className="absolute -top-3 left-1/2 -ml-9 h-6 w-[4.5rem] border-x border-amber-50/30
                   bg-amber-100/40 shadow-sm backdrop-blur-[1px]"
        style={{ transform: `rotate(${tapeTilt}deg)` }}
      ></div>

      {/* Tanda kutip samar di belakang teks */}
      <span className="pointer-events-none absolute left-3 top-4 font-serif text-6xl leading-none text-zinc-900/[0.07]">
        &ldquo;
      </span>

      <p className="relative min-h-[4.5rem] font-['Caveat',_cursive] text-xl leading-snug text-zinc-800 md:text-2xl">
        {note.text}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-px w-6 bg-zinc-900/25 transition-all duration-500 group-hover:w-10"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-900/45">{note.from}</p>
      </div>

      {/* Lipatan tipis di pojok bawah */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 bg-gradient-to-tl from-black/10 to-transparent"></div>
    </div>
  );
}

// Satu baris jalan sendiri. Isinya digandakan 2x biar sambungannya
// ga keliatan pas di-loop.
function Row({ items, offset, direction, speed }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    // Setengah lebar = satu set utuh, karena isinya digandakan 2x
    const loopWidth = () => track.scrollWidth / 2;

    // Arah kiri: 0 -> -loop. Arah kanan: mulai dari -loop -> 0
    const from = direction === "left" ? 0 : -loopWidth();
    const to = direction === "left" ? -loopWidth() : 0;

    tweenRef.current = gsap.fromTo(
      track,
      { x: from },
      {
        x: to,
        duration: loopWidth() / speed,
        ease: "none",
        repeat: -1,
      }
    );
  }, []);

  // Hover: jalannya dilambatin sampai berhenti, biar bisa dibaca.
  // Pakai timeScale (bukan pause) biar transisinya ga nyentak.
  const slowTo = (value) => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: value, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => slowTo(0)}
      onMouseLeave={() => slowTo(1)}
    >
      <div ref={trackRef} className="flex w-max items-start gap-6 md:gap-8">
        {[...items, ...items].map((n, i) => (
          <Note key={`${n.from}-${i}`} note={n} index={offset + i} />
        ))}
      </div>
    </div>
  );
}

export default function Moments() {
  const sectionRef = useRef(null);

  // Dibagi 2 baris, jalan ke arah berlawanan
  const half = Math.ceil(notes.length / 2);
  const rowTop = notes.slice(0, half);
  const rowBottom = notes.slice(half);

  useGSAP(
    () => {
      gsap.from(".notes-rows", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-28">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      {/* Cahaya hangat */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-400/5 blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 mb-14 px-6 text-center md:px-12">
        <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/40">Pesan &amp; Kesan</p>
        <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">Kata Mereka</h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/40">
          {notes.length} orang, {notes.length} cerita. Arahin kursor buat berhenti sebentar.
        </p>
      </div>

      {/* 2 baris jalan berlawanan arah */}
      <div className="notes-rows relative z-10">
        <Row items={rowTop} offset={0} direction="left" speed={38} />
        <Row items={rowBottom} offset={half} direction="right" speed={32} />
      </div>

      {/* Fade di kiri-kanan */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black to-transparent md:w-40"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black to-transparent md:w-40"></div>
    </section>
  );
}
