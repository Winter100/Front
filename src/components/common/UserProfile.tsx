import BadgeList from './BadgeList';
import styles from './styles/UserProfile.module.css';

const UserProfile = ({ name, age }: { name: string; age: number }) => {
  return (
    <div className={styles.container}>
      <div className={styles.user_info}>
        <p>{name}</p>
        <p>{age}</p>
      </div>
      <BadgeList />
    </div>
  );
};

export default UserProfile;
