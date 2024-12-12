import UserImage from '../../../components/common/UserImage';

const OtherProfile = ({
  imageUrl = '/profile.png',
  profileName = '',
  isViewName = true,
}: {
  imageUrl: string | undefined;
  profileName: string | undefined;
  isViewName?: boolean;
}) => {
  return (
    <>
      <UserImage name={profileName} src={imageUrl ?? ''} size="S" />
      {isViewName && (
        <p style={{ margin: 'auto 1rem', fontSize: '0.8rem' }}>
          {profileName ?? ''}
        </p>
      )}
    </>
  );
};

export default OtherProfile;
