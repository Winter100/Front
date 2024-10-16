import { useEffect } from 'react';
import Message from '../../../components/common/Message';
import UserImage from '../../../components/common/UserImage';
import { useScroll } from '../../../hooks/useScroll';
import { useChattingStore } from '../../../store/useChattingStore';
import styles from './chattingRoom.module.css';

// 프롭스로 메시지 데이터 받기

const ChattingRoom = () => {
  const chattingMessages = useChattingStore((state) => state.chattingMessages);
  const { scrollRef } = useScroll();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [chattingMessages, scrollRef]);

  return (
    <ul className={styles.container}>
      {chattingMessages.map((message, i) => (
        <li
          key={message.content + i}
          className={message.isMe ? styles.me : styles.you}
        >
          {!message.isMe && <UserImage src="/public/3.jpg" size="M" />}
          <Message content={message.content} isMe={message.isMe} />
        </li>
      ))}
      <div ref={scrollRef} />
    </ul>
  );
};

export default ChattingRoom;
