import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 로그인 유무 체크
  const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
