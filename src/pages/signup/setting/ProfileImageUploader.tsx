import React from 'react';
import styles from './styles/profileImageUploader.module.css';
import { useNavigate } from 'react-router-dom';
import ImageInput from '../../../components/ui/ImageInput';
import MainSection from '../../../components/common/layout/MainSection';
import MainButton from '../../../components/ui/MainButton';
import useProfile from '../../../zustand/useProfile';
import { errorToast } from '../../../components/toast/toast';
const ProfileImageUploader: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const imageInputs = Array.from({ length: 6 }, (_, index) => index);
  const saveHandler = () => {
    if (profile.image.length >= 3) {
      navigate('/match');
    } else {
      errorToast('이미지는 최소 3장이 필요합니다.', 2000);
    }
  };
  return (
    <MainSection>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h2>프로필 이미지 등록</h2>
        </div>
        <div className={styles.imgInputContainer}>
          {imageInputs.map((e, i) => {
            return <ImageInput key={`imageInput${e}`} index={i} />;
          })}
        </div>

        <div>
          <span>이미지는 최소 3장이상 필요합니다.</span>
        </div>
        <div className={styles.btnWrapper}>
          <MainButton
            type="button"
            text="저장하기"
            onClickFn={() => {
              saveHandler();
            }}
          />
        </div>
      </div>
    </MainSection>
  );
};

export default ProfileImageUploader;
