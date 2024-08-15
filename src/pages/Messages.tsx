import Header from '../components/common/layout/Header';
import MainSection from '../components/common/layout/MainSection';
import MessageList from '../components/MessageList';

const Messages = () => {
  return (
    <>
      <Header></Header>
      <MainSection>
        <MessageList />
      </MainSection>
    </>
  );
};

export default Messages;
