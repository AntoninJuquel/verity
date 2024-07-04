import { Shape } from "./Shape";
import { Statue } from "./Statue";

export type Trade = [Shape, Shape];

export function findTrade(statues: Statue[]) {
  for (let i = 0; i < statues.length; i++) {
    for (let j = 0; j < statues.length; j++) {
      if (i !== j && statues[i].canTrade(statues[j])) {
        return [i, j];
      }
    }
  }

  return [];
}
