import {
  getShape2DByCombination,
  getShape3DByCombination,
  None,
  Shape,
  shapes2D,
  shapes3D,
} from "./Shape";
import { Trade } from "./Trade";

export class Statue {
  private _name: string;
  private _callout: Shape;
  private _startingShape: Shape;
  private _currentShape: Shape;

  constructor(
    name: string,
    callout?: Shape,
    startingShape?: Shape,
    currentShape?: Shape,
  ) {
    this._name = name;
    this._callout = callout || None;
    this._startingShape = startingShape || None;
    this._currentShape = currentShape || startingShape || None;
  }

  get name(): string {
    return this._name;
  }

  get callout(): Shape {
    return this._callout;
  }

  get currentShape(): Shape {
    return this._currentShape;
  }

  get startingShape(): Shape {
    return this._startingShape;
  }

  get goal(): Shape {
    return getShape3DByCombination([
      !this.callout.combination[0],
      !this.callout.combination[1],
      !this.callout.combination[2],
    ]);
  }

  get done(): boolean {
    return (
      this.currentShape.combination[0] === this.goal.combination[0] &&
      this.currentShape.combination[1] === this.goal.combination[1] &&
      this.currentShape.combination[2] === this.goal.combination[2]
    );
  }

  get toGive(): Shape {
    return getShape3DByCombination([
      (this.currentShape.combination[0] && !this.goal.combination[0]) ||
        (this.currentShape.combination[0] && this.currentShape.dupe[0]),
      (this.currentShape.combination[1] && !this.goal.combination[1]) ||
        (this.currentShape.combination[1] && this.currentShape.dupe[1]),
      (this.currentShape.combination[2] && !this.goal.combination[2]) ||
        (this.currentShape.combination[2] && this.currentShape.dupe[2]),
    ]);
  }

  get toTake(): Shape {
    return getShape3DByCombination([
      !this.currentShape.combination[0] && this.goal.combination[0],
      !this.currentShape.combination[1] && this.goal.combination[1],
      !this.currentShape.combination[2] && this.goal.combination[2],
    ]);
  }

  get ready(): boolean {
    return (
      this.callout.name !== None.name &&
      this.startingShape.name !== None.name &&
      this.goal.name !== None.name
    );
  }

  restart(): void {
    this._currentShape = this.startingShape;
  }

  availableCalloutShapes(statues: [Statue, Statue, Statue]): Shape[] {
    const availableCombination = [
      !statues[0].callout.combination[0] &&
        !statues[1].callout.combination[0] &&
        !statues[2].callout.combination[0],
      !statues[0].callout.combination[1] &&
        !statues[1].callout.combination[1] &&
        !statues[2].callout.combination[1],
      !statues[0].callout.combination[2] &&
        !statues[1].callout.combination[2] &&
        !statues[2].callout.combination[2],
    ];
    return shapes2D.filter(
      (shape) =>
        (shape.combination[0] && availableCombination[0]) ||
        (shape.combination[1] && availableCombination[1]) ||
        (shape.combination[2] && availableCombination[2]),
    );
  }

