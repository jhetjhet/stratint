import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileDrop } from "@/components/strategy/FileDrop";
import { SoapView } from "@/components/strategy/SoapView";
import { HorizonView } from "@/components/strategy/HorizonView";
import { BscView } from "@/components/strategy/BscView";
import { StageIndicator } from "@/components/strategy/StageIndicator";
import {
  generateStepOne,
  generateStepTwo,
} from "@/lib/strategy/api";
import type {
  StepOneResult,
  StepTwoResult,
} from "@/lib/strategy/types";

export const Route = createFileRoute("/")({
  component: Index,
});

type Stage =
  | "idle"
  | "step1-running"
  | "step1-done"
  | "step2-running"
  | "step2-done";

function Index() {
  const [companyDoc, setCompanyDoc] = useState<File | null>(null);
  const [strategyDoc, setStrategyDoc] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [stepOne, setStepOne] = useState<StepOneResult | null>(null);
  const [stepTwo, setStepTwo] = useState<StepTwoResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canRunStep1 =
    !!companyDoc && !!strategyDoc && stage !== "step1-running";

  const runStep1 = async () => {
    if (!companyDoc || !strategyDoc) return;
    setError(null);
    setStepTwo(null);
    setStage("step1-running");
    try {
      const res = await generateStepOne(companyDoc, strategyDoc);
      setStepOne(res);
      setStage("step1-done");
    } catch (e) {
      setError((e as Error).message);
      setStage("idle");
    }
  };

  const runStep2 = async () => {
    if (!stepOne) return;
    setError(null);
    setStage("step2-running");
    try {
      const res = await generateStepTwo(stepOne);
      setStepTwo(res);
      setStage("step2-done");
    } catch (e) {
      setError((e as Error).message);
      setStage("step1-done");
    }
  };

  const reset = () => {
    setCompanyDoc(null);
    setStrategyDoc(null);
    setStepOne(null);
    setStepTwo(null);
    setStage("idle");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-slate-900">
      {/* Top bar */}
      <header className="border-b border-[#1B3A6B]/15 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0E2547]">
              <div className="h-3 w-3 rotate-45 bg-[#C8A24B]" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-[#0E2547]">
                AXIS · Strategy Intelligence
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Two-step AI pipeline
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <StageIndicator stage={stage} />
          </div>
        </div>
      </header>

      {/* Hero / Input */}
      <section className="border-b border-[#1B3A6B]/10 bg-gradient-to-b from-white to-[#FAFAF7]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A24B]">
                Strategy Pack Generator
              </div>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#0E2547]">
                Two-step AI pipeline for boardroom-ready strategy.
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                Upload a company overview and a sector strategy reference. The
                platform generates a complete Strategy Pack Strategy-On-A-Page,
                3-Horizon Model and Balanced Scorecard rendered on page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={runStep1}
                  disabled={!canRunStep1}
                  className="cursor-pointer rounded-md bg-[#0E2547] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15305A] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {stage === "step1-running"
                    ? "Running Step 1…"
                    : "Run Step 1 — Generate SOAP + 3HM"}
                </button>
                {(stepOne || stepTwo) && (
                  <button
                    onClick={reset}
                    className="cursor-pointer rounded-md border border-[#1B3A6B]/25 bg-white px-4 py-2.5 text-sm font-semibold text-[#0E2547] hover:bg-white/60"
                  >
                    Reset
                  </button>
                )}
              </div>
              {error && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <FileDrop
                  label="Company Overview"
                  hint="Background, operations, strategic context."
                  file={companyDoc}
                  onFile={setCompanyDoc}
                  disabled={stage === "step1-running" || stage === "step2-running"}
                />
                <FileDrop
                  label="Strategy Reference"
                  hint="Government or industry-level sector strategy."
                  file={strategyDoc}
                  onFile={setStrategyDoc}
                  disabled={stage === "step1-running" || stage === "step2-running"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Output */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {!stepOne && stage !== "step1-running" && <EmptyState />}

        {stage === "step1-running" && <RunningState label="Generating SOAP + 3-Horizon Model…" />}

        {stepOne && (
          <>
            <SoapView soap={stepOne.soap} />
            <HorizonView data={stepOne.three_horizon_model} />

            {!stepTwo && stage !== "step2-running" && (
              <div className="my-10 flex flex-col items-start gap-3 rounded-xl border border-[#C8A24B]/40 bg-[#FFF9EC] p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A24B]">
                  Step 2 ready
                </div>
                <h3 className="text-xl font-semibold text-[#0E2547]">
                  Cascade strategy into the Balanced Scorecard
                </h3>
                <p className="max-w-2xl text-sm text-slate-600">
                  Step 2 runs a separate AI call using only the Step 1 output —
                  not the source documents — so the BSC SMART actions trace
                  directly back to the SOAP objectives and goals.
                </p>
                <button
                  onClick={runStep2}
                  className="mt-2 rounded-md bg-[#C8A24B] px-5 py-2.5 text-sm font-semibold text-[#0E2547] shadow-sm transition hover:bg-[#B8902F]"
                >
                  Run Step 2 — Generate Balanced Scorecard
                </button>
              </div>
            )}

            {stage === "step2-running" && (
              <RunningState label="Generating Balanced Scorecard from Step 1 output…" />
            )}

            {stepTwo && <BscView balanced_scorecard={stepTwo.balanced_scorecard} />}
          </>
        )}
      </main>

      <footer className="border-t border-[#1B3A6B]/15 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-xs text-slate-500">
          <span>© AXIS Strategy Intelligence</span>
        </div>
      </footer>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-[#1B3A6B]/25 bg-white p-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E2547]/5 text-[#0E2547]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-[#0E2547]">
        Your Strategy Pack will render here
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
        Upload both reference documents and run Step 1 to generate the SOAP and
        3-Horizon Model. Step 2 will then cascade those into the Balanced
        Scorecard.
      </p>
    </div>
  );
}

function RunningState({ label }: { label: string }) {
  return (
    <div className="my-8 flex items-center gap-4 rounded-xl border border-[#1B3A6B]/15 bg-white p-6">
      <div className="relative h-10 w-10">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#C8A24B]/40" />
        <span className="absolute inset-1 rounded-full bg-[#C8A24B]" />
      </div>
      <div>
        <div className="text-sm font-semibold text-[#0E2547]">{label}</div>
        <div className="text-xs text-slate-500">
          Synthesising structured frameworks · do not refresh the page
        </div>
      </div>
    </div>
  );
}
