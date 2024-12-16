import { useQuery } from '@tanstack/react-query';
import instance from '../api/axios';
import { getAccessToken } from '../util/token';

interface AccessType {
  chatRoomId: number;
  partnerProfileId: number;
  isAccessible: boolean;
}

export const getAccessRoom = async (token: string, chatRoomId: number) => {
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/chat-rooms/${chatRoomId}/access`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data: AccessType = response.data ?? [];
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useAccessRoom = (chatRoomId: number) => {
  const token = getAccessToken();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['access', chatRoomId],
    queryFn: () => getAccessRoom(token, chatRoomId),
    enabled: !!token,
  });

  return { data, isLoading, isError };
};
