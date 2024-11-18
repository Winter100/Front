import instance from '../../../../api/axios';
import requests from '../../../../api/request';
import MainButton from '../../../../components/ui/MainButton';
import useProfileStore from '../../../../store/useProfileStore';
import Birth from './components/Birth';
import Gender from './components/Gender';
import UserInfo from './components/UserInfo';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { profile } = useProfileStore();
  const nav = useNavigate();
  const handleNext = async () => {
    try {
      const res = await instance.post(requests.fetchProfiles, profile);
      console.log(res);
      nav('/signup/setting/interestChoice');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h2>프로필 설정</h2>
      </div>

      <div className={styles.mainContainer}>
        <Gender />
        <Birth />
        <UserInfo />
        <div className={styles.buttonWrapper}>
          <MainButton
            text="다음"
            type="button"
            onClickFn={handleNext}
            disabled={
              !profile.nickname ||
              !profile.introduce ||
              !profile.gender ||
              !profile.dateOfBirth
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
