import { Combination } from "./Combination";

export class Shape {
  private _name: string;
  private _combination: Combination;
  private _key: string;

  constructor(name: string, combination: Combination, key: string) {
    this._name = name;
    this._combination = combination;
    this._key = key;
  }

  get name(): string {
    return this._name;
  }

  get combination(): Combination {
    return this._combination;
  }

  get dupe(): Combination {
    return [
      this.combination[0] && !this.combination[1] && !this.combination[2],
      !this.combination[0] && this.combination[1] && !this.combination[2],
      !this.combination[0] && !this.combination[1] && this.combination[2],
    ];
  }

  get key(): string {
    return this._key;
  }
}

export const None = new Shape("none", [false, false, false], "");
export const Circle = new Shape("circle", [true, false, false], "c");
export const Square = new Shape("square", [false, true, false], "s");
export const Triangle = new Shape("triangle", [false, false, true], "t");
export const Cone = new Shape("cone", [true, false, true], "ct"); // combination of circle and triangle
export const Cube = new Shape("cube", [false, true, false], "ss"); // combination of square and square
export const Cylinder = new Shape("cylinder", [true, true, false], "cs"); // combination of circle and square
export const Prism = new Shape("prism", [false, true, true], "st"); // combination of square and triangle
export const Pyramid = new Shape("pyramid", [false, false, true], "tt"); // combination of triangle and triangle
export const Sphere = new Shape("sphere", [true, false, false], "cc"); // combination of circle and circle
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

export function keyToShape(key: string) {
  return (
    shapes.find(
      (shape) =>
        shape.key.toLocaleLowerCase().split("").sort().join("") ===
        key.toLocaleLowerCase().split("").sort().join(""),
    ) || None
  );
}
