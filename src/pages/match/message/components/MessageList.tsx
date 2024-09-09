import MessageItem from './MessageItem';
import styles from './messageList.module.css';
const DUMMY = new Array(25).fill('a');
const MessageList = () => {
  return (
    <ul className={styles.container}>
      {DUMMY.map((message, i) => (
        <li key={message + i + 10}>
          <MessageItem />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
