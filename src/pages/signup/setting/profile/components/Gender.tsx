import { useState } from 'react';
import MainButton from '../../../../../components/ui/MainButton';
import useProfileStore from '../../../../../store/useProfileStore';
import styles from './styles/gender.module.css';
const Gender = () => {
  const { profile, setProfile } = useProfileStore();
  const [genderState, setGenderState] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3>성별</h3>
      </div>
      <div className={styles.btnContainer}>
        <MainButton
          type="button"
          text="남자"
          aria-label="남성 성별 선택"
          disabled={genderState === 'MALE'}
          onClickFn={() => {
            setGenderState('MALE');
            setProfile({ ...profile, gender: 'MALE' });
          }}
        />
        <MainButton
          type="button"
          text="여자"
          aria-label="여성 성별 선택"
          disabled={genderState === 'FEMALE'}
          onClickFn={() => {
            setGenderState('FEMALE');
            setProfile({ ...profile, gender: 'FEMALE' });
          }}
        />
      </div>
    </div>
  );
};

export default Gender;
