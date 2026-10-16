"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, ReactNode } from "react";

const BlackholeBackground = dynamic(
  () => import("@junhoyeo/blackhole").then((mod) => mod.BlackholeBackground),
  { ssr: false }
);

type HoleParams = {
  cameraDistance: number;
  orbitSpeed: number;
  bloomStrength: number;
  bloomRadius: number;
  scale: number;
};

const REST_PARAMS: HoleParams = {
  cameraDistance: 10,
  orbitSpeed: 0.15,
  bloomStrength: 1.2,
  bloomRadius: 0.6,
  scale: 1,
};

const PEAK_PARAMS: HoleParams = {
  cameraDistance: 3.2,
  orbitSpeed: 1.1,
  bloomStrength: 3.5,
  bloomRadius: 1.2,
  scale: 1.55,
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixParams(a: HoleParams, b: HoleParams, t: number): HoleParams {
  return {
    cameraDistance: lerp(a.cameraDistance, b.cameraDistance, t),
    orbitSpeed: lerp(a.orbitSpeed, b.orbitSpeed, t),
    bloomStrength: lerp(a.bloomStrength, b.bloomStrength, t),
    bloomRadius: lerp(a.bloomRadius, b.bloomRadius, t),
    scale: lerp(a.scale, b.scale, t),
  };
}

export default function Intro({ children }: { children: ReactNode }) {
  const [holeParams, setHoleParams] = useState<HoleParams>(REST_PARAMS);
  const rafRef = useRef<number | null>(null);

  /* Scroll-driven анимация — единственное, что тут осталось */
  useEffect(() => {
    let lastT = -1;

    const tick = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const t = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

      if (Math.abs(t - lastT) > 0.005) {
        lastT = t;
        setHoleParams(mixParams(REST_PARAMS, PEAK_PARAMS, t));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Чёрная дыра — фон, видна с самого начала */}
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: `scale(${holeParams.scale})`,
            transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <BlackholeBackground
            quality="medium"
            cameraDistance={holeParams.cameraDistance}
            enableOrbit={true}
            orbitSpeed={holeParams.orbitSpeed}
            showAccretionDisk={true}
            enableDopplerShift={true}
            enableBeaming={true}
            bloomStrength={holeParams.bloomStrength}
            bloomRadius={holeParams.bloomRadius}
            bloomThreshold={0.7}
          />
        </div>
      </div>

      {/* Контент поверх дыры */}
      <div className="relative z-10">{children}</div>
    </>
  );
}