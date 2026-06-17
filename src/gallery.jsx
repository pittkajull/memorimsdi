import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const photos = [
  "/images/04c549d7-9160-4370-b50d-248cfee51508.jpg",
  "/images/11a7e7d1-2eee-4e77-9805-3a863d447e69.jpg",
  "/images/14AEF031-E0F8-46D1-8322-43D587D84CCF.jpg",
  "/images/2E2FB412-2988-467A-8442-0CF740F97DB9.jpg",
  "/images/2d1cc50d-513f-4e06-869c-91a586f2a8f7.jpg",
  "/images/379a4c14-a720-406b-8f5f-e5b422e7b33b.jpg",
  "/images/54bfa467-c486-49df-a1dd-399b06feea09.jpg",
  "/images/56b30e8b-49ec-4fe6-be47-99ecd65a3811.jpg",
  "/images/63096658-c67b-486f-a5e9-80df75040ba1.jpg",
  "/images/6a604120-985f-4130-b8d3-6dac5f37865a.jpg",
  "/images/8077396f-0857-4a12-962f-a657faebace9.jpg",
  "/images/948b32a2-3918-44f8-8e64-8b492dc7ca66.jpg",
  "/images/9A91EFE3-68EA-4FB2-ADD4-2F163EBDE3BE.jpg",
  "/images/9E8ABF55-4704-493E-9C1B-4505E92E7973.jpg",
  "/images/9aaa6a38-74f7-4757-8240-359b953a07a8.jpg",
  "/images/9ccd8012-52a2-4e34-9b45-87bffbeb44b9.jpg",
  "/images/AC9CC3B2-441D-4432-B253-B07713B3605A.jpg",
  "/images/ae0096a9-0819-4d18-b583-ea84e2d95a53.jpg",
  "/images/ba2c5e00-3cff-44de-afd4-d8881355dba6.jpg",
  "/images/dclassic 2025-11-30 001627.311.jpg",
  "/images/e6152c66-0ed5-4131-8c35-1e672ecfd4ce.jpg",
  "/images/fcbcb49f-4369-42b7-b281-0ce4f8d0f806.jpg",
  "/images/IMG_5492.JPG",
  "/images/IMG_5511.JPG",
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
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

        <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((src, index) => (
            <div key={index} className="break-inside-avoid group relative overflow-hidden rounded-sm cursor-pointer">
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-full h-auto object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
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

        <div className="mt-16 text-center">
          <p className="font-['Caveat',_cursive] text-xl md:text-2xl text-white/30">
            &quot;Tawa yang pernah kita bagi, akan selalu terasa hangat di hati&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
