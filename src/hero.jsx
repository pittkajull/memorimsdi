import heroImage from "./images/potostudio1.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <img
        src={heroImage}
        alt="Memori MSDI"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

      {/* Text */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest drop-shadow-xl">
            MEMORI MSDI
          </h1>

          <p className="mt-6 text-sm md:text-base leading-relaxed text-white/90 drop-shadow-md">
            Ada yang bilang MSDI itu tempat berproses, tapi bagi kami, ini
            adalah tempat berpulang. Di sini, dinginnya dunia luar tidak pernah
            terasa karena kami punya api kecil yang selalu menyala di
            tengah-tengah kami.
          </p>
        </div>
      </div>
    </section>
  );
}
