import { useState } from 'react';
import { convertToKrTime } from '../../../util/convertToKrTime';
import styles from './chatDate.module.css';
const ChatDate = ({
  createdAt,
  isMe,
  handleDelete,
  messageType = 'DELETE',
}: {
  createdAt: string;
  isMe: boolean;
  id?: string;
  handleDelete?: () => void;
  messageType?: string;
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const handleMouseEnter = () => {
    if (messageType !== 'DELETE') setHover(true);
  };

  const handleMouserLeave = () => {
    setHover(false);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouserLeave}
    >
      {messageType !== 'DELETE' && isMe && hover ? (
        <button className={styles.closeBtn} onClick={handleDelete}>
          X
        </button>
      ) : (
        <p>{convertToKrTime(createdAt)}</p>
      )}
    </div>
  );
};

export default ChatDate;
