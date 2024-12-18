import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../store/useSession';
import { useUserProfile } from '../../hooks/useUserProfile';

const LoginProtectedRoute = () => {
  const { isLogin } = useSession();
  const { data, isLoading } = useUserProfile();

  if (isLoading) return null;
  // console.log(data);
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  const hasProfile = data.age && data.location && data.profileImage;
  if (!isLogin || !hasProfile) {
    return <Outlet />;
  }

  return <Navigate to="/match" replace />;
};

export default LoginProtectedRoute;
