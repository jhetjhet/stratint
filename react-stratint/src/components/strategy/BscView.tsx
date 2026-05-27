import { useState } from "react";
import type { BalancedScorecard, BSCPerspectiveBlock, BSCRow } from "@/lib/strategy/types";
import { Section } from "./Section";

const BLOCK_KEYS: (keyof BalancedScorecard)[] = [
  "financial",
  "customers_partners",
  "systems_processes",
  "learning_growth",
];

const BLOCK_LABELS: Record<keyof BalancedScorecard, string> = {
  financial: "Financial",
  customers_partners: "Customers & Partners",
  systems_processes: "Systems & Processes",
  learning_growth: "Learning & Growth",
};

export function BscView({
  balanced_scorecard,
}: {
  balanced_scorecard: BalancedScorecard;
}) {
  const [state, setState] = useState<BalancedScorecard>(balanced_scorecard);

  const update = (
    key: keyof BalancedScorecard,
    idx: number,
    patch: Partial<BSCRow>,
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        rows: prev[key].rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)),
      },
    }));
  };

  return (
    <Section
      eyebrow="Framework 03"
      title="Balanced Scorecard"
      description="SMART actions traced directly from the Strategy-On-A-Page. RAG Status and Lead are left blank for human judgement."
    >
      <div className="space-y-6">
        {BLOCK_KEYS.map((key) => {
          const block: BSCPerspectiveBlock = state[key];
          return (
            <div
              key={key}
              className="overflow-hidden rounded-xl border border-[#1B3A6B]/15 bg-white"
            >
              <div className="flex items-center justify-between bg-[#F4F1E8] px-5 py-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E2547]">
                  {block.perspective}
                </h3>
                <span className="text-xs text-slate-500">
                  {block.rows.length} objectives
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0E2547] text-left text-xs uppercase tracking-wider text-white">
                      <th className="px-4 py-2.5 font-semibold w-[26%]">
                        Objective
                      </th>
                      <th className="px-4 py-2.5 font-semibold">
                        Performance Measures & Target
                      </th>
                      <th className="px-4 py-2.5 font-semibold w-[120px]">
                        RAG
                      </th>
                      <th className="px-4 py-2.5 font-semibold w-[160px]">
                        Lead
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-[#1B3A6B]/10 align-top"
                      >
                        <td className="px-4 py-3 font-medium text-[#0E2547]">
                          {row.objective}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {row.performance_measure_target}
                        </td>
                        <td className="px-4 py-3">
                          <RagPicker
                            value={row.rag_status}
                            onChange={(v) => update(key, idx, { rag_status: v })}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            value={row.lead}
                            onChange={(e) =>
                              update(key, idx, { lead: e.target.value })
                            }
                            placeholder="Assign…"
                            className="w-full rounded-md border border-[#1B3A6B]/20 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-[#C8A24B]"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function RagPicker({
  value,
  onChange,
}: {
  value: BSCRow["rag_status"];
  onChange: (v: BSCRow["rag_status"]) => void;
}) {
  const opts: { v: Exclude<BSCRow["rag_status"], "">; cls: string; label: string }[] = [
    { v: "red", cls: "bg-red-500", label: "R" },
    { v: "amber", cls: "bg-amber-400", label: "A" },
    { v: "green", cls: "bg-emerald-500", label: "G" },
  ];
  return (
    <div className="flex items-center gap-1">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(value === o.v ? "" : o.v)}
          className={[
            "h-7 w-7 rounded-full text-[10px] font-bold text-white transition",
            o.cls,
            value === o.v
              ? "ring-2 ring-offset-1 ring-[#0E2547]"
              : "opacity-40 hover:opacity-100",
          ].join(" ")}
          aria-label={o.v}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
