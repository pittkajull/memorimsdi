import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// TODO: 34 nama + pesan di bawah masih placeholder — ganti sesuai aslinya.
// Jumlahnya bebas ditambah/dikurangin, pembagian barisnya otomatis.
const notes = [
  { text: "kyanya semesta lgi baik bgt waktu mutusin buat mempertemukan aku sma kalian.. beruntung bgt rasanya💗💗  ", from: "dedep" },
  { text: "ga nyangka bisa jadi core memory gua", from: "gisel  " },
  { text: "MSDI will never be replaced in my heaven 🤍", from: "nadia" },
  { text: " ngerasainnya cape sih, cape bgt, nguras energi, tenaga, duit. Tapi kalo disuruh ngulang lagi, GW MAU BGT..", from: "hira" },
  { text: "BLACKPINK says in their song Lovesick Girls, “But why we still looking for love?” MSDI is the answer to it, as it was LOoOve!", from: "arka" },
  { text: "bersyukur bangettt bisa ketemu dan kenal sama kalian. kapan yaa kita bisa ngerasain momen kayak dulu lagi?", from: "aziz" },
  { text: "so grateful for every little moment, every support, and every laugh we shared. love you msdi!", from: "Zafif" },
  { text: "ikan hiu makan tomat, miss y'all so much", from: "eji" },
  { text: "my home, terima kasih sudah menjadi rumah untuk bertumbuh. 🤍", from: "caday" },
  { text: "kangen gimmick surprise setiap ulang tahun pls", from: "augie" },
  { text: "not everyone is meant to stay, but thank you for making the time we had meaningful🤍", from: "afifah" },
  { text: "once something i never expected, yet it become my biggest heartbreak ever", from: "farrel" },
  { text: "thank you udh hadir di kehidupan ini, bakal terus kangen tiap momen dan canda tawa di msdi. MSDI bon appétit !!!!", from: "rafli" },
  { text: "haii my forever home msdi 🤍 i miss u guys banget ayoo main lagi jangan jadi orang asing dong", from: "cheryl" },
  { text: "jangan lupa bersyukur atas jalan yang kalian ambil", from: "reju" },
  { text: "huft, kalo disuruh ngulang berkali” pun aku juga mau bareng” terus🤭🫰🏻", from: "ale" },
  { text: "ga ada kata nyesel karena udah milih MSDI, mau banget kalo bisa ngulang di MSDI lagi, luv u sekebon MSDI :>", from: "rifandi" },
  { text: "jujur seru banget, this is definitely the most worthwhile decision I made last year", from: "salma" },
  { text: "Andai aja aku ikut wawancara waktu itu, aku pasti masuk msdi😔", from: "adam" },
  { text: "bersyukur bisa jadi bagian dari MSDI dan selalu ngerasa nyaman karena dikelilingi orang-orang baik 🥺💗", from: "alya" },
  { text: "MSDI has given me so many valuable experiences and lifelong memories. Thank you to everyone who made this journey so meaningful🤍", from: "cece" },
  { text: "some memories stay, dan MSDI salah satunya.", from: "iza" },
  { text: "HAAAH GUYS ILY GUYS, but the worst part about good memories is having to leave them behind #Sedih #AyoMain", from: "bili" },
  // { text: "Pengen bilang makasih ke semuanya satu-satu.", from: "Selma" },
  // { text: "Yang penting kita pernah usaha bareng.", from: "Galih" },
  // { text: "Tempat paling rame yang malah bikin tenang.", from: "Dinda" },
  // { text: "Ga banyak kata, cuma makasih banyak.", from: "Rafi" },
  // { text: "Semoga kita ketemu lagi di jalan masing-masing.", from: "Anisa" },
  // { text: "Satu-satunya grup yang notifnya ga gw mute.", from: "Hafiz" },
  // { text: "Makasih udah bikin tahun ini ga sepi.", from: "Putri" },
  // { text: "Kerja keras kalian keliatan, semuanya.", from: "Sultan" },
  // { text: "Yang terbaik bukan hasilnya, tapi prosesnya bareng kalian.", from: "Laras" },
  // { text: "Nanti kalau ketemu di jalan, jangan lupa nyapa ya.", from: "Fikri" },
  // { text: "Terima kasih buat semua yang ga bisa gw tulis di sini.", from: "Cinta" },
];

