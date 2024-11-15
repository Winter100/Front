import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './callback.module.css';
import requests, { postRequest } from '../../api/request';
const Callback = () => {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const fetchData = async (code: string) => {
      try {
        const response = await postRequest(requests.fetchKaKaoSignIn, {
          authorizationCode: code,
        });
        if (response.data.accessToken && response.data.refreshToken) {
          sessionStorage.setItem('accessToken', response.data.accessToken);
          sessionStorage.setItem('refreshToken', response.data.refreshToken);
        }
      } catch (error) {
        console.error(Response.error);
      }
    };
    if (code) fetchData(code);
  }, [location, nav]);

  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Callback;
