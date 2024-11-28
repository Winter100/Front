import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './callback.module.css';
import requests, { postRequest } from '../../api/request';
import { toast } from 'react-toastify';

const Callback = () => {
  const nav = useNavigate();
  const location = useLocation();

  //뒤로가기 방지
  useEffect(() => {
    const prevPage = document.referrer;
    window.history.replaceState({ isCallbackPage: true, prevPage }, '');

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.isCallbackPage) {
        if (event.state.prevPage) {
          window.location.href = event.state.prevPage;
        } else {
          nav('/');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [nav]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    const fetchData = async (code: string) => {
      try {
        const response = await postRequest(requests.fetchKaKaoSignIn, {
          authorizationCode: code,
        });
        if (response.status === 400) {
          toast.error('카카오 로그인에 실패하였습니다. 다시 시도해주세요.');
          nav('/login');
        }

        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data.token;

          if (accessToken && refreshToken) {
            //토큰 저장
            const tokens = { accessToken, refreshToken };
            Object.entries(tokens).forEach(([key, value]) => {
              sessionStorage.setItem(key, value);
            });

            //프로필 완성 여부 확인
            const redirectMap = {
              hasProfile: '/signup/setting/profile',
              hasProfileLocation: '/signup/setting/address',
              hasProfileImage: '/signup/setting/profileImageUploader',
            };
            const incompleteField = Object.entries(redirectMap).find(
              ([key]) => !response.data[key]
            );
            if (incompleteField) {
              toast.success('만들고 있던 프로필로 이동합니다');
              nav(incompleteField[1]);
            } else {
              toast.success('로그인 완료');
              nav('/match');
            }
          } else {
            toast.error('토큰 발급에 실패하였습니다. 다시 시도해주세요.');
            nav('/login');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (code) fetchData(code);
  }, [location.search, nav]);

  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Callback;
