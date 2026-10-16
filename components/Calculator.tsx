"use client";

import { useRef, useState, useEffect } from "react";

const COMMISSION = 0.03; // 3% комиссия

export default function Calculator() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [input, setInput] = useState("1000");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const amount = Math.max(0, Number(input) || 0);
  const commission = Math.round(amount * COMMISSION);
  const total = amount + commission;

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <section ref={ref} className="relative w-full py-24 px-6">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #FFA94D 0%, transparent 60%)",
        }}
      />

      <div
        className={`
          relative max-w-4xl mx-auto rounded-3xl border border-space-line
          bg-space-soft/50 backdrop-blur-sm overflow-hidden
          transition-all duration-1000 ease-out
          ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
      >
        <div className="grid md:grid-cols-2">
          {/* Левая часть — ввод */}
          <div className="p-8 md:p-10 flex flex-col gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
                Калькулятор
              </h2>
              <p className="text-ink-muted text-sm">
                Введи сумму — увидишь, сколько получит аккаунт и какова комиссия
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-ink font-medium">
                Сумма пополнения
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full py-4 px-5 pr-12 rounded-2xl bg-[#050505] border border-space-line text-ink text-2xl font-display font-bold outline-none focus:border-electric transition-colors"
                  placeholder="1000"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-electric font-display text-2xl font-bold">
                  ₽
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((v) => (
                <button
                  key={v}
                  onClick={() => setInput(String(v))}
                  className={`
                    px-4 py-2 rounded-xl border text-sm font-medium
                    transition-all
                    ${
                      Number(input) === v
                        ? "border-electric bg-electric/10 text-electric"
                        : "border-space-line bg-space-soft/50 text-ink-muted hover:border-electric/50 hover:text-ink"
                    }
                  `}
                >
                  {v}₽
                </button>
              ))}
            </div>
          </div>

          {/* Правая часть — результат */}
          <div className="p-8 md:p-10 bg-[#050505]/60 border-t md:border-t-0 md:border-l border-space-line flex flex-col justify-center gap-5">
            <ResultRow label="Пополнение аккаунта" value={amount} main />
            <ResultRow label="Комиссия сервиса (3%)" value={commission} muted />
            <div className="h-px bg-space-line" />
            <ResultRow label="Итого к оплате" value={total} accent />

            <a
              href="#games"
              className="
                mt-4 px-6 py-3 rounded-xl text-center font-medium
                bg-gradient-to-r from-electric to-emerald text-[#0F0D0A]
                shadow-glow hover:shadow-[0_0_60px_rgba(255,169,77,0.6)]
                transition-all
              "
            >
              Выбрать игру →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({
  label,
  value,
  main,
  muted,
  accent,
}: {
  label: string;
  value: number;
  main?: boolean;
  muted?: boolean;
  accent?: boolean;
}) {
  const sizeClass = main ? "text-2xl" : accent ? "text-3xl" : "text-xl";
  const colorClass = accent
    ? "text-electric"
    : muted
    ? "text-ink-muted"
    : "text-ink";

  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className={`text-sm ${muted ? "text-ink-dim" : "text-ink-muted"}`}>
        {label}
      </span>
      <span className={`font-display font-bold ${sizeClass} ${colorClass}`}>
        {value.toLocaleString("ru-RU")}₽
      </span>
    </div>
  );
}