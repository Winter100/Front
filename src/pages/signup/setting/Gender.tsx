import React from 'react';
import styles from './styles/gender.module.css';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../../zustand/useProfile';
import MainSection from '../../../components/common/layout/MainSection';

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
            <button
              onClick={() => {
                setProfile({ ...profile, gender: 'male' });
                nav('/signup/setting/profile');
              }}
            >
              남자
            </button>
            <button
              onClick={() => {
                setProfile({ ...profile, gender: 'female' });
                nav('/signup/setting/profile');
              }}
            >
              여자
            </button>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Gender;
