import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.3,
    })
    .from(textRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    }, "-=0.8");

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
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src="/images/potostudio/main.JPG"
        alt="Memori MSDI"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>

      <div className="absolute top-6 left-6 z-20">
        <img src="/images/logomsdi.svg" alt="Logo MSDI" className="h-10 w-10" />
      </div>

      <div className="relative z-10 flex h-full items-start justify-center px-6 pt-15">
        <div className="max-w-5xl text-center text-white">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-wider drop-shadow-2xl uppercase ">
            MEMORI MSDI
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-full px-6">
        <p ref={textRef} className="text-xs md:text-sm leading-relaxed text-white/95 drop-shadow-lg max-w-3xl mx-auto text-center">
          MSDI is more than just a place to grow and learn; it is a place where laughter, stories, and togetherness have blossomed into memories we will always cherish. Amid the harshness and coldness of the outside world, we have always found comfort and warmth in the people within it.
          Thank you for being part of this journey. Thank you for making every step more meaningful. You are not merely companions along the way, but family who will always hold a special place in our hearts.
          Bon Appétit. Let us savor every memory we have left, treasure them dearly, and carry them with us as we embark on the next chapter of our journey.
        </p>
      </div>
    </section>
  );
}
