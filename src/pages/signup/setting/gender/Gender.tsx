import { useNavigate } from 'react-router-dom';

import styles from './gender.module.css';
import useProfileStore from '../../../../store/useProfileStore';
import MainButton from '../../../../components/ui/MainButton';

const Gender = () => {
  const nav = useNavigate();
  const { profile, setProfile } = useProfileStore();

  return (
    <>
      <div className={styles.container}>
        <div>
          <h2>성별이 무엇입니까?</h2>
        </div>
        <div className={styles.btnContainer}>
          <MainButton
            type="button"
            text="남자"
            onClickFn={() => {
              setProfile({ ...profile, gender: 'male' });
              nav('/signup/setting/profile');
            }}
          />
          <MainButton
            type="button"
            text="여자"
            onClickFn={() => {
              setProfile({ ...profile, gender: 'female' });
              nav('/signup/setting/profile');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Gender;
