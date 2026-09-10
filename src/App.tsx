import React, { useState } from "react";
import Header from "./components/Header";
import ThreeEarth from "./components/ThreeEarth";
import ProblemSection from "./components/ProblemSection";
import AIPipeline from "./components/AIPipeline";
import LiveDashboard from "./components/LiveDashboard";
import WhyOurSolution from "./components/WhyOurSolution";
import TechStack from "./components/TechStack";
import FutureRoadmap from "./components/FutureRoadmap";
import Footer from "./components/Footer";
import * as motion from "motion/react-client";
import { Eye, Satellite, Radio, CloudSun, Target, BellRing, ArrowRight, Building, ShieldAlert, Sparkles, Navigation, GraduationCap, Map } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("features");

  const features = [
    {
      title: "Computer Vision",
      icon: <Eye className="h-5 w-5 text-purple-400" />,
      desc: "Automatically extracts smoke color, density volume, and combustible types from standard JPG images using deep neural networks.",
      tag: "Vertex AI"
    },
    {
      title: "Satellite Analysis",
      icon: <Satellite className="h-5 w-5 text-indigo-400" />,
      desc: "Monitors regional column densities of trace atmospheric pollutants (NO2, SO2, CO) using Copernicus Sentinel-5P telemetry.",
      tag: "Earth Engine"
    },
    {
      title: "Sensor Fusion",
      icon: <Radio className="h-5 w-5 text-pink-400" />,
      desc: "Combines low-cost PM2.5 sensors with weather data, using localized algorithms to filter ambient moisture and humidity anomalies.",
      tag: "Sensor Array"
    },
    {
      title: "Weather Prediction",
      icon: <CloudSun className="h-5 w-5 text-amber-400" />,
      desc: "Models localized thermodynamic inversion points to anticipate air stagnation up to 24 hours prior to visible smog events.",
      tag: "Inversion Model"
    },
    {
      title: "Hyperlocal AQI",
      icon: <Target className="h-5 w-5 text-red-400" />,
      desc: "Yields dynamic street-by-street mapping resolution down to 10 meters, identifying neighborhood smoke traps and playgrounds.",
      tag: "10m Resolution"
    },
    {
      title: "Real-time Alerts",
      icon: <BellRing className="h-5 w-5 text-orange-400" />,
      desc: "Triggers instant REST dispatches to municipal dashboard channels, routing sweepers or generating environmental fine files.",
      tag: "Auto-Webhook"
    }
  ];

  const applications = [
    {
      title: "Smart Cities",
      icon: <Building className="h-5 w-5 text-sky-400" />,
      desc: "Plug our API feeds directly into existing urban dashboards to automate municipal sprinklers, green signaling, and traffic flow.",
      metric: "INTEGRATION READY"
    },
    {
      title: "Municipal Corporations",
      icon: <ShieldAlert className="h-5 w-5 text-red-400" />,
      desc: "Equip enforcement squads with direct, geo-tagged alert dispatch terminals for tracking open-air garbage burning sites.",
      metric: "ENFORCEMENT READY"
    },
    {
      title: "Disaster Management",
      icon: <FlameIcon className="h-5 w-5 text-orange-400" />,
      desc: "Pinpoint large-scale landfill methane fire outbreaks and chemical factory chimneys to safely coordinate firefighter evacuations.",
      metric: "911 COMPLIANT"
    },
    {
      title: "Environmental Agencies",
      icon: <Sparkles className="h-5 w-5 text-emerald-400" />,
      desc: "Audit chemical plants and industrial complexes using historic, tamper-proof satellite traces of nighttime air violations.",
      metric: "SOVEREIGN AUDIT"
    },
    {
      title: "Traffic Departments",
      icon: <Navigation className="h-5 w-5 text-cyan-400" />,
      desc: "Automate diesel vehicle diversions and adjust traffic light durations to clear congestion smog at localized tunnel exits.",
      metric: "DYNAMIC ROUTE"
    },
    {
      title: "Urban Planning",
      icon: <Map className="h-5 w-5 text-indigo-400" />,
      desc: "Design safer future metropolises by mapping and avoiding permanent micro-climate stagnant corridors near schools.",
      metric: "GIS PREDICTIVE"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F0F0F0] font-sans antialiased scroll-smooth relative overflow-hidden">
      {/* Background Ambient Glows from Immersive UI */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Premium Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-sky-950/20 blur-[130px] pointer-events-none animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-950/20 text-sky-400 font-mono text-[10px] uppercase font-bold tracking-wider"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400 animate-spin" />
              <span>Google Build with AI Project // Solution Track</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                CleanAir <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">&</span> <br />
                Clear Streets
              </h1>
              <p className="font-sans font-semibold text-lg sm:text-xl text-sky-300 tracking-tight leading-snug">
                AI-powered Hyperlocal Pollution Intelligence Platform
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Transforming raw citizen uploads, multi-spectral satellite imagery, and localized IoT sensors into immediate 10-meter pollution alerts. Predict air quality up to 24 hours ahead and dispatch municipal teams automatically.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#live-dashboard"
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 font-sans font-bold text-sm text-white hover:opacity-90 active:scale-95 transition shadow-lg shadow-sky-500/15"
              >
                Launch HUD Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#cognitive-pipeline"
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950 px-6 font-sans font-semibold text-sm text-slate-300 hover:text-white hover:border-slate-700 transition"
              >
                Explore AI Pipeline
              </a>
            </motion.div>

            {/* Bullet Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900 font-mono text-[10px] text-slate-400 text-left"
            >
              <div>
                <span className="text-white font-extrabold text-sm sm:text-base block">10 METERS</span>
                <span>SPATIAL DETAIL</span>
              </div>
              <div>
                <span className="text-sky-400 font-extrabold text-sm sm:text-base block">3 SECONDS</span>
                <span>AI COMPUTER VISION</span>
              </div>
              <div>
                <span className="text-emerald-400 font-extrabold text-sm sm:text-base block">24 HOURS</span>
                <span>PREDICTIVE FORECASTS</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Satellite Globe Right */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[450px]">
            <ThreeEarth />
          </div>
        </div>
      </section>

      {/* Section 1: The Problem */}
      <ProblemSection />

      {/* Section 2: Cognitive Pipeline */}
      <div id="cognitive-pipeline">
        <AIPipeline />
      </div>

      {/* Sections 3 & 5: Live HUD Dashboard (including 3D map) */}
      <LiveDashboard />

      {/* Section 4: AI Feature Bento Grid */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-purple-950/10 blur-[120px] pointer-events-none" />

        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-purple-400 uppercase mb-3">
            PLATFORM CAPABILITIES
          </h2>
          <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
            Deep-Learning Air Architecture
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            By merging high-speed computer vision pipelines with regional gas column feeds, our platform establishes continuous sovereign surveillance grids over cities.
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-slate-950/30 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-500/10 transition group"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform mb-4">
                  {f.icon}
                </div>
                <h4 className="font-sans font-bold text-base text-white group-hover:text-sky-300 transition-colors mb-2">
                  {f.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="border-t border-slate-900/60 pt-4 mt-6 flex items-center justify-between font-mono text-[9px] text-slate-500">
                <span>MODULE:</span>
                <span className="text-slate-300 font-bold uppercase">{f.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 6: Why Our Solution comparison table */}
      <WhyOurSolution />

      {/* Section 7: Applications Floating Cards */}
      <section className="relative py-24 bg-[#05070B] overflow-hidden">
        <div className="absolute top-1/2 right-0 h-[350px] w-[350px] rounded-full bg-indigo-950/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headings */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-mono text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
              DEPLOYMENT CHANNELS
            </h2>
            <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
              Configured for Sovereign Agencies
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              We design specific GIS control templates for environmental regulators, disaster teams, smart city operators, and transport authorities.
            </p>
          </div>

          {/* Apps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, idx) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ rotateY: 3, rotateX: 3, translateZ: 10 }}
                className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/10 transition duration-300 transform perspective-1000 group"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                }}
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-800">
                      {app.icon}
                    </div>
                    <h4 className="font-sans font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                      {app.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {app.desc}
                  </p>
                </div>

                <div className="border-t border-slate-900/60 pt-4 mt-6 flex items-center justify-between font-mono text-[9px] text-slate-500">
                  <span>METRIC STANDARD:</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">{app.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Tech Stack */}
      <TechStack />

      {/* Section 9: Future Roadmap */}
      <FutureRoadmap />

      {/* Premium minimal Footer */}
      <Footer />
    </div>
  );
}

// Simple Helper flame icon
function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
