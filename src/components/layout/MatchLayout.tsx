import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import MainSection from './MainSection';
import MatchingMenu from '../../pages/home/components/MatchingMenu';

const MatchLayout = () => {
  return (
    <>
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
