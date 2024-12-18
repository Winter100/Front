import { useEffect, useRef } from 'react';
import { MessageType } from '../types/message';

export const useScroll = (
  behavior: 'auto' | 'smooth' = 'auto',
  chattingMessages: MessageType[]
) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      scrollRef?.current?.scrollIntoView({ behavior });
    };

    scrollToBottom();
  }, [chattingMessages, behavior]);

  return { scrollRef };
};
