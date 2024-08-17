import React from 'react';

import styles from './styles/profileImageUploader.module.css';

import { useNavigate } from 'react-router-dom';
import ImageInput from '../../../components/ui/ImageInput';
import MainSection from '../../../components/common/layout/MainSection';
import MainButton from '../../../components/ui/MainButton';
import useProfile from '../../../zustand/useProfile';
const ProfileImageUploader: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const imageInputs = Array.from({ length: 6 }, (_, index) => index);
  const saveHandler = () => {
    navigate('/match');
    console.log(profile);
  };
  return (
    <MainSection>
      <div className={styles.container}>
        <div className={styles.imgInputContainer}>
          {imageInputs.map((e, i) => {
            return <ImageInput key={`imageInput${e}`} index={i} />;
          })}
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
