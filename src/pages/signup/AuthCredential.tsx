import React from 'react';
import MainButton from '../../components/ui/MainButton';
import { useNavigate } from 'react-router-dom';
import styles from './styles/authCredential.module.css';
import MainSection from '../../components/common/layout/MainSection';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { errorToast } from '../../components/toast/toast';
import axios from 'axios';

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const AuthCredential: React.FC = () => {
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
      errorToast(error.email.message as string, 3000);
      return null;
    }
    if (error.password) {
      errorToast(error.password.message as string, 3000);
      return null;
    }
    error.confirmPassword &&
      errorToast(error.confirmPassword.message as string, 3000);
  };
  return (
    <>
      <MainSection>
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={styles.inputContainer}>
              <div>
                <label htmlFor="email">이메일</label>
                <input
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
      </MainSection>
    </>
  );
};

export default AuthCredential;
