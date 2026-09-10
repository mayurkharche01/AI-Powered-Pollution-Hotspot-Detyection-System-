import { Drone, Flame, ShieldAlert, Waves, Volume2, Landmark, HelpCircle } from "lucide-react";
import * as motion from "motion/react-client";

export default function FutureRoadmap() {
  const milestones = [
    {
      quarter: "Q4 2026",
      title: "Atmospheric Patrol Drone Fleet",
      icon: <Drone className="h-4 w-4 text-sky-400" />,
      desc: "Deploy autonomous particulate-sampling hexacopters programmed to automatically launch and hover near newly flagged citizen report coordinates for physical verification.",
      status: "DEVELOPMENT"
    },
    {
      quarter: "Q1 2027",
      title: "Wildfire & Agricultural Burning Detection",
      icon: <Flame className="h-4 w-4 text-orange-400" />,
      desc: "Incorporate thermal infrared satellite telemetry to instantly pinpoint outdoor farm brush burns and dry forest smoke origins within municipal borders.",
      status: "RESEARCH"
    },
    {
      quarter: "Q2 2027",
      title: "Illegal Quarrying & Mining Alarms",
      icon: <ShieldAlert className="h-4 w-4 text-red-400" />,
      desc: "Train deep convolutional segmentation models to detect quarry expansions, massive mineral soil heaps, and heavy demolition works via daily Landsat images.",
      status: "PLANNING"
    },
    {
      quarter: "Q3 2027",
      title: "Waterway Discharge & Hydrology Mapping",
      icon: <Waves className="h-4 w-4 text-indigo-400" />,
      desc: "Analyze optical satellite spectrums to flag sudden river turbulence, industrial chemical discharges, and severe water algae growths dynamically.",
      status: "CONCEPT"
    },
    {
      quarter: "Q4 2027",
      title: "Acoustic Decibel Mesh & Noise Pollution",
      icon: <Volume2 className="h-4 w-4 text-amber-400" />,
      desc: "Integrate low-cost acoustic decibel meters into our street IoT nodes to capture heavy diesel traffic horn spikes and illegal nocturnal drilling.",
      status: "CONCEPT"
    },
    {
      quarter: "Q1 2028",
      title: "National Smart City GIS Sovereign Layer",
      icon: <Landmark className="h-4 w-4 text-emerald-400" />,
      desc: "Scale the full CleanAir & Clear Streets architecture into a unified national urban monitoring standard, feeding directly into federal environmental policies.",
      status: "CONCEPT"
    }
  ];

  return (
    <section className="relative py-24 bg-[#05070B] overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-0 h-[400px] w-[200px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-sky-400 uppercase mb-3">
            HORIZON INDEX
          </h2>
          <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
            Our Vision for Urban Defense
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            CleanAir & Clear Streets is expanding into a multi-layered municipal defense mesh. Track our engineering timeline to see where we deploy next.
          </p>
        </div>

        {/* Timeline Line & Points */}
        <div className="relative border-l-2 border-sky-500/10 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Glowing Indicator Pin */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 h-6 w-6 rounded-full border border-sky-500/20 bg-slate-950 flex items-center justify-center shadow-lg group-hover:border-sky-400 transition-colors">
                {milestone.icon}
              </div>

              {/* Box */}
              <div className="bg-slate-950/40 border border-sky-500/5 rounded-2xl p-6 hover:border-sky-500/15 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-sky-400">
                    {milestone.quarter}
                  </span>
                  <span className="font-mono text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50 text-slate-400 max-w-max">
                    {milestone.status}
                  </span>
                </div>
                <h4 className="font-sans font-bold text-base text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {milestone.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {milestone.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
