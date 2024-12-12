import React, { useEffect, useRef, useMemo } from 'react';
import styles from './styles/ImageInput.module.css';
import useProfileStore from '../../store/useProfileStore';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  index: number;
};

const ImageInput: React.FC<Props> = ({ index }) => {
  const { profile, addImage, removeImage } = useProfileStore();
  const { image } = profile;
  const imgRef = useRef<HTMLInputElement>(null);

  // uniqueId를 useMemo로 최적화
  const uniqueId = useMemo(() => `profileImg-${uuidv4()}`, []);

  // 이미지 URL 생성 함수 분리
  const createImageUrl = (file: File) => URL.createObjectURL(file);

  // 이미지 입력값 초기화 함수
  const resetImageInput = () => {
    if (imgRef.current) {
      imgRef.current.value = '';
    }
  };

  useEffect(() => {
    resetImageInput();
  }, [image, index]);

  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        resetImageInput();
        return;
      }

      // 이미지 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        resetImageInput();
        return;
      }

      addImage(file);
    }
  };

  const deleteHandler = () => {
    const fileToDelete = profile.image[index];

    if (!fileToDelete) {
      console.error('삭제할 파일이 없습니다.');
      return;
    }

    removeImage(fileToDelete);
    resetImageInput();
  };

  // cleanup 함수
  useEffect(() => {
    const currentImage = image[index];
    if (currentImage) {
      const imageUrl = createImageUrl(currentImage);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [image, index]);

  return (
    <div className={styles.container}>
      {image[index] ? (
        <>
          <div className={styles.deleteBtnWrapper}>
            <button
              type="button"
              onClick={deleteHandler}
              aria-label="이미지 삭제"
            >
              ×
            </button>
          </div>
          <img
            src={createImageUrl(image[index])}
            alt="프로필 이미지"
            width={200}
            height={300}
            loading="lazy"
          />
        </>
      ) : (
        <label htmlFor={uniqueId}>+</label>
      )}
      <input
        type="file"
        accept="image/*"
        id={uniqueId}
        onChange={imgHandler}
        ref={imgRef}
        aria-label="이미지 업로드"
      />
    </div>
  );
};

export default ImageInput;
