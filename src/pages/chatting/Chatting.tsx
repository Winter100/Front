import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';
import Header from '../../components/layout/Header';
import UserImage from '../../components/common/UserImage';
import ChattingRoom from './components/ChattingRoom';
import InputContainer from '../../components/common/InputContainer';
import Input from '../../components/common/Input';

const Chatting = () => {
  const navigate = useNavigate();
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
        <Input />
        <button>보내기</button>
      </InputContainer>
    </>
  );
};

export default Chatting;
