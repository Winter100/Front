import { Outlet, useParams } from 'react-router-dom';
import Footer from './Footer';

import MainSection from './MainSection';
import FooterMenu from '../../pages/chatting/FooterMenu';
import useChatRooms from '../../hooks/useChatRooms';

const ChattingLayout = () => {
  const { id: chatRoomId } = useParams();
  const token = sessionStorage.getItem('accessToken') ?? '';
  useChatRooms(token, [chatRoomId ?? '']);
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
