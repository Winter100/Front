import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MessagePreviewType } from '../types/message';

const getAllMessages = async (
  token: string,
  chatRoomId: string,
  page: number = 0,
  size: number = 100
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/chat-messages/chat-rooms/${chatRoomId}`,
      {
        params: {
          page,
          size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data: MessagePreviewType = response.data ?? [];
    console.log('메시지 가져오기', data, page, size);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// 페이지와 사이즈 받기
export const useAllMessages = (
  chatRoomId: string,
  page: number,
  size: number
) => {
  const token = sessionStorage.getItem('accessToken') ?? '';
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getAllMessages', chatRoomId],
    queryFn: () => getAllMessages(token, chatRoomId, page, size),
    enabled: !!token,
    gcTime: 0,
    staleTime: 0,
  });
  return { data, isLoading, isError };
};
