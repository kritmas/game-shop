"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  color: "electric" | "emerald";
};

const stats: Stat[] = [
  { value: 10000, suffix: "+", label: "Клиентов", color: "electric" },
  { value: 24, suffix: "/7", label: "Поддержка", color: "emerald" },
  { value: 50, suffix: "+", label: "Игр в каталоге", color: "electric" },
  { value: 100, suffix: "%", label: "Гарантия возврата", color: "emerald" },
];

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-6 border-y border-space-line bg-space-soft/30"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <StatItem key={i} stat={s} sectionRef={sectionRef} />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  stat,
  sectionRef,
}: {
  stat: Stat;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animateCount(stat.value, 1800, setCount);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionRef, started, stat.value]);

  const isEmerald = stat.color === "emerald";
  const colorText = isEmerald ? "text-emerald" : "text-electric";
  const colorGlow = isEmerald ? "shadow-glow-emerald" : "shadow-glow";

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`
          w-16 h-16 rounded-2xl flex items-center justify-center
          bg-space-soft border border-space-line
          ${colorText} ${colorGlow}
          font-display text-2xl font-bold
        `}
      >
        ●
      </div>
      <div className={`font-display text-4xl md:text-5xl font-bold ${colorText}`}>
        {formatNumber(count)}
        {stat.suffix}
      </div>
      <div className="text-ink-muted text-sm md:text-base">{stat.label}</div>
    </div>
  );
}

/* ─── Утилиты ─── */

function animateCount(
  target: number,
  duration: number,
  onUpdate: (n: number) => void
) {
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    onUpdate(Math.floor(eased * target));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function formatNumber(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  }
  return String(n);
}