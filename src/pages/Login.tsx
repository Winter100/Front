import React from 'react';
import styles from './styles/Login.module.css';
import MainButton from '../components/ui/MainButton';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/layout/Header';
import MainSection from '../components/common/layout/MainSection';
import axios from 'axios';

const Login = () => {
  const nav = useNavigate();
  const loginHandler = (e: React.FormEvent) => {
    const projectUrl = import.meta.env.VITE_PROJECT_URL as string;
    axios.post(
      `${projectUrl}/api/v1/auth`,
      {},
      {
        headers: {
          Authorization: `token`,
        },
      }
    );
    nav('/');
  };

  const signupHandler = () => {
    nav('/signup');
  };
  return (
    <>
      <Header></Header>
      <MainSection>
        <article className={styles.container}>
          <div className={styles.titleWrapper}>
            <h2>tinder</h2>
          </div>
          <div className={styles.formWrapper}>
            <form onSubmit={loginHandler}>
              <input type="email" />
              <input type="password" />
              <MainButton text="로그인" type="submit" />
            </form>
          </div>

          <div className={styles.signupContainer}>
            <p>또는</p>
            <MainButton
              text="회원가입"
              type="button"
              onClickFn={signupHandler}
            />
          </div>
        </article>
      </MainSection>
    </>
  );
};

export default Login;
