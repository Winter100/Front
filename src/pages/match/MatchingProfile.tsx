import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from '../../components/layout/Header';
import Carousel from './components/Carousel';
import AbsoluteBox from '../../components/common/AbsoluteBox';
import UserProfile from './components/UserProfile';
import AnotherMenu from './components/AnotherMenu';

const token = '';

const MatchingProfile = () => {
  const [profile, setProfile] = useState<{
    imageUrl: string;
    profileName: string;
    age: number;
  } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = axios.get(
          `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/profiles/findProfiles`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = (await response).data;

        setProfile(data);
      } catch (e) {
        console.log('e', e);
      }
    };

    // getUser();
  }, []);

  return (
    <>
      <Header></Header>
      <Carousel image={'public/2.jpg'} />
      <AbsoluteBox>
        <UserProfile
          profileName={profile?.profileName || ''}
          age={profile?.age || 0}
        />
        <AnotherMenu profileName={profile?.profileName || ''} />
      </AbsoluteBox>
    </>
  );
};

export default MatchingProfile;
