export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken') ?? '';
};
export const getRefreshToken = () => {
  return sessionStorage.getItem('refreshToken') ?? '';
};

export const setToken = (
  key: 'accessToken' | 'refreshToken',
  token: string
) => {
  sessionStorage.setItem(key, token);
};
