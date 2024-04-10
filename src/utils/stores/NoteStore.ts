import { create } from "zustand";

interface NoteStore {
  activeNoteId?: string;
  setActiveNoteId: (noteId?: string) => void;
  hasUpdates: boolean;
  setHasUpdates: (hasUpdates: boolean) => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  activeNoteId: undefined,
  setActiveNoteId: (noteId?: string) => {
    set({ activeNoteId: noteId });
  },
  hasUpdates: false,
  setHasUpdates: (hasUpdates: boolean) => {
    set({ hasUpdates });
  },
}));

export default useNoteStore;
