import { create } from 'zustand';
import { MessageType } from '../types/message';

const DUMMY_MESSAGES = [
  { isMe: true, content: '뭐해?', date: '2024-12-12' },
  { isMe: false, content: '그냥있어', date: '2024-12-12' },
  { isMe: false, content: '왜??', date: '2024-12-12' },
  { isMe: true, content: '걍 심심해서?', date: '2024-12-12' },
  { isMe: true, content: '저녁 ㄱㄱ?', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  {
    isMe: false,
    content:
      'ㅇㅇ ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ',
    date: '2024-12-12',
  },
  { isMe: false, content: '뭐하는데 답장이 없냐?', date: '2024-12-12' },
];
type State = {
  chattingMessages: MessageType[];
};

type Action = {
  addChattingMessages: (message: MessageType) => void;
};

export const useChattingStore = create<State & Action>((set) => ({
  chattingMessages: DUMMY_MESSAGES,
  addChattingMessages: (message) =>
    set((state) => ({
      chattingMessages: [...state.chattingMessages, message],
    })),
}));
