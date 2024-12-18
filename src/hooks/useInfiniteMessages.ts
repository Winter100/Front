import instance from '../api/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MessagePreviewType } from '../types/message';
import { getAccessToken } from '../util/token';

const fetchMessages = async ({
  pageParam,
  chatRoomId,
}: {
  pageParam: number;
  chatRoomId: string;
}) => {
  const token = getAccessToken();
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/chat-messages/chat-rooms/${chatRoomId}`,
      {
        params: {
          page: pageParam,
          size: 20,
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

export const useInfiniteMessages = (chatRoomId: string) => {
  return useInfiniteQuery({
    queryKey: ['infiniteMessages'],
    queryFn: ({ pageParam }) => fetchMessages({ pageParam, chatRoomId }),
    gcTime: 0,
    staleTime: 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages) => {
      return lastPage?.hasNext ? lastPage?.currentPage + 1 : undefined;
    },
  });
};
