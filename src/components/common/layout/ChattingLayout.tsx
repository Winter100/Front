import { Outlet } from 'react-router-dom';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { PiGifBold } from 'react-icons/pi';
import Footer from './Footer';
import MenuContainer from '../MenuContainer';

const ChattingLayout = () => {
  return (
    <>
      <Outlet />
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
