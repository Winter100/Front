import { useQuery } from '@tanstack/react-query';
import { MessagePreviewType } from '../types/message';
import instance from '../api/axios';
import { getAccessToken } from '../util/token';

export const getAllMessages = async (
  token: string,
  chatRoomId: string,
  page: number = 0,
  size: number = 100
) => {
  try {
    const response = await instance.get(
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
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useAllMessages = (
  chatRoomId: string,
  page: number,
  size: number,
  isAccessible: boolean = false
) => {
  const token = getAccessToken();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getAllMessages', chatRoomId],
    queryFn: () => getAllMessages(token, chatRoomId, page, size),
    enabled: !!token && isAccessible,
  });
  return { data, isLoading, isError };
};
