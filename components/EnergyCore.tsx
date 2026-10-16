"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "charging" | "burst" | "done";

export default function EnergyCore() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("charging"), 150);
    const t2 = setTimeout(() => setPhase("burst"), 1700);
    const t3 = setTimeout(() => setVisible(false), 2300);
    const t4 = setTimeout(() => setPhase("done"), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-space pointer-events-none overflow-hidden
        transition-opacity duration-700 ease-out
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Ореол вокруг ядра */}
      <div
        className={`
          absolute rounded-full blur-3xl transition-all duration-1000 ease-out
          ${phase === "idle" ? "w-8 h-8 bg-electric opacity-20" : ""}
          ${phase === "charging" ? "w-56 h-56 bg-electric opacity-50" : ""}
          ${phase === "burst" ? "w-72 h-72 bg-electric opacity-70" : ""}
        `}
      />

      {/* Ядро */}
      <div
        className={`
          relative rounded-full transition-all duration-500 ease-out
          ${phase === "idle" ? "w-4 h-4 bg-electric opacity-40" : ""}
          ${phase === "charging" ? "w-10 h-10 bg-electric opacity-100 shadow-glow" : ""}
          ${phase === "burst" ? "w-14 h-14 bg-emerald opacity-100 shadow-glow-emerald" : ""}
        `}
      />

      {/* Круговая волна при импульсе */}
      {phase === "burst" && (
        <>
          <div className="absolute w-14 h-14 rounded-full border-2 border-emerald animate-ping" />
          <div className="absolute w-14 h-14 rounded-full border border-electric animate-ping [animation-delay:150ms]" />
        </>
      )}

      {/* Частицы — летят к центру */}
      {phase !== "idle" && (
        <>
          <Particle startX={-320} startY={-180} delay={0} />
          <Particle startX={320} startY={-220} delay={80} />
          <Particle startX={-360} startY={180} delay={160} />
          <Particle startX={360} startY={160} delay={40} />
          <Particle startX={0} startY={-300} delay={200} />
          <Particle startX={0} startY={300} delay={120} />
          <Particle startX={-280} startY={0} delay={240} />
          <Particle startX={280} startY={0} delay={300} />
        </>
      )}
    </div>
  );
}

/* ─── Частица ─── */

function Particle({
  startX,
  startY,
  delay,
}: {
  startX: number;
  startY: number;
  delay: number;
}) {
  return (
    <div
      className="
        absolute w-3 h-3 rounded-full bg-emerald
        shadow-[0_0_20px_6px_rgba(0,229,160,0.8)]
        will-change-transform
      "
      style={{
        animation: `particle-fly 1.2s cubic-bezier(0.5, 0, 0.5, 1) ${delay}ms forwards`,
        transform: `translate(${startX}px, ${startY}px)`,
        opacity: 0,
      }}
    />
  );
}