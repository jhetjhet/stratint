import type { SOAP } from "@/lib/strategy/types";
import { Card, Section } from "./Section";

export function SoapView({ soap }: { soap: SOAP }) {
  return (
    <Section
      eyebrow="Framework 01"
      title="Strategy On A Page"
      description="Vision, mission, goals and objectives synthesised from the uploaded company and strategy references."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Vision" accent>
          {soap.vision}
        </Card>
        <Card title="Mission" accent>
          {soap.mission}
        </Card>
        <Card title="Goals">
          <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-[#C8A24B]">
            {soap.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ol>
        </Card>
        <Card title="Objectives">
          <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-[#C8A24B]">
            {soap.objectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ol>
        </Card>
      </div>
    </Section>
  );
}
