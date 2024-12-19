import styles from './my.module.css';
import Wrapper from '../../../components/common/Wrapper';
import RoundWrapper from '../../../components/common/RoundWrapper';
import { useMyProfile } from '../../../hooks/useMyProfile';
import Spinner from '../../../components/common/Spinner';
import Setting from './Setting';
import EditUserImage from './EditUserImage';

const My = () => {
  const { data, isLoading, isError } = useMyProfile();

  const handleLogout = () => {
    sessionStorage.clear();
    location.reload();
  };

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
              <EditUserImage
                src={data?.profileImages[0]}
                size={'XL'}
                name={data?.profileName}
              />
            </RoundWrapper>

            <Wrapper fontSize="2rem" flexDirection="row">
              <p>{data?.profileName ?? ''}</p>
              <p>{data?.age ?? ''}</p>
            </Wrapper>

            <Wrapper fontSize="1rem">
              <p>{data?.selfIntroduction}</p>
            </Wrapper>
          </Wrapper>

          <Wrapper style={{ paddingTop: '3rem' }}>
            <Setting
              profileName={data?.profileName ?? ' '}
              selfIntroduction={data?.selfIntroduction ?? ''}
              profileImages={data?.profileImages ?? []}
            />
          </Wrapper>
        </div>

        <div className={styles.bottom_container}>
          <button onClick={handleLogout} className={styles.btn}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};

export default My;
