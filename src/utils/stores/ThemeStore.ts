import { create } from "zustand";

interface ThemeStore {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  mode: "light",
  setMode: (mode: "light" | "dark") => {
    set({ mode });
  },
}));

export default useThemeStore;
