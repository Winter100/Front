import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_PROJECT_SERVER_URL as string,
  headers: {},
});

export default instance;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료로 인한 401 에러이고, 재시도하지 않은 요청일 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const response = await instance.post('/api/v1/auth/refresh', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;

        sessionStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 실패했던 요청 재시도
        return instance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우 로그아웃 처리
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        // 로그인 페이지로 리다이렉트 등의 처리
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
