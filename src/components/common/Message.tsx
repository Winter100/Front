import { CgDanger } from 'react-icons/cg';
import { MessageType } from '../../types/message';
import styles from './styles/Message.module.css';

interface MessageProps extends Omit<MessageType, 'unreadCnt'> {
  myId: string;
}

const Message = ({ content, messageType, profileId, myId }: MessageProps) => {
  let message = null;

  if (messageType === 'DELETE') {
    message = (
      <div
        className={`${styles.container} ${Number(myId) === profileId ? styles.me : styles.you}`}
      >
        <div className={styles.delete_container}>
          <CgDanger /> 삭제된 메시지입니다
        </div>
      </div>
    );
  } else if (messageType === 'CHAT') {
    message = (
      <div
        className={`${styles.container} ${Number(myId) === profileId ? styles.me : styles.you}`}
      >
        <p>{content}</p>
      </div>
    );
  } else {
    message = <img className={styles.img} src={content} alt={content} />;
  }

  return <>{message}</>;
};

export default Message;
