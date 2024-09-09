import { Outlet } from 'react-router-dom';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { PiGifBold } from 'react-icons/pi';
import Footer from './Footer';

import MainSection from './MainSection';
import MenuContainer from '../common/MenuContainer';

const ChattingLayout = () => {
  return (
    <>
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer>
        <MenuContainer>
          <PiUploadSimpleBold />
          <PiGifBold />
        </MenuContainer>
      </Footer>
    </>
  );
};

export default ChattingLayout;
