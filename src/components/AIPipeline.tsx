import { Camera, Satellite, Radio, CloudSun, ScanFace, Combine, Zap, Clock, BellRing, ArrowRight, ArrowDown } from "lucide-react";
import * as motion from "motion/react-client";

export default function AIPipeline() {
  const stages = [
    {
      num: "01",
      title: "Citizen Report",
      icon: <Camera className="h-5 w-5 text-sky-400" />,
      desc: "Upload geo-tagged images of burning dumps, local soot, or construction hazards.",
      tech: "Mobile App GPS",
    },
    {
      num: "02",
      title: "Satellite Imagery",
      icon: <Satellite className="h-5 w-5 text-indigo-400" />,
      desc: "Retrieve Sentinel-5P TROPOMI and Landsat-9 high-definition spectral datasets.",
      tech: "Google Earth Engine",
    },
    {
      num: "03",
      title: "IoT Sensor Feeds",
      icon: <Radio className="h-5 w-5 text-cyan-400" />,
      desc: "Ingest static local particulate counts (PM2.5, PM10) from low-cost grid nodes.",
      tech: "Dynamic REST WebSockets",
    },
    {
      num: "04",
      title: "Weather Matrix",
      icon: <CloudSun className="h-5 w-5 text-amber-400" />,
      desc: "Merge real-time wind speeds, thermal inversions, temperature and humidity curves.",
      tech: "OpenWeather API",
    },
    {
      num: "05",
      title: "Computer Vision",
      icon: <ScanFace className="h-5 w-5 text-purple-400" />,
      desc: "Process images to classify plumes, estimate densities, and confirm combustion signatures.",
      tech: "Vertex AI / OpenCV",
    },
    {
      num: "06",
      title: "AI Fusion Engine",
      icon: <Combine className="h-5 w-5 text-pink-400" />,
      desc: "Cross-correlate image pixels, satellite layers, and temporal sensor trends.",
      tech: "Gemini 3.5-Flash Core",
    },
    {
      num: "07",
      title: "Hotspot Pinpointing",
      icon: <Zap className="h-5 w-5 text-red-400" />,
      desc: "Detect localized gas release and trigger localized alarm coordinates within 10 meters.",
      tech: "GIS Mapping Engine",
    },
    {
      num: "08",
      title: "AQI Predictions",
      icon: <Clock className="h-5 w-5 text-emerald-400" />,
      desc: "Model pollution dispersion and project 24-hour AQI curves under varying wind states.",
      tech: "TensorFlow Forecasting",
    },
    {
      num: "09",
      title: "Municipal Dispatch",
      icon: <BellRing className="h-5 w-5 text-orange-400" />,
      desc: "Auto-notify local agencies, dispatch mists, fine violators, or reroute diesel trucks.",
      tech: "Webhook Dispatcher",
    },
  ];

  return (
    <section className="relative py-24 bg-[#05070B] border-y border-sky-500/5 overflow-hidden">
      {/* Dynamic background particles/lines */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            COGNITIVE FLOW
          </h2>
          <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
            The Hyperlocal Intelligence Pipeline
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            From raw citizen observations to automatic municipal intervention — see how our multi-layered sensor fusion models air toxicity with zero friction.
          </p>
        </div>

        {/* Desktop Horizontal Scrolling Flow (Hidden on mobile) */}
        <div className="hidden lg:block relative overflow-x-auto pb-12 scrollbar-none">
          <div className="flex gap-6 min-w-[1600px] items-stretch pr-8">
            {stages.map((stage, idx) => (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex-1 flex flex-col justify-between bg-slate-950/40 border border-sky-500/5 rounded-2xl p-5 hover:border-sky-500/25 transition-all duration-300 group"
                style={{
                  boxShadow: "inset 0 0 20px rgba(14, 165, 233, 0.02)"
                }}
              >
                {/* Connector Arrow Line */}
                {idx < stages.length - 1 && (
                  <div className="absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-8 w-8 rounded-full border border-sky-500/10 bg-[#05070B]">
                    <ArrowRight className="h-4 w-4 text-sky-500/60 group-hover:text-sky-400 animate-pulse" />
                  </div>
                )}

                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] text-sky-400/80 font-bold tracking-wider">
                      STAGE {stage.num}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950/40 border border-sky-500/10 shadow-inner group-hover:scale-110 transition-transform">
                      {stage.icon}
                    </div>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-white group-hover:text-sky-300 transition-colors mb-2">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {stage.desc}
                  </p>
                </div>

                {/* Bottom Spec Label */}
                <div className="border-t border-slate-800/60 pt-3 mt-auto flex items-center justify-between font-mono text-[9px] text-slate-500">
                  <span>ENGINE:</span>
                  <span className="text-slate-300 font-semibold uppercase">{stage.tech}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile connected Vertical Timeline (Visible on mobile/tablet) */}
        <div className="lg:hidden flex flex-col gap-8 relative pl-4 border-l border-sky-500/10">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative bg-slate-950/50 border border-sky-500/5 rounded-xl p-5 group"
            >
              {/* Connector Pin */}
              <div className="absolute -left-[29px] top-7 h-6 w-6 rounded-full border border-sky-500/20 bg-[#05070B] flex items-center justify-center text-[10px] font-bold text-sky-400">
                {stage.num}
              </div>

              <div className="flex items-center gap-3.5 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950/40 border border-sky-500/10">
                  {stage.icon}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">{stage.title}</h4>
                  <p className="font-mono text-[9px] text-slate-500 uppercase">{stage.tech}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
