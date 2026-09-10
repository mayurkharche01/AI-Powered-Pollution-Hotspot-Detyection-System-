import React, { useState, useEffect } from "react";
import { Hotspot, ForecastPoint, ForecastResponse } from "../types";
import ThreeCity from "./ThreeCity";
import { ShieldAlert, Zap, Radio, BellRing, Camera, CheckCircle2, AlertTriangle, RefreshCw, Layers } from "lucide-react";
import * as motion from "motion/react-client";

// Core Preset Images for simulation and sending real Base64 to Gemini API
const presetImages = [
  {
    name: "Industrial Chimney Smoke",
    type: "image/jpeg",
    // Small base64 dummy jpeg of gray smoke (valid base64 string)
    base64: "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="
  },
  {
    name: "Garbage Dump Landfill Fire",
    type: "image/jpeg",
    base64: "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="
  },
  {
    name: "Construction Concrete Dust Plume",
    type: "image/jpeg",
    base64: "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="
  }
];

export default function LiveDashboard() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastPoint[]>([]);
  const [forecastLoading, setForecastLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Form State
  const [citizenName, setCitizenName] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedPresetImage, setSelectedPresetImage] = useState<number>(0);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
  const [aiReportDetails, setAiReportDetails] = useState<any | null>(null);

  // Fetch hotspots
  const fetchHotspots = async (selectFirst = false) => {
    try {
      const res = await fetch("/api/hotspots");
      const data = await res.json();
      setHotspots(data);
      if (data.length > 0 && (selectFirst || !selectedHotspotId)) {
        setSelectedHotspotId(data[0].id);
      }
    } catch (err) {
      console.error("Error fetching hotspots:", err);
    }
  };

  // Fetch forecast for selected hotspot
  const fetchForecast = async (id: string) => {
    setForecastLoading(true);
    try {
      const res = await fetch(`/api/forecast/${id}`);
      const data: ForecastResponse = await res.json();
      setForecast(data.forecast);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    } finally {
      setForecastLoading(false);
    }
  };

  useEffect(() => {
    fetchHotspots(true);
  }, []);

  useEffect(() => {
    if (selectedHotspotId) {
      fetchForecast(selectedHotspotId);
    }
  }, [selectedHotspotId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchHotspots();
    if (selectedHotspotId) {
      await fetchForecast(selectedHotspotId);
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const selectedHotspot = hotspots.find(h => h.id === selectedHotspotId);

  // Submit report
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName || !description) return;

    setFormSubmitting(true);
    setFormSuccessMessage(null);
    setAiReportDetails(null);

    const presetImg = presetImages[selectedPresetImage];

    try {
      const res = await fetch("/api/reports/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          citizenName: citizenName || "Anonymous Reporter",
          locationName,
          description,
          lat: 40.70 + Math.random() * 0.1,
          lng: -74.05 + Math.random() * 0.1,
          imageBase64: presetImg?.base64,
          imageType: presetImg?.type
        })
      });

      const result = await res.json();
      if (result.success) {
        setFormSuccessMessage(`Success! AI Fusion Engine matched your report with ${result.analysis.confidenceScore}% confidence.`);
        setAiReportDetails(result.analysis);
        
        // Refresh listing and select the newly created hotspot
        await fetchHotspots();
        setSelectedHotspotId(result.hotspot.id);

        // Reset fields
        setCitizenName("");
        setLocationName("");
        setDescription("");
      }
    } catch (err) {
      console.error("Error submitting report:", err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Render SVG circular progress bar for AQI Meter
  const renderAqiCircle = (aqi: number) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const fillPercent = Math.min(100, (aqi / 400) * 100);
    const strokeDashoffset = circumference - (fillPercent / 100) * circumference;

    let color = "stroke-emerald-500";
    let text = "HEALTHY";
    let textClass = "text-emerald-400";
    if (aqi > 300) {
      color = "stroke-red-500";
      text = "CRITICAL";
      textClass = "text-red-400";
    } else if (aqi > 150) {
      color = "stroke-orange-500";
      text = "UNHEALTHY";
      textClass = "text-orange-400";
    } else if (aqi > 50) {
      color = "stroke-yellow-500";
      text = "MODERATE";
      textClass = "text-yellow-400";
    }

    return (
      <div className="flex flex-col items-center justify-center relative h-36 w-36 bg-slate-950/60 border border-slate-900 rounded-full p-2">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            className={`${color} transition-all duration-1000`}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-mono font-extrabold text-white leading-none">
            {aqi}
          </span>
          <span className="text-[8px] font-mono font-bold uppercase text-slate-500 tracking-widest mt-1">
            AQI INDEX
          </span>
          <span className={`text-[9px] font-mono font-bold tracking-wider uppercase mt-1 ${textClass}`}>
            {text}
          </span>
        </div>
      </div>
    );
  };

  // Custom SVG Line Graph Renderer for forecast points (no intervention vs with action)
  const renderForecastChart = () => {
    if (forecast.length === 0) return null;

    const width = 500;
    const height = 180;
    const padding = 20;

    // Map forecast points to SVG coordinates
    const maxAqi = Math.max(...forecast.map(f => Math.max(f.aqiNoAction, f.aqiWithAction, 200)));
    
    const getX = (index: number) => padding + (index / (forecast.length - 1)) * (width - padding * 2);
    const getY = (value: number) => height - padding - (value / maxAqi) * (height - padding * 2);

    let pathNoAction = "";
    let pathWithAction = "";

    forecast.forEach((f, idx) => {
      const x = getX(idx);
      const yNo = getY(f.aqiNoAction);
      const yWith = getY(f.aqiWithAction);

      if (idx === 0) {
        pathNoAction = `M ${x} ${yNo}`;
        pathWithAction = `M ${x} ${yWith}`;
      } else {
        pathNoAction += ` L ${x} ${yNo}`;
        pathWithAction += ` L ${x} ${yWith}`;
      }
    });

    return (
      <div className="relative w-full h-56 bg-slate-950/70 rounded-xl border border-slate-900 p-4 font-mono text-[9px] text-slate-500 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
          <span className="text-sky-400 font-bold uppercase">24h Dispersion Model</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-red-400 font-semibold">
              <span className="h-1.5 w-3 bg-red-500 rounded-full inline-block" /> No Action
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="h-1.5 w-3 bg-emerald-500 rounded-full inline-block" /> Suppressed
            </span>
          </div>
        </div>

        {/* SVG Graphic */}
        <div className="relative flex-1">
          <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            {/* Horizontal Grid lines */}
            <line x1={padding} y1={getY(100)} x2={width - padding} y2={getY(100)} className="stroke-slate-900" strokeWidth="1" strokeDasharray="4 4" />
            <line x1={padding} y1={getY(200)} x2={width - padding} y2={getY(200)} className="stroke-slate-900" strokeWidth="1" strokeDasharray="4 4" />
            <line x1={padding} y1={getY(300)} x2={width - padding} y2={getY(300)} className="stroke-slate-900" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Axis helper labels */}
            <text x={padding - 5} y={getY(100) + 3} className="fill-slate-600 text-[8px] text-right" textAnchor="end">100</text>
            <text x={padding - 5} y={getY(200) + 3} className="fill-slate-600 text-[8px]" textAnchor="end">200</text>
            <text x={padding - 5} y={getY(300) + 3} className="fill-slate-600 text-[8px]" textAnchor="end">300</text>

            {/* Glowing lines */}
            <path d={pathNoAction} fill="none" className="stroke-red-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d={pathWithAction} fill="none" className="stroke-emerald-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Vertices dots */}
            {forecast.filter((_, i) => i % 4 === 0).map((f, i) => {
              const idx = i * 4;
              return (
                <g key={idx}>
                  <circle cx={getX(idx)} cy={getY(f.aqiNoAction)} r="3" className="fill-red-500" />
                  <circle cx={getX(idx)} cy={getY(f.aqiWithAction)} r="3" className="fill-emerald-500" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* X-Axis labels */}
        <div className="flex justify-between border-t border-slate-900 pt-2 font-mono text-[8px] text-slate-600 mt-2 px-4">
          <span>Current</span>
          <span>+6h</span>
          <span>+12h</span>
          <span>+18h</span>
          <span>+24h Forecast</span>
        </div>
      </div>
    );
  };

  return (
    <section id="live-dashboard" className="relative py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#05070B] overflow-hidden">
      {/* HUD Header Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border border-sky-500/10 rounded-xl bg-slate-950/40 backdrop-blur-md p-4 mb-8 gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-950/40">
            <Layers className="h-5 w-5 text-sky-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-white text-base tracking-tight uppercase flex items-center gap-2">
              COGNITIVE CONTROL HUD TERMINAL
            </h3>
            <p className="font-mono text-[9px] text-slate-500 tracking-wider">
              MULTI-SPECTRAL SENSOR COUPLING STATION // REAL-TIME PERSISTENT LAYER
            </p>
          </div>
        </div>

        {/* Selector filter bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 font-mono text-[11px] font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-sky-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'SYNCING...' : 'RE-SYNC CORE'}</span>
          </button>
          <span className="font-mono text-[10px] text-slate-600 bg-slate-900/40 px-2.5 py-1.5 border border-slate-900 rounded">
            HOTSPOTS ACTIVE: {hotspots.length}
          </span>
        </div>
      </div>

      {/* Main Grid: Three columns: 1. Hotspots list, 2. 3D Map canvas, 3. Details HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left Side: Active Hotspots list (Col span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-none">
          <div className="font-mono text-[10px] text-slate-500 border-b border-slate-900 pb-2 flex justify-between uppercase">
            <span>Grid Coordinates</span>
            <span>Severity</span>
          </div>

          <div className="flex flex-col gap-3">
            {hotspots.map(h => {
              const isSelected = selectedHotspotId === h.id;
              const severityColors = {
                Critical: "bg-red-500/10 text-red-400 border-red-500/20",
                High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                Low: "bg-sky-500/10 text-sky-400 border-sky-500/20",
              };

              return (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspotId(h.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-sky-500 bg-sky-950/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                      : "border-slate-900 bg-slate-950/30 hover:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[9px] text-slate-500 tracking-wider uppercase">
                      ID: {h.id.slice(0, 10)}
                    </span>
                    <span className={`font-mono text-[8px] font-bold uppercase px-1.5 py-0.5 border rounded ${severityColors[h.severity]}`}>
                      {h.severity}
                    </span>
                  </div>

                  <h4 className="font-sans font-bold text-xs text-white line-clamp-1 mb-1">
                    {h.locationName}
                  </h4>
                  <p className="font-mono text-[9px] text-sky-400 font-semibold mb-2">
                    {h.pollutionType}
                  </p>

                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-500 border-t border-slate-900/50 pt-2">
                    <span>INDEX AQI:</span>
                    <span className={`font-bold ${h.aqi > 300 ? 'text-red-400' : h.aqi > 150 ? 'text-orange-400' : 'text-emerald-400'}`}>
                      {h.aqi}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: 3D City Mapping layer (Col span 6) */}
        <div className="lg:col-span-6 h-[500px]">
          <ThreeCity
            hotspots={hotspots}
            selectedHotspotId={selectedHotspotId}
            onSelectHotspot={setSelectedHotspotId}
          />
        </div>

        {/* Right Side: Multi-Spectral Details HUD (Col span 3) */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-900 bg-slate-950/40 p-5 flex flex-col justify-between max-h-[500px] overflow-y-auto scrollbar-none">
          {selectedHotspot ? (
            <div className="space-y-5">
              {/* Hotspot Header */}
              <div>
                <span className="font-mono text-[9px] text-sky-400/80 font-bold uppercase tracking-wider block mb-1">
                  MUTLI-SPECTRAL LAYER ACTIVE
                </span>
                <h4 className="font-sans font-extrabold text-base text-white tracking-tight">
                  {selectedHotspot.locationName}
                </h4>
                <p className="font-mono text-[10px] text-slate-400 mt-1 italic">
                  Source: {selectedHotspot.source}
                </p>
              </div>

              {/* AQI Circle Meter */}
              <div className="flex justify-center py-2">
                {renderAqiCircle(selectedHotspot.aqi)}
              </div>

              {/* PM Counters */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-900 text-center font-mono">
                  <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider block mb-1">PM2.5 DENSITY</span>
                  <span className="text-sm font-bold text-sky-400">{selectedHotspot.pm25}</span>
                  <span className="text-[8px] text-slate-500 block">µg/m³</span>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-900 text-center font-mono">
                  <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider block mb-1">PM10 DENSITY</span>
                  <span className="text-sm font-bold text-emerald-400">{selectedHotspot.pm10}</span>
                  <span className="text-[8px] text-slate-500 block">µg/m³</span>
                </div>
              </div>

              {/* Satellites & Sensors tracking */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="font-mono text-[9px] text-slate-500">ORBITAL SCAN:</span>
                  <span className="font-mono text-[9px] text-sky-400 font-bold">
                    {selectedHotspot.satellites.length > 0 ? selectedHotspot.satellites.join(" & ") : "None (Ground only)"}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="font-mono text-[9px] text-slate-500">LOCAL SENSORS:</span>
                  <span className="font-mono text-[9px] text-emerald-400 font-bold">
                    {selectedHotspot.sensors.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="font-mono text-[9px] text-slate-500">MUNICIPAL DECREE:</span>
                  <span className="font-mono text-[9px] text-amber-400 font-semibold uppercase">
                    {selectedHotspot.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 italic bg-slate-900/30 p-2.5 rounded border border-slate-900">
                  &ldquo;{selectedHotspot.statusMessage}&rdquo;
                </p>
              </div>

              {/* AI cognitive text summary */}
              <div className="border-t border-slate-900 pt-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Radio className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-purple-400 font-bold tracking-widest">GEMINI AI SUMMARY</span>
                </div>
                <p className="font-sans text-[10px] text-slate-300 leading-relaxed bg-purple-950/5 border border-purple-500/10 rounded p-3">
                  {selectedHotspot.aiSummary}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center font-mono text-[10px] text-slate-500">
              No Hotspot Selected
            </div>
          )}
        </div>
      </div>

      {/* Grid: 2 columns: Left: 24h prediction chart, Right: Citizen Report Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: 24h Prediction Chart */}
        <div>
          <h4 className="font-mono text-xs font-bold text-sky-400 uppercase mb-4 flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-sky-400 animate-pulse" /> Predictive AI Air Dispersals
          </h4>
          {forecastLoading ? (
            <div className="h-56 rounded-xl border border-slate-900 bg-slate-950/60 flex items-center justify-center font-mono text-xs text-slate-500">
              Generating Predictive Dispersal Models...
            </div>
          ) : (
            renderForecastChart()
          )}
        </div>

        {/* Right: Citizen Report Form */}
        <div className="rounded-2xl border border-sky-500/10 bg-slate-950/45 p-6 shadow-xl relative">
          <div className="flex items-center gap-2.5 mb-5 border-b border-slate-900 pb-3">
            <div className="h-7 w-7 rounded-lg bg-sky-950 border border-sky-500/20 flex items-center justify-center">
              <Camera className="h-4 w-4 text-sky-400" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-white uppercase">Citizen Hotspot Report Ingestion</h4>
              <p className="font-mono text-[9px] text-slate-500 tracking-wider">
                COGNITIVE CLASSIFICATION BY GEMINI 3.5-FLASH
              </p>
            </div>
          </div>

          {formSuccessMessage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-5 space-y-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
                <div>
                  <h5 className="font-sans font-bold text-xs text-white">CITIZEN DATA INGESTED</h5>
                  <p className="font-mono text-[8px] text-emerald-400">STATUS: MATCHED & REPORTED</p>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 font-mono space-y-1.5 border-t border-slate-800/80 pt-3">
                <div className="flex justify-between">
                  <span>POLLUTION CLASSIFIED:</span>
                  <span className="text-white font-bold">{aiReportDetails?.pollutionType}</span>
                </div>
                <div className="flex justify-between">
                  <span>ESTIMATED AQI IMPACT:</span>
                  <span className="text-white font-bold">{aiReportDetails?.estimatedAQI}</span>
                </div>
                <div className="flex justify-between">
                  <span>DETECTION SEVERITY:</span>
                  <span className="text-red-400 font-bold uppercase">{aiReportDetails?.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span>MUNICIPAL ACTION RECOMMEND:</span>
                  <span className="text-sky-400 font-bold text-right max-w-[200px]">{aiReportDetails?.actionRecommended}</span>
                </div>
              </div>

              <p className="font-sans text-[10px] text-slate-400 bg-[#05070B] p-2.5 rounded border border-slate-900 leading-relaxed italic">
                &ldquo;{aiReportDetails?.aiAnalysisSummary}&rdquo;
              </p>

              <button
                onClick={() => setFormSuccessMessage(null)}
                className="w-full h-9 rounded-lg bg-sky-950/40 border border-sky-500/20 text-xs font-mono font-bold text-sky-400 hover:bg-sky-500/10 transition"
              >
                SUBMIT NEW REPORT
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitReport} className="space-y-4.5 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full h-9 rounded-lg border border-slate-900 bg-slate-900/40 px-3 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block">Incident Location Name</label>
                  <input
                    type="text"
                    required
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. Sector-7 Dump Road"
                    className="w-full h-9 rounded-lg border border-slate-900 bg-slate-900/40 px-3 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block">Describe What You Observe</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Burning pile of tires emitting pitch-black smoke, smelling of rubber..."
                  rows={2}
                  className="w-full rounded-lg border border-slate-900 bg-slate-900/40 p-3 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 resize-none"
                />
              </div>

              {/* Select simulated image attachments */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block">Simulate Image Upload</label>
                <div className="grid grid-cols-3 gap-2">
                  {presetImages.map((img, i) => (
                    <button
                      key={img.name}
                      type="button"
                      onClick={() => setSelectedPresetImage(i)}
                      className={`rounded-lg border p-2 text-[9px] font-mono text-center flex flex-col justify-between items-center transition ${
                        selectedPresetImage === i
                          ? "border-sky-500 bg-sky-950/20 text-sky-400 font-bold"
                          : "border-slate-900 bg-slate-900/20 text-slate-400 hover:border-slate-800"
                      }`}
                    >
                      <Camera className="h-4.5 w-4.5 mb-1 opacity-70" />
                      <span className="line-clamp-1">{img.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full h-10 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 font-sans font-bold text-xs text-white hover:opacity-90 shadow-lg shadow-sky-500/20 active:scale-95 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                {formSubmitting ? "CONVOLUTING INGESTION MODEL..." : "DISPATCH COGNITIVE INGEST"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
