import { Cpu, Eye, Code2, Globe2, Layers, Cloud } from "lucide-react";
import * as motion from "motion/react-client";

export default function TechStack() {
  const stack = [
    {
      name: "Gemini 3.5-Flash",
      category: "AI Reasoning & NLP",
      icon: <Cpu className="h-5 w-5 text-purple-400" />,
      desc: "Powers the server-side citizen report ingestion, extracting structured coordinates, pollution severity, and action guides from natural text.",
      glowColor: "from-purple-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/30"
    },
    {
      name: "OpenCV & Vertex AI",
      category: "Computer Vision",
      icon: <Eye className="h-5 w-5 text-indigo-400" />,
      desc: "Applies deep computer vision classifiers on citizen image uploads to detect smoke plume densities and particle dispersion grids.",
      glowColor: "from-indigo-500/10 to-transparent",
      borderColor: "group-hover:border-indigo-500/30"
    },
    {
      name: "TensorFlow Engine",
      category: "Sensor Fusion",
      icon: <Layers className="h-5 w-5 text-pink-400" />,
      desc: "Binds micro-sensors and global weather data to run real-time multi-dimensional regression models predicting localized AQI curves.",
      glowColor: "from-pink-500/10 to-transparent",
      borderColor: "group-hover:border-pink-500/30"
    },
    {
      name: "Google Earth Engine",
      category: "Satellite Remote Sensing",
      icon: <Globe2 className="h-5 w-5 text-cyan-400" />,
      desc: "Harvests Sentinel-5P NO2 gas concentrations and Landsat thermal bands to track pollution clouds across regional scale.",
      glowColor: "from-cyan-500/10 to-transparent",
      borderColor: "group-hover:border-cyan-500/30"
    },
    {
      name: "Three.js Engine",
      category: "3D Visualization",
      icon: <Code2 className="h-5 w-5 text-sky-400" />,
      desc: "Creates high-performance WebGL renders of our rotating orbital globe and 3D cognitive cityscape mapping layer on browser canvas.",
      glowColor: "from-sky-500/10 to-transparent",
      borderColor: "group-hover:border-sky-500/30"
    },
    {
      name: "Cloud Run & Express",
      category: "Serverless Deployment",
      icon: <Cloud className="h-5 w-5 text-emerald-400" />,
      desc: "Hosts the secure full-stack backend application, proxying API requests safely and managing automatic server scaling.",
      glowColor: "from-emerald-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-500/30"
    }
  ];

  return (
    <section className="relative py-24 bg-[#05070B] border-t border-sky-500/5 overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-sky-950/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-purple-400 uppercase mb-3">
            INFRASTRUCTURE
          </h2>
          <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
            The Multi-Dimensional Stack
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Engineered using cutting-edge satellite observation SDKs, Google Cloud servers, and robust deep learning models to deliver instantaneous urban forecasting.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative rounded-xl border border-slate-900 bg-slate-950/40 p-6 flex flex-col justify-between overflow-hidden group hover:bg-slate-950/60 transition-all duration-300"
              style={{
                boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.01)"
              }}
            >
              {/* Corner Glow */}
              <div className={`absolute -right-12 -top-12 h-24 w-24 bg-gradient-to-b ${tech.glowColor} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-sky-400/80 font-bold uppercase tracking-wide">
                    {tech.category}
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                </div>

                <h4 className="font-sans font-bold text-base text-white group-hover:text-sky-300 transition-colors mb-2.5">
                  {tech.name}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              {/* Fake visual connection link */}
              <div className="border-t border-slate-900 mt-6 pt-3 flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase">
                <span>STATUS:</span>
                <span className="text-emerald-400 font-bold">INTEGRATED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
