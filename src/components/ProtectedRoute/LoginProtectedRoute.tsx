import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../store/useSession';
import { useUserProfile } from '../../hooks/useUserProfile';

const LoginProtectedRoute = () => {
  const { isLogin } = useSession();
  const { data } = useUserProfile();

  const hasProfileData = data && data.data;

  return isLogin && !hasProfileData ? (
    <Outlet />
  ) : (
    <Navigate to="/match" replace />
  );
};

export default LoginProtectedRoute;
