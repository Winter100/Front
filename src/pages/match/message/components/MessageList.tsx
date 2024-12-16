import { useEffect } from 'react';
import { useChattingStore } from '../../../../store/useChattingStore';
import MessagePreview from './MessagePreview';
import styles from './messageList.module.css';
import axios from 'axios';
import { getAccessToken } from '../../../../util/token';

const images = [
  { src: 'url(/1.jpg)' },
  { src: 'url(/2.jpg)' },
  { src: 'url(/3.jpg)' },
  { src: 'url(/dolphin.png)' },
];
const MessageList = () => {
  const chattingRooms = useChattingStore((state) => state.chattingRooms);
  const setChattingRooms = useChattingStore((state) => state.setChattingRooms);
  const token = getAccessToken();

  useEffect(() => {
    const handleGetChatRooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/chat-rooms/simple`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        // console.log('나와 연결된 채팅방', data);
        setChattingRooms(data);
      } catch (e) {
        console.log(e);
      }
    };
    handleGetChatRooms();
  }, []);
  return (
    <>
      <ul className={styles.container}>
        <div className={styles.matchs_container}>
          {images.map((item, i) => (
            <div
              key={i}
              className={styles.matches_image}
              style={{
                backgroundImage: item.src,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        {chattingRooms.map((rooms) => (
          <li key={rooms.chatRoomId}>
            <MessagePreview {...rooms} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MessageList;
