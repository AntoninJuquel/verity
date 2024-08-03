import { useVerityActions, useVerityStatues } from "@/lib/verityStore";
import { Shape, shapes2D, shapes3D } from "@/models/Shape";
import { Statue } from "@/models/Statue";
import { RotateCcw } from "lucide-react";
import { Callouts } from "./Callouts";
import { Goal } from "./Goal";
import { Steps } from "./Steps";
import { Button } from "./ui/button";

type StatueComponentProps = {
  index: number;
  statue: Statue;
};

export function StatueComponent({ index, statue }: StatueComponentProps) {
  const statues = useVerityStatues();
  const actions = useVerityActions();

  function onChangeInside(callout: Shape) {
    const newStatue = new Statue(statue.name, callout, statue.startingShape);
    actions.setStatue(newStatue, index);
  }

  function onChangeOutside(startingShape: Shape) {
    const newStatue = new Statue(statue.name, statue.callout, startingShape);
    actions.setStatue(newStatue, index);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold capitalize">{statue.name}</h2>
      <Button
        size="icon"
        variant="destructive"
        title="Reset"
        onClick={() => actions.setStatue(new Statue(statue.name), index)}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Callouts
        title="Inside callouts"
        shapes={shapes2D}
        value={statue.callout}
        onChange={onChangeInside}
        availableShapes={statue.availableCalloutShapes(statues)}
      />
      <Callouts
        title="Outside callouts"
        shapes={shapes3D}
        value={statue.startingShape}
        onChange={onChangeOutside}
        availableShapes={statue.availableStartingShapes(statues)}
      />
      <Steps statue={statue} />
      <Goal shape={statue.goal} />
    </div>
  );
}
