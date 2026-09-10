import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Hotspot } from "../types";

interface ThreeCityProps {
  hotspots: Hotspot[];
  selectedHotspotId: string | null;
  onSelectHotspot: (id: string) => void;
}

export default function ThreeCity({ hotspots, selectedHotspotId, onSelectHotspot }: ThreeCityProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.015);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    // Dynamic starting point overlooking the city
    camera.position.set(0, 35, 50);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 4. Grid Floor (Streets)
    const gridSize = 100;
    const gridDivisions = 40;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // 5. Buildings Group (Dynamic Procedural City)
    const buildingsGroup = new THREE.Group();
    scene.add(buildingsGroup);

    const blockWidth = 4;
    const spacing = 6;
    const rows = 10;
    const cols = 10;

    const buildingGeom = new THREE.BoxGeometry(1, 1, 1);

    // Keep building meshes in an array for raycasting if needed
    const buildingMeshes: THREE.Mesh[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Leave some central avenues/streets empty
        if (r === 5 || c === 5) continue;

        // Skip random plots to represent parks or industrial zones
        if ((r === 2 && c === 2) || (r === 8 && c === 3) || (r === 3 && c === 7)) {
          continue; 
        }

        const bHeight = 3 + Math.random() * 15;
        const x = (c - cols / 2) * spacing;
        const z = (r - rows / 2) * spacing;

        // Standard holographic wireframe material with solid face backing
        const bMat = new THREE.MeshBasicMaterial({
          color: 0x0c4a6e,
          transparent: true,
          opacity: 0.25,
          wireframe: false,
        });

        const building = new THREE.Mesh(buildingGeom, bMat);
        building.scale.set(blockWidth, bHeight, blockWidth);
        building.position.set(x, bHeight / 2, z);

        // Add bright edge lines to make buildings look like glowing neon grids
        const edges = new THREE.EdgesGeometry(buildingGeom);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.5 });
        const line = new THREE.LineSegments(edges, lineMat);
        line.scale.copy(building.scale);
        line.position.copy(building.position);

        buildingsGroup.add(building);
        buildingsGroup.add(line);
        buildingMeshes.push(building);
      }
    }

    // 6. Pollution Clouds & Plumes (Factories and Garbage Dumps)
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);

    const particles: { mesh: THREE.Mesh; speed: number; rotSpeed: number; type: string; basePos: THREE.Vector3 }[] = [];

    // Create factory chimney at specific position
    const factoryX = -12;
    const factoryZ = 18;
    const chimneyGeom = new THREE.CylinderGeometry(0.8, 1.2, 8, 16);
    const chimneyMat = new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true });
    const chimney = new THREE.Mesh(chimneyGeom, chimneyMat);
    chimney.position.set(factoryX, 4, factoryZ);
    scene.add(chimney);

    // Factory emissions particles (Refinery District - Hotspot 2)
    const emitGeom = new THREE.DodecahedronGeometry(1.5, 1);
    const emitCount = 15;
    for (let i = 0; i < emitCount; i++) {
      const emitMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7, // Purple toxic industrial smog
        transparent: true,
        opacity: 0.35,
        wireframe: true
      });
      const particle = new THREE.Mesh(emitGeom, emitMat);
      // Random starting offset in rising chimney column
      particle.position.set(
        factoryX + (Math.random() - 0.5) * 2,
        8 + Math.random() * 12,
        factoryZ + (Math.random() - 0.5) * 2
      );
      cloudsGroup.add(particle);
      particles.push({
        mesh: particle,
        speed: 0.08 + Math.random() * 0.06,
        rotSpeed: 0.01 + Math.random() * 0.02,
        type: "factory",
        basePos: new THREE.Vector3(factoryX, 8, factoryZ)
      });
    }

    // Garbage burn fire & smoke particles (Metropolis East - Hotspot 1)
    const fireX = 18;
    const fireZ = -18;
    const fireCount = 12;
    for (let i = 0; i < fireCount; i++) {
      const fireMat = new THREE.MeshBasicMaterial({
        color: 0xf97316, // Orange/red fire plume
        transparent: true,
        opacity: 0.5,
        wireframe: true
      });
      const p = new THREE.Mesh(emitGeom, fireMat);
      p.position.set(
        fireX + (Math.random() - 0.5) * 3,
        1 + Math.random() * 8,
        fireZ + (Math.random() - 0.5) * 3
      );
      cloudsGroup.add(p);
      particles.push({
        mesh: p,
        speed: 0.05 + Math.random() * 0.05,
        rotSpeed: 0.02 + Math.random() * 0.03,
        type: "fire",
        basePos: new THREE.Vector3(fireX, 1, fireZ)
      });
    }

    // Construction dust particles (Grand Central Terminal - Hotspot 3)
    const dustX = 12;
    const dustZ = 12;
    const dustCount = 14;
    for (let i = 0; i < dustCount; i++) {
      const dustMat = new THREE.MeshBasicMaterial({
        color: 0x854d0e, // Dark yellow/brown dust
        transparent: true,
        opacity: 0.4,
        wireframe: true
      });
      const p = new THREE.Mesh(emitGeom, dustMat);
      p.position.set(
        dustX + (Math.random() - 0.5) * 4,
        1 + Math.random() * 6,
        dustZ + (Math.random() - 0.5) * 4
      );
      cloudsGroup.add(p);
      particles.push({
        mesh: p,
        speed: 0.03 + Math.random() * 0.03,
        rotSpeed: 0.005 + Math.random() * 0.01,
        type: "dust",
        basePos: new THREE.Vector3(dustX, 1, dustZ)
      });
    }

    // 7. Interactive Pulse Hotspot Markers
    const markerGroup = new THREE.Group();
    scene.add(markerGroup);

    interface InteractiveMarker {
      hotspotId: string;
      mesh: THREE.Mesh;
      glowMesh: THREE.Mesh;
      baseY: number;
    }
    const interactiveMarkers: InteractiveMarker[] = [];

    // Map latitude and longitude offsets in city space
    // Let's position markers corresponding to our 4 default hotspots:
    // Hotspot 1: Garbage fire (18, 1, -18)
    // Hotspot 2: Industrial gas chimney (-12, 4, 18)
    // Hotspot 3: Construction dust (12, 1, 12)
    // Hotspot 4: Downtown Traffic Arterial (0, 1, -6)
    const positionMap: Record<string, { x: number; z: number }> = {
      "hotspot-1": { x: fireX, z: fireZ },
      "hotspot-2": { x: factoryX, z: factoryZ },
      "hotspot-3": { x: dustX, z: dustZ },
      "hotspot-4": { x: 0, z: -6 },
    };

    hotspots.forEach(h => {
      // Find or assign procedural coordinate
      let pos = positionMap[h.id];
      if (!pos) {
        // Procedural placement for citizen reported hotspots
        pos = {
          x: (h.lat - 40.75) * 600,
          z: (h.lng + 73.98) * 600
        };
        // Clamp to grid size
        pos.x = Math.max(-45, Math.min(45, pos.x));
        pos.z = Math.max(-45, Math.min(45, pos.z));
      }

      // Hotspot pin mesh (sphere core)
      const pinGeom = new THREE.SphereGeometry(1.2, 16, 16);
      const pinColor = h.severity === "Critical" ? 0xef4444 : h.severity === "High" ? 0xf97316 : 0xeab308;
      
      const pinMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        transparent: true,
        opacity: 0.9
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.set(pos.x, 3.5, pos.z);
      pinMesh.name = h.id; // set ID to target on click

      // Glow envelope
      const glowGeom = new THREE.SphereGeometry(2.4, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        transparent: true,
        opacity: 0.18,
        wireframe: true
      });
      const glowMesh = new THREE.Mesh(glowGeom, glowMat);
      glowMesh.position.copy(pinMesh.position);

      markerGroup.add(pinMesh);
      markerGroup.add(glowMesh);

      interactiveMarkers.push({
        hotspotId: h.id,
        mesh: pinMesh,
        glowMesh,
        baseY: pinMesh.position.y
      });
    });

    // 8. Dynamic Heatmap overlay underlay
    // Draw a grid of custom color tiles representing actual AQI mapping!
    const tileRows = 20;
    const tileCols = 20;
    const tileSize = 5;
    const tilesGroup = new THREE.Group();
    scene.add(tilesGroup);

    for (let tr = 0; tr < tileRows; tr++) {
      for (let tc = 0; tc < tileCols; tc++) {
        const tx = (tc - tileCols / 2) * tileSize;
        const tz = (tr - tileRows / 2) * tileSize;

        // Calculate proximity to active hotspots
        let maxAqiFactor = 0;
        hotspots.forEach(h => {
          let pos = positionMap[h.id];
          if (!pos) pos = { x: 0, z: 0 };
          const dist = Math.sqrt((tx - pos.x) ** 2 + (tz - pos.z) ** 2);
          
          let impact = 0;
          if (h.severity === "Critical") impact = 300 / (dist + 5);
          else if (h.severity === "High") impact = 200 / (dist + 5);
          else impact = 120 / (dist + 5);

          if (impact > maxAqiFactor) maxAqiFactor = impact;
        });

        // Determine color based on hotspot AQI proximity
        let tileColor = 0x10b981; // Green (Healthy)
        let opacity = 0.04;
        if (maxAqiFactor > 25) {
          tileColor = 0xef4444; // Red (Hazardous)
          opacity = 0.28;
        } else if (maxAqiFactor > 15) {
          tileColor = 0xf97316; // Orange (Unhealthy)
          opacity = 0.22;
        } else if (maxAqiFactor > 8) {
          tileColor = 0xeab308; // Yellow (Moderate)
          opacity = 0.15;
        }

        const tileGeom = new THREE.PlaneGeometry(tileSize - 0.2, tileSize - 0.2);
        const tileMat = new THREE.MeshBasicMaterial({
          color: tileColor,
          transparent: true,
          opacity: opacity,
          side: THREE.DoubleSide
        });
        const tile = new THREE.Mesh(tileGeom, tileMat);
        tile.rotation.x = Math.PI / 2;
        tile.position.set(tx, 0.05, tz);
        tilesGroup.add(tile);
      }
    }

    // 9. Floating vehicle/traffic indicators (representing moving emission nodes)
    const trafficLines: { points: THREE.Vector3[]; car: THREE.Mesh; progress: number; speed: number }[] = [];
    const roadPresetLines = [
      // Major North-South highway avenue
      [new THREE.Vector3(-25, 0.2, 5), new THREE.Vector3(25, 0.2, 5)],
      // Central West-East avenue
      [new THREE.Vector3(5, 0.2, -25), new THREE.Vector3(5, 0.2, 25)],
      // Industrial loop
      [new THREE.Vector3(-20, 0.2, -20), new THREE.Vector3(-20, 0.2, 20), new THREE.Vector3(20, 0.2, 20)]
    ];

    roadPresetLines.forEach((pts, idx) => {
      // Create a moving yellow car particle indicator
      const carGeom = new THREE.BoxGeometry(0.5, 0.3, 0.8);
      const carMat = new THREE.MeshBasicMaterial({ color: idx === 1 ? 0xf97316 : 0x06b6d4 }); // Orange diesel or Cyan EV
      const carMesh = new THREE.Mesh(carGeom, carMat);
      scene.add(carMesh);

      trafficLines.push({
        points: pts,
        car: carMesh,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004
      });
    });

    // 10. Mouse click interaction (Raycasting to select Hotspots)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseClick = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const pinMeshes = interactiveMarkers.map(im => im.mesh);
      const intersects = raycaster.intersectObjects(pinMeshes);

      if (intersects.length > 0) {
        const clickedPin = intersects[0].object as THREE.Mesh;
        const hotspotId = clickedPin.name;
        onSelectHotspot(hotspotId);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const pinMeshes = interactiveMarkers.map(im => im.mesh);
      const intersects = raycaster.intersectObjects(pinMeshes);

      if (intersects.length > 0) {
        const hoveredPin = intersects[0].object as THREE.Mesh;
        const hotspot = hotspots.find(h => h.id === hoveredPin.name);
        if (hotspot) {
          setHoveredInfo(`${hotspot.locationName} - AQI: ${hotspot.aqi} (${hotspot.pollutionType})`);
        }
      } else {
        setHoveredInfo(null);
      }
    };

    renderer.domElement.addEventListener("click", handleMouseClick);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);

    // Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 11. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Dynamic camera orbit oscillation representing atmospheric scanning surveying
      camera.position.x = Math.sin(elapsed * 0.05) * 50;
      camera.position.z = Math.cos(elapsed * 0.05) * 50;
      camera.lookAt(0, 5, 0);

      // 1. Animate marker scaling and glows
      interactiveMarkers.forEach(im => {
        const isSelected = selectedHotspotId === im.hotspotId;
        const pulseSpeed = isSelected ? 12 : 5;
        const bounceAmplitude = isSelected ? 0.8 : 0.2;
        const baseScale = isSelected ? 1.5 : 1.0;

        // Bounce bouncing up and down
        im.mesh.position.y = im.baseY + Math.sin(elapsed * pulseSpeed) * bounceAmplitude;
        im.mesh.scale.setScalar(baseScale * (1 + Math.sin(elapsed * pulseSpeed) * 0.1));

        // Glow ring expands and fades out
        const glowScale = 1.5 + (elapsed * pulseSpeed) % 2.5;
        im.glowMesh.position.y = im.mesh.position.y;
        im.glowMesh.scale.setScalar(glowScale);
        (im.glowMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.3 - (glowScale / 4));
      });

      // 2. Animate emission particles rising
      particles.forEach(p => {
        p.mesh.position.y += p.speed;
        p.mesh.rotation.y += p.rotSpeed;
        p.mesh.rotation.z += p.rotSpeed * 0.5;

        // Expand as it rises
        p.mesh.scale.setScalar(1 + (p.mesh.position.y - p.basePos.y) * 0.08);

        // Fade out
        const currentMat = p.mesh.material as THREE.MeshBasicMaterial;
        const lifeFactor = (p.mesh.position.y - p.basePos.y) / (p.type === "factory" ? 20 : 10);
        currentMat.opacity = Math.max(0, 0.4 * (1 - lifeFactor));

        // Reset particle to base chimney/point
        if (lifeFactor >= 1.0) {
          p.mesh.position.copy(p.basePos);
          p.mesh.position.x += (Math.random() - 0.5) * (p.type === "dust" ? 4 : 2);
          p.mesh.position.z += (Math.random() - 0.5) * (p.type === "dust" ? 4 : 2);
          p.mesh.scale.setScalar(1);
        }
      });

      // 3. Update moving cars
      trafficLines.forEach(tl => {
        tl.progress += tl.speed;
        if (tl.progress >= 1.0) tl.progress = 0;

        // Simple linear interpolation between road nodes
        const segmentCount = tl.points.length - 1;
        const segIdx = Math.min(segmentCount - 1, Math.floor(tl.progress * segmentCount));
        const segProgress = (tl.progress * segmentCount) % 1.0;

        const pA = tl.points[segIdx];
        const pB = tl.points[segIdx + 1];

        if (pA && pB) {
          tl.car.position.lerpVectors(pA, pB, segProgress);
          tl.car.lookAt(pB);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener("click", handleMouseClick);
        renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [hotspots, selectedHotspotId]);

  return (
    <div className="relative w-full h-full min-h-[480px]">
      {/* City Canvas Container */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden border border-sky-500/10 shadow-2xl bg-slate-950/60 backdrop-blur-sm cursor-pointer" />

      {/* Holographic HUD Labels */}
      <div className="absolute top-4 left-4 p-4 rounded-xl border border-sky-500/20 bg-slate-950/80 backdrop-blur-md font-mono select-none pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-sky-400 font-bold tracking-wider">3D COGNITIVE GRID LAYER</span>
        </div>
        <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
          Hover over pulsing sensor nodes to preview street-level air toxicity details. Left-click to select and launch real-time multi-spectral GIS analysis.
        </p>
      </div>

      {/* Floating coordinates indicator (Center Bottom) */}
      {hoveredInfo && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-950/90 border border-red-500/40 rounded-lg text-red-200 font-mono text-[11px] font-semibold text-center shadow-lg backdrop-blur shadow-red-500/10 tracking-wide pointer-events-none">
          {hoveredInfo}
        </div>
      )}

      {/* Floating HUD Right Panel */}
      <div className="absolute top-4 right-4 p-3 rounded-lg border border-sky-500/10 bg-slate-950/70 backdrop-blur-md text-[9px] font-mono text-slate-400 flex flex-col gap-1.5 select-none pointer-events-none">
        <div className="text-[10px] text-sky-400 font-bold border-b border-sky-500/10 pb-1.5 mb-1">GRID INDEX</div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-red-500 rounded" />
          <span>HAZARDOUS (AQI 300+)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-orange-500 rounded" />
          <span>UNHEALTHY (AQI 151-300)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-yellow-500 rounded" />
          <span>MODERATE (AQI 51-150)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-emerald-500 rounded" />
          <span>HEALTHY (AQI 0-50)</span>
        </div>
      </div>
    </div>
  );
}
