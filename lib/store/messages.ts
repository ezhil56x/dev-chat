import { create } from "zustand";
import { LIMIT_MESSGAGES } from "../constant";

export const useMessage = create((set) => ({
  hasMore: true,
  page: 1,
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,
  setMessages: (messages: any) =>
    set((state: any) => ({
      messages: [...messages, ...state.messages],
      page: state.page + 1,
      hasMore: messages.length >= LIMIT_MESSGAGES,
    })),
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
