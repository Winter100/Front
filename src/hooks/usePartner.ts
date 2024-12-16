import { useQuery } from '@tanstack/react-query';
import instance from '../api/axios';

type PartnerType = {
  age: number;
  imageUrl: string;
  profileName: string;
};

const getPartner = async (token: string, partnerProfileId: number) => {
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/profiles/${partnerProfileId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as PartnerType;
  } catch (e) {
    console.log(e);
  }
};

export const usePartner = (chatRoomId: number, partnerProfileId: number) => {
  const token = sessionStorage.getItem('accessToken') ?? '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['partner', chatRoomId],
    queryFn: () => getPartner(token, partnerProfileId),
    enabled: partnerProfileId > 0,
  });

  return { data, isLoading, isError };
};
