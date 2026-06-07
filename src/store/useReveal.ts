import { create } from "zustand";
import { GIFT_COUNT } from "@/lib/gifts";

export type Stage = "intro" | "exploring" | "incoming" | "final";

interface RevealState {
  stage: Stage;
  /** ids dos presentes já revelados. */
  opened: Set<string>;
  /** id do presente cujo card está aberto no momento (ou null). */
  activeGift: string | null;

  start: () => void;
  /** Marca o presente como aberto e abre o card. */
  open: (id: string) => void;
  /** Fecha o card; se foi o último presente, revela o presente a caminho. */
  closeCard: () => void;
  /** Avança da tela do presente a caminho pra mensagem final. */
  finish: () => void;
  reset: () => void;

  openedCount: () => number;
  isOpen: (id: string) => boolean;
}

export const useReveal = create<RevealState>((set, get) => ({
  stage: "intro",
  opened: new Set<string>(),
  activeGift: null,

  start: () => set({ stage: "exploring" }),

  open: (id) =>
    set((s) => {
      const opened = new Set(s.opened);
      opened.add(id);
      return { opened, activeGift: id };
    }),

  closeCard: () =>
    set((s) => {
      const allOpen = s.opened.size >= GIFT_COUNT;
      return { activeGift: null, stage: allOpen ? "incoming" : "exploring" };
    }),

  finish: () => set({ stage: "final" }),

  reset: () => set({ stage: "intro", opened: new Set<string>(), activeGift: null }),

  openedCount: () => get().opened.size,
  isOpen: (id) => get().opened.has(id),
}));
