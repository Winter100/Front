import styles from './styles/Message.module.css';

const Message = ({ content, isMe }: { content: string; isMe: boolean }) => {
  return (
    <p className={`${styles.container} ${isMe ? styles.me : styles.you}`}>
      {content}
    </p>
  );
};

export default Message;
