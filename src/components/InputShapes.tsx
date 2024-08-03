import { useKey } from "@/hooks/useKey";
import { useVerityActions, useVerityStatues } from "@/lib/verityStore";
import { keyToShape, None } from "@/models/Shape";
import { findIncompleteStatue, Statue } from "@/models/Statue";
import { useState } from "react";

let typeCache = "";

export default function InputShapes() {
  const statues = useVerityStatues();
  const actions = useVerityActions();

  const [keyPressed, setKeyPressed] = useState("");

  function revert() {
    if (typeCache.length > 0) {
      typeCache = "";
      setKeyPressed("");
      return;
    }

    for (let i = statues.length - 1; i >= 0; i--) {
      if (statues[i].startingShape.name !== None.name) {
        const newStatue = new Statue(statues[i].name, statues[i].callout);
        actions.setStatue(newStatue, i);
        return;
      }
    }

    for (let i = statues.length - 1; i >= 0; i--) {
      if (statues[i].callout.name !== None.name) {
        const newStatue = new Statue(statues[i].name);
        actions.setStatue(newStatue, i);
        return;
      }
    }
  }

  function reset() {
    typeCache = "";
    actions.resetAll();
    setKeyPressed("");
  }

  function inputShape(event: KeyboardEvent) {
    typeCache += event.key;
    const statue = findIncompleteStatue(statues);
    if (!statue) {
      return;
    }
    const needsCallout = statue.callout.name === None.name;
    const index = statues.findIndex((s) => s.name === statue.name);
    setKeyPressed(typeCache);
    if (needsCallout) {
      const callout = keyToShape(typeCache);
      if (
        statue
          .availableCalloutShapes(statues)
          .find((shape) => shape.name === callout.name)
      ) {
        const newStatue = new Statue(
          statue.name,
          callout,
          statue.startingShape,
        );
        actions.setStatue(newStatue, index);
      }
      typeCache = "";
    } else if (typeCache.length === 2) {
      const startingShape = keyToShape(typeCache);
      if (
        statue
          .availableStartingShapes(statues)
          .find((shape) => shape.name === startingShape.name)
      ) {
        const newStatue = new Statue(
          statue.name,
          statue.callout,
          startingShape,
        );
        actions.setStatue(newStatue, index);
      }
      typeCache = "";
    }
  }

  useKey("Backspace", revert);
  useKey("Escape", revert);
  useKey("r", reset);
  useKey("c", inputShape);
  useKey("s", inputShape);
  useKey("t", inputShape);

  return (
    <div className="absolute bottom-2 right-2">
      <h2 className="text-2xl font-bold uppercase">{keyPressed}</h2>
    </div>
  );
}
