import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../store/useSession';
import { useUserProfile } from '../../hooks/useUserProfile';

const LoginProtectedRoute = () => {
  const { isLogin } = useSession();
  const { data } = useUserProfile();

  const hasProfileData = Boolean(data?.data);

  if (!isLogin || !hasProfileData) {
    return <Outlet />;
  }

  return <Navigate to="/match" replace />;
};

export default LoginProtectedRoute;
