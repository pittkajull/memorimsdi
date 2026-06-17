import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Text animation
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });

      // Logo animation
      gsap.from(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2,
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current.querySelector("img"), {
        yPercent: 20,
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
        src="/images/potostudio1.jpg"
        alt="Memori MSDI"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/90"></div>

      {/* Logo */}
      <div ref={logoRef} className="absolute top-6 left-6 z-20">
        <img src="/images/logomsdi.svg" alt="Logo MSDI" className="h-10 w-10" />
      </div>

      {/* Text */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-5xl text-center text-white">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-black tracking-wider drop-shadow-2xl uppercase"
          >
            MEMORI MSDI
          </h1>

          <p
            ref={textRef}
            className="mt-8 text-sm md:text-base leading-relaxed text-white/95 drop-shadow-lg max-w-3xl mx-auto"
          >
            Banyak yang mengenal MSDI sebagai tempat untuk berproses. Namun bagi kami, MSDI lebih dari itu ia adalah rumah, tempat kami selalu menemukan jalan untuk pulang.
            Di tengah keras dan dinginnya dunia luar, kami menemukan kehangatan yang tak tergantikan. Kehangatan yang lahir dari kebersamaan, dari tangan-tangan yang saling menguatkan, dari tawa yang dibagi, dan dari perjuangan yang dijalani bersama.
            Terima kasih telah menjadi bagian dari cerita ini. Terima kasih telah hadir dan menjadikan setiap perjalanan terasa lebih bermakna. Kalian bukan sekadar teman seperjalanan, melainkan keluarga yang akan selalu memiliki tempat di hati kami.
            Bon Appétit. Mari menikmati setiap potongan kenangan yang tersisa, menyimpannya baik-baik dalam hati, dan membawanya sebagai bekal menuju perjalanan berikutnya.

          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
