import { useVerityActions, useVeritySteps } from "@/lib/verityStore";
import { Statue } from "@/models/Statue";
import { Step } from "@/models/Step";
import { ShapeImage } from "./ShapeImage";
import { Button } from "./ui/button";

type StepsProps = {
  statue: Statue;
};

function pairedStepHasStatue(pairedStep: Step[], statue: Statue) {
  return pairedStep.some((step) => step.statue.name === statue.name);
}

export function Steps({ statue }: StepsProps) {
  const steps = useVeritySteps();
  const actions = useVerityActions();

  const pairedSteps = steps.reduce(
    (acc, _, i) => (i % 2 === 0 ? [...acc, [steps[i], steps[i + 1]]] : acc),
    [] as Step[][],
  );

  function PairedStepRenderer(pairedStep: Step[], pairIndex: number) {
    if (pairedStepHasStatue(pairedStep, statue)) {
      return pairedStep.map((step, stepIndex) => {
        const index = 2 * pairIndex + stepIndex;
        if (step.statue.name === statue.name) {
          return (
            <div key={`${pairIndex}-${statue.name}`}>
              <Button
                className="text-sm font-bold w-full"
                variant={step.done ? "secondary" : "outline"}
                onClick={() => actions.toggleStep(index)}
              >
                {pairIndex + 1}
                <ShapeImage shape={step.shape} className="inline" />
              </Button>
            </div>
          );
        }

        return null;
      });
    }

    return (
      <p className="h-10 content-center" key={`${pairIndex}-${statue.name}`}>
        -
      </p>
    );
  }

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-2xl font-bold">Steps</h2>
      {steps.length === 0 && <p>Select outside callouts to see the steps</p>}
      {pairedSteps.map(PairedStepRenderer)}
    </div>
  );
}
