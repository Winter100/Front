import { useEffect } from 'react';
import axios from 'axios';
import { useChattingStore } from '../../../store/useChattingStore';
import { getAccessToken } from '../../../util/token';
import MessageList from './components/MessageList';
import TopPreview from './components/TopPreview';

const Messages = () => {
  const token = getAccessToken();
  const setChattingRooms = useChattingStore((state) => state.setChattingRooms);

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
        setChattingRooms(data);
      } catch (e) {
        console.log(e);
      }
    };
    handleGetChatRooms();
  }, []);
  return (
    <>
      <TopPreview />
      <MessageList />
    </>
  );
};

export default Messages;
