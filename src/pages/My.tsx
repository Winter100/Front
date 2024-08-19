import { useNavigate } from 'react-router-dom';
import { CiSettings } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa6';

import styles from './styles/My.module.css';

import Header from '../components/common/layout/Header';
import MainSection from '../components/common/layout/MainSection';
import UserImage from '../components/common/UserImage';
import RoundWrapper from '../components/common/RoundWrapper';
import AbsoluteBox from '../components/common/AbsoluteBox';
import Button from '../components/common/Button';

const My = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header></Header>
      <MainSection>
        <div className={styles.container}>
          <div className={styles.profile_box}>
            <div className={styles.profile_image}>
              <RoundWrapper
                style={{
                  position: 'relative',
                  width: '14rem',
                  height: '14rem',
                }}
              >
                <UserImage src="/public/3.jpg" size="XL" />
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
                      backgroundColor: 'rgb(255, 89, 103)',
                    }}
                  >
                    <Button style={{ fontSize: '0.8rem' }}>테스트 버튼</Button>
                  </RoundWrapper>
                </AbsoluteBox>
              </RoundWrapper>
            </div>
            <div className={styles.user_info}>
              {/* 유저 데이터 가져와서 보여주기 */}
              <p>올리버</p>
              <p>26</p>
            </div>
            <div className={styles.btn_box}>
              <RoundWrapper>
                <Button
                  onClick={() => navigate('setting')}
                  style={{
                    fontSize: '2rem',
                    color: 'white',
                  }}
                >
                  <CiSettings />
                </Button>
              </RoundWrapper>
              <RoundWrapper>
                <Button
                  onClick={() => navigate('profile')}
                  style={{
                    fontSize: '1.2rem',
                    color: 'white',
                  }}
                >
                  <FaPen />
                </Button>
              </RoundWrapper>
            </div>
          </div>
          <div className={styles.description_box}>
            <p>...설명</p>
            <p>...............</p>
            <RoundWrapper
              style={{
                width: '12rem',
                height: '2.5rem',
                fontSize: '1rem',
                borderRadius: '25px',
              }}
            >
              <Button>테스트 버튼2</Button>
            </RoundWrapper>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default My;
