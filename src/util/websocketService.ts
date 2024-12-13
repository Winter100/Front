import { MessageType } from '../types/message';
import { Client, IMessage } from '@stomp/stompjs';

export interface ChatMessage {
  messageType: string;
  content: string;
  chatRoomId: number;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  timestamp?: string;
  fileInfo?: string;
  profileId: string;
  createdAt: string;
  id: string;
}

interface FileType {
  messageType: string;
  content: string;
  chatRoomId: number;
  fileName: string;
  fileSize: number;
  fileType: string;
}

interface sendChatMessage {
  messageType: 'CHAT';
  content: string;
  chatRoomId: number;
}

let stompClient: Client | null = null;
let messageHandler: ((message: MessageType) => void) | null = null;

// STOMP 클라이언트 생성

export const createStompClient = (token: string) => {
  stompClient = new Client({
    brokerURL: `${import.meta.env.VITE_PROJECT_SOCKET_SERVER_URL}/chat/inbox`,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {},
    onStompError: () => {},
    debug: () => {
      // console.log('STOMP Debug:', str);
    },
  });

  return stompClient;
};

export const connectStompClient = (): void => {
  if (stompClient) {
    stompClient.activate();
  }
};

export const disconnectStompClient = (): void => {
  if (stompClient) {
    stompClient.deactivate();
  }
};

export const setMessageHandler = (
  handler: (message: MessageType) => void | null
): void => {
  messageHandler = handler;
};

// 채팅방 구독
export const subscribeToRoom = (roomId: string = ''): void => {
  if (stompClient && stompClient.connected) {
    stompClient.subscribe(
      `/exchange/chat.exchange/room.${roomId}`,
      (message: IMessage) => {
        const receivedMessage = JSON.parse(message.body);
        if (messageHandler) {
          messageHandler(receivedMessage);
        }
      }
    );
  }
};

// 채팅방 입장
export const enterChatRoom = (roomId: string) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/pub/chat.enter',
      body: JSON.stringify({
        chatRoomId: parseInt(roomId),
        messageType: 'ENTER',
      }),
    });

    subscribeToRoom(roomId);
  } else {
    console.error('STOMP client is not connected');
  }
};

export const sendMessage = (content: string, chatRoomId: number) => {
  if (stompClient && stompClient.connected) {
    const message: sendChatMessage = {
      messageType: 'CHAT',
      content,
      chatRoomId,
    };

    stompClient.publish({
      destination: '/pub/chat.message',
      body: JSON.stringify(message),
    });
  } else {
    console.error('STOMP client is not connected or null');
  }
};

export const sendFile = (
  file: File,
  chatRoomId: number,
  fileType: 'FILE' | 'GIF' = 'FILE'
) => {
  if (stompClient && stompClient.connected) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const message: FileType = {
        messageType: fileType,
        content: e.target?.result as string,
        chatRoomId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      };

      // console.log('Sending file message:', message);

      stompClient?.publish({
        destination: '/pub/chat.message',
        body: JSON.stringify(message),
      });
    };

    reader.readAsDataURL(file);
  } else {
    console.error('STOMP client is not connected or null');
  }
};

export const deleteMessage = (chatRoomId: number, id: string) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/pub/chat.delete',
      body: JSON.stringify({
        chatRoomId,
        messageId: id,
      }),
    });
  }
};
