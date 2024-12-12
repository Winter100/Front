import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import MainSection from './MainSection';
import MatchingMenu from '../../pages/home/components/MatchingMenu';
import Header from './Header';
import { useMyProfile } from '../../hooks/useMyProfile';

const MatchLayout = () => {
  useMyProfile();
  return (
    <>
      <Header></Header>
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer>
        <MatchingMenu />
      </Footer>
    </>
  );
};

export default MatchLayout;
