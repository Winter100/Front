import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './authCredential.module.css';
import MainButton from '../../../components/ui/MainButton';
import { useState } from 'react';
import requests, { postRequest } from '../../../api/request';

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  certificationNumber: string;
};

const AuthCredential = () => {
  const [isVerificationCodeReceived, setIsVerificationCodeReceived] =
    useState(false);
  const nav = useNavigate();

  const { register, handleSubmit, watch } = useForm<Inputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  //입력된 유저정보
  const email = watch('email');
  const password = watch('password');

  //회원가입 함수
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const response = await postRequest(requests.fetchSignUp, {
        password: data.password,
        email: data.email,
        certificationNumber: data.certificationNumber,
      });
      console.log(response);
      if (response.data.email === data.email) nav('/signup/setting/gender');
    } catch (error) {
      axios.isAxiosError(error) && error.response
        ? console.error('signinError', error.response.data)
        : console.error('signinError', error);
    }
  };

  //회원가입 에러 함수
  const onError = (errors: FieldErrors<Inputs>) => {
    const errorMessages = ['email', 'password', 'confirmPassword'] as const;

    // 첫 번째로 발견된 에러만 처리 (선택적)
    for (const field of errorMessages) {
      if (errors[field]) {
        toast.error(errors[field]?.message);
        return;
      }
    }
  };

  //인증번호 요청 함수
  const getVerificationBtnHanddler = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    try {
      if (!emailRegex.test(email)) {
        toast.error('이메일 형식이 올바르지 않습니다.');
        return null;
      }

      const response = await postRequest(requests.fetchEmailCertification, {
        email,
      });
      console.log(response);
      if (response.data.status === '성공') {
        toast.success(response.data.message);
        setIsVerificationCodeReceived(!isVerificationCodeReceived);
      } else {
        toast.error('인증번호 받기 실패');
      }
    } catch (error) {
      console.error('error', error);
    }
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
              <div className={styles.inputBtnStack}>
                <input
                  className={styles.emailInput}
                  readOnly={isVerificationCodeReceived}
                  autoComplete="off"
                  style={{
                    backgroundColor: isVerificationCodeReceived
                      ? '#4c4c4c'
                      : 'black',
                  }}
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '이메일 형식이 올바르지 않습니다.',
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={getVerificationBtnHanddler}
                  disabled={isVerificationCodeReceived}
                >
                  인증번호 받기
                </button>
              </div>
            </div>
            {isVerificationCodeReceived && (
              <div>
                <label htmlFor="verificationInput">인증번호 입력</label>
                <div className={styles.inputBtnStack}>
                  <input
                    type="text"
                    id="verificationInput"
                    maxLength={4}
                    {...register('certificationNumber')}
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                disabled={!isVerificationCodeReceived}
                style={{
                  backgroundColor: !isVerificationCodeReceived
                    ? '#4c4c4c'
                    : undefined,
                }}
                maxLength={13}
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다.',
                  },
                  validate: {
                    isValid: (value) =>
                      /^[a-zA-Z0-9]+$/.test(value) ||
                      '비밀번호에는 영어와 숫자만 포함되어야 하며, 특수문자나 공백은 사용할 수 없습니다.',
                  },
                })}
              />
              <p>
                비밀번호는 8~13자 사이이며 영어와 숫자만 포함되어야 하며,
                특수문자는 사용할 수 없습니다.
              </p>
            </div>
            <div>
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                disabled={!isVerificationCodeReceived}
                style={{
                  backgroundColor: isVerificationCodeReceived
                    ? 'black'
                    : '#4c4c4c',
                }}
                maxLength={13}
                {...register('confirmPassword', {
                  required: '비밀번호를 확인해주세요.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <MainButton
              text="가입하기"
              type="submit"
              disabled={!isVerificationCodeReceived}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthCredential;
