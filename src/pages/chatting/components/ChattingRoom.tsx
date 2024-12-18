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
import OtherMessage from './OtherMessage';
import OwnMessage from './OwnMessage';
import { useMyProfile } from '../../../hooks/useMyProfile';

const ChattingRoom = ({
  imageUrl = '/profile.png',
  profileName = '',
}: {
  imageUrl: string | undefined;
  profileName: string | undefined;
}) => {
  const { data: myProfile } = useMyProfile();
  const myId = String(myProfile?.profileId) ?? '';

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
            // container.scrollTop = scrollTop + 400;
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
                  <OtherMessage
                    imageUrl={imageUrl}
                    profileName={profileName}
                    myId={myId}
                    message={message}
                  />
                ) : (
                  <OwnMessage
                    handleDelete={handleDelete}
                    myId={myId}
                    roomId={roomId ?? ''}
                    message={message}
                  />
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
