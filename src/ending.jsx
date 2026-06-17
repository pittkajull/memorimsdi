const scatteredPhotos = [
  { src: "/images/IMG_0087.JPG", alt: "Memory", rotate: -15, x: "5%", y: "8%", width: "180px" },
  { src: "/images/IMG_0088.JPG", alt: "Memory", rotate: 8, x: "65%", y: "5%", width: "170px" },
  { src: "/images/IMG_0089.JPG", alt: "Memory", rotate: -5, x: "75%", y: "25%", width: "160px" },
  { src: "/images/IMG_0090.JPG", alt: "Memory", rotate: 12, x: "2%", y: "35%", width: "175px" },
  { src: "/images/IMG_0091.JPG", alt: "Memory", rotate: -8, x: "70%", y: "55%", width: "165px" },
  { src: "/images/IMG_0092.JPG", alt: "Memory", rotate: 5, x: "8%", y: "60%", width: "155px" },
  { src: "/images/IMG_0094.JPG", alt: "Memory", rotate: -12, x: "55%", y: "72%", width: "170px" },
  { src: "/images/IMG_0095.JPG", alt: "Memory", rotate: 10, x: "20%", y: "78%", width: "160px" },
];

export default function Ending() {
  return (
    <section className="relative bg-gradient-to-b from-amber-900/40 via-amber-800/30 to-black py-0 overflow-hidden min-h-screen">
      {/* Wood texture background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      ></div>

      {/* Wood grain lines */}
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_30px,rgba(139,90,43,0.3)_30px,rgba(139,90,43,0.3)_31px)]"></div>

      <div className="relative min-h-screen max-w-6xl mx-auto px-4 py-16">
        {/* Scattered Polaroid Photos */}
        {scatteredPhotos.map((photo, index) => (
          <div
            key={index}
            className="absolute hidden md:block"
            style={{
              left: photo.x,
              top: photo.y,
              transform: `rotate(${photo.rotate}deg)`,
              width: photo.width,
              zIndex: 10 + index,
            }}
          >
            {/* Polaroid frame */}
            <div className="bg-white p-2 pb-10 shadow-xl hover:z-50 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover"
              />
              {/* Tape effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/60 backdrop-blur-sm rotate-2"></div>
            </div>
          </div>
        ))}

        {/* Mobile scattered photos */}
        <div className="md:hidden grid grid-cols-2 gap-3 px-4">
          {scatteredPhotos.slice(0, 4).map((photo, index) => (
            <div
              key={index}
              className="bg-white p-1.5 pb-6 shadow-xl"
              style={{ transform: `rotate(${photo.rotate / 2}deg)` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Center Paper Note */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[340px] md:w-[420px]">
          {/* Paper */}
          <div className="relative bg-gradient-to-b from-amber-50 to-white p-8 md:p-10 shadow-2xl rotate-1">
            {/* Paper texture lines */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(transparent,transparent_27px,#e5d4c1_27px,#e5d4c1_28px)]"></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="font-['Caveat',_cursive] text-2xl md:text-3xl text-red-700 mb-6 text-center">
                31 Days with Them
              </h3>

              <div className="font-['Caveat',_cursive] text-base md:text-lg text-gray-800 leading-relaxed space-y-4">
                <p>
                  Bukan cuma soal program kerja, tapi perjalanan kecil yang penuh makna.
                  Pagi yang penuh semangat, siang yang melelahkan, sampai malam yang diisi
                  cerita dan tawa.
                </p>
                <p className="italic">
                  We came as strangers, but we leave as family.
                </p>
                <p>
                  Terima kasih KKN 12 Sungai Lekop, kalian sudah jadi bagian dari cerita
                  indah yang akan selalu dikenang. KKN mungkin berakhir, tapi kisah ini
                  tidak akan pernah selesai.
                </p>
              </div>
            </div>

            {/* Paper corner fold */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-b-amber-200 border-l-[40px] border-l-transparent"></div>
          </div>

          {/* Shadow for paper */}
          <div className="absolute -bottom-2 left-2 right-2 h-8 bg-black/20 blur-xl rounded-full"></div>
        </div>

        {/* Camera */}
        <div className="absolute bottom-8 right-8 md:right-16 z-20 opacity-80">
          <div className="w-48 h-48 md:w-64 md:h-64 relative">
            {/* Simplified camera illustration */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
              {/* Lens */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-black border-4 border-gray-600 shadow-inner">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/20 border border-gray-600"></div>
                <div className="absolute inset-4 rounded-full bg-black/40 border border-gray-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-800/40 to-purple-900/30"></div>
              </div>
              {/* Viewfinder */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-700 rounded-t-sm"></div>
              {/* Flash */}
              <div className="absolute top-3 right-4 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-sm"></div>
              {/* Grip */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-700 to-transparent rounded-r-lg"></div>
            </div>
          </div>
        </div>

        {/* END Typography */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-40">
          <div className="flex items-end gap-1">
            <span className="text-white/60 text-sm md:text-base font-bold tracking-wider mb-4">HAS</span>
            <div className="relative">
              <h1 className="text-[80px] md:text-[140px] font-black text-white/90 leading-none tracking-tighter">
                END
              </h1>
              {/* Grunge texture on text */}
              <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] mix-blend-overlay"></div>
            </div>
            <span className="text-white/60 text-sm md:text-base font-bold tracking-wider mb-2">ED</span>
          </div>
          <p className="text-white/50 text-xs md:text-sm tracking-[0.3em] mt-2 uppercase">
            KKN 12 Sungai Lekop Story
          </p>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
    </section>
  );
}
