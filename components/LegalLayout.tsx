import Link from "next/link";
import { ReactNode } from "react";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="relative z-10 min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ink-muted hover:text-electric transition-colors mb-8 text-sm"
        >
          ← На главную
        </Link>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">
          {title}
        </h1>
        <p className="text-ink-dim text-sm mb-10">Редакция от {updated}</p>

        <div className="prose prose-invert max-w-none flex flex-col gap-6 text-ink-muted leading-relaxed">
          {children}
        </div>
      </div>
    </main>
  );
}