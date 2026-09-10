import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Shared in-memory "database" of active pollution hotspots
let hotspots = [
  {
    id: "hotspot-1",
    lat: 40.7589,
    lng: -73.9851,
    locationName: "Metropolis East Industrial",
    pollutionType: "Garbage Dump Fire",
    source: "Illegal open-air waste burning & plastic combustion",
    severity: "Critical",
    aqi: 382,
    pm25: 290,
    pm10: 420,
    satellites: ["Sentinel-5P", "AURA"],
    sensors: ["IoT Node-12", "IoT Node-15"],
    status: "Dispatched",
    statusMessage: "Municipal fire department dispatched and active.",
    citizenReportsCount: 8,
    timestamp: "2026-07-08T02:00:00Z",
    aiSummary: "Extreme PM2.5 particulate spike detected via computer vision. Satellite thermal imaging confirms open landfill incinerator fire. High toxic gas emissions risk for nearby residential area."
  },
  {
    id: "hotspot-2",
    lat: 40.7829,
    lng: -74.0081,
    locationName: "Port Refinery District",
    pollutionType: "Industrial Emissions",
    source: "Chemical refinery night-cycle release",
    severity: "High",
    aqi: 245,
    pm25: 180,
    pm10: 270,
    satellites: ["Sentinel-5P"],
    sensors: ["Refinery-West IoT"],
    status: "Fined",
    statusMessage: "Regulatory citation issued; remote chimney shut-off order pending.",
    citizenReportsCount: 4,
    timestamp: "2026-07-08T01:30:00Z",
    aiSummary: "Visual spectral anomaly detected in midnight satellite feeds. SO2 and NOx concentrations exceeded federal limits by 350%. Wind directing plume across coastal residential zone."
  },
  {
    id: "hotspot-3",
    lat: 40.7484,
    lng: -73.9857,
    locationName: "Grand Central Terminal",
    pollutionType: "Construction Dust",
    source: "Demolition works without water-mist suppression",
    severity: "Medium",
    aqi: 165,
    pm25: 85,
    pm10: 210,
    satellites: ["Landsat-9"],
    sensors: ["Broadway-Air IoT"],
    status: "Mitigated",
    statusMessage: "Smart mist-spray systems automatically triggered to suppress dust.",
    citizenReportsCount: 15,
    timestamp: "2026-07-08T02:15:00Z",
    aiSummary: "Coarse particle (PM10) localized concentration spike detected via nearby street-level IoT sensor. Intelligent sprinkler nodes activated to settle construction dust."
  },
  {
    id: "hotspot-4",
    lat: 40.7306,
    lng: -73.9352,
    locationName: "Downtown Traffic Arterial",
    pollutionType: "Traffic Smog",
    source: "Diesel truck emission trap & micro-climate bottleneck",
    severity: "Medium",
    aqi: 152,
    pm25: 78,
    pm10: 160,
    satellites: [],
    sensors: ["Lincoln-Inbound-1"],
    status: "Rerouted",
    statusMessage: "Dynamic traffic signals adjusted to disperse congestion.",
    citizenReportsCount: 22,
    timestamp: "2026-07-08T02:20:00Z",
    aiSummary: "Carbon monoxide (CO) and NO2 spike combined with local microclimate humidity. Recommending dynamic congestion rerouting of heavy commercial transport."
  }
];

