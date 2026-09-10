import { Wind, Github, FileText, Users, Cpu, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-900 bg-[#05070B] py-16 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-sky-950/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-900 pb-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#05070B]">
                  <Wind className="h-4.5 w-4.5 text-sky-400" />
                </div>
              </div>
              <span className="font-sans font-bold text-sm tracking-wide text-white uppercase">
                CleanAir <span className="text-sky-400 font-normal">&</span> Clear Streets
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
              Empowering communities and municipalities with high-fidelity, real-time hyperlocal pollution analysis and predictive air intelligence.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-emerald-400 font-semibold tracking-wider">
              <Cpu className="h-3 w-3 animate-pulse" /> BUILT FOR GOOGLE BUILD WITH AI
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">RESOURCES</h4>
            <ul className="space-y-3 font-sans text-xs text-slate-400">
              <li>
                <a href="https://github.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Github className="h-3.5 w-3.5 text-sky-500" /> GitHub Repository
                </a>
              </li>
              <li>
                <a href="#live-dashboard" className="flex items-center gap-2 hover:text-white transition-colors">
                  <FileText className="h-3.5 w-3.5 text-sky-500" /> Platform Docs
                </a>
              </li>
              <li>
                <a href="#live-dashboard" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Users className="h-3.5 w-3.5 text-sky-500" /> Developer Team
                </a>
              </li>
            </ul>
          </div>

          {/* Core Partners */}
          <div>
            <h4 className="font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">POWERED BY</h4>
            <ul className="space-y-3 font-sans text-xs text-slate-400">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Code2 className="h-3.5 w-3.5 text-purple-400" /> Google Cloud Run
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Code2 className="h-3.5 w-3.5 text-purple-400" /> Gemini Pro AI
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Code2 className="h-3.5 w-3.5 text-purple-400" /> Google Earth Engine
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© 2026 CleanAir & Clear Streets Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <span className="text-red-500 font-bold">♥</span>
            <span>for Google AI Hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
