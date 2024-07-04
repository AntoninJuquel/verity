import { None, Shape } from "@/models/Shape";
import { ShapeImage } from "./ShapeImage";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type CalloutsProps = {
  title: string;
  shapes: Shape[];
  value: Shape;
  onChange: (shape: Shape) => void;
  availableShapes: Shape[];
};

export function Callouts({
  title,
  shapes,
  value,
  onChange,
  availableShapes,
}: CalloutsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value.name}
        onValueChange={(newValue) => {
          const shape = shapes.find((shape) => shape.name === newValue);
          onChange(shape || None);
        }}
      >
        {shapes.map((shape) => (
          <ToggleGroupItem
            key={shape.name}
            value={shape.name}
            aria-label={`Toggle ${shape.name}`}
            className="h-fit py-3"
            disabled={
              !availableShapes.find(
                (availableShape) => availableShape.name === shape.name,
              ) && shape.name !== value.name
            }
          >
            <ShapeImage shape={shape} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
