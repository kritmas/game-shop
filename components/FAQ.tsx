"use client";

import { useRef, useState, useEffect } from "react";

type QA = {
  q: string;
  a: string;
};

const faqs: QA[] = [
  {
    q: "Какими способами можно оплатить?",
    a: "Банковской картой (Visa, Mastercard, МИР), через СБП или криптовалютой. Комиссия отображается до перехода к оплате — никаких скрытых сборов.",
  },
  {
    q: "Как быстро зачисляются средства?",
    a: "В большинстве случаев — в течение 5–15 минут после подтверждения оплаты. Предельный срок исполнения — 24 часа. Статус заявки всегда можно отследить.",
  },
  {
    q: "Нужно ли передавать пароль от аккаунта?",
    a: "Нет и ещё раз нет. Мы никогда не запрашиваем пароли, коды Steam Guard и доступ к почте. Для зачисления достаточно публичного логина или ID игрового аккаунта.",
  },
  {
    q: "Что делать, если я указал неверный логин?",
    a: "Свяжитесь с поддержкой сразу — если средства ещё не зачислены, мы остановим заявку и вернём деньги. Если зачисление уже произошло на чужой аккаунт, к сожалению, вернуть нельзя.",
  },
  {
    q: "Можно ли вернуть деньги?",
    a: "Да, если зачисление не произошло или товар не соответствует. Заявка на возврат рассматривается в течение 10 рабочих дней. Возврат — на тот же способ оплаты, которым вы платили.",
  },
  {
    q: "Работаете ли вы с иностранными картами?",
    a: "Да, поддерживаем карты зарубежных банков. Для пользователей из РФ доступна оплата через СБП. Все транзакции проходят через защищённое соединение.",
  },
  {
    q: "Есть ли минимальная сумма пополнения?",
    a: "Минимальная сумма зависит от игры — обычно от 100–150 рублей. В карточке игры указано «от XXX₽» — это и есть минимальный номинал.",
  },
  {
    q: "Что если игра временно недоступна?",
    a: "Мы приносим извинения и стараемся восстановить работу как можно скорее. Если заявка уже оплачена — вы получите полный возврат или сможете заменить её на другую игру.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="faq" className="relative w-full py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-12 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Частые вопросы
          </h2>
          <p className="text-ink-muted max-w-xl">
            Если не нашли ответ — напишите в поддержку, ответим за пару минут
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <FaqItem
              key={i}
              qa={f}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              revealed={revealed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  qa,
  index,
  isOpen,
  onToggle,
  revealed,
}: {
  qa: QA;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  revealed: boolean;
}) {
  return (
    <div
      className={`
        rounded-2xl border border-space-line bg-space-soft/40 backdrop-blur-sm
        overflow-hidden transition-all duration-300
        hover:border-electric/50
        ${isOpen ? "border-electric/70 bg-space-soft/70" : ""}
        ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-display text-lg font-bold text-ink pr-4">
          {qa.q}
        </span>
        <span
          className={`
            flex-shrink-0 w-8 h-8 rounded-full border border-space-line
            flex items-center justify-center
            text-electric text-xl font-light
            transition-transform duration-300
            ${isOpen ? "rotate-45 border-electric" : ""}
          `}
        >
          +
        </span>
      </button>
      <div
        className={`
          grid transition-all duration-300 ease-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-ink-muted text-sm leading-relaxed">
            {qa.a}
          </p>
        </div>
      </div>
    </div>
  );
}