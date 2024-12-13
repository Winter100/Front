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

const useChatRooms = (token: string, roomIds: string[]) => {
  const [isConnected, setIsConnected] = useState(false);

  const addChattingMessages = useChattingStore(
    (state) => state.addChattingMessages
  );

  // WebSocket 연결 초기화
  useEffect(() => {
    const client = createStompClient(token);
    client.onConnect = () => {
      setIsConnected(true);
      if (roomIds?.length === 0) return;
      roomIds.forEach((roomId) => enterChatRoom(roomId));
    };

    client.onStompError = (error) => {
      console.error('STOMP error:', error);
    };

    setMessageHandler((message: MessageType) => addChattingMessages(message));

    connectStompClient();

    return () => {
      disconnectStompClient();
    };
  }, [token, roomIds, addChattingMessages]);

  return { isConnected };
};

export default useChatRooms;
