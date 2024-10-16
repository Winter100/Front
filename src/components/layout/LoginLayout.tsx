import { Outlet } from 'react-router-dom';
import MainSection from './MainSection';

const LoginLayout = () => {
  return (
    <>
      <MainSection>
        <Outlet />
      </MainSection>
    </>
  );
};

export default LoginLayout;
