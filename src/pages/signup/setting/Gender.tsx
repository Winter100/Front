import React from 'react';
import styles from './styles/gender.module.css';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../../zustand/useProfile';
import MainSection from '../../../components/common/layout/MainSection';
import MainButton from '../../../components/ui/MainButton';

const Gender: React.FC = () => {
  const nav = useNavigate();
  const { profile, setProfile } = useProfile();

  return (
    <>
      <MainSection>
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
      </MainSection>
    </>
  );
};

export default Gender;
