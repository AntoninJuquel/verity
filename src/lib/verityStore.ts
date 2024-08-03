import { Statue } from "@/models/Statue";
import { getSteps, Step } from "@/models/Step";
import { create } from "zustand";
import { logger } from "./logger";

interface VerityState {
  statues: [Statue, Statue, Statue];
  steps: Step[];
}

interface VerityActions {
  setStatue: (statue: Statue, index: number) => void;
  toggleStep: (index: number) => void;
  resetAll: () => void;
}

interface VerityStore extends VerityState {
  actions: VerityActions;
}

const useVerityStore = create<VerityStore>((set) => ({
  statues: [new Statue("left"), new Statue("middle"), new Statue("right")],
  steps: [],
  actions: {
    setStatue: (statue, index) => {
      set((state) => {
        const newStatues = [...state.statues] as [Statue, Statue, Statue];
        newStatues[index] = statue;

        let steps: Step[] = [];

        if (newStatues.every((statue) => statue.ready)) {
          logger.info("statues", newStatues);
          const stopTimer = logger.time("verity solver");
          steps = getSteps(newStatues);
          stopTimer();
          logger.info("steps", steps);
        }

        return { statues: newStatues, steps };
      });
    },
    toggleStep: (index) => {
      set((state) => {
        const newSteps = [...state.steps];
        newSteps[index].done = !newSteps[index].done;
        return { steps: newSteps };
      });
    },
    resetAll: () => {
      set({
        statues: [
          new Statue("left"),
          new Statue("middle"),
          new Statue("right"),
        ],
        steps: [],
      });
    },
  },
}));

export const useVerityActions = () => useVerityStore((state) => state.actions);

export const useVerityStatues = () => useVerityStore((state) => state.statues);

export const useVeritySteps = () => useVerityStore((state) => state.steps);
