import { useState } from 'react';
import Modal from 'react-modal';
import styles from './UserImage.module.css';
import Button from '../../../components/common/Button';
import requests, { postRequest } from '../../../api/request';
import { convertRemToSize } from '../../../util/convertRemToSize';
import { dataURLToFile } from '../../../util/dataURLToFile';
import { useQueryClient } from '@tanstack/react-query';
import Spinner from '../../../components/common/Spinner';

interface UserImageProps {
  src?: string;
  size?: 'S' | 'M' | 'L' | 'XL' | 'MODAL';
  name?: string;
}

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
};

const contentStyle = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '450px',
  zIndex: 100,
  backgroundColor: '#202123',
  border: 'none',
  borderRadius: '10px',
};

const EditUserImage = ({
  src = '/profile.png',
  size = 'XL',
  name = '',
}: UserImageProps) => {
  const sizeValue = convertRemToSize(size);
  const [image, setImage] = useState(() => src);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert('크기가 10MB를 초과합니다. 다른 이미지를 선택해주세요');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setImage(result);
      }
    };
    reader.readAsDataURL(file);
  };
  const closeModal = () => {
    setOpenModal(false);
    setImage(src);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (image.startsWith('https://')) {
      return closeModal();
    }

    try {
      const formData = new FormData();
      formData.append(
        'profileImage',
        dataURLToFile(image, 'uploaded-image.png')
      );
      const response = await postRequest(
        requests.fetchUploadProfileImage,
        formData,
        true
      );
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['myProfile'], exact: true });
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    } finally {
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={styles.container}
        style={{
          width: sizeValue,
          height: sizeValue,
        }}
      >
        <Button
          onClick={() => setOpenModal(true)}
          className={styles.imageButton}
        >
          <img src={src} alt="User Avatar" className={styles.image} />
        </Button>
      </div>
      {openModal && (
        <Modal
          ariaHideApp={false}
          isOpen={openModal}
          onRequestClose={closeModal}
          style={{ overlay: overlayStyle, content: contentStyle }}
          contentLabel="User Image Modal"
        >
          <div className={styles.modalContent}>
            {name && <h2>{name}</h2>}

            <div>
              <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={(e) => handleChangeImage(e)}
              />
              <label
                style={{
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
                htmlFor="file-upload"
              >
                <img
                  src={image}
                  alt="User Avatar"
                  className={styles.modalImage}
                />
              </label>
            </div>

            {image.startsWith('data:image') && (
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className={styles.btn}
              >
                {isLoading ? <Spinner size={20} /> : '변경하기'}
              </button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditUserImage;
