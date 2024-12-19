import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../store/useSession';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useEffect, useState } from 'react';

const LoginProtectedRoute = () => {
  const { isLogin } = useSession();
  const { data, isLoading, refetch } = useUserProfile();
  const { pathname } = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const checkData = async () => {
      setIsChecking(true);
      await refetch();
      setIsChecking(false);
    };

    checkData();
  }, [pathname, refetch]);

  useEffect(() => {
    if (isLoading || isChecking || !data) return;

    const hasAge = data.age !== null;
    const hasProfileImage = data.profileImages.length > 0;
    const hasLocation = data.location !== null;
    const hasProfile = hasAge && hasLocation && hasProfileImage;

    if (!isLogin) {
      setRedirectPath('/login');
    } else if (isLogin && hasProfile) {
      setRedirectPath('/match');
    } else if (!hasAge) {
      setRedirectPath('/signup/setting/profile');
    } else if (!hasProfileImage) {
      setRedirectPath('/signup/setting/profileImageUploader');
    } else if (!hasLocation) {
      setRedirectPath('/signup/setting/address');
    } else {
      setRedirectPath(null); // 모든 조건을 충족했을 때
    }
  }, [isLogin, data, isLoading, isChecking]);

  if (isLoading || isChecking || redirectPath === null) return null;

  if (redirectPath !== pathname) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default LoginProtectedRoute;
