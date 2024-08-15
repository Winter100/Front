import React, { useRef } from 'react';
import MainButton from '../../components/ui/MainButton';
import { useNavigate } from 'react-router-dom';
import styles from './styles/profile.module.css';
import useProfile from '../../zustand/useProfile';
import MainSection from '../../components/common/layout/MainSection';
const Profile: React.FC = () => {
  const nav = useNavigate();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const { profile, setProfile } = useProfile();
  return (
    <MainSection>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" ref={nicknameRef} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="introduce">자기소개</label>
          <textarea name="introduce" id="introduce" ref={introduceRef} />
        </div>
        <div className={styles.btnWrapper}>
          <MainButton
            type="button"
            text="다음으로"
            onClickFn={() => {
              setProfile({
                ...profile,
                nickname: nicknameRef.current!.value,
                introduce: introduceRef.current!.value,
              });
              nav('/signup/interestChoice');
            }}
          />
        </div>
      </div>
    </MainSection>
  );
};

export default Profile;
