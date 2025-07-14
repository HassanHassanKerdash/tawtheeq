import { defineStore } from 'kawkab';

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

export const useRightSidebarStore = defineStore<RightSidebarState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));