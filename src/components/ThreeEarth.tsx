import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeEarth() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSatellite, setActiveSatellite] = useState<string>("Sentinel-5P");

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = mountRef.current.clientWidth || 600;
    const height = mountRef.current.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 25;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Group for entire globe
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Core Globe (Futuristic Grid Sphere)
    const globeGeom = new THREE.SphereGeometry(6, 32, 32);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x082f49,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const globeMesh = new THREE.Mesh(globeGeom, globeMat);
    globeGroup.add(globeMesh);

    // 2. Glowing Atmosphere Ring
    const atmosGeom = new THREE.SphereGeometry(6.1, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const atmosMesh = new THREE.Mesh(atmosGeom, atmosMat);
    globeGroup.add(atmosMesh);

    // 3. Holographic Continents (Represented by a cloud of points)
    const pointsGeom = new THREE.BufferGeometry();
    const pointsCount = 2000;
    const positions = new Float32Array(pointsCount * 3);
    const colors = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount; i++) {
      // Fibonacci sphere distribution
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / pointsCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;

      const r = 6.02; // Just slightly larger than globe wireframe
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color continents in emerald and cyan hues, others darker
      // Simulate earth-like distributions
      const noise = Math.sin(x * 1.5) * Math.cos(y * 1.5) * Math.sin(z * 1.5);
      if (noise > -0.2) {
        colors[i * 3] = 0.1;      // R
        colors[i * 3 + 1] = 0.74;  // G (Emerald/Green)
        colors[i * 3 + 2] = 0.9;   // B (Sky Cyan)
      } else {
        colors[i * 3] = 0.03;
        colors[i * 3 + 1] = 0.15;
        colors[i * 3 + 2] = 0.3;
      }
    }

    pointsGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const continentPoints = new THREE.Points(pointsGeom, pointsMat);
    globeGroup.add(continentPoints);

    // 4. Background Starfield / Particle Nebula
    const starGeom = new THREE.BufferGeometry();
    const starCount = 300;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
    });
    const starPoints = new THREE.Points(starGeom, starMat);
    scene.add(starPoints);

    // 5. Orbits and Satellites
    const satCount = 3;
    const satellites: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; laserLine: THREE.Line }[] = [];

    const colorsPreset = [0x3b82f6, 0x10b981, 0xf97316]; // Blue, Green, Orange
    const names = ["Sentinel-5P", "Landsat-9", "AURA-AQ"];

    for (let i = 0; i < satCount; i++) {
      const orbitRadius = 8.5 + i * 1.2;
      const speed = 0.015 - i * 0.003;
      
      // Orbit Path Line
      const pathGeom = new THREE.BufferGeometry();
      const pathPoints = [];
      for (let a = 0; a <= 64; a++) {
        const theta = (a / 64) * Math.PI * 2;
        pathPoints.push(new THREE.Vector3(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * orbitRadius));
      }
      pathGeom.setFromPoints(pathPoints);
      const pathMat = new THREE.LineBasicMaterial({
        color: colorsPreset[i],
        transparent: true,
        opacity: 0.12,
      });
      const orbitPath = new THREE.Line(pathGeom, pathMat);
      
      // Tilt the orbit slightly for aesthetics
      orbitPath.rotation.x = 0.4 + i * 0.3;
      orbitPath.rotation.z = i * 0.2;
      scene.add(orbitPath);

      // Satellite Object (glowing box)
      const satGeom = new THREE.BoxGeometry(0.3, 0.2, 0.4);
      const satMat = new THREE.MeshBasicMaterial({
        color: colorsPreset[i],
      });
      const satMesh = new THREE.Mesh(satGeom, satMat);
      scene.add(satMesh);

      // Laser Beam Line
      const laserGeom = new THREE.BufferGeometry();
      const laserPositions = new Float32Array([0, 0, 0, 0, 0, 0]);
      laserGeom.setAttribute("position", new THREE.BufferAttribute(laserPositions, 3));
      const laserMat = new THREE.LineBasicMaterial({
        color: colorsPreset[i],
        transparent: true,
        opacity: 0.4,
      });
      const laserLine = new THREE.Line(laserGeom, laserMat);
      scene.add(laserLine);

      satellites.push({
        mesh: satMesh,
        orbitRadius,
        speed,
        angle: Math.random() * Math.PI * 2,
        laserLine,
      });
    }

    // Target City point on Earth (New York coords approximately in model space)
    const targetVector = new THREE.Vector3(2.5, 4.0, 3.5).normalize().multiplyScalar(6.02);
    
    // Add a small pulsing core hotspot marker on Earth
    const markerGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, // Red pulse
    });
    const markerMesh = new THREE.Mesh(markerGeom, markerMat);
    markerMesh.position.copy(targetVector);
    globeGroup.add(markerMesh);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Animation variables
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Earth rotation
      globeGroup.rotation.y = elapsedTime * 0.05;

      // Update Satellites
      satellites.forEach((sat, idx) => {
        sat.angle += sat.speed;
        
        // Compute position based on tilted plane
        const rawPos = new THREE.Vector3(
          Math.cos(sat.angle) * sat.orbitRadius,
          0,
          Math.sin(sat.angle) * sat.orbitRadius
        );

        // Apply same tilt as orbit path
        rawPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.4 + idx * 0.3);
        rawPos.applyAxisAngle(new THREE.Vector3(0, 0, 1), idx * 0.2);

        sat.mesh.position.copy(rawPos);

        // Point satellite facing core of globe
        sat.mesh.lookAt(new THREE.Vector3(0, 0, 0));

        // Laser scan sweep targeting New York / active hotspot
        // Animate the laser firing periodically or targeting the globe marker
        const laserPositions = sat.laserLine.geometry.attributes.position.array as Float32Array;
        
        // Start of laser (satellite position)
        laserPositions[0] = sat.mesh.position.x;
        laserPositions[1] = sat.mesh.position.y;
        laserPositions[2] = sat.mesh.position.z;

        // End of laser (either target marker or center with some noise)
        // If scanning is active, point towards the marker but rotated with earth, else point to center
        const currentTarget = targetVector.clone().applyMatrix4(globeGroup.matrixWorld);
        
        // We let Sentinel scan the hotspot, other satellites scan general surface sweeps
        if (idx === 0) {
          laserPositions[3] = currentTarget.x;
          laserPositions[4] = currentTarget.y;
          laserPositions[5] = currentTarget.z;
          (sat.laserLine.material as THREE.LineBasicMaterial).opacity = Math.sin(elapsedTime * 6) * 0.4 + 0.5;
        } else {
          // Sweeping across the surface
          const sweepAngle = elapsedTime * (0.2 + idx * 0.1);
          const sweepTarget = new THREE.Vector3(
            Math.sin(sweepAngle) * 5.5,
            Math.cos(sweepAngle) * 2,
            Math.cos(sweepAngle * 0.5) * 5.5
          );
          laserPositions[3] = sweepTarget.x;
          laserPositions[4] = sweepTarget.y;
          laserPositions[5] = sweepTarget.z;
          (sat.laserLine.material as THREE.LineBasicMaterial).opacity = Math.max(0.1, Math.sin(elapsedTime * 2 + idx) * 0.3);
        }

        sat.laserLine.geometry.attributes.position.needsUpdate = true;
      });

      // Animate pulsing hotspot marker
      const pulseScale = 1 + Math.sin(elapsedTime * 8) * 0.4;
      markerMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Starfield twinkle
      const starPositions = starPoints.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        if (Math.random() > 0.98) {
          starPositions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.05;
        }
      }
      starPoints.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Active satellite tracker interval
    const satInterval = setInterval(() => {
      setActiveSatellite(prev => {
        const index = names.indexOf(prev);
        return names[(index + 1) % names.length];
      });
    }, 4000);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      clearInterval(satInterval);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[450px]" id="earth-container">
      {/* 3D WebGL Container */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating Instrument Overlays */}
      <div className="absolute bottom-4 left-4 p-4 rounded-xl border border-sky-500/20 bg-black/70 backdrop-blur-md max-w-xs font-mono text-[11px] text-gray-400 select-none pointer-events-none">
        <div className="flex items-center justify-between border-b border-sky-500/20 pb-2 mb-2">
          <span className="text-sky-400 font-semibold tracking-wider">ORBITAL CORE</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>ACTIVE SATELLITE:</span>
            <span className="text-amber-400 font-semibold">{activeSatellite}</span>
          </div>
          <div className="flex justify-between">
            <span>TELEMETRY BEAM:</span>
            <span className="text-emerald-400">CONNECT-100%</span>
          </div>
          <div className="flex justify-between">
            <span>HOTSPOT ALIGN:</span>
            <span className="text-red-400">LAT 40.7589 / LNG -73.9851</span>
          </div>
          <div className="flex justify-between">
            <span>SCAN FREQUENCY:</span>
            <span className="text-cyan-400">4.12 GHz (SWIR-BAND)</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[9px] text-sky-400/80">
          <span className="inline-block px-1 border border-sky-400/40 rounded bg-sky-950/40">S-5P</span>
          <span className="inline-block px-1 border border-sky-400/40 rounded bg-sky-950/40">LANDSAT</span>
          <span className="inline-block px-1 border border-sky-400/40 rounded bg-sky-950/40">AURA</span>
        </div>
      </div>
    </div>
  );
}
