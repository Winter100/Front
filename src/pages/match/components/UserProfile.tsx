import styles from './styles/userProfile.module.css';

const UserProfile = ({
  profileName,
  age,
}: {
  profileName: string;
  age: number;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.user_info}>
        <p>{profileName ?? ''}</p>
        <p>{age ?? 0}</p>
      </div>
    </div>
  );
};

export default UserProfile;
