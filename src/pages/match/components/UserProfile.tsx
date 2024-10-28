import BadgeList from './BadgeList';
import styles from './userProfile.module.css';

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
      <BadgeList />
    </div>
  );
};

export default UserProfile;
