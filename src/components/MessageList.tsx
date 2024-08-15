import MessageItem from './MessageItem';
import styles from './styles/MessageList.module.css';
const DUMMY = new Array(3).fill('a');
const MessageList = () => {
  return (
    <div className={styles.container}>
      <ul>
        {DUMMY.map((message, i) => (
          <li key={message + i + 10}>
            <MessageItem />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
