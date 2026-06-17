import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.9,
      });

      gsap.to(heroRef.current.querySelector("img"), {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <img
        src="/images/potostudio2.JPG"
        alt="Memori MSDI"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"></div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <img src="/images/logomsdi.svg" alt="Logo MSDI" className="h-10 w-10" />
      </div>

      {/* Main text - positioned bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
          >
            MEMORI MSDI
          </h1>

          <div className="mt-6 w-24 h-1 bg-white/40"></div>

          <p
            ref={textRef}
            className="mt-6 text-sm md:text-base leading-relaxed text-white/80 max-w-2xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
          >
            Banyak yang mengenal MSDI sebagai tempat untuk berproses. Namun bagi kami,
            MSDI lebih dari itu — ia adalah rumah, tempat kami selalu menemukan jalan untuk pulang.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
