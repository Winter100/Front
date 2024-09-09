import { Link } from 'react-router-dom';

import styles from './messageItem.module.css';
import UserImage from '../../../../components/common/UserImage';

const MessageItem = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile_image_container}>
        <UserImage />
      </div>
      <Link to={`/chatting/id`} className={styles.profile_message_container}>
        <p>홍길동</p>
        <p>뭐하는데 답장이 없냐?</p>
      </Link>
    </div>
  );
};

export default MessageItem;
