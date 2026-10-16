"use client";

import { useEffect, useState } from "react";

export default function FloatingSupport() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Появляется через 2 секунды после загрузки
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        fixed top-6 right-6 z-[90]
        flex flex-col items-end gap-3
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}
      `}
    >
      {/* Кнопка-капсула */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label="Поддержка"
        className="
          group relative flex items-center gap-2.5
          pl-3 pr-5 py-2.5 rounded-full
          bg-[#0F0D0A]/90 backdrop-blur-md
          border border-[#2A231A]
          hover:border-[#FFA94D]
          transition-all duration-200
          shadow-[0_8px_30px_-5px_rgba(0,0,0,0.6)]
          hover:shadow-[0_8px_40px_-5px_rgba(255,169,77,0.5)]
        "
      >
        {/* Пульсирующий индикатор */}
        <span className="relative flex items-center justify-center w-7 h-7">
          <span className="absolute w-7 h-7 rounded-full bg-emerald opacity-30 animate-ping" />
          <span className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#FFA94D] to-[#FF6B35] flex items-center justify-center text-sm">
            💬
          </span>
        </span>

        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] text-[#A89C8A] uppercase tracking-widest">
            Онлайн 24/7
          </span>
          <span className="text-sm font-medium text-[#F5F0E8] group-hover:text-[#FFA94D] transition-colors">
            Поддержка
          </span>
        </span>

        {/* Точка-индикатор статуса */}
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald" />
      </button>

      {/* Раскрытая панелька — открывается вниз, справа */}
      {expanded && (
        <div
          className="
            w-80 p-5 rounded-2xl
            bg-[#0F0D0A]/95 backdrop-blur-md
            border border-[#2A231A]
            shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]
            animate-[modalIn_280ms_cubic-bezier(0.22,1,0.36,1)]
          "
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-xs text-[#A89C8A] uppercase tracking-wider">
              Ответим за пару минут
            </span>
          </div>

          <p className="text-sm text-[#F5F0E8] mb-4 leading-snug">
            Что-то не получается? Выбери удобный способ связи — мы на связи 24/7.
          </p>

          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center gap-2
              w-full py-3 rounded-xl text-sm font-medium
              bg-gradient-to-r from-[#FFA94D] to-[#FF6B35] text-[#0F0D0A]
              hover:shadow-[0_0_40px_rgba(255,169,77,0.6)]
              transition-all
            "
          >
            ✈️ Открыть Telegram
          </a>

          <a
            href="mailto:support@example.com"
            className="
              flex items-center justify-center gap-2
              w-full mt-2 py-3 rounded-xl text-sm
              border border-[#2A231A] text-[#A89C8A]
              hover:border-[#FFA94D] hover:text-[#FFA94D]
              transition-all
            "
          >
            ✉️ Написать на email
          </a>

          {/* Быстрые вопросы */}
          <div className="mt-5 pt-4 border-t border-[#2A231A] flex flex-col gap-2">
            <span className="text-xs text-[#6A6055] uppercase tracking-wider mb-1">
              Частые вопросы
            </span>
            <a href="/#faq" className="text-sm text-[#A89C8A] hover:text-[#FFA94D] transition-colors">
              • Зачисление не пришло
            </a>
            <a href="/#faq" className="text-sm text-[#A89C8A] hover:text-[#FFA94D] transition-colors">
              • Оплата не прошла
            </a>
            <a href="/#faq" className="text-sm text-[#A89C8A] hover:text-[#FFA94D] transition-colors">
              • Указал неверный логин
            </a>
          </div>
        </div>
      )}
    </div>
  );
}