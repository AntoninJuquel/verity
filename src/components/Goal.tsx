import { None, Shape } from "@/models/Shape";
import { ShapeImage } from "./ShapeImage";

type GoalProps = {
  shape: Shape;
};

export function Goal({ shape }: GoalProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Goal</h2>
      {shape.name !== None.name ? (
        <ShapeImage shape={shape} />
      ) : (
        "Select inside callouts to see the goal"
      )}
    </div>
  );
}
