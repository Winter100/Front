import axios from 'axios';

export const handleOnLike = async (toUserName: string, token: string) => {
  try {
    /**
     * toUserName에서 유저 이름 가져와 보내주기
     */

    if (toUserName.length > 1) {
      const response = await axios.post(
        `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/like`,
        {
          toProfileName: toUserName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const handleOnDisLike = async (toUserName: string, token: string) => {
  try {
    /**
     * toUserName에서 유저 이름 가져와 보내주기
     */

    if (toUserName.length > 1) {
      const response = await axios.post(
        `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/dislike`,
        {
          toProfileName: toUserName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const handleOnRefreshUser = async (
  token: string,
  setToUserName: (name: string) => void
) => {
  /**
   * 상대방 유저이름 받아오고 zustand에 넣기? 아니면 리턴하기?
   * toUserName = 유저이름
   */
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

    console.log('data', data);
  } catch (e) {
    console.log(e);
    // throw new Error('');
  }
};
