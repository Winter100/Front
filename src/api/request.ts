import { AxiosRequestConfig } from 'axios';
import instance from './axios';

const requests = {
  //user
  fetchEmailCertification: '/api/v1/auth/email-certification',
  fetchSignIn: '/api/v1/auth/sign-in',
  fetchSignUp: '/api/v1/auth/sign-up',
  fetchKaKaoSignIn: '/api/v1/auth/kakao',
  //swipe
  fetchDisLike: '/api/v1/swipes/dislike',
  fetchLike: '/api/v1/swipes/dislike',
  fetchlikeFromList: '/api/v1/swipes/likes/from/',
  fetchlikeToList: '/api/v1/swipes/likes/to/',
  //profile
  fetchProfiles: '/api/v1/profiles',
  fetchFindProfiles: '/api/v1/findProfiles',
  fetchGetProfiles: '/api/v1/profiles/getProfile',
  fetchSaveLocation: '/api/v1/profiles/saveLocation',
  fetchUploadProfileImage: '/api/v1/profiles/upload-profile',
  //chat
  fetchChatRoomList: '/api/v1/profiles/upload-profile',
  fetchGetMessages: '/api/v1/chat/rooms/{chatRoomId}/getMessages',
};

export const getRequest = async (
  endPoint: string,
  token: string | null = null
) => {
  try {
    const config: AxiosRequestConfig = {
      headers: { 'Content-Type': 'application/json' },
    };
    if (token) {
      config.headers!['Authorization'] = token;
    }
    const response = await instance.get(endPoint, config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const postRequest = async <T>(
  endPoint: string,
  data: T,
  token: boolean = false
) => {
  const accessToken = sessionStorage.getItem('accessToken');
  try {
    const config: AxiosRequestConfig = {
      headers: {},
    };
    if (token) {
      config.headers!['Authorization'] = accessToken;
    }
    const response = await instance.post(endPoint, data, config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default requests;
