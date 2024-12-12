import axios from 'axios';
import { User } from '../store/useFindUserStore';

export const handleOnLike = async (userName: string, token: string) => {
  try {
    if (userName.length > 1) {
      const response = await axios.post(
        `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/swipes/like`,
        {
          toProfileName: userName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const handleOnDisLike = async (userName: string, token: string) => {
  try {
    if (userName.length > 1) {
      const response = await axios.post(
        `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/swipes/dislike`,
        {
          toProfileName: userName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const handleGetFindProfiles = async (
  token: string,
  setToUserName: (name: User[]) => void
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/profiles/findProfiles`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    setToUserName(data);
  } catch (e) {
    console.log(e);
  }
};
