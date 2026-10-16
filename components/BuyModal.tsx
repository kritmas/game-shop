"use client";

import { useEffect, useState } from "react";

type Game = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  gradient: string;
};

type Props = {
  game: Game | null;
  onClose: () => void;
};

type Payment = "card" | "sbp";

export default function BuyModal({ game, onClose }: Props) {
  const [payment, setPayment] = useState<Payment>("card");
  const [amount, setAmount] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [acceptOffer, setAcceptOffer] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Инициализация полей при открытии
  useEffect(() => {
    if (!game) return;
    setAmount("");
    setLogin("");
    setEmail("");
    setCaptchaAnswer("");
    setAcceptOffer(false);
    setAcceptPrivacy(false);
    setSubmitting(false);
    // Простая капча — случайные числа 1–20
    setCaptchaA(Math.floor(Math.random() * 20) + 1);
    setCaptchaB(Math.floor(Math.random() * 20) + 1);
  }, [game]);

  // Блокировка скролла фона при открытой модалке
  useEffect(() => {
    if (game) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [game]);

  // Закрытие по Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!game) return null;

  const captchaCorrect = Number(captchaAnswer) === captchaA + captchaB;
  const canSubmit =
    amount.trim() !== "" &&
    login.trim() !== "" &&
    email.trim() !== "" &&
    captchaCorrect &&
    acceptOffer &&
    acceptPrivacy &&
    !submitting;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    // Тут потом будет запрос на бэкенд
    setTimeout(() => {
      setSubmitting(false);
      alert(
        `Заявка отправлена!\n\nИгра: ${game.name}\nСумма: ${amount}₽\nЛогин: ${login}\nEmail: ${email}\nОплата: ${
          payment === "card" ? "Карта" : "СБП"
        }`
      );
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />

      {/* Сама модалка */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-md
          bg-[#0F0D0A] border border-[#2A231A]
          rounded-3xl
          max-h-[92vh] overflow-y-auto
          animate-[modalIn_280ms_cubic-bezier(0.22,1,0.36,1)]
        "
      >
        {/* Шапка модалки */}
        <div className="sticky top-0 z-10 flex items-center gap-4 p-5 border-b border-[#2A231A] bg-[#0F0D0A]">
          <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-[#2A231A]">
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-bold text-[#F5F0E8] truncate">
              {game.name}
            </h3>
            <p className="text-xs text-[#A89C8A] uppercase tracking-wider">
              {game.category === "PC"
                ? "PC Игры"
                : game.category === "Mobile"
                ? "Мобильные"
                : "Консоли"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="
              w-10 h-10 rounded-full flex items-center justify-center
              border border-[#2A231A] text-[#A89C8A]
              hover:border-[#FFA94D] hover:text-[#FFA94D]
              transition-colors
            "
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        {/* Тело модалки */}
        <div className="p-5 flex flex-col gap-5">
          {/* Способ оплаты */}
          <div className="flex gap-2 p-1 rounded-full bg-[#050505] border border-[#2A231A]">
            <button
              onClick={() => setPayment("card")}
              className={`
                flex-1 py-2.5 rounded-full text-sm font-medium transition-all
                ${
                  payment === "card"
                    ? "bg-gradient-to-r from-[#FFA94D] to-[#FF6B35] text-[#0F0D0A]"
                    : "text-[#A89C8A] hover:text-[#F5F0E8]"
                }
              `}
            >
              🇷🇺 Картой
            </button>
            <button
              onClick={() => setPayment("sbp")}
              className={`
                flex-1 py-2.5 rounded-full text-sm font-medium transition-all
                ${
                  payment === "sbp"
                    ? "bg-gradient-to-r from-[#FFA94D] to-[#FF6B35] text-[#0F0D0A]"
                    : "text-[#A89C8A] hover:text-[#F5F0E8]"
                }
              `}
            >
              ⚡ СБП
            </button>
          </div>

          {/* Своя сумма */}
          <Field label="Своя сумма (₽)">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
              className="input-base"
            />
          </Field>

          {/* Логин */}
          <Field label={game.category === "PC" ? "Логин Steam" : "ID аккаунта"}>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder={game.category === "PC" ? "steam_login" : "player_id"}
              className="input-base"
            />
          </Field>

          {/* Email */}
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@mail.com"
              className="input-base"
            />
          </Field>

          {/* Капча */}
          <div className="rounded-2xl border border-[#2A231A] bg-[#050505] p-4">
            <p className="text-xs text-[#A89C8A] mb-3">
              Подтвердите что вы не робот
            </p>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#FFA94D]/15 to-[#FF6B35]/10 border border-[#FFA94D]/30 font-display text-lg font-bold text-[#FFA94D]">
                {captchaA} + {captchaB}
              </div>
              <span className="text-[#6A6055]">=</span>
              <input
                type="text"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="?"
                className="input-base flex-1"
              />
            </div>
          </div>

          {/* Чекбоксы */}
          <div className="rounded-2xl border border-[#2A231A] bg-[#050505] p-4 flex flex-col gap-3">
            <Checkbox
              checked={acceptOffer}
              onChange={setAcceptOffer}
              label={
                <>
                  Я принимаю условия{" "}
                  <a href="#" className="text-[#FFA94D] underline">
                    публичной оферты
                  </a>
                </>
              }
            />
            <Checkbox
              checked={acceptPrivacy}
              onChange={setAcceptPrivacy}
              label={
                <>
                  Я даю согласие на{" "}
                  <a href="#" className="text-[#FFA94D] underline">
                    обработку персональных данных
                  </a>
                </>
              }
            />
          </div>

          {/* Кнопка */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`
              w-full py-4 rounded-2xl font-display font-bold text-lg
              transition-all duration-200
              ${
                canSubmit
                  ? "bg-gradient-to-r from-[#FFA94D] to-[#FF6B35] text-[#0F0D0A] shadow-[0_0_40px_rgba(255,169,77,0.4)] hover:shadow-[0_0_60px_rgba(255,169,77,0.6)]"
                  : "bg-[#1A1510] text-[#6A6055] cursor-not-allowed border border-[#2A231A]"
              }
            `}
          >
            {submitting ? "Отправка..." : "Оплатить"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Вспомогательные компоненты ─── */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-[#F5F0E8] font-medium">{label}</label>
      {children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <span
        className={`
          flex-shrink-0 w-5 h-5 rounded-md border transition-all flex items-center justify-center
          ${
            checked
              ? "bg-gradient-to-br from-[#FFA94D] to-[#FF6B35] border-[#FFA94D]"
              : "border-[#2A231A] bg-[#0F0D0A]"
          }
        `}
      >
        {checked && (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="#0F0D0A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="text-sm text-[#A89C8A] leading-snug">{label}</span>
    </label>
  );
}