import { useQuery } from '@tanstack/react-query';
import requests, { getRequest } from '../api/request';
import { useSession } from '../store/useSession';

export const useUserProfile = () => {
  const { isLogin } = useSession();
  const fn = async () => {
    const res = await getRequest(requests.fetchGetProfiles, true);
    // console.log(res);
    if (res.status === 200) {
      return res.data;
    }
    return res.status;
  };

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fn,
    enabled: isLogin,
    staleTime: 3600,
    gcTime: 3600,
  });
};
