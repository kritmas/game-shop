import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-space-line bg-[#050505]/60 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Лого + описание */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Logo size={28} />
              <span className="font-display text-xl font-bold text-ink">
                Game<span className="text-electric">Shop</span>
              </span>
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed">
              Пополнение игровых аккаунтов и подарочные карты с гарантией
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="
                  w-10 h-10 rounded-xl border border-space-line
                  flex items-center justify-center text-ink-muted
                  hover:border-electric hover:text-electric
                  transition-colors
                "
              >
                ✈️
              </a>
              <a
                href="https://discord.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="
                  w-10 h-10 rounded-xl border border-space-line
                  flex items-center justify-center text-ink-muted
                  hover:border-electric hover:text-electric
                  transition-colors
                "
              >
                💬
              </a>
              <a
                href="https://vk.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VK"
                className="
                  w-10 h-10 rounded-xl border border-space-line
                  flex items-center justify-center text-ink-muted
                  hover:border-electric hover:text-electric
                  transition-colors
                "
              >
                🅥
              </a>
            </div>
          </div>

          {/* Каталог */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider">
              Каталог
            </h4>
            <Link
              href="/#games"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              PC Игры
            </Link>
            <Link
              href="/#games"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Мобильные
            </Link>
            <Link
              href="/#games"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Консоли
            </Link>
            <Link
              href="/#games"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Gift Cards
            </Link>
          </div>

          {/* Помощь */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider">
              Помощь
            </h4>
            <Link
              href="/#support"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Поддержка
            </Link>
            <Link
              href="/#how"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Как это работает
            </Link>
            <Link
              href="/#faq"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Частые вопросы
            </Link>
            <Link
              href="/refund"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Возврат средств
            </Link>
          </div>

          {/* Связаться */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider">
              Связаться
            </h4>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Telegram
            </a>
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Discord
            </a>
            <a
              href="mailto:support@example.com"
              className="text-ink-muted text-sm hover:text-electric transition-colors w-fit"
            >
              Email
            </a>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-space-line">
          <p className="text-ink-dim text-xs text-center md:text-left">
            © 2026 GameShop. Все права защищены.

          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-ink-dim">
            <Link href="/offer" className="hover:text-electric transition-colors">
              Публичная оферта
            </Link>
            <Link href="/privacy" className="hover:text-electric transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/refund" className="hover:text-electric transition-colors">
              Правила возврата
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}