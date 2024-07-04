import { useVerityActions, useVeritySteps } from "@/lib/verityStore";
import { Statue } from "@/models/Statue";
import { ShapeImage } from "./ShapeImage";
import { Button } from "./ui/button";

type StepsProps = {
  statue: Statue;
};

export function Steps({ statue }: StepsProps) {
  const steps = useVeritySteps();
  const actions = useVerityActions();
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Steps</h2>
      {steps.length === 0 && <p>Select outside callouts to see the steps</p>}
      {steps.map((step, index) =>
        step.statue.name === statue.name ? (
          <div>
            <Button
              key={`${index}-${step.statue.name}-${step.shape.name}`}
              className="text-sm font-bold"
              variant={step.done ? "secondary" : "outline"}
              onClick={() => actions.toggleStep(index)}
              disabled={
                (index > 0 && !steps[index - 1].done) ||
                (index < steps.length - 1 && steps[index + 1].done)
              }
            >
              {index + 1}
              <ShapeImage shape={step.shape} className="inline" />
            </Button>
          </div>
        ) : (
          <p className="h-10" key={index}>
            -
          </p>
        ),
      )}
    </div>
  );
}
