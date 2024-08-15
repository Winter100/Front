import React from 'react';
import ImageInput from '../../components/ui/ImageInput';
import styles from './styles/profileImageUploader.module.css';
import MainButton from '../../components/ui/MainButton';
import useProfile from '../../zustand/useProfile';
import MainSection from '../../components/common/layout/MainSection';
import { useNavigate } from 'react-router-dom';
const ProfileImageUploader: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const saveHandler = () => {
    navigate('/match');
    console.log(profile);
  };
  return (
    <MainSection>
      <div className={styles.container}>
        <div className={styles.imgInputContainer}>
          <ImageInput />
          <ImageInput />
          <ImageInput />
          <ImageInput />
          <ImageInput />
          <ImageInput />
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
