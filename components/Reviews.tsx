"use client";

import { useEffect, useRef, useState } from "react";

type Review = {
  name: string;
  game: string;
  text: string;
  rating: number;
};

const reviews: Review[] = [
  {
    name: "Алексей М.",
    game: "Steam",
    text: "Пополнил Steam за 5 минут. Зачислили моментально, никаких проблем.",
    rating: 5,
  },
  {
    name: "Игорь С.",
    game: "Fortnite",
    text: "V-Bucks для ребёнка — 3 минуты. Цены адекватные, сервис огонь.",
    rating: 5,
  },
  {
    name: "Мария К.",
    game: "PS Store",
    text: "PlayStation карта дешевле, чем где-либо. Поддержка мгновенная.",
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    game: "Dota 2",
    text: "Беру третий раз. Всё чётко, никаких задержек.",
    rating: 5,
  },
  {
    name: "Никита П.",
    game: "PUBG",
    text: "Первый раз боялся, но зачисление пришло за 7 минут. Рекомендую.",
    rating: 5,
  },
  {
    name: "Светлана О.",
    game: "Genshin",
    text: "Пополнила дочке Genshin. Всё пришло, даже быстрее чем обещали.",
    rating: 5,
  },
];

export default function Reviews() {
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
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Клиенты доверяют
          </h2>
          <p className="text-ink-muted max-w-xl">
            Более 10 000 заявок — и ни одной нерешённой проблемы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} index={i} revealed={revealed} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  index,
  revealed,
}: {
  review: Review;
  index: number;
  revealed: boolean;
}) {
  return (
    <div
      className={`
        flex flex-col gap-4 p-6 rounded-2xl
        border border-space-line bg-space-soft/40 backdrop-blur-sm
        hover:border-electric transition-all duration-300
        ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-electric">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span className="text-xs text-ink-dim uppercase tracking-wider">
          {review.game}
        </span>
      </div>
      <p className="text-ink text-sm leading-relaxed flex-1">«{review.text}»</p>
      <div className="flex items-center gap-3 pt-3 border-t border-space-line">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric to-emerald flex items-center justify-center text-[#0F0D0A] font-bold text-sm">
          {review.name.charAt(0)}
        </div>
        <span className="text-ink-muted text-sm">{review.name}</span>
      </div>
    </div>
  );
}