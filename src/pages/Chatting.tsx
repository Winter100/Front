import Header from '../components/common/layout/Header';
import MainSection from '../components/common/layout/MainSection';
import ChattingRoom from '../components/ChattingRoom';
import Input from '../components/common/Input';
import InputContainer from '../components/common/InputContainer';
import { useNavigate } from 'react-router-dom';
import SendBtn from '../components/common/SendBtn';
import UserImage from '../components/common/UserImage';
import { IoIosArrowBack } from 'react-icons/io';

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
      <MainSection>
        <div>...설명</div>
        <ChattingRoom />
        <InputContainer>
          <Input />
          <SendBtn />
        </InputContainer>
      </MainSection>
    </>
  );
};

export default Chatting;
