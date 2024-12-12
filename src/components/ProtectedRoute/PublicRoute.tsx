import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../store/useSession';

const PublicRoute = () => {
  const { isLogin } = useSession();

  return !isLogin ? <Outlet /> : <Navigate to="/match" replace />;
};

export default PublicRoute;
