import Wrapper from '../../../components/common/Wrapper';
import RoundWrapper from '../../../components/common/RoundWrapper';
import MyModal from '../../../components/MyModal';
import PostcodePopup from './PostcodePopup';
import styles from './setting.module.css';

interface Setting {
  profileName: string;
  selfIntroduction: string;
  profileImages: string[];
}
const Setting = ({ profileName, selfIntroduction }: Setting) => {
  return (
    <div className={styles.container}>
      <Wrapper gap="5px">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            boxShadow: '0 0 10px rgba(255,255,255,0.6)',
            color: '#c2c2c2',
          }}
        >
          <MyModal
            profileName={profileName}
            selfIntroduction={selfIntroduction}
          />
        </RoundWrapper>
        <p style={{ fontSize: '12px' }}>프로필</p>
      </Wrapper>

      <Wrapper gap="5px">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            boxShadow: '0 0 10px rgba(255,255,255,0.6)',
            color: '#c2c2c2',
          }}
        >
          <PostcodePopup />
        </RoundWrapper>
        <p style={{ fontSize: '12px' }}>위치</p>
      </Wrapper>
    </div>
  );
};

export default Setting;
