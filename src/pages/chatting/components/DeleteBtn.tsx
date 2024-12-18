import { useState } from 'react';
import styles from './styles/deleteBtn.module.css';

const DeleteBtn = ({
  isMe,
  handleDelete,
  messageType = 'DELETE',
}: {
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
      ) : null}
    </div>
  );
};

export default DeleteBtn;
