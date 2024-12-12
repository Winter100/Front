import Message from '../../../components/common/Message';
import { useScroll } from '../../../hooks/useScroll';
import styles from './chattingRoom.module.css';
import { useChattingStore } from '../../../store/useChattingStore';
import ChatDate from './ChatDate';
import MessageItemContainer from './MessageItemContainer';
import { deleteMessage } from '../../../util/websocketService';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

import OtherProfile from './OtherProfile';

const ChattingRoom = ({
  imageUrl = '/profile.png',
  profileName = '',
}: {
  imageUrl: string | undefined;
  profileName: string | undefined;
}) => {
  // 역방향 무한 스크롤 구현하기
  // const page = 1;
  // const hasNext = true;
  const myId = sessionStorage.getItem('id') ?? '';
  const chattingMessages = useChattingStore((state) => state.chattingMessages);
  const deleteChattingMessages = useChattingStore(
    (state) => state.deleteChattingMessages
  );
  // const addFirstMessages = useChattingStore((state) => state.addFirstMessages);
  const { id: roomId } = useParams();
  const { scrollRef } = useScroll('auto', chattingMessages);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDelete = (roomId: number, id: string) => {
    deleteMessage(roomId, id);
    deleteChattingMessages(id);
  };

  const sortedMessages = chattingMessages.sort(
    (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
  );

  // useEffect(() => {
  //   const container = containerRef.current;

  //   const fetch = async () => {
  //     const data = await getAllMessages(token, roomId, page);
  //     addFirstMessages(data?.messages ?? []);
  //   };

  //   const handleScroll = throttle(() => {
  //     if (container) {
  //       const scrollTop = container.scrollTop;
  //       if (hasNext && scrollTop < 100) {
  //         container.scrollTop = scrollTop + 400;
  //         try {
  //           fetch();
  //           page++;
  //           hasNext = false;
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       }
  //     }
  //   }, 1000);

  //   if (container) {
  //     container.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {sortedMessages.map((message) => (
        <div
          key={message.id}
          className={
            message.profileId === Number(myId) ? styles.me : styles.you
          }
        >
          <>
            {message.profileId !== Number(myId) ? (
              <MessageItemContainer>
                <OtherProfile
                  isViewName={false}
                  imageUrl={imageUrl}
                  profileName={profileName}
                />
                <Message myId={myId} {...message} />
                <ChatDate createdAt={message.createdAt} isMe={false} />
              </MessageItemContainer>
            ) : (
              <MessageItemContainer>
                <ChatDate
                  createdAt={message.createdAt}
                  handleDelete={() => handleDelete(Number(roomId), message.id)}
                  isMe={true}
                  messageType={message.messageType}
                />
                <Message myId={myId} {...message} />
              </MessageItemContainer>
            )}
          </>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChattingRoom;
