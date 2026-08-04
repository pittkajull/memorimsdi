import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Urutan array = urutan tampil: kiri, tengah, kanan.
const mentors = [
  {
    name: "Alel",
    src: "/images/fotokakaks/alel.JPG",
    note: "The one who always gave us the most love and care.",
  },
  {
    name: "Dido",
    src: "/images/fotokakaks/dido.JPG",
    note: "The most patient one, no matter how loud we got.",
  },
  {
    name: "Naflah",
    src: "/images/fotokakaks/naflah.JPG",
    note: "The one who kept everything light and warm.",
  },
];

function MentorCard({ mentor, index, active, setActive }) {
  const isActive = active === index;
  const isDimmed = active !== null && !isActive;

  return (
    // Layer luar: target GSAP. Jangan taruh class transform/opacity di sini —
    // GSAP nulis inline style yang bakal nimpa class-nya.
    <div className="mentor-card">
      {/* Layer dalam: semua efek hover di sini */}
      <div
        onMouseEnter={() => setActive(index)}
        onMouseLeave={() => setActive(null)}
        onClick={() => setActive(isActive ? null : index)}
        className={`group relative cursor-pointer transition-all duration-700 ease-out
                    ${isActive ? "md:-translate-y-4" : ""}
                    ${isDimmed ? "opacity-40 md:scale-[0.96]" : "opacity-100"}`}
      >
        {/* Bingkai tipis berlapis di belakang */}
        <div
          className={`pointer-events-none absolute h-full w-full border transition-all duration-700
                      ${isActive ? "-bottom-4 -right-4 border-amber-400/30" : "-bottom-2 -right-2 border-white/10"}`}
        ></div>

        {/* Foto */}
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 shadow-[0_30px_70px_-20px_rgba(0,0,0,1)]">
          <img
            src={mentor.src}
            alt={mentor.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-all duration-[900ms] ease-out"
            style={{
              transform: isActive ? "scale(1.18)" : "scale(1)",
              filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(0.55) brightness(0.85)",
            }}
          />

          {/* Vignette bawah, biar teksnya kebaca */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          {/* Nama + info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h3 className="font-['Caveat',_cursive] text-3xl leading-none text-white md:text-4xl">
              {mentor.name}
            </h3>

            {/* Garis amber yang manjang pas aktif */}
            <div
              className={`mt-3 h-px bg-gradient-to-r from-amber-400/70 to-transparent transition-all duration-700
                          ${isActive ? "w-full" : "w-8"}`}
            ></div>

            {/* Catatan — muncul pas aktif */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out
                          ${isActive ? "mt-3 max-h-24 opacity-100" : "mt-0 max-h-0 opacity-0"}`}
            >
              <p className="text-xs leading-relaxed text-white/60 md:text-sm">{mentor.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(null);

  useGSAP(
    () => {
      gsap.from(".mentor-card", {
        y: 70,
        opacity: 0,
        scale: 0.94,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-28 px-6 md:px-12">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      {/* Cahaya hangat */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/40">Thank You</p>
          <h2 className="leading-[1.1]">
            <span className="block font-['Caveat',_cursive] text-5xl text-white/80 md:text-7xl">
              The People Behind
            </span>
            <span className="mt-1 block text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
              All of This
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/40 md:text-base">
            The people who made Malang feel a little more like home.
          </p>
        </div>

        {/* 3 kartu sejajar. Langsung 1 -> 3 kolom, ga lewat 2 kolom,
            biar kartu ketiga ga nyendiri di baris bawah. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {mentors.map((m, i) => (
            <MentorCard key={m.name} mentor={m} index={i} active={active} setActive={setActive} />
          ))}
        </div>

        {/* Penutup */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-white/50 md:text-base">
            Thank you for giving meaning to our days in Malang and at Universitas Brawijaya. Thank
            you for filling this cold city with warmth, and for becoming the family we never
            expected to find in a place so far from home.
          </p>

          <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
            No matter where life takes us next, a part of our hearts will always remain
            here with the memories we created together.
          </p>

          {/* Garis amber tipis sebelum kalimat penutup */}
          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>

          <p className="mt-8 font-['Caveat',_cursive] text-2xl leading-snug text-white/70 md:text-3xl">
            Thank you, for everything. We&rsquo;ll carry this story with us, wherever we go.
          </p>
        </div>
      </div>
    </section>
  );
}
