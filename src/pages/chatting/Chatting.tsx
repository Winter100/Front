import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './init.ts';

import Header from '../../components/layout/Header';
import ChattingRoom from './components/ChattingRoom';

import { useChattingStore } from '../../store/useChattingStore.ts';
import ChattingMenu from './components/ChattingMenu.tsx';
import OtherProfile from './components/OtherProfile.tsx';
import Exit from '../../components/Exit.tsx';
import { useAllMessages } from '../../hooks/useAllMessages.ts';
import { usePartnerWithParticipants } from '../../hooks/usePartnerWithParticipants.ts';
import Spinner from '../../components/common/Spinner.tsx';
import { useEffect } from 'react';

const Chatting = () => {
  const navigate = useNavigate();
  const { id: chatRoomId } = useParams();
  const { partnerData, isLoading } = usePartnerWithParticipants(
    Number(chatRoomId)
  );

  const addInitChattingMessages = useChattingStore(
    (state) => state.addInitChattingMessages
  );
  const { data, isLoading: isAllMessagesLoading } = useAllMessages(
    chatRoomId ?? '',
    0,
    100
  );

  useEffect(() => {
    if (data?.messages) addInitChattingMessages(data?.messages ?? []);
  }, [data, addInitChattingMessages]);

  if (isLoading || isAllMessagesLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header
        left={
          <button
            style={{
              cursor: 'pointer',
              display: 'flex',
              backgroundColor: 'inherit',
              border: 'none',
              color: 'white',
              fontSize: '1rem',
            }}
            onClick={() => navigate('/match/messages')}
          >
            <IoIosArrowBack />
          </button>
        }
        center={
          <OtherProfile
            imageUrl={partnerData?.imageUrl}
            profileName={partnerData?.profileName}
          />
        }
        right={<Exit chatRoomId={chatRoomId ?? ''} />}
      />

      <ChattingRoom
        imageUrl={partnerData?.imageUrl}
        profileName={partnerData?.profileName}
      />

      <ChattingMenu />
    </>
  );
};

export default Chatting;