// Lazy-initialized GoogleGenAI helper
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));

  // API Route: Get all hotspots
  app.get("/api/hotspots", (req, res) => {
    res.json(hotspots);
  });

  // API Route: Get detailed 24h predictive AQI forecast
  app.get("/api/forecast/:id", (req, res) => {
    const { id } = req.params;
    const hotspot = hotspots.find(h => h.id === id);
    if (!hotspot) {
      res.status(404).json({ error: "Hotspot not found" });
      return;
    }

    const currentHour = new Date().getHours();
    const baseAqi = hotspot.aqi;
    const isHigh = hotspot.severity === "Critical" || hotspot.severity === "High";

    // Generate 24 data points representing the next 24 hours
    const forecast = Array.from({ length: 24 }).map((_, i) => {
      const hourLabel = `${(currentHour + i) % 24}:00`;
      
      // Dynamic pattern representing weather cycles & ambient build-up
      const timeFactor = Math.sin((i / 24) * Math.PI * 2) * (isHigh ? 45 : 20);
      const trendFactor = i * (isHigh ? -4 : -2); // Simulation of dispersion with municipal action
      const trendNoIntervention = i * (isHigh ? 5 : 2.5); // Simulation of build-up without action

      const aqiWithIntervention = Math.max(50, Math.round(baseAqi + timeFactor + trendFactor));
      const aqiNoIntervention = Math.min(500, Math.round(baseAqi + timeFactor + trendNoIntervention));

      return {
        hour: hourLabel,
        aqiWithAction: aqiWithIntervention,
        aqiNoAction: aqiNoIntervention,
        temperature: Math.round(22 + Math.sin((i / 24) * Math.PI * 2) * 5),
        humidity: Math.round(65 - Math.sin((i / 24) * Math.PI * 2) * 15),
        windSpeed: Math.round(8 + Math.cos((i / 24) * Math.PI * 2) * 4)
      };
    });

    res.json({
      hotspotId: id,
      hotspotName: hotspot.locationName,
      baseAqi,
      forecast
    });
  });

  // API Route: Submit citizen report with Gemini Computer Vision & Text Fusion
  app.post("/api/reports/submit", async (req, res) => {
    const { citizenName, locationName, description, lat, lng, imageBase64, imageType } = req.body;

    if (!description || !locationName) {
      res.status(400).json({ error: "Description and Location Name are required." });
      return;
    }

    const latitude = Number(lat) || (40.70 + Math.random() * 0.1);
    const longitude = Number(lng) || (-74.05 + Math.random() * 0.1);

    let aiResult = {
      pollutionType: "Unclassified Smog",
      source: "Pending physical sensor calibration",
      severity: "Medium",
      estimatedAQI: 145,
      confidenceScore: 78,
      actionRecommended: "Deploy sensor drone to scan area and confirm particle sizes.",
      aiAnalysisSummary: "A citizen reported a potential air quality issue. Localized sensors show high ambient particulate values, indicating smoke or construction dust build-up."
    };

    const ai = getAiClient();
    if (ai) {
      try {
        const systemPrompt = `You are the core Computer Vision and Sensor Fusion Engine for "CleanAir & Clear Streets" platform.
Analyze the user's description and optional image file of a pollution event.
Return a structured JSON output of the analysis with the following fields:
- pollutionType: string (e.g. "Garbage Dump Fire", "Industrial Gas Emission", "Illegal Waste Incineration", "Construction Dust", "Traffic Congestion Smog")
- source: string (a descriptive detail on what material/substance is burning or emitting)
- severity: string (MUST be one of "Low", "Medium", "High", "Critical")
- estimatedAQI: integer (estimated hyperlocal AQI between 50 and 500 based on description)
- confidenceScore: integer (percentage confidence, 50-100)
- actionRecommended: string (specific immediate action recommended for municipal response teams)
- aiAnalysisSummary: string (a detailed, tech-forward, polished 2-sentence summary explaining the AI's detection rationale)

Make sure you output standard JSON matching this exact structure. Do not output anything else.`;

        let contents: any[] = [description];
        if (imageBase64 && imageType) {
          contents.push({
            inlineData: {
              mimeType: imageType,
              data: imageBase64
            }
          });
        }

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                pollutionType: { type: Type.STRING },
                source: { type: Type.STRING },
                severity: { type: Type.STRING },
                estimatedAQI: { type: Type.INTEGER },
                confidenceScore: { type: Type.INTEGER },
                actionRecommended: { type: Type.STRING },
                aiAnalysisSummary: { type: Type.STRING }
              },
              required: ["pollutionType", "source", "severity", "estimatedAQI", "confidenceScore", "actionRecommended", "aiAnalysisSummary"]
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          aiResult = { ...aiResult, ...parsed };
        }
      } catch (err: any) {
        console.error("Gemini analysis error, falling back to local model: ", err.message);
        // Continue with fallback to ensure robustness
      }
    } else {
      // Perform smart fallback classification based on keyword matching
      const descLower = description.toLowerCase();
      if (descLower.includes("fire") || descLower.includes("burn") || descLower.includes("garbage")) {
        aiResult = {
          pollutionType: "Garbage Dump Fire",
          source: "Incineration of domestic plastic and waste matter",
          severity: "Critical",
          estimatedAQI: 360,
          confidenceScore: 88,
          actionRecommended: "Dispatch local fire prevention unit and spray active suppressant foam.",
          aiAnalysisSummary: "Particulate analysis matches synthetic combustion signatures. Thermal scan suggests high concentration of burning polyurethane and chlorinated plastics."
        };
      } else if (descLower.includes("factory") || descLower.includes("chemical") || descLower.includes("refinery") || descLower.includes("industrial")) {
        aiResult = {
          pollutionType: "Industrial Gas Emission",
          source: "Sulfur dioxide (SO2) and NOx chimney leakage",
          severity: "High",
          estimatedAQI: 230,
          confidenceScore: 92,
          actionRecommended: "Initiate remote flue gas desulfurization audit and issue alert to plant supervisor.",
          aiAnalysisSummary: "Spectroscopic data confirms industrial carbon emissions. Plume modeling predicts atmospheric dispersal over adjacent downwind residential sectors."
        };
      } else if (descLower.includes("dust") || descLower.includes("construction") || descLower.includes("demolition") || descLower.includes("building")) {
        aiResult = {
          pollutionType: "Construction Dust Plume",
          source: "Concrete pulverized silica dust and fine soil particles",
          severity: "Medium",
          estimatedAQI: 155,
          confidenceScore: 85,
          actionRecommended: "Activate nearby intelligent dry-mist spray nozzles and issue water suppression mandate.",
          aiAnalysisSummary: "High-density particulate suspension detected at ground level. PM10 sensor fusion confirms heavy building demolition dust with zero water-misting active."
        };
      } else if (descLower.includes("traffic") || descLower.includes("car") || descLower.includes("smog") || descLower.includes("road")) {
        aiResult = {
          pollutionType: "Traffic Congestion Smog",
          source: "Incomplete diesel vehicle fuel combustion & idling emissions",
          severity: "Medium",
          estimatedAQI: 148,
          confidenceScore: 80,
          actionRecommended: "Adjust dynamic traffic grid light durations to clear bottleneck arterial.",
          aiAnalysisSummary: "Sub-micron carbon emissions peaking during rush hour. Elevated nitrogen dioxide levels registered concurrently across adjacent traffic sensor nodes."
        };
      }
    }

    // Append the newly reported item to our in-memory hotspot database
    const newHotspot = {
      id: `hotspot-${Date.now()}`,
      lat: latitude,
      lng: longitude,
      locationName,
      pollutionType: aiResult.pollutionType,
      source: aiResult.source,
      severity: aiResult.severity,
      aqi: aiResult.estimatedAQI,
      pm25: Math.round(aiResult.estimatedAQI * 0.75),
      pm10: Math.round(aiResult.estimatedAQI * 1.15),
      satellites: Math.random() > 0.4 ? ["Sentinel-5P"] : [],
      sensors: ["Citizen-Reported"],
      status: "Dispatched",
      statusMessage: "AI classified and reported to municipal authority automatically. Patrol dispatched.",
      citizenReportsCount: 1,
      timestamp: new Date().toISOString(),
      aiSummary: `${aiResult.aiAnalysisSummary} (Confidence: ${aiResult.confidenceScore}%)`
    };

    hotspots.unshift(newHotspot);

    res.json({
      success: true,
      message: "Citizen report processed by AI successfully",
      hotspot: newHotspot,
      analysis: aiResult
    });
  });

  // Vite development server / production static asset integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
