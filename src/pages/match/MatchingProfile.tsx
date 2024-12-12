import styles from './matchingProfile.module.css';

import Carousel from './components/Carousel';
import AbsoluteBox from '../../components/common/AbsoluteBox';
import UserProfile from './components/UserProfile';
import AnotherMenu from './components/AnotherMenu';
import useFindUserStore from '../../store/useFindUserStore';
import Spinner from '../../components/common/Spinner';
import { useEffect, useState } from 'react';
import { handleGetFindProfiles } from '../../util/swipe';

const MatchingProfile = () => {
  const token = sessionStorage.getItem('accessToken') ?? '';
  const userData = useFindUserStore((state) => state.userData);
  const selectedUser = useFindUserStore((state) => state.selectedUser);
  const setUserData = useFindUserStore((state) => state.setUserData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFindProfiles = async () => {
      setIsLoading(true);
      await handleGetFindProfiles(token, setUserData);
      setIsLoading(false);
    };

    getFindProfiles();
  }, [token, setUserData]);

  const reFetch = async () => {
    setIsLoading(true);
    await handleGetFindProfiles(token, setUserData);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className={styles.spinner_container}>
        <Spinner size={100} />
      </div>
    );
  }

  return (
    <>
      {userData?.length >= 1 ? (
        <>
          <Carousel image={selectedUser?.imageUrl ?? ''} />
          <AbsoluteBox>
            <UserProfile
              profileName={selectedUser?.profileName ?? ''}
              age={selectedUser?.age ?? 0}
            />
            <AnotherMenu />
          </AbsoluteBox>
        </>
      ) : (
        <div className={styles.alert_container}>
          <p>매칭 된 유저가 없습니다</p>
          <div className={styles.btn_container}>
            <button onClick={reFetch} className={styles.btn}>
              매칭
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchingProfile;
