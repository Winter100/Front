import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import styles from './authCredential.module.css';
import MainButton from '../../../components/ui/MainButton';

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const AuthCredential = () => {
  const nav = useNavigate();
  const { register, handleSubmit, watch } = useForm<Inputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const projectUrl = import.meta.env.VITE_PROJECT_URL as string;
    const res = await axios.post(`${projectUrl}/api/signup`, {
      data,
    });
    console.log(res);
    nav('/signup/setting/gender');
  };

  const onError = (error: FieldErrors<Inputs>) => {
    if (error.email) {
      toast.error(error.email.message);
      return null;
    }
    if (error.password) {
      toast.error(error.password.message);
      return null;
    }
    error.confirmPassword && toast.error(error.confirmPassword.message);
  };
  return (
    <>
      <div className={styles.container}>
        <header className={styles.headerWrapper}>
          <h2>회원가입</h2>
        </header>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={styles.inputContainer}>
            <div>
              <label htmlFor="email">이메일</label>
              <input
                className={styles.emailInput}
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '이메일 형식이 올바르지 않습니다.',
                  },
                })}
              />
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다.',
                  },
                  validate: {
                    hasNumber: (value) =>
                      /\d/.test(value) ||
                      '비밀번호에 숫자가 포함되어야 합니다.',
                    hasLowercase: (value) =>
                      /[a-z]/.test(value) ||
                      '비밀번호에 문자가 포함되어야 합니다.',
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      '비밀번호에 특수문자가 포함되어야 합니다.',
                  },
                })}
              />
              <p>
                비밀번호는 6~16자 사이이며 특수문자와 숫자가 최소 하나씩
                포함되어야 합니다.
              </p>
            </div>
            <div>
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: '비밀번호를 확인해주세요.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <MainButton text="가입하기" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthCredential;
