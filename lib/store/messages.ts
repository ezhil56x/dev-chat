import { create } from "zustand";

export const useMessage = create((set) => ({
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,
  addMessage: (newMessage: any) =>
    set((state: any) => ({
      messages: [...state.messages, newMessage],
    })),
  setOptimisticIds: (id: string) =>
    set((state: any) => ({ optimisticIds: [...state.optimisticIds, id] })),
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
  optimisticUpdateMessage: (updateMessage: any) => {
    set((state: any) => {
      return {
        messages: state.messages.filter((message: any) => {
          if (message.id === updateMessage.id) {
            message.text = updateMessage.text;
            message.is_edit = updateMessage.is_edit;
          }
          return message;
        }),
      };
    });
  },
}));
