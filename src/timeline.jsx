const memories = [
  {
    year: "2023",
    title: "The Beginning of the Journey",
    description: "When we first gathered with the same passion, taking small steps toward big dreams.",
  },
  {
    year: "2024",
    title: "Challenges & Growth",
    description: "Overcoming various obstacles, learning from failure, and discovering strength in unity.",
  },
  {
    year: "2025",
    title: "Extraordinary Achievements",
    description: "Achieving accomplishments we never imagined, proving that hard work pays off.",
  },
];

export default function Timeline() {
  return (
    <section className="relative bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="text-white/30 text-xs tracking-[0.4em] uppercase block mb-4">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Our Memories
          </h2>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-white/20"></div>
            <div className="w-1.5 h-1.5 bg-white/40 rotate-45"></div>
            <div className="w-12 h-px bg-white/20"></div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-0">
          {memories.map((memory, index) => (
            <div key={index} className="relative flex items-start gap-8 md:gap-16 group">
              {/* Left: Year */}
              <div className="flex-shrink-0 w-24 md:w-32 text-right pt-1">
                <span className="text-3xl md:text-5xl font-black text-white/10 group-hover:text-white/30 transition-colors duration-700">
                  {memory.year}
                </span>
              </div>

              {/* Center: Line & Dot */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-white/60 transition-all duration-500 ring-4 ring-black"></div>
                {index < memories.length - 1 && (
                  <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent"></div>
                )}
              </div>

              {/* Right: Content */}
              <div className="flex-1 pb-20">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-wide">
                  {memory.title}
                </h3>
                <p className="text-white/40 leading-relaxed text-sm md:text-base max-w-lg">
                  {memory.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
