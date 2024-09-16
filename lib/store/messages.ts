import { create } from "zustand";

export const useMessage = create((set) => ({
  messages: [],
  actionMessage: undefined,
  addMessage: (message: any) =>
    set((state: any) => ({ messages: [...state.messages, message] })),
  setActionMessage: (message: any) => set(() => ({ actionMessage: message })),
  optimisticDeleteMessage: (messageId: any) => {
    set((state: any) => {
      return {
        messages: state.messages.filter(
          (message: any) => message.id !== messageId
        ),
      };
    });
  },
}));
