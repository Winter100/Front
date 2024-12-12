import { create } from 'zustand';
import { MessageType } from '../types/message';

type ChattingRooms = {
  chatRoomId: number;
  myProfileId: number;
  partnerProfileId: number;
  unreadCount: number;
};

type State = {
  chattingRooms: ChattingRooms[];
  chattingMessages: MessageType[];
};

type Action = {
  addInitChattingMessages: (message: MessageType[]) => void;
  addChattingMessages: (message: MessageType) => void;
  addFirstMessages: (message: MessageType[]) => void;
  deleteChattingMessages: (id: string) => void;
  setChattingRooms: (roomsData: ChattingRooms[]) => void;
};

export const useChattingStore = create<State & Action>((set) => ({
  chattingRooms: [],
  chattingMessages: [],
  addInitChattingMessages: (messageData) => {
    // console.log('초기 메시지', messageData);
    set(() => ({
      chattingMessages: [...messageData],
    }));
  },
  addChattingMessages: (messageData) => {
    // console.log('새로 받은 메시지:', messageData);
    set((state) => {
      if (messageData.messageType === 'DELETE') {
        const preMessages = [...state.chattingMessages];
        const deleteMessage = preMessages.map((message) =>
          message.id === messageData.id
            ? {
                ...message,
                messageType: 'DELETE',
                content: '삭제된 메시지입니다.',
              }
            : { ...message }
        );
        return { chattingMessages: deleteMessage };
      } else if (
        messageData.messageType === 'CHAT' ||
        messageData.messageType === 'FILE'
      ) {
        return { chattingMessages: [...state.chattingMessages, messageData] };
      } else {
        return { chattingMessages: [...state.chattingMessages] };
      }
    });
  },
  addFirstMessages: (messageData) => {
    set((state) => {
      // const preMessages = [...messageData, ...state.chattingMessages];
      const sortedMessages = messageData.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );

      // console.log('sortedMessages', sortedMessages);
      return {
        chattingMessages: [...sortedMessages, ...state.chattingMessages],
      };
    });
  },
  deleteChattingMessages: (id) => {
    set((state) => {
      const preMessages = [...state.chattingMessages];
      const deleteMessage = preMessages.map((message) =>
        message.id === id
          ? {
              ...message,
              messageType: 'DELETE',
              content: '삭제된 메시지입니다.',
            }
          : { ...message }
      );
      return { chattingMessages: deleteMessage };
    });
  },
  setChattingRooms: (roomsData) => {
    set(() => {
      return { chattingRooms: roomsData };
    });
  },
}));
