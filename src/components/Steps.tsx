import { useVeritySteps } from "@/lib/verityStore";
import { Statue } from "@/models/Statue";
import { ShapeImage } from "./ShapeImage";

type StepsProps = {
  statue: Statue;
};

export function Steps({ statue }: StepsProps) {
  const steps = useVeritySteps();
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Steps</h2>
      {steps.length === 0 && <p>Select outside callouts to see the steps</p>}
      {steps.map((step, index) =>
        step.statue.name === statue.name ? (
          <div key={index} className="text-sm font-bold">
            {index + 1}
            <ShapeImage shape={step.shape} className="inline" />
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
