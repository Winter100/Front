import Message from '../../../components/common/Message';
import { MessageType } from '../../../types/message';
import DeleteBtn from './DeleteBtn';
import MessageItemContainer from './MessageItemContainer';

interface OwnMessageProps {
  handleDelete: (roomId: number, messageId: string) => void;
  roomId: string;
  myId: string;
  message: MessageType;
}

const OwnMessage = ({
  handleDelete,
  message,
  myId,
  roomId,
}: OwnMessageProps) => {
  return (
    <MessageItemContainer>
      <DeleteBtn
        handleDelete={() => handleDelete(Number(roomId), message.id)}
        isMe={true}
        messageType={message.messageType}
      />
      <Message myId={myId} {...message} />
    </MessageItemContainer>
  );
};

export default OwnMessage;
