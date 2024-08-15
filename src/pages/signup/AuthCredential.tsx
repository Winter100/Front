import React, { FormEvent, useRef } from 'react';
import MainButton from '../../components/ui/MainButton';
import { useNavigate } from 'react-router-dom';
import styles from './styles/authCredential.module.css';
const AuthCredential: React.FC = () => {
  const nav = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signupSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    console.log(user);
    nav('/signup/gender');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={signupSubmit}>
        <div className={styles.inputContainer}>
          <div>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" ref={emailRef} />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" ref={passwordRef} />
          </div>
          <div>
            <label htmlFor="passwordDoubleCheck">비밀번호 확인</label>
            <input type="password" id="passwordDoubleCheck" ref={passwordRef} />
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <MainButton text="가입하기" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AuthCredential;
