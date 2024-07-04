import { None, Shape } from "@/models/Shape";

type GoalProps = {
  shape: Shape;
};

function Goal({ shape }: GoalProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Goal</h2>
      {shape.name !== None.name ? (
        <img src={`/verity/${shape.name}.svg`} className="h-10 w-10" />
      ) : (
        "Select callouts to see the goal"
      )}
    </div>
  );
}

export default Goal;
