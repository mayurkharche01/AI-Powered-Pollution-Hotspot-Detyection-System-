# 🌍 CleanAir & Clear Streets — Hyperlocal Pollution Intelligence Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

CleanAir & Clear Streets is a production-ready, full-stack **Hyperlocal Pollution Intelligence Platform** that bridges the massive gap left by traditional government air quality monitoring stations. Utilizing a highly sophisticated **Cognitive Fusion Pipeline**, the platform ingests citizen reports, multi-spectral satellite columns, and ground-level IoT mesh feeds to locate and identify toxic emissions with **10-meter street-level accuracy**.

---

## 🚀 One-Line Description for GitHub
An AI-powered Hyperlocal Pollution Intelligence Platform combining citizen computer-vision reports, Sentinel-5P satellite datasets, and IoT sensor networks into an interactive 3D WebGL Command HUD.

---

## ⚡ The Problem & The Shift
*   **The Issue:** City monitoring stations are typically placed miles apart, providing broad spatial averages that ignore sudden pollution spikes (e.g., waste fires, localized traffic stagnation, silica construction dust).
*   **The Solution:** CleanAir & Clear Streets offers a sovereign urban defense network. It empowers citizens to report micro-climatic issues, visualizes atmospheric models in Real-time 3D, and computes predictive dispersion patterns to notify municipalities before spikes occur.

---

## 🛠️ High-Level Technical Architecture

```
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│  Citizen Report Web  │      │ Copernicus Satellite │      │    Ground IoT Mesh   │
│ (Geo-Tagged Photos)  │      │   (Sentinel-5P Gas)  │      │  (Micro PM2.5/PM10)  │
└──────────┬───────────┘      └──────────┬───────────┘      └──────────┬───────────┘
           │                             │                             │
           ▼                             ▼                             ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │                    Express Server API (Data Ingestion)                    │
   └─────────────────────────────────────┬─────────────────────────────────────┘
                                         │
                                         ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │                Cognitive Fusion: Gemini 3.5-Flash Core                    │
   │  - Computer Vision Plume Classification                                   │
   │  - Multimodal Sentiment & Impact Assessment                               │
   │  - Site-Specific Municipal Action Guidance Generator                      │
   └─────────────────────────────────────┬─────────────────────────────────────┘
                                         │
                                         ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │                 Interactive 3D WebGL Command Dashboard                    │
   │  - Three.js Digital Twin Globe & Spatial Cellular Grid Heatmaps           │
   │  - Micro-Climate Air Stagnation Corridor Analyzers                        │
   │  - Real-Time Municipal Alerts & Live Dispatch Queue                        │
   └───────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Core Key Features

*   **🤖 Multi-Modal Generative AI Core:** Powered by server-side **Google Gemini 3.5-Flash**, the system analyzes citizen natural-language complaints and photo attachments to extract chemical attributes, burning intensity, and safety protocols in under 3 seconds.
*   **🌐 Real-Time 3D WebGL Digital Twin:** An immersive Three.js-rendered orbital globe and high-fidelity 3D city block model visualizing dispersion patterns, wind velocities, and atmospheric stagnation pathways.
*   **🛰️ Multi-Spectral Satellite Hook:** Synthesizes columnar tropospheric values (Nitrogen Dioxide, Carbon Monoxide) to validate municipal reports.
*   **📊 Micro-Climate Heatmaps:** Replaces generalized color gradients with fine-grained spatial grids highlighting localized exposure zones.
*   **⚡ Reactive Dispatch Controls:** Provides municipal agencies with automated warnings, real-time alert priority queues, and actionable suppression directives.

---

## 💻 Tech Stack
*   **Frontend:** React 19 (TypeScript), Vite, Tailwind CSS v4, Motion (Framer Motion).
*   **3D Graphics:** Three.js (WebGL rendering, Custom particle systems, Dynamic raycasting).
*   **Backend:** Express, Node.js, `tsx` runtime, Bundled via `esbuild`.
*   **AI Integration:** `@google/genai` TypeScript SDK (utilizing server-side API proxy routing for secure key management).

---

## ⚙️ Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   NPM or Yarn
*   A Google Gemini API Key (Get one on [Google AI Studio](https://aistudio.google.com/))

### Setup & Local Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cleanair-clear-streets.git
    cd cleanair-clear-streets
    ```

2.  **Configure environment variables:**
    Create a `.env` file in the root directory based on `.env.example`:
    ```env
    GEMINI_API_KEY=your_actual_gemini_api_key_here
    NODE_ENV=development
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    *The app will now be running at `http://localhost:3000` (backed by a fully integrated Express server proxying API calls securely).*

### Production Build & Deployment

To bundle both the frontend application assets and the backend Express server into a highly optimized, production-ready environment:

```bash
# Build the React frontend and compile the backend into a CJS package
npm run build

# Start the optimized Node container server
npm run start
```

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.
