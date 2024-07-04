import { cn } from "@/lib/utils";
import { Shape } from "@/models/Shape";

type ShapeProps = {
  shape: Shape;
  className?: string;
};

export function ShapeImage({ shape, className }: ShapeProps) {
  return (
    <img
      src={`/verity/${shape.name}.svg`}
      className={cn("h-10 w-10 dark:invert", className)}
    />
  );
}
