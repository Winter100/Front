import { useQuery } from '@tanstack/react-query';
import { User } from '../store/useFindUserStore';
import instance from '../api/axios';
import { getAccessToken } from '../util/token';

export const getFindProfiles = async (token: string) => {
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/profiles/findProfiles`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: User[] = response.data;

    return data;
  } catch (e) {
    console.log('findProfiles 에러', e);
  }
};

export const useFindProfiles = () => {
  const token = getAccessToken();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['findProfiles', token],
    queryFn: () => getFindProfiles(token),
    gcTime: 0,
    staleTime: 0,
  });

  console.log('isError', isError);

  return { data, isLoading, isError };
};
