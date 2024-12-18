import { useEffect, useState } from 'react';

import {
  connectStompClient,
  createStompClient,
  disconnectStompClient,
  enterChatRoom,
  setMessageHandler,
} from '../util/websocketService';
import { useChattingStore } from '../store/useChattingStore';
import { MessageType } from '../types/message';
import { useNavigate } from 'react-router-dom';

const useChatRooms = (token: string, roomIds: string[]) => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const addChattingMessages = useChattingStore(
    (state) => state.addChattingMessages
  );

  useEffect(() => {
    try {
      const client = createStompClient(token);
      client.onConnect = () => {
        setIsConnected(true);
        if (roomIds?.length === 0) return;
        roomIds.forEach((roomId) => enterChatRoom(roomId));
      };

      client.onStompError = (error) => {
        console.error('STOMP error:', error);
        navigate('/match/messages', { replace: true });
      };

      setMessageHandler((message: MessageType) => addChattingMessages(message));

      connectStompClient();
    } catch (e) {
      console.log('e', e);
    }

    return () => {
      disconnectStompClient();
    };
  }, [token, roomIds, addChattingMessages, navigate]);

  return { isConnected };
};

export default useChatRooms;
