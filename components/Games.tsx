"use client";

import { useEffect, useRef, useState } from "react";
import BuyModal from "./BuyModal";

type Category = "PC" | "Mobile" | "Console";

type Game = {
  id: string;
  name: string;
  category: Category;
  price: number;
  gradient: string;
  image: string;
};

const games: Game[] = [
  { id: "steam", name: "Steam Кошелёк", category: "PC", price: 125, gradient: "from-[#1B2838] to-[#2A475E]", image: "/games/steam.jpg" },
  { id: "cs2", name: "Counter-Strike 2", category: "PC", price: 615, gradient: "from-[#3D2A00] to-[#1A1200]", image: "/games/cs2.jpg" },
  { id: "dota2", name: "Dota 2", category: "PC", price: 615, gradient: "from-[#3A1818] to-[#1A0A0A]", image: "/games/dota2.jpg" },
  { id: "pubg", name: "PUBG: Battlegrounds", category: "PC", price: 615, gradient: "from-[#3A2A00] to-[#1A0D00]", image: "/games/pubg.jpg" },
  { id: "gta5", name: "GTA V Online", category: "PC", price: 1500, gradient: "from-[#0A1F2E] to-[#1A0A1F]", image: "/games/gta5.jpg" },
  { id: "rust", name: "Rust", category: "PC", price: 615, gradient: "from-[#2A1F1A] to-[#0F0A08]", image: "/games/rust.jpg" },
  { id: "apex", name: "Apex Legends", category: "PC", price: 850, gradient: "from-[#3A1A0A] to-[#1A0800]", image: "/games/apex.jpg" },
  { id: "ea25", name: "EA FC 25", category: "PC", price: 450, gradient: "from-[#0A2A1A] to-[#001A0A]", image: "/games/ea25.jpg" },
  { id: "eldenring", name: "Elden Ring", category: "PC", price: 2500, gradient: "from-[#2A2210] to-[#0F0A05]", image: "/games/eldenring.jpg" },
  { id: "dbd", name: "Dead by Daylight", category: "PC", price: 400, gradient: "from-[#2A0A0A] to-[#0F0000]", image: "/games/dbd.jpg" },
  { id: "cyberpunk", name: "Cyberpunk 2077", category: "PC", price: 2200, gradient: "from-[#3A3A0A] to-[#1A0A2A]", image: "/games/cyberpunk.jpg" },
  { id: "witcher", name: "The Witcher 3", category: "PC", price: 1500, gradient: "from-[#2A1A0A] to-[#0F0A08]", image: "/games/witcher.jpg" },
  { id: "destiny2", name: "Destiny 2", category: "PC", price: 850, gradient: "from-[#0A1A3A] to-[#05050F]", image: "/games/destiny2.jpg" },
  { id: "poe2", name: "Path of Exile 2", category: "PC", price: 600, gradient: "from-[#2A0A1A] to-[#0F0508]", image: "/games/poe2.jpg" },
  { id: "ark", name: "ARK: Survival", category: "PC", price: 1500, gradient: "from-[#0A2A0A] to-[#050F05]", image: "/games/ark.jpg" },
  { id: "clash", name: "Clash of Clans", category: "Mobile", price: 150, gradient: "from-[#3A2200] to-[#1A0F00]", image: "/games/clash.jpg" },
  { id: "genshin", name: "Genshin Impact", category: "Mobile", price: 200, gradient: "from-[#1A2A3A] to-[#0A0F1A]", image: "/games/genshin.jpg" },
  { id: "brawlstars", name: "Brawl Stars", category: "Mobile", price: 180, gradient: "from-[#3A0A1A] to-[#1A0508]", image: "/games/brawlstars.jpg" },
  { id: "psstore", name: "PS Store Card", category: "Console", price: 1000, gradient: "from-[#0A1F3A] to-[#05050F]", image: "/games/psstore.jpg" },
  { id: "xbox", name: "Xbox Gift Card", category: "Console", price: 1000, gradient: "from-[#0A3A0A] to-[#050F05]", image: "/games/xbox.jpg" },
];

const filters: { label: string; value: Category | "all" }[] = [
  { label: "Все", value: "all" },
  { label: "PC", value: "PC" },
  { label: "Мобильные", value: "Mobile" },
  { label: "Консоли", value: "Console" },
];

export default function Games() {
  const [active, setActive] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Game | null>(null);

  const visible =
    active === "all" ? games : games.filter((g) => g.category === active);

  return (
    <section id="games" className="relative w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-12 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Все игры
          </h2>
          <p className="text-ink-muted max-w-xl">
            Выбирай игру и номинал — зачисление займёт до 15 минут
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`
                px-5 py-2.5 rounded-full border transition-all duration-200
                font-medium text-sm
                ${
                  active === f.value
                    ? "border-electric bg-electric/10 text-electric shadow-glow"
                    : "border-space-line bg-space-soft/50 text-ink-muted hover:border-electric/50 hover:text-ink"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((g, i) => (
            <GameCard
              key={g.id}
              game={g}
              index={i}
              onBuy={() => setSelected(g)}
            />
          ))}
        </div>
      </div>

      <BuyModal game={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function GameCard({
  game,
  index,
  onBuy,
}: {
  game: Game;
  index: number;
  onBuy: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [imgOk, setImgOk] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = (index % 3) * 100 + Math.floor(index / 3) * 80;
          setTimeout(() => setRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index]);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRot({ x: -(y - 0.5) * 12, y: (x - 0.5) * 12 });
    setMouse({ x: x * 100, y: y * 100 });
  };

  const handleLeave = () => {
    setRot({ x: 0, y: 0 });
    setMouse({ x: 50, y: 50 });
  };

  return (
    <button
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onBuy}
      className={`
        group relative flex flex-col items-stretch
        rounded-3xl border border-space-line
        bg-space-soft/60 backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:border-electric
        text-left w-full overflow-hidden
        will-change-transform
        ${revealed ? "animate-card-explode" : "opacity-0"}
        ${revealed && index < 3 ? "animate-card-flash" : ""}
      `}
      style={{
        transform: revealed
          ? `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`
          : undefined,
        transformStyle: "preserve-3d",
        animationDelay: revealed
          ? `${(index % 3) * 100 + Math.floor(index / 3) * 80}ms`
          : undefined,
        boxShadow:
          revealed && (rot.x !== 0 || rot.y !== 0)
            ? "0 35px 80px -30px rgba(255,169,77,0.5), 0 0 0 1px rgba(255,169,77,0.3)"
            : undefined,
      }}
    >
      <div className="relative w-full aspect-[460/215] overflow-hidden">
        {imgOk ? (
          <img
            src={game.image}
            alt={game.name}
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${game.gradient} flex items-center justify-center`}
          >
            <span className="font-display text-3xl font-bold text-ink/70 text-center px-6">
              {game.name}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-space via-space/40 to-transparent" />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,169,77,0.55) 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-4 p-7">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-ink-dim">
            {game.category === "PC"
              ? "PC Игры"
              : game.category === "Mobile"
              ? "Мобильные"
              : "Консоли"}
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold text-ink leading-tight">
          {game.name}
        </h3>

        <div className="flex items-end justify-between mt-1">
          <div className="flex flex-col">
            <span className="text-xs text-ink-dim">от</span>
            <span className="font-display text-3xl font-bold text-electric">
              {game.price}₽
            </span>
          </div>
          <span className="text-sm text-ink-muted group-hover:text-electric transition-colors">
            Купить →
          </span>
        </div>
      </div>
    </button>
  );
}