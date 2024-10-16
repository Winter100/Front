import { Link } from 'react-router-dom';

import styles from './messagePreview.module.css';
import UserImage from '../../../../components/common/UserImage';

// 보낸사람의 이름, 사진, 마지막 답장, 채팅방 아이디 프롭스로 받기
const MessagePreview = () => {
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

export default MessagePreview;
