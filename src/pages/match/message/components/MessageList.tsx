import { useChattingStore } from '../../../../store/useChattingStore';
import MessagePreview from './MessagePreview';
import styles from './messageList.module.css';

const MessageList = () => {
  const chattingRooms = useChattingStore((state) => state.chattingRooms);
  return (
    <ul className={styles.container}>
      {chattingRooms?.map((rooms) => (
        <li key={rooms.chatRoomId}>
          <MessagePreview {...rooms} />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
