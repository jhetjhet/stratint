type Stage = "idle" | "step1-running" | "step1-done" | "step2-running" | "step2-done";

export function StageIndicator({ stage }: { stage: Stage }) {
  const steps = [
    {
      key: "upload",
      label: "Upload References",
      done: stage !== "idle",
      active: stage === "idle",
    },
    {
      key: "step1",
      label: "Step 1 · SOAP + 3HM",
      done: stage === "step1-done" || stage === "step2-running" || stage === "step2-done",
      active: stage === "step1-running",
    },
    {
      key: "step2",
      label: "Step 2 · Balanced Scorecard",
      done: stage === "step2-done",
      active: stage === "step2-running",
    },
  ];

  return (
    <ol className="flex items-center gap-3 text-xs">
      {steps.map((s, i) => (
        <li key={s.key} className="flex items-center gap-3">
          <div
            className={[
              "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold transition",
              s.done
                ? "border-[#C8A24B] bg-[#C8A24B] text-white"
                : s.active
                  ? "border-[#C8A24B] bg-white text-[#0E2547] animate-pulse"
                  : "border-[#1B3A6B]/30 bg-white text-[#1B3A6B]/50",
            ].join(" ")}
          >
            {s.done ? "✓" : i + 1}
          </div>
          <span
            className={[
              "font-medium uppercase tracking-wider",
              s.done || s.active ? "text-[#0E2547]" : "text-slate-400",
            ].join(" ")}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <span className="mx-1 h-px w-8 bg-[#1B3A6B]/20" />
          )}
        </li>
      ))}
    </ol>
  );
}
