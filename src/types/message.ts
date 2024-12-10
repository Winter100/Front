export interface MessageType {
  messageType: string;
  fileInfo: FileInfoType | null;
  profileId: number;
  id: string;
  content: string;
  createdAt: string;
  unreadCnt?: number;
}

export interface FileInfoType {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  thumnailUrl: string | null;
}
