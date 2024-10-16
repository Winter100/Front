import { Outlet } from 'react-router-dom';

import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

const HomeLayout = () => {
  return (
    <>
      <Header></Header>
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer>{''}</Footer>
    </>
  );
};

export default HomeLayout;