  availableStartingShapes(statues: [Statue, Statue, Statue]): Shape[] {
    const availableCombination = [
      (!statues[0].startingShape.combination[0] ||
        !statues[1].startingShape.combination[0]) &&
        (!statues[1].startingShape.combination[0] ||
          !statues[2].startingShape.combination[0]) &&
        (!statues[0].startingShape.combination[0] ||
          !statues[2].startingShape.combination[0]) &&
        !statues[0].startingShape.dupe[0] &&
        !statues[1].startingShape.dupe[0] &&
        !statues[2].startingShape.dupe[0],
      (!statues[0].startingShape.combination[1] ||
        !statues[1].startingShape.combination[1]) &&
        (!statues[1].startingShape.combination[1] ||
          !statues[2].startingShape.combination[1]) &&
        (!statues[0].startingShape.combination[1] ||
          !statues[2].startingShape.combination[1]) &&
        !statues[0].startingShape.dupe[1] &&
        !statues[1].startingShape.dupe[1] &&
        !statues[2].startingShape.dupe[1],
      (!statues[0].startingShape.combination[2] ||
        !statues[1].startingShape.combination[2]) &&
        (!statues[1].startingShape.combination[2] ||
          !statues[2].startingShape.combination[2]) &&
        (!statues[0].startingShape.combination[2] ||
          !statues[2].startingShape.combination[2]) &&
        !statues[0].startingShape.dupe[2] &&
        !statues[1].startingShape.dupe[2] &&
        !statues[2].startingShape.dupe[2],
    ];
    return shapes3D.filter(
      (shape) =>
        (shape.combination[0] &&
          availableCombination[0] &&
          shape.combination[1] &&
          availableCombination[1]) ||
        (shape.combination[1] &&
          availableCombination[1] &&
          shape.combination[2] &&
          availableCombination[2]) ||
        (shape.combination[0] &&
          availableCombination[0] &&
          shape.combination[2] &&
          availableCombination[2]) ||
        (shape.combination[0] &&
          !shape.combination[1] &&
          !shape.combination[2] &&
          availableCombination[0] &&
          !statues[0].startingShape.combination[0] &&
          !statues[1].startingShape.combination[0] &&
          !statues[2].startingShape.combination[0]) ||
        (!shape.combination[0] &&
          shape.combination[1] &&
          !shape.combination[2] &&
          availableCombination[1] &&
          !statues[0].startingShape.combination[1] &&
          !statues[1].startingShape.combination[1] &&
          !statues[2].startingShape.combination[1]) ||
        (!shape.combination[0] &&
          !shape.combination[1] &&
          shape.combination[2] &&
          availableCombination[2] &&
          !statues[0].startingShape.combination[2] &&
          !statues[1].startingShape.combination[2] &&
          !statues[2].startingShape.combination[2]),
    );
  }

  canGive(statue: Statue): Shape {
    return getShape3DByCombination([
      this.toGive.combination[0] && statue.toTake.combination[0],
      this.toGive.combination[1] && statue.toTake.combination[1],
      this.toGive.combination[2] && statue.toTake.combination[2],
    ]);
  }

  give(shape: Shape): void {
    this._currentShape = getShape3DByCombination([
      this.currentShape.combination[0] || shape.combination[0],
      this.currentShape.combination[1] || shape.combination[1],
      this.currentShape.combination[2] || shape.combination[2],
    ]);
  }

  canTake(statue: Statue): Shape {
    return getShape3DByCombination([
      this.toTake.combination[0] && statue.toGive.combination[0],
      this.toTake.combination[1] && statue.toGive.combination[1],
      this.toTake.combination[2] && statue.toGive.combination[2],
    ]);
  }

  take(shape: Shape): void {
    this._currentShape = getShape3DByCombination([
      (this.currentShape.combination[0] && !shape.combination[0]) ||
        (this.currentShape.combination[0] && this.currentShape.dupe[0]),
      (this.currentShape.combination[1] && !shape.combination[1]) ||
        (this.currentShape.combination[1] && this.currentShape.dupe[1]),
      (this.currentShape.combination[2] && !shape.combination[2]) ||
        (this.currentShape.combination[2] && this.currentShape.dupe[2]),
    ]);
  }

  toTrade(statue: Statue): Trade {
    if (
      this.canGive(statue).combination.includes(true) ||
      statue.canGive(this).combination.includes(true)
    ) {
      return [this.toGive, statue.toGive];
    }

    return [None, None];
  }

  canTrade(statue: Statue): boolean {
    return this.toTrade(statue)
      .flatMap((trade) => trade.combination)
      .includes(true);
  }

  trade(statue: Statue): Trade {
    const [tradeToGive, otherToGive] = this.toTrade(statue);

    this.take(tradeToGive);
    this.give(otherToGive);

    statue.take(otherToGive);
    statue.give(tradeToGive);

    return [
      getShape2DByCombination(tradeToGive.combination),
      getShape2DByCombination(otherToGive.combination),
    ];
  }
}
