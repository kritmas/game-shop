"use client";

import { useEffect, useRef, useState } from "react";

export default function Support() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

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

  return (
    <section
      id="support"
      ref={ref}
      className="relative w-full py-24 px-6"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #FFA94D 0%, transparent 60%)",
        }}
      />

      <div
        className={`
          relative max-w-5xl mx-auto
          transition-all duration-1000 ease-out
          ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
      >
        <div className="rounded-3xl border border-space-line bg-space-soft/40 backdrop-blur-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Левая часть — текст */}
            <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
              <div className="w-fit px-4 py-2 rounded-full border border-space-line bg-space-soft/60 text-sm text-ink-muted flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                Поддержка онлайн
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight">
                Что-то не получается?
                <br />
                Мы на связи 24/7
              </h2>

              <p className="text-ink-muted">
                Отвечаем в Telegram за пару минут. Поможем с выбором,
                подскажем по оплате, разберёмся с зачислением.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-6 py-3 rounded-xl font-medium text-center
                    bg-gradient-to-r from-electric to-emerald
                    text-[#0F0D0A]
                    shadow-glow
                    hover:shadow-[0_0_60px_rgba(255,169,77,0.6)]
                    transition-all duration-200
                  "
                >
                  ✈️ Написать в Telegram
                </a>
                <a
                  href="mailto:support@example.com"
                  className="
                    px-6 py-3 rounded-xl font-medium text-center
                    border border-space-line bg-space-soft/50
                    text-ink
                    hover:border-electric transition-colors
                  "
                >
                  ✉️ Email
                </a>
              </div>
            </div>

            {/* Правая часть — карточки частых вопросов */}
            <div className="p-8 md:p-12 bg-[#050505]/60 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-space-line">
              <SupportItem text="Зачисление не пришло" time="~ 2 мин" />
              <SupportItem text="Оплата не прошла" time="~ 3 мин" />
              <SupportItem text="Указал неверный логин" time="~ 2 мин" />
              <SupportItem text="Нужен возврат средств" time="~ 5 мин" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="
      flex items-center justify-between gap-4
      p-4 rounded-xl border border-space-line bg-space-soft/30
      hover:border-electric transition-colors cursor-pointer group
    ">
      <span className="text-ink text-sm">{text}</span>
      <span className="text-xs text-ink-dim group-hover:text-electric transition-colors whitespace-nowrap">
        {time}
      </span>
    </div>
  );
}