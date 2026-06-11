import heroImage from "./images/potostudio1.jpg";
import logo from "./images/logomsdi.svg";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <img
        src={heroImage}
        alt="Memori MSDI"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Overlay gelap - gradient from top transparent to bottom dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/90"></div>

      {/* Logo */}
      <div className="absolute top-4 left-4 z-20">
        <img src={logo} alt="Logo MSDI" className="h-10 w-10" />
      </div>

      {/* Text */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-5xl text-center text-white">
          <h1 className="text-6xl md:text-8xl font-black tracking-wider drop-shadow-2xl uppercase">
            MEMORI MSDI
          </h1>

          <p className="mt-8 text-sm md:text-base leading-relaxed text-white/95 drop-shadow-lg max-w-3xl mx-auto">
            Ada yang bilang msdi itu tempat berproses, tapi bagi kami, ini adalah tempat berpulang. Di sini, dinginnya
            dunia luar tidak pernah terasa karena kami punya api kecil yang selalu menyala di tengah-tengah kami
            sebuah rasa kekeluargaan yang tulus. Terima kasih sudah menjadi bumbu paling manis dalam perjalanan
            kami. Bon Appétit, nikmatilah setiap sisa kenangan hangat ini di dalam hati kalian.
          </p>
        </div>
      </div>
    </section>
  );
}
