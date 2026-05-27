import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-end justify-between gap-6 border-b border-[#1B3A6B]/15 pb-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A24B]">
            {eyebrow}
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-[#0E2547]">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

export function Card({
  title,
  children,
  accent,
}: {
  title: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border bg-white p-5 shadow-sm",
        accent ? "border-[#C8A24B]/60" : "border-[#1B3A6B]/15",
      ].join(" ")}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={[
            "h-2 w-2 rounded-full",
            accent ? "bg-[#C8A24B]" : "bg-[#1B3A6B]",
          ].join(" ")}
        />
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E2547]">
          {title}
        </h3>
      </div>
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}
