import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const photos = [
  "/images/fotoenjoy/01d0a3cd-ffcb-4bdd-8515-263beed9439d.JPG",
  "/images/fotoenjoy/04562e0b-058c-497e-abe1-09b545272053.JPG",
  "/images/fotoenjoy/04c549d7-9160-4370-b50d-248cfee51508.jpg",
  "/images/fotoenjoy/11a7e7d1-2eee-4e77-9805-3a863d447e69.jpg",
  "/images/fotoenjoy/11c638d5-0910-44bc-bd98-c583372115d3.jpg",
  "/images/fotoenjoy/12350c3c-ff28-4e21-944a-0a3f005b1d7d.JPG",
  "/images/fotoenjoy/13dd1a41-5183-4e2e-b4e5-aeda1dfa590c.JPG",
  "/images/fotoenjoy/14AEF031-E0F8-46D1-8322-43D587D84CCF.jpg",
  "/images/fotoenjoy/1b8d2f76-66e1-4eb8-9cb5-209b8780637e.JPG",
  "/images/fotoenjoy/2d1cc50d-513f-4e06-869c-91a586f2a8f7(1).jpg",
  "/images/fotoenjoy/2d1cc50d-513f-4e06-869c-91a586f2a8f7.jpg",
  "/images/fotoenjoy/2E2FB412-2988-467A-8442-0CF740F97DB9.jpg",
  "/images/fotoenjoy/2fe2145c-df06-40ea-a698-bc3d2049b417.jpg",
  "/images/fotoenjoy/379a4c14-a720-406b-8f5f-e5b422e7b33b.jpg",
  "/images/fotoenjoy/47dcd5a1-89a0-4e62-82f8-4c1fa3f7bc9b.JPG",
  "/images/fotoenjoy/4a79e3f7-8c25-491b-9f86-ad203248fe97.JPG",
  "/images/fotoenjoy/51f8ca49-f0c3-42ac-99b5-afe3b0a699e1.JPG",
  "/images/fotoenjoy/54bfa467-c486-49df-a1dd-399b06feea09.jpg",
  "/images/fotoenjoy/56b30e8b-49ec-4fe6-be47-99ecd65a3811.jpg",
  "/images/fotoenjoy/62e69552-a445-435a-8326-144f35f4a8a1.JPG",
  "/images/fotoenjoy/63096658-c67b-486f-a5e9-80df75040ba1.jpg",
  "/images/fotoenjoy/67ec0798-1846-415c-af5e-caefe4af3ddc.JPG",
  "/images/fotoenjoy/6a604120-985f-4130-b8d3-6dac5f37865a.jpg",
  "/images/fotoenjoy/77bc2374-ca88-4946-85c8-8f6488fffa60.JPG",
  "/images/fotoenjoy/78682475-68db-4772-af7b-c12c9437d4b3.JPG",
  "/images/fotoenjoy/8077396f-0857-4a12-962f-a657faebace9.jpg",
  "/images/fotoenjoy/872cf576-8e79-4a8e-a102-a101ecbd41bc.JPG",
  "/images/fotoenjoy/8b073779-edf9-480d-8143-e90e24c44e66.JPG",
  "/images/fotoenjoy/8bd48f2d-9d63-4561-9653-b411b29fcb31.JPG",
  "/images/fotoenjoy/9084c854-30a1-496b-a092-dc4e2a89d03e.JPG",
  "/images/fotoenjoy/9458c31d-61c8-4054-b0c1-551b6e766fc8.JPG",
  "/images/fotoenjoy/948b32a2-3918-44f8-8e64-8b492dc7ca66.jpg",
  "/images/fotoenjoy/965e29d6-164f-49cd-83d7-846271762bb4.JPG",
  "/images/fotoenjoy/99420135-f1dc-4be3-bfa0-f072aebcef56.JPG",
  "/images/fotoenjoy/9a51b6eb-5aff-49c7-9e02-97b7f78096fa.JPG",
  "/images/fotoenjoy/9A91EFE3-68EA-4FB2-ADD4-2F163EBDE3BE(1).jpg",
  "/images/fotoenjoy/9A91EFE3-68EA-4FB2-ADD4-2F163EBDE3BE.jpg",
  "/images/fotoenjoy/9aaa6a38-74f7-4757-8240-359b953a07a8.jpg",
  "/images/fotoenjoy/9E8ABF55-4704-493E-9C1B-4505E92E7973.jpg",
  "/images/fotoenjoy/9ccd8012-52a2-4e34-9b45-87bffbeb44b9.jpg",
  "/images/fotoenjoy/a8b82dac-2106-4c27-910d-da8601ffac1f.JPG",
  "/images/fotoenjoy/AC9CC3B2-441D-4432-B253-B07713B3605A.jpg",
  "/images/fotoenjoy/ae0096a9-0819-4d18-b583-ea84e2d95a53.jpg",
  "/images/fotoenjoy/b95e99b6-0c3b-4e53-807d-35b29e02a052.JPG",
  "/images/fotoenjoy/ba2c5e00-3cff-44de-afd4-d8881355dba6.jpg",
  "/images/fotoenjoy/c0f97371-a9c6-4b79-9b2e-a905d091f14b.JPG",
  "/images/fotoenjoy/d2603834-b038-42fa-b9f7-44f725f06c5a.JPG",
  "/images/fotoenjoy/dclassic 2025-11-30 001627.311.jpg",
  "/images/fotoenjoy/df22a3ae-98e8-46da-a34a-29c023a28568.JPG",
  "/images/fotoenjoy/df42a256-f2f5-4394-b469-51ad518b91ce.JPG",
  "/images/fotoenjoy/DSC04072.JPG",
  "/images/fotoenjoy/e6152c66-0ed5-4131-8c35-1e672ecfd4ce.jpg",
  "/images/fotoenjoy/ea453f76-680a-4186-9967-71098c1d841c.JPG",
  "/images/fotoenjoy/f174225a-e77c-44d9-b25d-d94f4b65ca62.JPG",
  "/images/fotoenjoy/fcbcb49f-4369-42b7-b281-0ce4f8d0f806.jpg",
  "/images/fotoenjoy/IMG_0687.JPEG",
  "/images/fotoenjoy/IMG_0722.JPEG",
  "/images/fotoenjoy/IMG_0905.JPEG",
  "/images/fotoenjoy/IMG_0909.JPEG",
  "/images/fotoenjoy/IMG_5492.JPG",
  "/images/fotoenjoy/IMG_5511.JPG",
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    // Title animation
    gsap.from(titleRef.current.children, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Gallery items with 3D tilt effect
    const items = gridRef.current.children;
    gsap.from(items, {
      scale: 0.8,
      opacity: 0,
      rotateX: 15,
      duration: 0.6,
      stagger: {
        amount: 1.5,
        from: "random",
      },
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 90%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-black py-32 px-4 md:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/30 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-20">
          <p className="font-['Caveat',_cursive] text-2xl md:text-3xl text-amber-500/60 mb-4">
            #WeAlwaysRemember
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Happy Moments
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-white/30"></div>
            <div className="w-2 h-2 bg-white/40 rotate-45"></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-white/30"></div>
          </div>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto">
            Every photo holds a story, every smile holds a memory
          </p>
        </div>

        {/* Photo grid */}
        <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((src, index) => (
            <div
              key={index}
              className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
              style={{
                perspective: "1000px",
              }}
            >
              <div className="relative transform transition-all duration-700 group-hover:rotate-y-3 group-hover:rotate-x-3">
                <img
                  src={src}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-white/80 text-sm font-medium">Memory {index + 1}</span>
                    </div>
                  </div>
                </div>
                {/* Border glow on hover */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-lg transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-20 text-center">
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-6 text-4xl text-white/10">&ldquo;</div>
            <p className="font-['Caveat',_cursive] text-2xl md:text-3xl text-white/40 px-8">
              The laughter we once shared will always feel warm in our hearts
            </p>
            <div className="absolute -bottom-4 -right-6 text-4xl text-white/10">&rdquo;</div>
          </div>
        </div>
      </div>
    </section>
  );
}
