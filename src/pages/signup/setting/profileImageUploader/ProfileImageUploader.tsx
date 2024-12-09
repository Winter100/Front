import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './profileImageUploader.module.css';
import useProfileStore from '../../../../store/useProfileStore';
import ImageInput from '../../../../components/ui/ImageInput';
import MainButton from '../../../../components/ui/MainButton';
import axios from 'axios';
import requests, { postRequest } from '../../../../api/request';

const ProfileImageUploader: React.FC = () => {
  const { profile } = useProfileStore();
  const navigate = useNavigate();
  const imageInputs = Array.from({ length: 6 }, (_, index) => index);
  const [loading, setLoading] = useState(false);

  const saveHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    profile.image.forEach((image) => {
      formData.append(`profileImage`, image as File);
    });

    if (profile.image.length >= 3) {
      try {
        const response = await postRequest(
          requests.fetchUploadProfileImage,
          formData,
          true
        );
        console.log(response);
        // navigate('/match');
        // if (response.data.status === '성공') {
        //   navigate('/match');
        // }
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error) && error.response) {
          console.error('에러', error.response);
          toast.error('이미지 업로드 중 오류가 발생했습니다.');
        } else {
          console.error('에러2', error);
          toast.error('알 수 없는 오류가 발생했습니다.');
        }
      }
    } else {
      setLoading(false);
      toast.error('이미지는 최소 3장이 필요합니다.');
    }
  };
  return (
    <>
      <form className={styles.container} onSubmit={saveHandler}>
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
            type="submit"
            text={loading ? '저장 중...' : '저장하기'}
          />
        </div>
      </form>
    </>
  );
};

export default ProfileImageUploader;
