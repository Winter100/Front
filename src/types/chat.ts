export interface ServerMessageResponse {
  messageType?: string;
  content: string;
  createdAt: string;
  profileId: number;
  unreadCnt: number;
  fileInfo: null;
}

export interface Message {
  sender: string;
  content: string;
  timestamp: string;
}
export interface ChatMessage {
  messageType: string;
  content: string;
  createdAt: string;
  fileInfo: null;
  profileId: number;
  unreadCnt: number;
}

export interface ChatRoomProps {
  chatRoomId: number;
  myProfileId: number;
}

export interface EnterConfirmMessage {
  messageType: 'ENTER_CONFIRM';
  profileId: number;
  chatRoomId: number;
}

export interface ChatRoomCreateResponse {
  chatRoomId: number;
  roomMakerId: number;
  guestId: number;
}
export interface EnterConfirmRes {
  messageType: 'ENTER_CONFIRM';
  fromProfileId: number;
  toProfileId: number;
  chatRoomId: number;
}
