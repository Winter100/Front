import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '../store/useFindUserStore';

export const getFindProfiles = async (token: string) => {
  try {
    const response = await axios.get(
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
    console.log(e);
  }
};

export const useFindProfiles = () => {
  const token = sessionStorage.getItem('accessToken') ?? '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['findProfiles', token],
    queryFn: () => getFindProfiles(token),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isLoading, isError };
};
