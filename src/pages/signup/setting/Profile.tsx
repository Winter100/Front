import React, { useRef } from 'react';
import MainButton from '../../../components/ui/MainButton';
import { useNavigate } from 'react-router-dom';
import styles from './styles/profile.module.css';
import useProfile from '../../../zustand/useProfile';
import MainSection from '../../../components/common/layout/MainSection';
import { errorToast } from '../../../components/toast/toast';
const Profile: React.FC = () => {
  const nav = useNavigate();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const { profile, setProfile } = useProfile();
  const { nickname, introduce } = profile;

  const btnHandler = () => {
    if (!nicknameRef.current?.value) {
      errorToast('닉네임을 입력해주세요.', 1000);
      return;
    }
    if (!introduceRef.current?.value) {
      console.log(!introduceRef.current!.value);
      errorToast('자기소개를 작성해주세요.', 1000);
      return;
    }
    setProfile({
      ...profile,
      nickname: nicknameRef.current!.value,
      introduce: introduceRef.current!.value,
    });
    nav('/signup/setting/interestChoice');
  };
  return (
    <MainSection>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h2>자신을 소개해주세요</h2>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              ref={nicknameRef}
              defaultValue={nickname}
            />
          </div>
          <div className={styles.textareaContainer}>
            <label htmlFor="introduce">자기소개</label>
            <textarea
              name="introduce"
              id="introduce"
              ref={introduceRef}
              defaultValue={introduce}
            />
          </div>
          <div className={styles.btnWrapper}>
            <MainButton
              type="button"
              text="다음으로"
              onClickFn={() => {
                btnHandler();
              }}
            />
          </div>
        </div>
      </div>
    </MainSection>
  );
};

export default Profile;
