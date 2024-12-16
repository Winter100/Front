import { useEffect } from 'react';
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
import { useAccessRoom } from '../../hooks/useAccessRoom.ts';

const Chatting = () => {
  const navigate = useNavigate();
  const { id: chatRoomId } = useParams();

  const { data: accessData, isLoading: accessLoading } = useAccessRoom(
    Number(chatRoomId) ?? ''
  );
  const isAccessible = accessData?.isAccessible ?? false;

  const { data, isLoading: isAllMessagesLoading } = useAllMessages(
    chatRoomId ?? '',
    0,
    20,
    isAccessible
  );

  const { partnerData, isLoading } = usePartnerWithParticipants(
    Number(chatRoomId)
  );
  const addInitChattingMessages = useChattingStore(
    (state) => state.addInitChattingMessages
  );

  useEffect(() => {
    if (data?.messages) addInitChattingMessages(data?.messages ?? []);
  }, [data, addInitChattingMessages]);

  useEffect(() => {
    if (!isAccessible) {
      navigate('/match/messages', { replace: true });
    }
  }, [isAccessible, navigate]);

  const loading =
    isLoading || isAllMessagesLoading || accessLoading || !isAccessible;

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Spinner />
      </div>
    );
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
