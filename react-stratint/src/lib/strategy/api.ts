import type { StepOneResult, StepTwoResult } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function generateStepOne(
  companyDoc: File,
  strategyDoc: File
): Promise<StepOneResult> {
  const form = new FormData();
  form.append("company_file", companyDoc);
  form.append("strategy_file", strategyDoc);

  const res = await fetch(`${API_BASE}/strategy/step1`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    let msg = "Failed to generate SOAP + 3HM.";
    try {
      const data = await res.json();
      msg = data.detail || msg;
    } catch {}
    throw new Error(msg);
  }
  return await res.json();
}

export async function generateStepTwo(
  stepOne: StepOneResult
): Promise<StepTwoResult> {
  const res = await fetch(`${API_BASE}/strategy/step2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stepOne),
  });

  if (!res.ok) {
    let msg = "Failed to generate Balanced Scorecard.";
    try {
      const data = await res.json();
      msg = data.detail || msg;
    } catch {}
    throw new Error(msg);
  }
  return await res.json();
}
