import { Link } from 'react-router-dom';

import styles from './messagePreview.module.css';
import UserImage from '../../../../components/common/UserImage';
import { usePartner } from '../../../../hooks/usePartner';
import { useAllMessages } from '../../../../hooks/useAllMessages';
import Spinner from '../../../../components/common/Spinner';
import { useAccessRoom } from '../../../../hooks/useAccessRoom';
import { convertToKrTime } from '../../../../util/convertToKrTime';

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
  const { data: accessData } = useAccessRoom(chatRoomId ?? '');
  const isAccessible = accessData?.isAccessible ?? false;
  const { data: messages, isLoading: isMessagesLoading } = useAllMessages(
    chatRoomId.toString(),
    0,
    1,
    isAccessible
  );
  let content = '';
  let date = '';
  const loading = isLoading || isMessagesLoading;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading_container}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (messages && messages?.messages.length > 0) {
    date = convertToKrTime(messages?.messages[0].createdAt, true);
    if (messages?.messages[0].messageType === 'CHAT') {
      content = messages?.messages[0].content;
    } else if (messages?.messages[0].messageType === 'DELETE') {
      content = '삭제된 메시지입니다';
    } else {
      content = '[이미지]';
    }
  }

  return (
    <div className={styles.container}>
      <>
        <div className={styles.profile_image_container}>
          <UserImage
            name={data?.profileName}
            src={data?.imageUrl ?? ''}
            size="S"
          />
        </div>
        <Link
          to={`/chatting/${chatRoomId}`}
          className={styles.profile_message_container}
        >
          <div className={styles.messages}>
            <p>{data?.profileName}</p>
            <p>{content}</p>
          </div>

          <div className={styles.unreadCount_container}>
            <p className={styles.date}>{date}</p>
            <div className={styles.unread_box}>
              {unreadCount > 0 && (
                <p className={styles.unreadCount}>
                  {unreadCount >= 999 ? '999+' : unreadCount}
                </p>
              )}
            </div>
          </div>
        </Link>
      </>
    </div>
  );
};

export default MessagePreview;
