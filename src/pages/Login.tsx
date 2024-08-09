import React from 'react';
import styles from './styles/Login.module.css';
import MainButton from '../components/ui/MainButton';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const nav = useNavigate();
  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    nav('/');
  };

  const signupHandler = () => {
    nav('/signup');
  };
  return (
    <article className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2>tinder</h2>
      </div>
      <div className={styles.formWrapper}>
        <form onSubmit={loginHandler}>
          <input type="text" />
          <input type="password" />
          <MainButton text="로그인" type="submit" />
        </form>
      </div>

      <div className={styles.signupContainer}>
        <p>또는</p>
        <MainButton text="회원가입" type="button" onClickFn={signupHandler} />
      </div>
    </article>
  );
};

export default Login;
