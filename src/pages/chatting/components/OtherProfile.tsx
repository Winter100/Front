import UserImage from '../../../components/common/UserImage';
import { usePartner } from '../../../components/service/usePartner';

const OtherProfile = ({
  chatRoomId,
  partnerId,
  isName = true,
}: {
  chatRoomId: number;
  partnerId: number;
  isName?: boolean;
}) => {
  const { data, isLoading } = usePartner(chatRoomId, partnerId);

  if (isLoading) {
    return <p>로딩..</p>;
  }
  return (
    <>
      <UserImage src={data?.imageUrl ?? ''} size="S" />
      {isName && (
        <p style={{ margin: 'auto 1rem', fontSize: '0.8rem' }}>
          {data?.profileName ?? ''}
        </p>
      )}
    </>
  );
};

export default OtherProfile;
