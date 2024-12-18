import Input from '../../../components/common/Input';
import InputContainer from '../../../components/common/InputContainer';
import styles from './styles/chattingMenu.module.css';
import { useSendMessage } from '../../../hooks/useSendMessage';

const ChattingMenu = () => {
  const { inputMessage, setInputMessage, sendMessageHandler } =
    useSendMessage();
  return (
    <InputContainer>
      <Input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button
        type="submit"
        onClick={sendMessageHandler}
        className={styles.sendBtn}
      >
        보내기
      </button>
    </InputContainer>
  );
};

export default ChattingMenu;
