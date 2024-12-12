import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../store/useSession';
import { useUserProfile } from '../../hooks/useUserProfile';

const ProfileProtectedRoute = () => {
  // 로그인 유무 체크
  const { isLogin } = useSession();
  const { data, isLoading } = useUserProfile();

  if (isLoading) return null;

  return isLogin && data?.data ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProfileProtectedRoute;
