import { create } from 'zustand';
import { MessageType } from '../types/message';

type State = {
  chattingRooms: {
    chatRoomId: number;
    myProfileId: number;
    partnerProfileId: number;
  }[];
  chattingMessages: MessageType[];
};

type Action = {
  addChattingMessages: (message: MessageType) => void;
  setChattingRooms: (
    roomsData: {
      chatRoomId: number;
      myProfileId: number;
      partnerProfileId: number;
    }[]
  ) => void;
};

export const useChattingStore = create<State & Action>((set) => ({
  chattingRooms: [],
  chattingMessages: [],
  addChattingMessages: (messageData) => {
    console.log('New message data:', messageData);
    set((state) => ({
      chattingMessages: [...state.chattingMessages, messageData],
    }));
  },
  setChattingRooms: (roomsData) => {
    set(() => {
      return { chattingRooms: roomsData };
    });
  },
}));
