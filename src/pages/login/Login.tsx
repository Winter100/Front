import styles from './Login.module.css';

import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MainButton from '../../components/ui/MainButton';

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
    <>
      <Header></Header>
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
          <MainButton text="회원가입" type="button" onClickFn={signupHandler} />
        </div>
      </article>
      <Footer>1</Footer>
    </>
  );
};

export default Login;
