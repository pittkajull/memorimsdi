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
  { src: "/images/IMG_0063.JPG", alt: "Memory 9" },
  { src: "/images/IMG_0064.JPG", alt: "Memory 10" },
  { src: "/images/IMG_0065.JPG", alt: "Memory 11" },
  { src: "/images/IMG_0066.JPG", alt: "Memory 12" },
];

const filmStrip2 = [
  { src: "/images/IMG_0067.JPG", alt: "Memory 13" },
  { src: "/images/IMG_0068.JPG", alt: "Memory 14" },
  { src: "/images/IMG_0069.JPG", alt: "Memory 15" },
  { src: "/images/IMG_0070.JPG", alt: "Memory 16" },
  { src: "/images/IMG_0071.JPG", alt: "Memory 17" },
  { src: "/images/IMG_0072.JPG", alt: "Memory 18" },
  { src: "/images/IMG_0073.JPG", alt: "Memory 19" },
  { src: "/images/IMG_0074.JPG", alt: "Memory 20" },
  { src: "/images/IMG_0075.JPG", alt: "Memory 21" },
  { src: "/images/IMG_0078.JPG", alt: "Memory 22" },
  { src: "/images/IMG_0079.JPG", alt: "Memory 23" },
  { src: "/images/IMG_0080.JPG", alt: "Memory 24" },
];

function SprocketHoles() {
  return (
    <div className="flex gap-4 px-4">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-3 bg-black/80 border border-zinc-600/30 flex-shrink-0"
        ></div>
      ))}
    </div>
  );
}

function FilmStripRow({ images, direction = "left", speed = 40 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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
    <div className="flex gap-2">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative flex-shrink-0 w-72 h-48 md:w-80 md:h-56 overflow-hidden"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover grayscale contrast-110 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-500"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden py-4">
      <div className="bg-zinc-900/90 border border-zinc-700/40 py-3">
        <SprocketHoles />
        <div className="relative overflow-hidden my-3">
          <div ref={trackRef} className="flex gap-2 w-max">
            {content}
            {content}
          </div>
        </div>
        <SprocketHoles />
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
    <section ref={sectionRef} className="relative bg-black py-24 overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-full mx-auto relative z-10 px-4">
        {/* Handwritten annotation */}
        <div ref={textRef} className="mb-12 ml-6">
          <p className="font-['Caveat',_cursive] text-2xl md:text-4xl text-white/40">
            Setiap momen tersimpan dalam gulungan film ini...
          </p>
        </div>

        {/* Film Strip Rows - auto scroll */}
        <div className="space-y-8">
          <FilmStripRow images={filmStrip1} direction="left" speed={45} />
          <FilmStripRow images={filmStrip2} direction="right" speed={50} />
        </div>
      </div>
    </section>
  );
}
