import { useEffect, useRef } from "react";

const filmStrip1 = [
  "/images/01d0a3cd-ffcb-4bdd-8515-263beed9439d.JPG",
  "/images/04562e0b-058c-497e-abe1-09b545272053.JPG",
  "/images/12350c3c-ff28-4e21-944a-0a3f005b1d7d.JPG",
  "/images/47dcd5a1-89a0-4e62-82f8-4c1fa3f7bc9b.JPG",
  "/images/4a79e3f7-8c25-491b-9f86-ad203248fe97.JPG",
  "/images/67ec0798-1846-415c-af5e-caefe4af3ddc.JPG",
  "/images/77bc2374-ca88-4946-85c8-8f6488fffa60.JPG",
  "/images/872cf576-8e79-4a8e-a102-a101ecbd41bc.JPG",
  "/images/8bd48f2d-9d63-4561-9653-b411b29fcb31.JPG",
  "/images/9084c854-30a1-496b-a092-dc4e2a89d03e.JPG",
  "/images/965e29d6-164f-49cd-83d7-846271762bb4.JPG",
  "/images/9a51b6eb-5aff-49c7-9e02-97b7f78096fa.JPG",
];

const filmStrip2 = [
  "/images/a8b82dac-2106-4c27-910d-da8601ffac1f.JPG",
  "/images/b95e99b6-0c3b-4e53-807d-35b29e02a052.JPG",
  "/images/c0f97371-a9c6-4b79-9b2e-a905d091f14b.JPG",
  "/images/d2603834-b038-42fa-b9f7-44f725f06c5a.JPG",
  "/images/df22a3ae-98e8-46da-a34a-29c023a28568.JPG",
  "/images/ea453f76-680a-4186-9967-71098c1d841c.JPG",
  "/images/f174225a-e77c-44d9-b25d-d94f4b65ca62.JPG",
  "/images/IMG_0097.JPG",
  "/images/IMG_0100.JPG",
  "/images/IMG_0103.JPG",
  "/images/IMG_0106.JPG",
  "/images/IMG_0109.JPG",
];

function SprocketHoles() {
  return (
    <div className="flex gap-4 px-4">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-3 bg-black/80 border border-zinc-600/30 flex-shrink-0"
        ></div>
      ))}
    </div>
  );
}

function FilmStripRow({ images, direction = "left" }) {
  const isLeft = direction === "left";

  return (
    <div className="relative overflow-hidden py-4">
      <div className="bg-zinc-900/90 border border-zinc-700/40 py-3">
        <SprocketHoles />

        <div className="relative overflow-hidden my-3">
          {/* CSS infinite scroll */}
          <div
            className="flex gap-2 w-max"
            style={{
              animation: `${isLeft ? "scrollLeft" : "scrollRight"} 60s linear infinite`,
            }}
          >
            {/* Repeat 4 times for seamless loop */}
            {[...images, ...images, ...images, ...images].map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-72 h-48 md:w-80 md:h-56 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Memory ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <SprocketHoles />
      </div>
    </div>
  );
}

export default function Filmstrip() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Inline keyframes */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-full mx-auto relative z-10 px-4">
        {/* Handwritten annotation */}
        <div className="mb-12 ml-6">
          <p className="font-['Caveat',_cursive] text-2xl md:text-4xl text-white/40">
            Setiap momen tersimpan dalam gulungan film ini...
          </p>
        </div>

        {/* Film Strip Rows */}
        <div className="space-y-8">
          <FilmStripRow images={filmStrip1} direction="left" />
          <FilmStripRow images={filmStrip2} direction="right" />
        </div>
      </div>
    </section>
  );
}
