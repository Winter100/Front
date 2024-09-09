import React, { useEffect, useRef } from 'react';
import styles from './styles/ImageInput.module.css';
import useProfileStore from '../../store/useProfileStore';

type Props = {
  index: number;
};
const ImageInput: React.FC<Props> = ({ index }) => {
  const { profile, addImage, removeImage } = useProfileStore();
  const { image } = profile;
  const imgRef = useRef<HTMLInputElement>(null);

  const uniqueId = useRef(
    `profileImg-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.value = '';
    }
  }, [image, index]);

  const imgHandler = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      addImage(file);
    }
  };
  const deleteHandler = () => {
    const fileToDelete = profile.image[index];

    if (fileToDelete) {
      removeImage(fileToDelete);
      if (imgRef.current) {
        imgRef.current.value = '';
      }
    } else {
      console.error('삭제할 파일이 없습니다.');
    }
  };

  return (
    <div className={styles.container}>
      {image[index] && (
        <div className={styles.deleteBtnWrapper}>
          <button
            onClick={() => {
              deleteHandler();
            }}
          >
            ×
          </button>
        </div>
      )}
      {image[index] && (
        <img
          src={URL.createObjectURL(image[index])}
          alt="userProfileImg"
          width={200}
          height={300}
        />
      )}
      {!image[index] && <label htmlFor={uniqueId}>+</label>}
      <input
        type="file"
        accept="image/*"
        id={uniqueId}
        onChange={imgHandler}
        ref={imgRef}
      />
    </div>
  );
};

export default ImageInput;
