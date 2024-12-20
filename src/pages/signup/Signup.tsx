import React from 'react';
import ConsentItem from '../../components/ui/ConsentItem';
import MainButton from '../../components/ui/MainButton';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const nav = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Tinder에 오신 걸 환영합니다</h2>
          <h3>아래 항목들을 확인해주세요</h3>
        </div>
        <ul className={styles.consentList}>
          <ConsentItem text="약관1" des="보충설명1" />
          <ConsentItem text="약관2" des="보충설명2" />
          <ConsentItem text="약관3" des="보충설명3" />
          <ConsentItem text="약관4" des="보충설명4" />
        </ul>

        <div className={styles.btnWrapper}>
          <MainButton
            type="button"
            text="약관에 동의합니다"
            onClickFn={() => {
              nav('/signup/credential');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
