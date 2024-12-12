import styles from './my.module.css';
import Wrapper from '../../../components/common/Wrapper';
import RoundWrapper from '../../../components/common/RoundWrapper';
import AbsoluteBox from '../../../components/common/AbsoluteBox';
import UserImage from '../../../components/common/UserImage';
import MyModal from '../../../components/MyModal';
import { useMyProfile } from '../../../hooks/useMyProfile';
import Spinner from '../../../components/common/Spinner';

const My = () => {
  const { data, isLoading, isError } = useMyProfile();

  if (isLoading) {
    return (
      <div className={styles.spinner_container}>
        <Spinner size={100} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.spinner_container}>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile_box}>
          <Wrapper>
            <RoundWrapper
              style={{
                position: 'relative',
                width: '14rem',
                height: '14rem',
                border: 'none',
              }}
            >
              <UserImage
                src={data?.profileImages[0] ?? '/profile.png'}
                size="XL"
              />
            </RoundWrapper>
            <AbsoluteBox
              style={{
                bottom: -3,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8rem',
                height: '2rem',
                border: 'none',
                borderRadius: '50px',
              }}
            >
              <RoundWrapper
                style={{
                  width: 'inherit',
                  height: 'inherit',
                  borderRadius: 'inherit',
                  color: 'white',
                  border: 'none',
                  backgroundColor: '#202123',
                }}
              >
                <MyModal
                  profileName={data?.profileName}
                  selfIntroduction={data?.selfIntroduction}
                  profileImages={data?.profileImages[0]}
                />
              </RoundWrapper>
            </AbsoluteBox>
          </Wrapper>

          <Wrapper fontSize="2rem" flexDirection="row">
            <p>{data?.profileName ?? ''}</p>
            <p>{data?.age ?? ''}</p>
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default My;
