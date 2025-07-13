import { createStore } from 'kawkab-frontend';

interface VersionState {
  version: string | "v1.0.0";
  setVersion: (version: string) => void;
}

export const useVersionStore = createStore<VersionState>((set) => ({
  version: "v1.0.0",
  setVersion: (version) => set({ version }),
}));
