import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const scatteredPhotos = [
  { src: "/images/11c638d5-0910-44bc-bd98-c583372115d3.jpg", alt: "Memory", rotate: -15, x: "2%", y: "5%", width: "260px" },
  { src: "/images/2fe2145c-df06-40ea-a698-bc3d2049b417.jpg", alt: "Memory", rotate: 8, x: "68%", y: "2%", width: "240px" },
  { src: "/images/62e69552-a445-435a-8326-144f35f4a8a1.JPG", alt: "Memory", rotate: -5, x: "78%", y: "28%", width: "220px" },
  { src: "/images/78682475-68db-4772-af7b-c12c9437d4b3.JPG", alt: "Memory", rotate: 12, x: "0%", y: "38%", width: "250px" },
  { src: "/images/8b073779-edf9-480d-8143-e90e24c44e66.JPG", alt: "Memory", rotate: -8, x: "72%", y: "58%", width: "230px" },
  { src: "/images/9458c31d-61c8-4054-b0c1-551b6e766fc8.JPG", alt: "Memory", rotate: 5, x: "3%", y: "65%", width: "220px" },
  { src: "/images/99420135-f1dc-4be3-bfa0-f072aebcef56.JPG", alt: "Memory", rotate: -12, x: "58%", y: "75%", width: "240px" },
  { src: "/images/13dd1a41-5183-4e2e-b4e5-aeda1dfa590c.JPG", alt: "Memory", rotate: 10, x: "15%", y: "82%", width: "230px" },
];

export default function Ending() {
  const sectionRef = useRef(null);
  const paperRef = useRef(null);
  const endTextRef = useRef(null);
  const photoRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate scattered photos
      photoRefs.current.forEach((photo, index) => {
        if (photo) {
          gsap.from(photo, {
            scale: 0,
            opacity: 0,
            rotation: scatteredPhotos[index].rotate + (Math.random() * 30 - 15),
            duration: 0.8,
            ease: "back.out(1.4)",
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          });
        }
      });

      // Animate paper note
      gsap.from(paperRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Animate END text
      gsap.from(endTextRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-amber-900/40 via-amber-800/30 to-black py-0 overflow-hidden min-h-screen">
      {/* Wood texture background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      ></div>

      {/* Wood grain lines */}
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_30px,rgba(139,90,43,0.3)_30px,rgba(139,90,43,0.3)_31px)]"></div>

      <div className="relative min-h-screen max-w-6xl mx-auto px-4 py-16">
        {/* Scattered Polaroid Photos */}
        {scatteredPhotos.map((photo, index) => (
          <div
            key={index}
            ref={(el) => (photoRefs.current[index] = el)}
            className="absolute hidden md:block"
            style={{
              left: photo.x,
              top: photo.y,
              width: photo.width,
              zIndex: 10 + index,
            }}
          >
            {/* Polaroid frame */}
            <div
              className="bg-white p-2 pb-10 shadow-xl hover:z-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ transform: `rotate(${photo.rotate}deg)` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover"
              />
              {/* Tape effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/60 backdrop-blur-sm rotate-2"></div>
            </div>
          </div>
        ))}

        {/* Mobile scattered photos */}
        <div className="md:hidden grid grid-cols-2 gap-3 px-4">
          {scatteredPhotos.slice(0, 4).map((photo, index) => (
            <div
              key={index}
              className="bg-white p-1.5 pb-6 shadow-xl"
              style={{ transform: `rotate(${photo.rotate / 2}deg)` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Center Paper Note */}
        <div ref={paperRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[340px] md:w-[420px]">
          {/* Paper */}
          <div className="relative bg-gradient-to-b from-amber-50 to-white p-8 md:p-10 shadow-2xl rotate-1">
            {/* Paper texture lines */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(transparent,transparent_27px,#e5d4c1_27px,#e5d4c1_28px)]"></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="font-['Caveat',_cursive] text-2xl md:text-3xl text-red-700 mb-6 text-center">
                Long Time with Them
              </h3>

              <div className="font-['Caveat',_cursive] text-base md:text-lg text-gray-800 leading-relaxed space-y-4">
                <p>
                  Bukan cuma soal program kerja, tapi perjalanan kecil yang penuh makna.
                  Pagi yang penuh semangat, siang yang melelahkan, sampai malam yang diisi
                  cerita dan tawa.
                </p>
                <p className="italic">
                  We came as strangers, but we leave as family.
                </p>
                <p>
                  Terima kasih MSDI, kalian sudah jadi bagian dari cerita
                  indah yang akan selalu dikenang. MSDI mungkin berakhir, tapi kisah ini
                  tidak akan pernah selesai.
                </p>
              </div>
            </div>

            {/* Paper corner fold */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-b-amber-200 border-l-[40px] border-l-transparent"></div>
          </div>

          {/* Shadow for paper */}
          <div className="absolute -bottom-2 left-2 right-2 h-8 bg-black/20 blur-xl rounded-full"></div>
        </div>

        {/* Camera */}
        <div className="absolute bottom-12 right-8 md:bottom-16 md:right-12 z-20 opacity-90">
          <div className="w-56 h-56 md:w-72 md:h-72 relative">
            {/* Simplified camera illustration */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
              {/* Lens */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-black border-4 border-gray-600 shadow-inner">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/20 border border-gray-600"></div>
                <div className="absolute inset-4 rounded-full bg-black/40 border border-gray-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-800/40 to-purple-900/30"></div>
              </div>
              {/* Viewfinder */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-700 rounded-t-sm"></div>
              {/* Flash */}
              <div className="absolute top-3 right-4 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-sm"></div>
              {/* Grip */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-700 to-transparent rounded-r-lg"></div>
            </div>
          </div>
        </div>

        {/* END Typography */}
        <div ref={endTextRef} className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-40">
          <div className="flex items-end gap-2">
            <span className="text-white text-lg md:text-2xl font-bold tracking-wider mb-6 drop-shadow-lg">HAS</span>
            <div className="relative">
              <h1
                className="text-[100px] md:text-[180px] font-black leading-none tracking-tighter"
                style={{
                  color: "white",
                  textShadow: "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 6px 20px rgba(0,0,0,0.8)",
                }}
              >
                END
              </h1>
            </div>
            <span className="text-white text-lg md:text-2xl font-bold tracking-wider mb-4 drop-shadow-lg"></span>
          </div>
          <p className="text-white text-xs md:text-sm tracking-[0.4em] mt-3 uppercase font-semibold drop-shadow-lg">
            bersama msdi ciptakan sinergi, kolaborasikan aksi.
            <br />memori msdi.
          </p>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
    </section>
  );
}
