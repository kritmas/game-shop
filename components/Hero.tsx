export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Верхний бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-space-line bg-space-soft/50 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-sm text-ink-muted">
            Работаем 24/7 · Среднее время зачисления — 7 минут
          </span>
        </div>

        {/* Главный заголовок */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-ink">
          Пополняй{" "}
          <span className="bg-gradient-to-r from-electric to-emerald bg-clip-text text-transparent">
            игровые аккаунты
          </span>{" "}
          за минуты
        </h1>

        {/* Подзаголовок */}
        <p className="text-lg md:text-xl text-ink-muted max-w-2xl">
          Игровая валюта, подарочные карты и пополнение кошельков — по выгодным
          ценам, с гарантией и мгновенной доставкой.
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="#games"
            className="px-8 py-4 rounded-xl bg-electric hover:bg-electric-hover transition-all duration-200 font-medium text-white shadow-glow hover:shadow-[0_0_60px_rgba(124,77,255,0.6)]"
          >
            Выбрать игру
          </a>
          <a
            href="#how"
            className="px-8 py-4 rounded-xl border border-space-line hover:border-electric bg-space-soft/30 backdrop-blur-sm transition-all duration-200 font-medium text-ink"
          >
            Как это работает
          </a>
        </div>
      </div>

      {/* Индикатор скролла внизу */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-ink-dim uppercase tracking-widest">
          Скролл
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-ink-dim to-transparent" />
      </div>
    </section>
  );
}