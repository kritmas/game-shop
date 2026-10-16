"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BlackholeBackground = dynamic(
  () => import("@junhoyeo/blackhole").then((mod) => mod.BlackholeBackground),
  { ssr: false }
);

type Phase = "intro" | "collapse" | "flash" | "reveal" | "done";

export default function CoreScene({
  onReveal,
}: {
  onReveal: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    // 0–3с: чёрная дыра живёт
    const t1 = setTimeout(() => setPhase("collapse"), 3000);
    // 3.0–4.5с: сцена уходит (растворяется + зум)
    // 4.2с: включаем вспышку поверх
    const t2 = setTimeout(() => setPhase("flash"), 4200);
    // 4.9с: вспышка на максимуме — показываем Hero под ней
    const t3 = setTimeout(() => {
      onReveal();
      setPhase("reveal");
    }, 4900);
    // 6.0с: вспышка уходит, Hero остаётся
    const t4 = setTimeout(() => setPhase("done"), 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onReveal]);

  if (phase === "done") return null;

  const sceneVisible = phase === "intro" || phase === "collapse";
  const flashVisible = phase === "flash" || phase === "reveal";

  return (
    <>
      {/* Сцена чёрной дыры */}
      {sceneVisible && (
        <div
          className={`
            fixed inset-0 z-40 bg-black
            transition-all duration-[1200ms] ease-in-out
            ${phase === "collapse" ? "opacity-0 scale-[1.3]" : "opacity-100 scale-100"}
          `}
          style={{ transformOrigin: "center center" }}
        >
          <BlackholeBackground
            quality="high"
            cameraDistance={10}
            enableOrbit={true}
            orbitSpeed={0.15}
            showAccretionDisk={true}
            enableDopplerShift={true}
            enableBeaming={true}
            bloomStrength={1.2}
            bloomRadius={0.6}
            bloomThreshold={0.7}
          />
        </div>
      )}

      {/* Вспышка — плавно нарастает, потом гаснет */}
      <div
        className={`
          fixed inset-0 z-50 pointer-events-none
          transition-opacity duration-[900ms] ease-out
          ${flashVisible ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background:
            "radial-gradient(circle at center, #ffffff 0%, #FFD9A0 35%, #FF8A3D 75%, #050505 100%)",
        }}
      />
    </>
  );
}