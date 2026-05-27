import type { ThreeHorizon } from "@/lib/strategy/types";
import { Section } from "./Section";

export function HorizonView({ data }: { data: ThreeHorizon }) {
  const cols = [
    { label: "12 Months", tag: "Horizon 1 · Run", items: data.goals_12_months },
    { label: "24 Months", tag: "Horizon 2 · Build", items: data.goals_24_months },
    { label: "36 Months", tag: "Horizon 3 · Transform", items: data.goals_36_months },
  ];

  return (
    <Section
      eyebrow="Framework 02"
      title="3-Horizon Model"
      description="Short, mid and long-term priorities sequenced from the established strategic direction."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {cols.map((c, idx) => (
          <div
            key={c.label}
            className="relative overflow-hidden rounded-xl border border-[#1B3A6B]/15 bg-white"
          >
            <div className="flex items-center justify-between bg-[#0E2547] px-5 py-3 text-white">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C8A24B]">
                  {c.tag}
                </div>
                <div className="text-lg font-semibold">{c.label}</div>
              </div>
              <div className="text-3xl font-light text-white/30">
                0{idx + 1}
              </div>
            </div>
            <ul className="divide-y divide-[#1B3A6B]/10">
              {c.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 px-5 py-3 text-sm text-slate-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A24B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
