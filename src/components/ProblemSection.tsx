import { AlertTriangle, ServerCrash, Skull, ChevronRight } from "lucide-react";
import * as motion from "motion/react-client";

export default function ProblemSection() {
  const cards = [
    {
      id: "card-1",
      title: "Hidden Pollution Events",
      subtitle: "The Blindspots of Modern Cities",
      icon: <AlertTriangle className="h-6 w-6 text-red-400" />,
      glowColor: "rgba(239, 68, 68, 0.15)",
      borderColor: "border-red-500/20",
      bullets: [
        "Spontaneous landfill & open garbage burning",
        "Midnight illegal chemical waste incineration",
        "Unregulated urban construction dust clouds",
        "Localized peak traffic diesel fumes & smog pockets"
      ],
      comment: "These localized events never show up on national registers."
    },
    {
      id: "card-2",
      title: "Current Systems Fail",
      subtitle: "Macro AQI Lacks Micro Resolution",
      icon: <ServerCrash className="h-6 w-6 text-amber-400" />,
      glowColor: "rgba(245, 158, 11, 0.15)",
      borderColor: "border-amber-500/20",
      bullets: [
        "Regional sensors are miles apart, yielding coarse averages",
        "Zero real-time visibility at the street or block level",
        "Disaster and pollution reports rely on manually logged forms",
        "Days of response delay for regulatory field inspections"
      ],
      comment: "Average city-level AQI says 'Good' while streets are breathing smoke."
    },
    {
      id: "card-3",
      title: "Compounding Impact",
      subtitle: "Unseen Toxins, Devastating Costs",
      icon: <Skull className="h-6 w-6 text-emerald-400" />,
      glowColor: "rgba(16, 185, 129, 0.15)",
      borderColor: "border-emerald-500/20",
      bullets: [
        "Severe respiratory diseases & chronic childhood asthma",
        "Suboptimal urban planning leading to school smog traps",
        "Unreported environmental soil and waterway poisoning",
        "Billions of dollars in productivity loss and hospital bills"
      ],
      comment: "Marginalized communities bear 80% of these hyperlocal impacts."
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-red-950/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 h-[350px] w-[350px] rounded-full bg-amber-950/20 blur-[100px] pointer-events-none" />

      {/* Headings */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-mono text-xs font-semibold tracking-widest text-sky-400 uppercase mb-3">
          THE CHALLENGE
        </h2>
        <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
          Our Cities Breathe in Blindspots
        </h3>
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
          Standard weather apps report safe city-wide AQI levels, completely missing toxic hyperlocal incidents occurring on the block next to yours.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -8 }}
            className={`relative flex flex-col justify-between rounded-2xl border ${card.borderColor} bg-slate-950/40 backdrop-blur-md p-6 sm:p-8 overflow-hidden group`}
            style={{
              boxShadow: `inset 0 0 30px rgba(255, 255, 255, 0.02), 0 10px 40px rgba(0, 0, 0, 0.4)`
            }}
          >
            {/* Ambient card interior spotlight glow */}
            <div
              className="absolute -top-12 -left-12 h-24 w-24 rounded-full blur-[40px] opacity-40 transition-all duration-500 group-hover:scale-150"
              style={{ backgroundColor: card.glowColor }}
            />

            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {card.title}
                  </h4>
                  <p className="font-mono text-[10px] text-sky-400/80 uppercase tracking-wide">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Bullet list */}
              <ul className="space-y-3.5 mb-8">
                {card.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <ChevronRight className="h-4 w-4 text-sky-500/80 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Quote Footer inside Card */}
            <div className="border-t border-slate-800/60 pt-4 mt-auto font-mono text-[10px] text-slate-400 italic">
              &ldquo;{card.comment}&rdquo;
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
