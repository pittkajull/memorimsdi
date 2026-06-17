import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const filmStrip1 = [
  { src: "/images/IMG_0055.JPG", alt: "Memory 1" },
  { src: "/images/IMG_0056.JPG", alt: "Memory 2" },
  { src: "/images/IMG_0057.JPG", alt: "Memory 3" },
  { src: "/images/IMG_0058.JPG", alt: "Memory 4" },
  { src: "/images/IMG_0059.JPG", alt: "Memory 5" },
  { src: "/images/IMG_0060.JPG", alt: "Memory 6" },
  { src: "/images/IMG_0061.JPG", alt: "Memory 7" },
  { src: "/images/IMG_0062.JPG", alt: "Memory 8" },
];

const filmStrip2 = [
  { src: "/images/IMG_0063.JPG", alt: "Memory 9" },
  { src: "/images/IMG_0064.JPG", alt: "Memory 10" },
  { src: "/images/IMG_0065.JPG", alt: "Memory 11" },
  { src: "/images/IMG_0066.JPG", alt: "Memory 12" },
  { src: "/images/IMG_0067.JPG", alt: "Memory 13" },
  { src: "/images/IMG_0068.JPG", alt: "Memory 14" },
  { src: "/images/IMG_0069.JPG", alt: "Memory 15" },
  { src: "/images/IMG_0070.JPG", alt: "Memory 16" },
];

function SprocketHoles() {
  return (
    <div className="flex gap-3 px-4">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-2 bg-black/80 border border-zinc-600/30 flex-shrink-0"
        ></div>
      ))}
    </div>
  );
}

function FilmStripRow({ images, direction = "left", speed = 40 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate content for seamless loop
    const totalWidth = track.scrollWidth / 2;

    const animation = gsap.to(track, {
      x: direction === "left" ? -totalWidth : totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => animation.kill();
  }, [direction, speed]);

  const content = (
    <div className="flex gap-1.5">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative flex-shrink-0 w-48 h-32 overflow-hidden"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover grayscale contrast-110 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden py-3">
      {/* Film strip container */}
      <div className="bg-zinc-900/90 border border-zinc-700/40 py-2">
        {/* Top sprocket */}
        <SprocketHoles />

        {/* Photos - marquee */}
        <div className="relative overflow-hidden my-2">
          <div ref={trackRef} className="flex gap-1.5 w-max">
            {content}
            {content}
          </div>
        </div>

        {/* Bottom sprocket */}
        <SprocketHoles />
      </div>

      {/* Film edge marks */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600/50 text-[10px] font-mono">
        TX 5063
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600/50 text-[10px] font-mono">
        400
      </div>
    </div>
  );
}

export default function Filmstrip() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-20 overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 px-6">
        {/* Handwritten annotation */}
        <div ref={textRef} className="mb-10 ml-4">
          <p className="font-['Caveat',_cursive] text-2xl md:text-3xl text-white/40">
            Setiap momen tersimpan dalam gulungan film ini...
          </p>
        </div>

        {/* Film Strip Rows - auto scroll */}
        <div className="space-y-6">
          <FilmStripRow images={filmStrip1} direction="left" speed={35} />
          <FilmStripRow images={filmStrip2} direction="right" speed={40} />
        </div>
      </div>
    </section>
  );
}
