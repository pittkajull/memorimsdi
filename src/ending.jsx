import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Foto tempelan cuma nempel di pinggir kiri/kanan, ga pernah masuk kolom
// tengah. Makanya posisinya ditulis "side" (kiri/kanan) + jarak dari tepi,
// bukan koordinat X bebas — biar mustahil nabrak kertas catatannya.
const scatteredPhotos = [
  { src: "/images/fotoenjoy/11c638d5-0910-44bc-bd98-c583372115d3.jpg", side: "left", top: "0%", inset: "0%", width: "228px", rotate: -8 },
  { src: "/images/fotoenjoy/2fe2145c-df06-40ea-a698-bc3d2049b417.jpg", side: "right", top: "3%", inset: "2%", width: "212px", rotate: 7 },
  { src: "/images/fotoenjoy/62e69552-a445-435a-8326-144f35f4a8a1.JPG", side: "left", top: "25%", inset: "4%", width: "204px", rotate: 6 },
  { src: "/images/fotoenjoy/78682475-68db-4772-af7b-c12c9437d4b3.JPG", side: "right", top: "29%", inset: "0%", width: "228px", rotate: -6 },
  { src: "/images/fotoenjoy/8b073779-edf9-480d-8143-e90e24c44e66.JPG", side: "left", top: "51%", inset: "1%", width: "218px", rotate: -5 },
  { src: "/images/fotoenjoy/9458c31d-61c8-4054-b0c1-551b6e766fc8.JPG", side: "right", top: "55%", inset: "3%", width: "204px", rotate: 8 },
  { src: "/images/fotoenjoy/99420135-f1dc-4be3-bfa0-f072aebcef56.JPG", side: "left", top: "75%", inset: "3%", width: "208px", rotate: 9 },
  { src: "/images/fotoenjoy/13dd1a41-5183-4e2e-b4e5-aeda1dfa590c.JPG", side: "right", top: "78%", inset: "1%", width: "222px", rotate: -7 },
];

// Rotasi awal animasi masuk — dulu pakai Math.random() jadi beda tiap muat.
// Dibikin tetap biar tampilannya sama terus.
const entryTwist = [12, -9, 14, -11, 8, -13, 10, -7];

export default function Ending() {
  const sectionRef = useRef(null);
  const paperRef = useRef(null);
  const endTextRef = useRef(null);
  const photoRefs = useRef([]);

  useGSAP(
    () => {
      photoRefs.current.forEach((photo, index) => {
        if (!photo) return;
        gsap.from(photo, {
          scale: 0,
          opacity: 0,
          rotation: scatteredPhotos[index].rotate + entryTwist[index],
          duration: 0.8,
          ease: "back.out(1.4)",
          delay: 0.08 * index,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      });

      gsap.from(paperRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: paperRef.current, start: "top 85%" },
      });

      gsap.from(endTextRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: endTextRef.current, start: "top 88%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-amber-900/40 via-amber-800/30 to-black py-20 md:py-28"
    >
      {/* Tekstur kayu */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      ></div>

      {/* Serat kayu */}
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_30px,rgba(139,90,43,0.3)_30px,rgba(139,90,43,0.3)_31px)]"></div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Foto pinggir — baru muncul di lg ke atas. Di bawah itu ruang
            kiri-kanannya ga cukup, jadi fotonya pindah ke grid di bawah. */}
        {scatteredPhotos.map((photo, index) => (
          <div
            key={photo.src}
            ref={(el) => (photoRefs.current[index] = el)}
            className="absolute hidden lg:block"
            style={{
              [photo.side]: photo.inset,
              top: photo.top,
              width: photo.width,
              zIndex: 10 + index,
            }}
          >
            <div
              className="relative bg-white p-2 pb-8 shadow-xl transition-transform duration-300 hover:z-50 hover:scale-105"
              style={{ transform: `rotate(${photo.rotate}deg)` }}
            >
              <img src={photo.src} alt="" className="h-auto w-full object-cover" />
              {/* Selotip */}
              <div className="absolute -top-2 left-1/2 h-5 w-12 -translate-x-1/2 rotate-2 bg-white/60 backdrop-blur-sm"></div>
            </div>
          </div>
        ))}

        {/* Kolom tengah — mengalir normal (bukan absolute), jadi catatan,
            END, dan caption-nya ga mungkin saling nimpa. */}
        <div className="relative z-30 mx-auto w-full max-w-[26rem]">
          {/* Kertas catatan */}
          <div ref={paperRef}>
            <div className="relative rotate-1 bg-gradient-to-b from-amber-50 to-white p-8 shadow-2xl md:p-10">
              {/* Garis kertas */}
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(transparent,transparent_27px,#e5d4c1_27px,#e5d4c1_28px)]"></div>

              <div className="relative z-10">
                <h3 className="mb-6 text-center font-['Caveat',_cursive] text-2xl text-red-700 md:text-3xl">
                  Long Time with Them
                </h3>

                <div className="space-y-4 font-['Caveat',_cursive] text-base leading-relaxed text-gray-800 md:text-lg">
                  <p>
                    It&rsquo;s not just about the work program, but a small journey full of
                    meaning. Mornings full of energy, exhausting afternoons, and evenings filled
                    with stories and laughter.
                  </p>
                  <p className="italic">We came as strangers, but we leave as family.</p>
                  <p>
                    Thank you MSDI, you have become part of a beautiful story that will always be
                    remembered. MSDI may end, but this story will never finish.
                  </p>
                </div>
              </div>

              {/* Lipatan pojok */}
              <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[40px] border-l-[40px] border-b-amber-200 border-l-transparent"></div>
            </div>
          </div>

          {/* Foto buat layar sempit — di sini fotonya ikut mengalir ke bawah
              catatan, ga ditumpuk kaya sebelumnya. */}
          <div className="mt-12 grid grid-cols-2 gap-3 lg:hidden">
            {scatteredPhotos.slice(0, 4).map((photo) => (
              <div
                key={photo.src}
                className="bg-white p-1.5 pb-6 shadow-xl"
                style={{ transform: `rotate(${photo.rotate / 2}deg)` }}
              >
                <img src={photo.src} alt="" className="h-auto w-full object-cover" />
              </div>
            ))}
          </div>

          {/* Penutup */}
          <div ref={endTextRef} className="mt-20 text-center md:mt-24">
            <p className="font-['Caveat',_cursive] text-3xl leading-none text-white/70 md:text-4xl">
              The
            </p>
            <h2
              className="text-[5.5rem] font-black leading-[0.85] tracking-tighter text-white md:text-[8rem]"
              style={{
                textShadow:
                  "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 6px 20px rgba(0,0,0,0.8)",
              }}
            >
              END
            </h2>

            <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>

            <p className="mt-6 text-[10px] uppercase leading-loose tracking-[0.35em] text-white/60 md:text-xs">
              Together with MSDI create synergy, collaborate in action.
              <br />
              Memories of MSDI.
            </p>
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]"></div>
    </section>
  );
}
