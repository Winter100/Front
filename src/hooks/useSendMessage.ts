import { useParams } from 'react-router-dom';
import { sendFile, sendMessage } from '../util/websocketService';
import { useState } from 'react';

export const useSendMessage = () => {
  const { id: chatRoomId } = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) {
      console.log('Send conditions not met');
      return;
    }
    sendMessage(inputMessage, Number(chatRoomId));
    setInputMessage('');
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'FILE' | 'GIF'
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('파일 크기가 너무 큽니다. 10MB 이하의 파일만 업로드 가능합니다.');
        return;
      }

      const allowedTypes =
        type === 'GIF'
          ? ['image/gif']
          : [
              'image/jpeg',
              'image/png',
              'image/gif',
              'application/pdf',
              'application/docx',
            ];

      if (!allowedTypes.includes(file.type)) {
        alert('지원되지 않는 파일 형식입니다.');
        return;
      }

      sendFile(file, Number(chatRoomId), type);

      if (e.target) {
        e.target.value = '';
      }
    }
  };

  return {
    inputMessage,
    setInputMessage,
    sendMessageHandler,
    handleFileUpload,
  };
};
