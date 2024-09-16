import { create } from "zustand";

export const useMessage = create((set) => ({
  messages: [],
  addMessage: (message: any) =>
    set((state: any) => ({ messages: [...state.messages, message] })),
}));
