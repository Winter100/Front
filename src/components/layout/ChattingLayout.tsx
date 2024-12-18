import { Outlet, useParams } from 'react-router-dom';
import Footer from './Footer';

import MainSection from './MainSection';
import FooterMenu from '../../pages/chatting/FooterMenu';
import useChatRooms from '../../hooks/useChatRooms';
import Spinner from '../common/Spinner';
import { getAccessToken } from '../../util/token';

const ChattingLayout = () => {
  const { id: chatRoomId } = useParams();
  const token = getAccessToken();
  const { isConnected } = useChatRooms(token, [chatRoomId ?? '']);

  return (
    <>
      <MainSection>
        {isConnected ? (
          <Outlet />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Spinner />
          </div>
        )}
      </MainSection>
      <Footer>
        <FooterMenu />
      </Footer>
    </>
  );
};

export default ChattingLayout;
