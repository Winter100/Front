import { useRef } from 'react';
import useProfileStore from '../../../../../store/useProfileStore';
import styles from './styles/UserInfo.module.css';
const UserInfo = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const { profile, setProfile } = useProfileStore();
  const { nickname, introduce } = profile;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          ref={nicknameRef}
          defaultValue={nickname}
          autoComplete="off"
          onChange={handleInputChange}
          maxLength={10}
        />
      </div>
      <div>
        <label htmlFor="introduce">자기소개</label>
        <textarea
          name="introduce"
          id="introduce"
          ref={introduceRef}
          defaultValue={introduce}
          autoComplete="off"
          onChange={handleInputChange}
          maxLength={30}
        />
      </div>
    </div>
  );
};

export default UserInfo;
