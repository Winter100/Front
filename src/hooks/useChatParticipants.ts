import { useQuery } from '@tanstack/react-query';
import instance from '../api/axios';

const getChatParticipants = async (chatRoomId: number, token: string) => {
  const response = await instance.get(
    `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/chat-rooms/${chatRoomId}/participants`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
  // const response = await axios.get(
  //   `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/chat-rooms/${chatRoomId}/participants`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // return response.data;
};

export const useChatParticipants = (chatRoomId: number) => {
  const token = sessionStorage.getItem('accessToken') ?? '';
  const myId = sessionStorage.getItem('id') ?? '';

  return useQuery({
    queryKey: ['chatParticipants', chatRoomId],
    queryFn: () => getChatParticipants(chatRoomId, token),
    select: (data) =>
      data.participantIds.find((id: number) => id !== Number(myId)), // 파트너 ID 추출
    enabled: chatRoomId > 0,
  });
};
