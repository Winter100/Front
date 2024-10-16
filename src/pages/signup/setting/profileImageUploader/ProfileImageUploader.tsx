import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './profileImageUploader.module.css';
import useProfileStore from '../../../../store/useProfileStore';
import ImageInput from '../../../../components/ui/ImageInput';
import MainButton from '../../../../components/ui/MainButton';

const ProfileImageUploader: React.FC = () => {
  const { profile } = useProfileStore();
  const navigate = useNavigate();
  const imageInputs = Array.from({ length: 6 }, (_, index) => index);
  const saveHandler = async () => {
    if (profile.image.length >= 3) {
      navigate('/match');
    } else {
      toast.error('이미지는 최소 3장이 필요합니다.');
    }
  };
  return (
    <>
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
    </>
  );
};

export default ProfileImageUploader;
