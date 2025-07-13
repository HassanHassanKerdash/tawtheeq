import { createStore } from 'kawkab-frontend';

interface RightSidebarItem {
  label: string;
  href: string;
  children?: RightSidebarItem[];
}
export type { RightSidebarItem };

interface RightSidebarState {
  items: RightSidebarItem[];
  setItems: (items: RightSidebarItem[]) => void;
}

export const useRightSidebarStore = createStore<RightSidebarState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));