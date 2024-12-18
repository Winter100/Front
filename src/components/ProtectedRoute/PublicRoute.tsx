import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = sessionStorage.getItem('accessToken');
  return !token ? <Outlet /> : <Navigate to="/match" replace />;
};

export default PublicRoute;
