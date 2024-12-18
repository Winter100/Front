import React from 'react';
import styles from './styles/profileImage.module.css';
import ImageInput from '../../ui/ImageInput';
const ProfileImageEditComponent: React.FC = () => {
  const imageInputs = Array.from({ length: 6 }, (_, index) => index);
  return (
    <div className={styles.imgInputContainer}>
      {imageInputs.map((e, i) => {
        return <ImageInput key={`imageInput${e}`} index={i} />;
      })}
    </div>
  );
};

export default ProfileImageEditComponent;
