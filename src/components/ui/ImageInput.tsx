import React, { useRef, useState } from 'react';
import styles from './styles/ImageInput.module.css';
import useProfile from '../../zustand/useProfile';

const ImageInput: React.FC = () => {
  const { addImage, removeImage } = useProfile();
  const [img, setImg] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const uniqueId = useRef(
    `profileImg-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  const imgHandler = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
      addImage(file);
    }
  };
  const deleteHandler = () => {
    if (imgRef.current?.files?.[0]) {
      const file = imgRef.current.files[0];
      setImg(null);
      removeImage(file);
      if (imgRef.current) imgRef.current.value = '';
    } else {
      console.error('No file to delete');
    }
  };

  return (
    <div className={styles.container}>
      {img && (
        <div className={styles.deleteBtnWrapper}>
          <button
            onClick={() => {
              deleteHandler();
            }}
          >
            X
          </button>
        </div>
      )}
      {img && <img src={img} alt="userProfileImg" width={200} height={300} />}
      {!img && <label htmlFor={uniqueId}>+</label>}
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
