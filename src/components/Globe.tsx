"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe({ lat, long }: any) {
  const canvasRef: any = useRef();
  const locationToAngles = (lat: any, long: any) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };
  const focusRef = useRef([0, 0]);


  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [lat, long], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [lat, long]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-[600px] h-[600px] max-w-full aspect-auto"
      />
    </>
  );
}
