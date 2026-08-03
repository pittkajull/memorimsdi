import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Set initial hidden states before animating in
    gsap.set([titleRef.current, textRef.current, logoRef.current], {
      opacity: 0,
    });
    gsap.set(titleRef.current, { y: 100 });
    gsap.set(textRef.current, { y: 50 });
    gsap.set(logoRef.current, { scale: 0, rotation: -180 });

    const tl = gsap.timeline({
      onComplete: () => {
        // After intro animation completes, remove all inline transforms
        // so ScrollTrigger starts from a clean state
        gsap.set(titleRef.current, { clearProps: "y,opacity" });
        gsap.set(textRef.current, { clearProps: "y,opacity" });

        // NOW create scroll-triggered fade out (only after intro is done)
        createScrollAnimations();
      },
    });

    // Logo animation
    tl.to(logoRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.5,
    });

    // Title animation
    tl.to(
      titleRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
      },
      "-=0.5"
    );

    // Add glow pulse to title
    gsap.to(titleRef.current, {
      textShadow: "0 0 30px rgba(255,255,255,0.5)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Text animation
    tl.to(
      textRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.8"
    );

    function createScrollAnimations() {
      // Parallax effect on scroll for background image
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

      // Fade out title on scroll — only opacity, no y movement
      // to avoid overflow-hidden clipping issues
      gsap.fromTo(
        titleRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "5% top",
            end: "40% top",
            scrub: true,
          },
        }
      );

      // Fade out description text on scroll
      gsap.fromTo(
        textRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "5% top",
            end: "35% top",
            scrub: true,
          },
        }
      );
    }
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background image with parallax */}
      <div className="absolute inset-0">
        <img
          src="/images/potostudio/main.JPG"
          alt="Memori MSDI"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

      {/* Animated vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]"></div>

      {/* Logo with animation */}
      <div className="absolute top-6 left-6 z-20" ref={logoRef}>
        <img src="/images/logomsdi.svg" alt="Logo MSDI" className="h-12 w-12 drop-shadow-lg" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full items-start justify-center px-6 pt-4 md:pt-6">
        <div className="max-w-5xl text-center text-white">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-black tracking-[0.04em] uppercase mb-1 leading-[0.95]"
            style={{
              textShadow: "0 0 40px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            MEMORI MSDI
          </h1>

          {/* Subtitle with shimmer */}
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 uppercase">
            Preserving Our Precious Moments
          </p>
        </div>
      </div>

      {/* Description text at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full px-6">
        <p
          ref={textRef}
          className="text-xs md:text-sm leading-relaxed text-white/90 drop-shadow-lg max-w-4xl mx-auto text-center"
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          MSDI is more than just a place to grow and learn, it is a place where laughter, stories, and togetherness have blossomed into memories we will always cherish. Amid the harshness and coldness of the outside world, we have always found comfort and warmth in the people within it.
          Thank you for being part of this journey. Thank you for making every step more meaningful. You are not merely companions along the way, but family who will always hold a special place in our hearts.
          Bon Appétit. Let us savor every memory we have left, treasure them dearly, and carry them with us as we embark on the next chapter of our journey.
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}
