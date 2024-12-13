import axios from 'axios';
import requests, { postRequest } from '../../../../api/request';
import MainButton from '../../../../components/ui/MainButton';
import useProfileStore from '../../../../store/useProfileStore';
import Birth from './components/Birth';
import Gender from './components/Gender';
import UserInfo from './components/UserInfo';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { profile } = useProfileStore();
  const { profileName, selfIntroduction, gender, dateOfBirth } = profile;
  const nav = useNavigate();
  const handleNext = async () => {
    try {
      const res = await postRequest(
        requests.fetchProfiles,
        {
          profileName,
          selfIntroduction,
          gender,
          dateOfBirth,
        },
        true
      );

      console.log(res);
      nav('/signup/setting/profileImageUploader');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 서버 응답이 있는 경우
          console.error('서버 에러:', error.response.data);
          // 여기서 에러 상태에 따른 처리를 할 수 있습니다
          switch (error.response.status) {
            case 400:
              console.error('잘못된 요청입니다');
              break;
            case 401:
              console.error('인증에 실패했습니다');
              break;
            case 409:
              console.error('이미 존재하는 프로필입니다');
              break;
            default:
              console.error('서버 에러가 발생했습니다');
          }
        } else if (error.request) {
          // 요청은 보냈지만 응답을 받지 못한 경우
          console.error('서버로부터 응답이 없습니다');
        }
      } else {
        // 기타 에러
        console.error('에러가 발생했습니다:', error);
      }
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
              !profile.profileName ||
              !profile.selfIntroduction ||
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
