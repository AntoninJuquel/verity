import { Combination } from "./Combination";

export class Shape {
  private _name: string;
  private _combination: Combination;

  constructor(name: string, combination: Combination) {
    this._name = name;
    this._combination = combination;
  }

  get name(): string {
    return this._name;
  }

  get combination(): Combination {
    return this._combination;
  }
}

export const None = new Shape("none", [false, false, false]);
export const Circle = new Shape("circle", [true, false, false]);
export const Square = new Shape("square", [false, true, false]);
export const Triangle = new Shape("triangle", [false, false, true]);
export const Cone = new Shape("cone", [true, false, true]); // combination of circle and triangle
export const Cube = new Shape("cube", [false, true, false]); // combination of square and square
export const Cylinder = new Shape("cylinder", [true, true, false]); // combination of circle and square
export const Prism = new Shape("prism", [false, true, true]); // combination of square and triangle
export const Pyramid = new Shape("pyramid", [false, false, true]); // combination of triangle and triangle
export const Sphere = new Shape("sphere", [true, false, false]); // combination of circle and circle
export const shapes2D = [Circle, Square, Triangle];
export const shapes3D = [Cone, Cube, Cylinder, Prism, Pyramid, Sphere];
export const shapes = [...shapes2D, ...shapes3D];

export function getShape2DByCombination(combination: Combination): Shape {
  return (
    shapes2D.find(
      (shape) =>
        shape.combination[0] === combination[0] &&
        shape.combination[1] === combination[1] &&
        shape.combination[2] === combination[2],
    ) || None
  );
}

export function getShape3DByCombination(combination: Combination): Shape {
  return (
    shapes3D.find(
      (shape) =>
        shape.combination[0] === combination[0] &&
        shape.combination[1] === combination[1] &&
        shape.combination[2] === combination[2],
    ) || None
  );
}