// Semua nilai sebaran deterministik — biar ga geser-geser tiap re-render
const tilts = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5, -1, 2, -2.5, 1];
const papers = ["#f6f3ec", "#f2ece0", "#efe9e4", "#f4f1e6", "#ede9de", "#f5efe6"];
const tapeTilts = [-14, 10, -7, 18, -11, 5];
const stampTilts = [-8, 6, -5, 9, -7, 4, -6, 8];

// Path foto diturunin dari nama penulis, jadi ga perlu ditulis manual:
//   "Dedep"   -> /images/fotokartun/dedep.webp
//   "Gisel  " -> /images/fotokartun/gisel.webp  (spasi & huruf besar diberesin)
// Taruh PNG-nya di folder itu, terus jalanin `node scripts/optimize-images.mjs`
// buat bikin .webp-nya — yang dibaca di sini yang .webp. Yang belum ada fotonya
// ga nampilin apa-apa (lihat onError di bawah).
const avatarSrc = (from) =>
  `/images/fotokartun/${from.trim().toLowerCase().replace(/\s+/g, "")}.webp`;

function Note({ note, index }) {
  const tilt = tilts[index % tilts.length];
  const paper = papers[index % papers.length];
  const tapeTilt = tapeTilts[index % tapeTilts.length];
  const stampTilt = stampTilts[index % stampTilts.length];

  // Foto yang filenya belum ada bakal gagal load -> disembunyiin, biar ga ada
  // ikon gambar rusak di kartunya. Yang disimpen path yang gagal (bukan
  // true/false) supaya begitu nama/path-nya berubah, fotonya dicoba lagi —
  // kalau pakai boolean, sekali gagal bakal nyangkut sampai halaman di-reload.
  const src = avatarSrc(note.from);
  const [failedSrc, setFailedSrc] = useState(null);
  const hasAvatar = failedSrc !== src;

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

      {/* 2 kolom: teks di kiri, foto di kanan. Dipisah kolom (bukan absolute)
          biar fotonya mustahil nimpa teksnya, sepanjang apapun pesannya.
          min-h biar kartu yang belum ada fotonya tetap setinggi yang udah ada. */}
      <div className="relative flex min-h-[7rem] gap-3">
        {/* Kolom teks */}
        <div className="min-w-0 flex-1">
          <p className="min-h-[4.5rem] font-['Caveat',_cursive] text-xl leading-snug text-zinc-800 md:text-2xl">
            {note.text}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-6 shrink-0 bg-zinc-900/25 transition-all duration-500 group-hover:w-10"></div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-900/45">
              {note.from.trim()}
            </p>
          </div>
        </div>

        {/* Kolom foto — rata bawah, sedikit lewat tepi kanan & bawah kertas.
            drop-shadow (bukan box-shadow) biar bayangannya ngikut bentuk
            orangnya, bukan ngikut kotak gambarnya.

            Patokan ukurannya LEBAR, bukan tinggi. Rasio tiap foto beda-beda:
            ada yang jangkung (eji, farrel), ada yang melebar (dedep, arka,
            nadia). Kalau tingginya yang dikunci, yang melebar bakal kejepit
            max-width dan ngecil sendiri. Dipatok lebar, besar mukanya jadi
            seragam di semua kartu — soalnya di potongan sebahu, lebar foto
            kira-kira sebanding sama lebar mukanya. max-h cuma rem darurat
            biar foto yang jangkung banget ga bikin kartunya jangkung juga. */}
        {hasAvatar && (
          <div className="-mb-6 -mr-3 flex shrink-0 items-end">
            <img
              src={src}
              alt={note.from.trim()}
              onError={() => setFailedSrc(src)}
              className="h-auto w-[6.5rem] max-h-[9.5rem] origin-bottom object-contain object-bottom
                         drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]
                         transition-transform duration-500 ease-out group-hover:scale-[1.06]
                         md:w-[7.5rem] md:max-h-[10.5rem]"
              style={{ transform: `rotate(${stampTilt / 3}deg)` }}
            />
          </div>
        )}
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
        <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/40">In Their Words</p>
        <h2 className="leading-[1.1]">
          <span className="block font-['Caveat',_cursive] text-5xl text-white/80 md:text-7xl">
            What They
          </span>
          <span className="mt-1 block text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            Left Behind
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/40">
          {notes.length} people, {notes.length} stories. Hover to pause and read.
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
