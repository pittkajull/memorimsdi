import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const photos = [
  "/images/IMG_0003.JPG",
  "/images/IMG_0006.JPG",
  "/images/IMG_0009.JPG",
  "/images/IMG_0012.JPG",
  "/images/IMG_0015.JPG",
  "/images/IMG_0018.JPG",
  "/images/IMG_0021.JPG",
  "/images/IMG_0024.JPG",
  "/images/IMG_0027.JPG",
  "/images/IMG_0030.JPG",
  "/images/IMG_0035.JPG",
  "/images/IMG_0038.JPG",
  "/images/IMG_0041.JPG",
  "/images/IMG_0044.JPG",
  "/images/IMG_0047.JPG",
  "/images/IMG_0050.JPG",
  "/images/IMG_0053.JPG",
  "/images/IMG_0097.JPG",
  "/images/IMG_0100.JPG",
  "/images/IMG_0103.JPG",
  "/images/IMG_0106.JPG",
  "/images/IMG_0109.JPG",
  "/images/IMG_0114.JPG",
  "/images/IMG_0116.JPG",
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(gridRef.current.children, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-24 px-4 md:px-8 overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-['Caveat',_cursive] text-2xl md:text-3xl text-amber-500/60 mb-4">
            #KitaSelaluIngat
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Momen Bahagia
          </h2>
          <p className="mt-4 text-white/30 text-sm md:text-base max-w-xl mx-auto">
            Setiap foto menyimpan cerita, setiap senyum menyimpan kenangan
          </p>
        </div>

        {/* Photo Grid - Masonry style */}
        <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((src, index) => (
            <div
              key={index}
              className="break-inside-avoid group relative overflow-hidden rounded-sm cursor-pointer"
            >
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-full h-auto object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-['Caveat',_cursive] text-white text-lg">
                    Kenangan indah...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="mt-16 text-center">
          <p className="font-['Caveat',_cursive] text-xl md:text-2xl text-white/30">
            &quot;Tawa yang pernah kita bagi, akan selalu terasa hangat di hati&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
