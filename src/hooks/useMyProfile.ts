import { useQuery } from '@tanstack/react-query';
import instance from '../api/axios';
import { getAccessToken } from '../util/token';

export type MyProfile = {
  age: number;
  gender: 'MALE' | 'FEMALE';
  profileId: number;
  location: { longitude: number; latitude: number };
  profileImages: string[];
  profileName: string;
  selfIntroduction: string;
};

const handleGetMyProfile = async (token: string) => {
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/profiles/getProfile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: MyProfile = response.data;

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const useMyProfile = () => {
  const token = getAccessToken();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => handleGetMyProfile(token),
    enabled: !!token,
  });

  return { data, isLoading, isError };
};
