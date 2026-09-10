import { Check, X, ShieldAlert, Zap } from "lucide-react";
import * as motion from "motion/react-client";

export default function WhyOurSolution() {
  const points = [
    {
      feature: "Spatial Resolution",
      legacy: "Coarse: 1 regional sensor covers up to 15 miles",
      ourAi: "Hyperlocal: GPS precision mapped down to 10 meters",
      isOurAiBetter: true
    },
    {
      feature: "Report Ingestion Latency",
      legacy: "Days: Paperwork and slow regulatory forms",
      ourAi: "Real-time: Citizen uploads analysed in under 3 seconds",
      isOurAiBetter: true
    },
    {
      feature: "Multimodal Computer Vision",
      legacy: "None: Completely blind to visual smoke plume occurrences",
      ourAi: "Active: Scans uploads + sat images automatically",
      isOurAiBetter: true
    },
    {
      feature: "Sensor Fusion Engine",
      legacy: "Isolated: Simple static AQI readings displayed in vacuum",
      ourAi: "Integrated: Fuses weather, sat, IoT, and reports together",
      isOurAiBetter: true
    },
    {
      feature: "Forecast Horizon",
      legacy: "Zero: Reactive alerts published after peak levels occur",
      ourAi: "24 Hours: Predicts air toxicity trends in advance",
      isOurAiBetter: true
    },
    {
      feature: "Municipal Engagement",
      legacy: "Manual: Snail-mail citizens' complaint dispatching",
      ourAi: "Automatic: Instant API webhook dispatches alerts",
      isOurAiBetter: true
    },
    {
      feature: "Deployment Capital Cost",
      legacy: "Extreme: Up to $80k per high-grade sampling cabin",
      ourAi: "Fractional: Low-cost edge IoT nodes paired with cloud AI",
      isOurAiBetter: true
    }
  ];

  return (
    <section id="why-compare" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background neon flares */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/3 h-[400px] w-[400px] rounded-full bg-emerald-950/10 blur-[120px] pointer-events-none" />

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-mono text-xs font-semibold tracking-widest text-sky-400 uppercase mb-3">
          SYSTEM PARADIGM
        </h2>
        <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
          How We Compare to Legacy Tech
        </h3>
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
          Traditional municipal monitoring stations are prohibitively expensive and blind to local toxic peaks. Our cloud sensor-fusion model redefines urban air defense.
        </p>
      </div>

      {/* Comparison Grid/Table */}
      <div className="overflow-x-auto rounded-2xl border border-sky-500/10 bg-slate-950/25 backdrop-blur-md shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-sky-500/10 bg-slate-950/50">
              <th className="py-5 px-6 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">CORE PARAMETER</th>
              <th className="py-5 px-6 text-xs font-mono font-bold tracking-wider text-red-400 uppercase flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0" /> TRADITIONAL REGIONAL SENSORS
              </th>
              <th className="py-5 px-6 text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400 animate-pulse shrink-0" /> CLEANAIR & CLEAR STREETS
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 font-sans text-sm">
            {points.map((pt, idx) => (
              <motion.tr
                key={pt.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ backgroundColor: "rgba(14, 165, 233, 0.02)" }}
                className="transition-colors group"
              >
                {/* Feature Column */}
                <td className="py-4.5 px-6 font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">
                  {pt.feature}
                </td>

                {/* Traditional Column */}
                <td className="py-4.5 px-6 text-slate-400">
                  <div className="flex items-center gap-3">
                    <X className="h-4 w-4 text-red-500/70 shrink-0" />
                    <span>{pt.legacy}</span>
                  </div>
                </td>

                {/* Our Platform Column */}
                <td className="py-4.5 px-6 font-medium text-white bg-sky-950/5 group-hover:bg-sky-950/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-100">{pt.ourAi}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Bottom comparison summary note */}
      <div className="mt-8 p-5 rounded-xl border border-sky-500/10 bg-sky-950/5 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-900/20 border border-sky-500/20">
          <Zap className="h-5 w-5 text-sky-400" />
        </div>
        <p className="font-sans text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">The Bottom Line:</strong> We replace million-dollar hardware infrastructures with intelligent, multi-layered cloud neural processing — achieving <span className="text-emerald-400 font-bold">1000x spatial resolution improvement</span> at 1% of the deployment cost.
        </p>
      </div>
    </section>
  );
}
