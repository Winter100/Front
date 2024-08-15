import React from 'react';
import styles from './styles/gender.module.css';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../zustand/useProfile';
const Gender: React.FC = () => {
  const nav = useNavigate();
  const { profile, setProfile } = useProfile();

  return (
    <div className={styles.container}>
      <div>
        <h2>성별이 무엇입니까?</h2>
      </div>
      <div className={styles.btnContainer}>
        <button
          onClick={() => {
            setProfile({ ...profile, gender: 'male' });
            nav('/signup/profile');
          }}
        >
          남자
        </button>
        <button
          onClick={() => {
            setProfile({ ...profile, gender: 'female' });
            nav('/signup/profile');
          }}
        >
          여자
        </button>
      </div>
    </div>
  );
};

export default Gender;
