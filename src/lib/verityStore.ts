import { Statue } from "@/models/Statue";
import { getSteps, Step } from "@/models/Step";
import { create } from "zustand";

interface VerityState {
  statues: [Statue, Statue, Statue];
  steps: Step[];
}

interface VerityActions {
  setStatue: (statue: Statue, index: number) => void;
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
        const steps = newStatues.every((statue) => statue.ready)
          ? getSteps(newStatues)
          : [];
        return { statues: newStatues, steps };
      });
    },
  },
}));

export const useVerityActions = () => useVerityStore((state) => state.actions);

export const useVerityStatues = () => useVerityStore((state) => state.statues);

export const useVeritySteps = () => useVerityStore((state) => state.steps);
