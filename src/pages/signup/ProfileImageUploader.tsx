import React from 'react';
import ImageInput from '../../components/ui/ImageInput';
import styles from './styles/profileImageUploader.module.css';
import MainButton from '../../components/ui/MainButton';
import useProfile from '../../zustand/useProfile';
const ProfileImageUploader: React.FC = () => {
  const { profile } = useProfile();

  const saveHandler = () => {
    console.log(profile);
  };
  return (
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
  );
};

export default ProfileImageUploader;
