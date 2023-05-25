"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const canvasRef = useRef();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const locationToAngles = (lat, long) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };

  const focusRef = useRef([0, 0]);

  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 200 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [{ location: [latitude, longitude], size: 0.2 }],
      onRender: (state) => {
        state.phi = currentPhi;
        state.theta = currentTheta;
        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }

        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;

        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current.style.opacity = "1"));

    return () => globe.destroy();
  }, [latitude, longitude]);

  const handleLocationChange = () => {
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(long)) {
      focusRef.current = locationToAngles(lat, long);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
      <div
        className="flex flex-col md:flex-row justify-center items-center control-buttons"
        style={{ gap: ".5rem" }}
      >
        <div>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button onClick={handleLocationChange}>Go</button>
        </div>
      </div>
    </div>
  );
}
