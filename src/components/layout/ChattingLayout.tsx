import { Outlet } from 'react-router-dom';
import Footer from './Footer';

import MainSection from './MainSection';
import FooterMenu from '../../pages/chatting/FooterMenu';

const ChattingLayout = () => {
  return (
    <>
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer>
        <FooterMenu />
      </Footer>
    </>
  );
};

export default ChattingLayout;
