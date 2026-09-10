import { Wind, ShieldAlert, Cpu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-500/10 bg-[#05070B]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 p-0.5 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#05070B]">
              <Wind className="h-5 w-5 text-sky-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm tracking-wide text-white uppercase sm:text-base">
              CleanAir <span className="text-sky-400 font-normal">&</span> Clear Streets
            </span>
            <span className="font-mono text-[9px] text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
              <Cpu className="h-2.5 w-2.5 animate-spin" /> AI INTEL CORE v4.12
            </span>
          </div>
        </div>

        {/* Navigation Bar matching Immersive UI */}
        <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          <a href="#" className="text-white border-b border-sky-500 pb-1 transition-colors">Overview</a>
          <a href="#cognitive-pipeline" className="hover:text-sky-400 transition-colors">Intelligence</a>
          <a href="#live-dashboard" className="hover:text-sky-400 transition-colors">HUD Dashboard</a>
          <a href="#why-compare" className="hover:text-sky-400 transition-colors">Comparison</a>
        </div>

        {/* Action Button */}
        <div>
          <a
            href="#live-dashboard"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-950/20 px-4 font-sans text-xs font-semibold text-sky-400 transition hover:bg-sky-500/15 hover:border-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.1)] hover:shadow-[0_0_15px_rgba(14,165,233,0.25)]"
          >
            Launch HUD Dashboard
          </a>
        </div>
      </div>
    </header>
  );
}
