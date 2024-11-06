import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import styles from './chatting.module.css';
import Header from '../../components/layout/Header';
import UserImage from '../../components/common/UserImage';
import ChattingRoom from './components/ChattingRoom';
import InputContainer from '../../components/common/InputContainer';
import Input from '../../components/common/Input';
import { useChattingStore } from '../../store/useChattingStore';
import { useEffect, useRef, useState } from 'react';
import { MessageType } from '../../types/message';

const Chatting = () => {
  const navigate = useNavigate();
  const ws = useRef<WebSocket | null>(null);
  const addChattingMessages = useChattingStore(
    (state) => state.addChattingMessages
  );

  const [message, setMessage] = useState('');

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const messageData: MessageType = {
      isMe: true,
      content: message,
      date: '2024-12-12',
    };
    addChattingMessages(messageData);
    setMessage('');
  };

  useEffect(() => {
    ws.current = new WebSocket('ws://URL');
    ws.current.onopen = () => {
      console.log('연결 시작');
    };

    ws.current.onmessage = (event) => {
      if (event.data) {
        return;
      }
    };
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
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
          </button>
        }
        center={
          <>
            <UserImage src="/public/3.jpg" size="M" />
            <p style={{ margin: 'auto 1rem', fontSize: '0.8rem' }}>홍길동</p>
          </>
        }
        right="메뉴"
      />

      <ChattingRoom />
      <InputContainer>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          type="submit"
          onClick={sendMessageHandler}
          className={styles.sendBtn}
        >
          보내기
        </button>
      </InputContainer>
    </>
  );
};

export default Chatting;
