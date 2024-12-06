import { Link } from 'react-router-dom';

import styles from './messagePreview.module.css';
import UserImage from '../../../../components/common/UserImage';
import { usePartner } from '../../../../components/service/usePartner';

interface MessageProps {
  chatRoomId: number;
  partnerProfileId: number;
  unreadCount: number;
}

const MessagePreview = ({
  chatRoomId,
  partnerProfileId,
  unreadCount,
}: MessageProps) => {
  const { data, isLoading } = usePartner(chatRoomId, partnerProfileId);

  if (isLoading) {
    return <p>로딩 테스트</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile_image_container}>
        <UserImage src={data?.imageUrl ?? ''} size="S" />
      </div>
      <Link
        to={`/chatting/${chatRoomId}`}
        className={styles.profile_message_container}
      >
        <div className={styles.messages}>
          <p>{data?.profileName}</p>
          <p>마지막 메시지</p>
        </div>
        <div className={styles.unreadCount}>
          {unreadCount > 0 && <p>{unreadCount}</p>}
        </div>
      </Link>
    </div>
  );
};

export default MessagePreview;
