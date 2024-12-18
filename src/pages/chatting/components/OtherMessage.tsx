import MessageItemContainer from './MessageItemContainer';
import OtherProfile from './OtherProfile';
import Message from '../../../components/common/Message';
import { MessageType } from '../../../types/message';

interface OtherMessageProps {
  imageUrl: string;
  profileName: string;
  myId: string;
  message: MessageType;
}

const OtherMessage = ({
  imageUrl,
  myId,
  profileName,
  message,
}: OtherMessageProps) => {
  return (
    <MessageItemContainer>
      <OtherProfile
        isViewName={false}
        imageUrl={imageUrl}
        profileName={profileName}
      />
      <Message myId={myId} {...message} />
    </MessageItemContainer>
  );
};

export default OtherMessage;
