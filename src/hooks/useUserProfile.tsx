import { useQuery } from '@tanstack/react-query';
import requests, { getRequest } from '../api/request';
import { useSession } from '../store/useSession';

export const useUserProfile = () => {
  const { isLogin } = useSession();

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getRequest(requests.fetchGetProfiles, true),
    enabled: isLogin,
    staleTime: 3600,
    gcTime: 3600,
  });
};
