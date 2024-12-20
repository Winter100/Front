import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './callback.module.css';
import requests, { postRequest } from '../../api/request';
import { toast } from 'react-toastify';
import { useSession } from '../../store/useSession';

const Callback = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { kakaoLogin } = useSession();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (!code) {
      nav(-1);
    }
    const fetchData = async (code: string) => {
      try {
        const response = await postRequest(requests.fetchKaKaoSignIn, {
          authorizationCode: code,
        });
        if (response.status === 400) {
          toast.error('카카오 로그인에 실패하였습니다. 다시 시도해주세요.');
          nav('/login');
        }

        if (response.status === 429) {
          toast.error(
            '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.'
          );
          nav('/login');
        }
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data.token;

          if (accessToken && refreshToken) {
            const res = await kakaoLogin(accessToken, refreshToken);

            if (res.success) {
              toast.success('로그인 완료');
              nav('/match');
            } else {
              toast.error('토큰 발급에 실패하였습니다. 다시 시도해주세요.');
            }
          }

          nav('/login');
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
