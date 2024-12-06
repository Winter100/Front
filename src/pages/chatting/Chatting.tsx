import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './init.ts';

import Header from '../../components/layout/Header';
import ChattingRoom from './components/ChattingRoom';

import { useChattingStore } from '../../store/useChattingStore.ts';
import ChattingMenu from './components/ChattingMenu.tsx';
import OtherProfile from './components/OtherProfile.tsx';

const Chatting = () => {
  const navigate = useNavigate();
  const { id: chatRoomId } = useParams();
  const [parthnerId, setParthnerId] = useState<number | null>(null);
  const addInitChattingMessages = useChattingStore(
    (state) => state.addInitChattingMessages
  );

  useEffect(() => {
    try {
      const getMessages = async () => {
        const resposne = await axios.get(
          `${import.meta.env.VITE_PROJECT_SERVER_URL}/chat-messages/chat-rooms/${chatRoomId}`
        );
        const data = resposne.data;
        addInitChattingMessages(data);
      };

      getMessages();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      const room = async () => {
        const resposne = await axios.get(
          `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/chat-rooms/${chatRoomId}/participants`
        );
        const data = resposne.data;
        const myid = sessionStorage.getItem('id') ?? '';

        setParthnerId(
          data.participantIds.find((id: number) => id !== Number(myid))
        );
      };

      room();
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            chatRoomId={Number(chatRoomId)}
            partnerId={parthnerId ?? 0}
          />
        }
        right="메뉴"
      />

      <ChattingRoom />
      <ChattingMenu />
    </>
  );
};

export default Chatting;
