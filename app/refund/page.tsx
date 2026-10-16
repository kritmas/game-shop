import LegalLayout from "@/components/LegalLayout";

export default function RefundPage() {
  return (
    <LegalLayout title="Правила возврата" updated="16 октября 2026">
      <h2 className="font-display text-2xl font-bold text-ink">
        1. Основания для возврата
      </h2>
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>Зачисление не произошло в течение 24 часов</li>
        <li>Заявка оплачена, но не исполнена по вине сервиса</li>
        <li>Технический сбой при оплате</li>
        <li>Списание с карты с ошибочной суммой</li>
      </ul>

      <h2 className="font-display text-2xl font-bold text-ink mt-6">
        2. Когда возврат невозможен
      </h2>
      <p>
        После зачисления средств на игровой аккаунт возврат регулируется
        правилами платформы (Valve, издателя игры). Зачисленная игровая валюта
        возврату не подлежит.
      </p>

      <h2 className="font-display text-2xl font-bold text-ink mt-6">
        3. Как оформить возврат
      </h2>
      <p>
        Напишите в поддержку с номером заявки и адресом email, указанным при
        оформлении. Заявка на возврат рассматривается в течение 10 рабочих
        дней. Возврат осуществляется на тот же способ оплаты.
      </p>

      <p className="mt-8 text-ink-dim text-sm">
        Это демонстрационный текст. Для продакшена используйте выверенный
        юридический документ.
      </p>
    </LegalLayout>
  );
}