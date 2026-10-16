"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  num: string;
  title: string;
  description: string;
  icon: string;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Выбираешь игру",
    description: "Находи в каталоге нужную игру и номинал пополнения",
    icon: "🎮",
  },
  {
    num: "02",
    title: "Указываешь аккаунт",
    description: "Вводишь логин или ID игрового аккаунта — пароль не нужен",
    icon: "🆔",
  },
  {
    num: "03",
    title: "Оплачиваешь",
    description: "Карта, СБП или крипта — комиссия видна сразу, без сюрпризов",
    icon: "💳",
  },
  {
    num: "04",
    title: "Получаешь зачисление",
    description: "Средства приходят на аккаунт за 5–15 минут, статус — в трекере",
    icon: "⚡",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative w-full py-24 px-6"
    >
      {/* Свечение за блоком */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #FFA94D 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Как это работает
          </h2>
          <p className="text-ink-muted max-w-xl">
            Четыре простых шага от выбора игры до зачисления на аккаунт
          </p>
        </div>

        {/* Сетка шагов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <StepCard key={s.num} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), index * 120);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`
        relative flex flex-col gap-5 p-7 rounded-2xl
        border border-space-line bg-space-soft/40 backdrop-blur-sm
        transition-all duration-700 ease-out
        hover:border-electric hover:bg-space-soft/70
        ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: revealed ? `${index * 120}ms` : "0ms",
      }}
    >
      {/* Номер шага — крупный, полупрозрачный, в углу */}
      <span className="absolute top-4 right-5 font-display text-5xl font-bold text-electric/10 select-none">
        {step.num}
      </span>

      {/* Иконка */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-emerald/20 border border-space-line flex items-center justify-center text-2xl">
        {step.icon}
      </div>

      {/* Заголовок */}
      <h3 className="font-display text-xl font-bold text-ink">
        {step.title}
      </h3>

      {/* Описание */}
      <p className="text-ink-muted text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Линия прогресса внизу — декоративно */}
      <div className="mt-auto pt-4">
        <div className="h-px w-full bg-gradient-to-r from-electric/60 via-emerald/40 to-transparent" />
      </div>
    </div>
  );
}