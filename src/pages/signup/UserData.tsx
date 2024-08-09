import React, { FormEvent, useRef } from 'react';
import MainButton from '../../components/ui/MainButton';
import { useNavigate } from 'react-router-dom';
import styles from './styles/userData.module.css';
const UserData = () => {
  const nav = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const signupSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      nickname: nicknameRef.current!.value,
    };
    console.log(user);
    nav('/signup/InterestChoice');
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
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" ref={nicknameRef} />
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <MainButton text="가입하기" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UserData;
