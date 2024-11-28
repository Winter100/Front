import { useRef } from 'react';
import useProfileStore from '../../../../../store/useProfileStore';
import styles from './styles/UserInfo.module.css';
const UserInfo = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const { profile, setProfile } = useProfileStore();
  const { profileName, selfIntroduction } = profile;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="profileName">닉네임</label>
        <input
          type="text"
          id="profileName"
          ref={nicknameRef}
          defaultValue={profileName}
          autoComplete="off"
          onChange={handleInputChange}
          maxLength={10}
        />
      </div>
      <div>
        <label htmlFor="selfIntroduction">자기소개</label>
        <textarea
          name="selfIntroduction"
          id="selfIntroduction"
          ref={introduceRef}
          defaultValue={selfIntroduction}
          autoComplete="off"
          onChange={handleInputChange}
          maxLength={30}
        />
      </div>
    </div>
  );
};

export default UserInfo;
