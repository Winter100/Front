import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './profile.module.css';
import useProfileStore from '../../../../store/useProfileStore';
import MainButton from '../../../../components/ui/MainButton';

const Profile = () => {
  const nav = useNavigate();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const { profile, setProfile } = useProfileStore();
  const { nickname, introduce } = profile;

  const btnHandler = () => {
    if (!nicknameRef.current?.value) {
      // nicknameRef.current?.focus();
      toast.error('닉네임을 입력해주세요.');
      return;
    }
    if (!introduceRef.current?.value) {
      toast.error('자기소개를 작성해주세요.');
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
    <>
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
    </>
  );
};

export default Profile;
