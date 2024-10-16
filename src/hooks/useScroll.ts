import { useEffect, useRef } from 'react';

export const useScroll = (behavior: 'auto' | 'smooth' = 'auto') => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef?.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return { scrollRef };
};
