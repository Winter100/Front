import styles from './styles/ChattingRoom.module.css';
import Message from './common/Message';
import UserImage from './common/UserImage';
// 프롭스로 메시지 데이터 받기
const DUMMY = [
  { isMe: true, content: '뭐해?', date: '2024-12-12' },
  { isMe: false, content: '그냥있어', date: '2024-12-12' },
  { isMe: false, content: '왜??', date: '2024-12-12' },
  { isMe: true, content: '걍 심심해서?', date: '2024-12-12' },
  { isMe: true, content: '저녁 ㄱㄱ?', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  { isMe: true, content: '대답', date: '2024-12-12' },
  {
    isMe: false,
    content:
      'ㅇㅇ ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ',
    date: '2024-12-12',
  },
  { isMe: false, content: '뭐하는데 답장이 없냐?', date: '2024-12-12' },
];
const ChattingRoom = () => {
  return (
    <ul className={styles.container}>
      {DUMMY.map((message, i) => (
        <li
          key={message.content + i}
          className={message.isMe ? styles.me : styles.you}
        >
          {!message.isMe && <UserImage src="/public/3.jpg" size="M" />}
          <Message content={message.content} isMe={message.isMe} />
        </li>
      ))}
    </ul>
  );
};

export default ChattingRoom;
