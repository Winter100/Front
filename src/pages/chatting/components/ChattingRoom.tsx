import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { useParams } from 'react-router-dom';
import { useScroll } from '../../../hooks/useScroll';
import { useInfiniteMessages } from '../../../hooks/useInfiniteMessages';
import { useChattingStore } from '../../../store/useChattingStore';
import { deleteMessage } from '../../../util/websocketService';
import { groupedMessages } from '../../../util/groupedMessages';
import { MessagePreviewType } from '../../../types/message';

import styles from './styles/chattingRoom.module.css';
import Message from '../../../components/common/Message';
import OtherProfile from './OtherProfile';
import MessageItemContainer from './MessageItemContainer';
import DeleteBtn from './DeleteBtn';

const ChattingRoom = ({
  imageUrl = '/profile.png',
  profileName = '',
}: {
  imageUrl: string | undefined;
  profileName: string | undefined;
}) => {
  const myId = sessionStorage.getItem('id') ?? '1';
  const chattingMessages = useChattingStore((state) => state.chattingMessages);
  const addFirstMessages = useChattingStore((state) => state.addFirstMessages);
  const deleteChattingMessages = useChattingStore(
    (state) => state.deleteChattingMessages
  );
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

  const { data, hasNextPage, fetchNextPage } = useInfiniteMessages(
    roomId ?? ''
  );

  useEffect(() => {
    if (data) {
      addFirstMessages(data?.pages as MessagePreviewType[]);
    }
  }, [data, addFirstMessages]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = throttle(() => {
      if (container) {
        const scrollTop = container.scrollTop;
        if (scrollTop < 150) {
          if (fetchNextPage && hasNextPage) {
            container.scrollTop = scrollTop + 400;
            fetchNextPage();
          }
        }
      }
    }, 500);

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  const result = Object.values(groupedMessages(sortedMessages));

  return (
    <div className={styles.container} ref={containerRef}>
      {result.map((items) => (
        <div key={items.date} className={styles.messages_container}>
          <p className={styles.dateTitle}>{items.date}</p>
          {items.messages.map((message) => (
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
                    <DeleteBtn isMe={false} />
                  </MessageItemContainer>
                ) : (
                  <MessageItemContainer>
                    <DeleteBtn
                      handleDelete={() =>
                        handleDelete(Number(roomId), message.id)
                      }
                      isMe={true}
                      messageType={message.messageType}
                    />
                    <Message myId={myId} {...message} />
                  </MessageItemContainer>
                )}
              </>
            </div>
          ))}
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChattingRoom;
