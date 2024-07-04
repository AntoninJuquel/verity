import { Shape } from "./Shape";
import { Statue } from "./Statue";
import { findTrade } from "./Trade";

export class Step {
  private _statue: Statue;
  private _shape: Shape;
  private _done: boolean = false;

  constructor(statue: Statue, shape: Shape) {
    this._statue = statue;
    this._shape = shape;
  }

  get statue(): Statue {
    return this._statue;
  }

  get shape(): Shape {
    return this._shape;
  }

  get done(): boolean {
    return this._done;
  }

  set done(value: boolean) {
    this._done = value;
  }
}

export function getSteps(statues: Statue[]): Step[] {
  const steps: Step[] = [];
  while (findTrade(statues).length > 0) {
    const [i, j] = findTrade(statues);
    const [giveI, giveJ] = statues[i].trade(statues[j]);
    steps.push(new Step(statues[i], giveI));
    steps.push(new Step(statues[j], giveJ));
  }
  return steps;
}
